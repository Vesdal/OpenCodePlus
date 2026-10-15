import fs from 'node:fs';
import crypto from 'node:crypto';

const files = process.argv.slice(2);
if (files.length === 0) throw new Error('Pass one or more app.asar paths');

function walk(node, prefix = '', results = []) {
  for (const [name, entry] of Object.entries(node.files || {})) {
    const full = prefix ? `${prefix}/${name}` : name;
    if (entry.files) walk(entry, full, results);
    else results.push({ full, entry });
  }
  return results;
}

function patchArchive(file) {
  const bytes = fs.readFileSync(file);
  const headerBytes = bytes.readUInt32LE(12);
  const pickleBytes = bytes.readUInt32LE(4);
  const dataOffset = 8 + pickleBytes;
  const header = JSON.parse(bytes.subarray(16, 16 + headerBytes).toString('utf8'));
  const entry = walk(header).find(item => item.full === 'out/main/desktop-Dom04DDt.js')?.entry;
  if (!entry) throw new Error(`Missing desktop bundle in ${file}`);

  const start = dataOffset + Number(entry.offset);
  const data = Buffer.from(bytes.subarray(start, start + entry.size));
  const original = data.toString('utf8');
  const discover = 'c.Service.discover({file:';
  const ensure = 'c.Service.ensure({file:';
  const stateBefore = 'a&&(process.env.XDG_STATE_HOME=R.getPath(' + String.fromCharCode(96) + 'userData' + String.fromCharCode(96) + '));';
  const stateAfter = 'process.env.XDG_STATE_HOME=R.getPath(' + String.fromCharCode(96) + 'userData' + String.fromCharCode(96) + ');';
  let source = original;

  if (source.includes(discover)) {
    const padded = ensure + ' '.repeat(discover.length - ensure.length);
    source = source.replace(discover, padded);
  }
  if (source.includes(stateBefore)) {
    const padded = stateAfter + ' '.repeat(stateBefore.length - stateAfter.length);
    source = source.replace(stateBefore, padded);
  }
  if (!source.includes(ensure) || source.includes(discover)) throw new Error(`Service recovery patch is missing in ${file}`);
  if (!source.includes(stateAfter)) throw new Error(`Profile state path patch is missing in ${file}`);

  const patched = Buffer.from(source, 'utf8');
  if (patched.length !== data.length) throw new Error(`Unexpected desktop bundle size change in ${file}`);
  patched.copy(bytes, start);

  if (entry.integrity) {
    const hash = chunk => crypto.createHash('sha256').update(chunk).digest('hex');
    const blockSize = entry.integrity.blockSize || 4 * 1024 * 1024;
    entry.integrity.hash = hash(patched);
    entry.integrity.blocks = [];
    for (let offset = 0; offset < patched.length; offset += blockSize) {
      entry.integrity.blocks.push(hash(patched.subarray(offset, Math.min(offset + blockSize, patched.length))));
    }
  }

  const serialized = Buffer.from(JSON.stringify(header), 'utf8');
  if (serialized.length > headerBytes) throw new Error(`ASAR header would grow in ${file}`);
  bytes.fill(0x20, 16, 16 + headerBytes);
  serialized.copy(bytes, 16);

  const backup = `${file}.before-20261015-service-recovery.bak`;
  if (!fs.existsSync(backup)) fs.copyFileSync(file, backup);
  fs.writeFileSync(file, bytes);
  console.log(`${file}: Service.ensure enabled; profile state pinned; backup ${backup}`);
}

for (const file of files) patchArchive(file);
