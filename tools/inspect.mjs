import fs from 'node:fs';
const archive = process.env.LOCALAPPDATA + '/Programs/@opencodedesktop/resources/app.asar';
const fd = fs.openSync(archive, 'r');
const prefix = Buffer.alloc(16); fs.readSync(fd, prefix, 0, 16, 0);
const headerSize = prefix.readUInt32LE(4);
const buffer = Buffer.alloc(prefix.readUInt32LE(12)); fs.readSync(fd, buffer, 0, buffer.length, 16);
const header = JSON.parse(buffer.toString());
function visit(node, path = '') {
  for (const [name, item] of Object.entries(node.files || {})) {
    const full = path ? `${path}/${name}` : name;
    if (item.files) visit(item, full);
    else if (process.argv[2] === 'search' && full.startsWith('out/') && full.endsWith('.js')) {
      const data = Buffer.alloc(item.size); fs.readSync(fd, data, 0, data.length, 8 + headerSize + Number(item.offset));
      const text = data.toString(); const term = process.argv[3]; let at = 0, count = 0;
      while ((at = text.indexOf(term, at)) >= 0 && count++ < 4) { console.log(full, text.slice(Math.max(0, at - 180), at + 450)); at += term.length; }
    }
    else if (process.argv[2] === 'list') { if (!full.startsWith('node_modules/')) console.log(full); }
    else if (full === process.argv[2]) {
      const data = Buffer.alloc(item.size); fs.readSync(fd, data, 0, data.length, 8 + headerSize + Number(item.offset));
      if (process.argv[3]) fs.writeFileSync(process.argv[3], data); else console.log(data.toString());
    }
  }
}
visit(header); fs.closeSync(fd);
