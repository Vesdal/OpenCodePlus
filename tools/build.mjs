import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { replaceOnce, patchRecents, removeGradients } from './patches.mjs';

const original = path.join(process.env.LOCALAPPDATA, 'Programs/@opencodedesktop');
const destination = path.join(original, 'resources/maintenance/build');
const archive = process.env.OPENCODE_PLUS_BASE_ARCHIVE || path.join(original, 'resources/maintenance/rollback-2.0.24/app.asar');
const bytes = fs.readFileSync(archive);
const dataOffset = 8 + bytes.readUInt32LE(4);
const header = JSON.parse(bytes.subarray(16, 16 + bytes.readUInt32LE(12)).toString());
const entries = [];
function collect(node, prefix = '') {
  for (const [name, item] of Object.entries(node.files || {})) {
    const full = prefix ? `${prefix}/${name}` : name;
    if (item.files) collect(item, full);
    else if (!item.unpacked && !item.link) entries.push({ full, item, data: bytes.subarray(dataOffset + Number(item.offset), dataOffset + Number(item.offset) + item.size) });
  }
}
collect(header);
function edit(name, transform) {
  const entry = entries.find(e => e.full === name);
  if (!entry) throw new Error(`Missing ${name}`);
  entry.data = Buffer.from(transform(entry.data.toString()));
}
const pkg = entries.find(e => e.full === 'package.json');
if (JSON.parse(pkg.data).version !== '2.0.24') throw new Error('Only verified OpenCode 2.0.24 is supported');
edit('package.json', source => JSON.stringify({...JSON.parse(source), license:'AGPL-3.0-only'}, null, 2));
edit('out/main/index.js', source => {
  source = replaceOnce(source, 'prod:`OpenCode`', 'prod:`OpenCode+`');
  source = replaceOnce(source, 'prod:`ai.opencode.desktop`', 'prod:`ai.opencode.desktop.plus.custom-20261009`');
  source = replaceOnce(source, 'title:`OpenCode`,icon:', 'title:`OpenCode+`,icon:');
  source = replaceOnce(source, 'show:!0,autoHideMenuBar:!0,title:', 'show:process.env.OPENCODE_PLUS_QA!==`1`,autoHideMenuBar:!0,title:');
  source = replaceOnce(source, 'function ve(){try', 'function ve(){process.env.OPENCODE_PLUS_QA===`1`&&a.commandLine.appendSwitch(`remote-debugging-port`,`9333`);a.commandLine.appendSwitch(`disable-features`,`SpareRendererForSitePerProcess`);try');
  source = replaceOnce(source, 'sandbox:!0,additionalArguments', 'sandbox:!0,spellcheck:!1,additionalArguments');
  return source;
});
edit('out/main/desktop-Dom04DDt.js', source => replaceOnce(source, 'c.Service.ensure({file:', 'c.Service.discover({file:'));
edit('out/main/platform-NkYpZriw.js', source => replaceOnce(source, 'let e=await A.checkForUpdates();', 'return;let e=await A.checkForUpdates();'));
edit('out/renderer/assets/main-Jci-kuOG.js', source => {
  source = patchRecents(source);
  source = replaceOnce(source, 'close(){o()&&n.trigger(`common.goBack`)}', 'close(){if(!o())return;let origin=s();if(origin.type===`session`||origin.type===`draft`){e(yL(origin));return}let tabs=wL(),last=tabs.store.find(t=>bL(t)===tabs.recentKey())||tabs.store.at(-1);if(last)tabs.select(last);else rH().project.openNewSession()}');
  source = replaceOnce(source, 's=()=>r.appearance.tabLayout()===`vertical`&&!i()', 's=()=>!0');
  source = replaceOnce(source, 'path:`/`,component:A8', 'path:`/`,component:plusStart');
  source = replaceOnce(source, 'store:r,info:u,ready:o,infoReady:f,recentReady:l,regionsReady:h', 'store:r,info:u,recentKey:()=>s.key,ready:o,infoReady:f,recentReady:l,regionsReady:h');
  const portalStart = 'get children(){return[F(R,{get when(){return h()},get children(){var e=Qie();';
  const portalEnd = ')]}})})})}}),null)';
  const begin = source.indexOf(portalStart);
  const end = source.indexOf(portalEnd, begin);
  if (begin < 0 || end < 0) throw new Error('Vertical sidebar portal boundary missing');
  source = source.slice(0, begin) + 'get children(){return F(plusSidebar,{})}})})})}}),null)' + source.slice(end + portalEnd.length);
  source = replaceOnce(source, '{type:`item`,labelKey:`desktop.menu.settings`,command:`settings.open`,accelerator:{windows:`Ctrl+,`},platforms:[`windows`]},', '');
   source = replaceOnce(source, 'recentlyClosed:r,forgetClosed(n)', 'recentlyClosed:r,bin(){return window.__plusProjects.bin(e.scope(),r())},isRemoved(n){return window.__plusProjects.hidden(e.scope(),n)},deleteRegistration(n){window.__plusProjects.remove(e.scope(),n);i(n);this.forgetClosed(n)},forgetClosed(n)');
   source = replaceOnce(source, 'open(i){let a=e.scope()', 'open(i){window.__plusProjects.restore(e.scope(),i);let a=e.scope()');
   source = replaceOnce(source, 'close(n){i(n);let a=eE(n)', 'close(n){window.__plusProjects.close(e.scope(),n);i(n);let a=eE(n)');
   source += '\n' + fs.readFileSync('src/navigation.js', 'utf8');
  source = replaceOnce(source, '<svg data-component=logo-mark viewBox="0 0 16 20"fill=none xmlns=http://www.w3.org/2000/svg><path data-slot=logo-logo-mark-shadow d="M12 16H4V8H12V16Z"fill=var(--icon-weak-base)></path><path data-slot=logo-logo-mark-o d="M12 4H4V16H12V4ZM16 20H0V0H16V20Z"fill=var(--icon-strong-base)>', '<svg data-component=logo-mark viewBox="0 0 256 256"fill=none xmlns=http://www.w3.org/2000/svg><circle cx=116 cy=140 r=66 stroke=currentColor stroke-width=26></circle><path d="M190 40v52M164 66h52"stroke=currentColor stroke-width=16 stroke-linecap=round>');
  source = replaceOnce(source, '<svg data-component=logo-splash viewBox="0 0 80 100"fill=none xmlns=http://www.w3.org/2000/svg><path d="M60 80H20V40H60V80Z"fill=var(--icon-base)></path><path d="M60 20H20V80H60V20ZM80 100H0V0H80V100Z"fill=var(--icon-strong-base)>', '<svg data-component=logo-splash viewBox="0 0 256 256"fill=none xmlns=http://www.w3.org/2000/svg><circle cx=116 cy=140 r=66 stroke=currentColor stroke-width=26></circle><path d="M190 40v52M164 66h52"stroke=currentColor stroke-width=16 stroke-linecap=round>');
  source = replaceOnce(source, 'O8=B(`<div class="mx-auto grid min-h-full', 'O8=B(`<div class="plus-home-grid mx-auto grid min-h-full');
  return source;
});
const about = '(()=>{let d=document.createElement(`div`);d.className=`plus-about`;d.innerHTML=`<div class=plus-about-mark><img src=./plus-icon.svg alt=\'\'></div><h2>OpenCode+</h2><p class=plus-about-by>Modified by <strong>Vesdal</strong> · 2026-10-10</p><p>Copyright © 2026 Vesdal · GNU AGPL v3</p><p>Free software: redistribution and modification permitted under <a href=./plus-license.txt target=_blank rel=noreferrer>AGPL-3.0-only</a>. No warranty.</p><p class=plus-about-origin>Based on <a href=https://github.com/anomalyco/opencode target=_blank rel=noreferrer>OpenCode</a> by <a href=https://github.com/anomalyco target=_blank rel=noreferrer>Anomaly</a> (<a href=https://github.com/thdxr target=_blank rel=noreferrer>thdxr</a>, <a href=https://github.com/adamdotdev target=_blank rel=noreferrer>adamdotdev</a> and <a href=https://github.com/anomalyco/opencode/graphs/contributors target=_blank rel=noreferrer>contributors</a>). Original OpenCode: MIT License. Third-party licenses remain applicable.</p><p>Customization source and compliance notes are included in the installed resources/source directory.</p>`;return d})()';
edit('out/renderer/assets/shell-UUiEcwLs.js', source => {
  source = replaceOnce(source, 'A(r,L(na,{get active(){return e.active}}),l),', `A(r,${about},l),`);
   const projectsStart = source.indexOf('Vi=e=>{');
   const projectsEnd = source.indexOf(';function Hi(e)', projectsStart);
   if (projectsStart < 0 || projectsEnd < 0) throw new Error('Project settings boundary missing');
   source = source.slice(0, projectsStart) + 'Vi=plusProjectsPage' + source.slice(projectsEnd);
  source = replaceOnce(source, 's=n=>{t.search.clear(),e.onChange(n)}', 's=n=>{window.__opencodePlus.transition(()=>{t.search.clear();e.onChange(n)})}');
  source = replaceOnce(source, 's.$$click=i,A(s,L(U,{name:`arrow-left`', 's.$$click=()=>window.__opencodePlus.transition(i),A(s,L(U,{name:`arrow-left`');
   return source + '\n' + fs.readFileSync('src/project-settings.js', 'utf8');
});
for (const entry of entries.filter(e => e.full.startsWith('out/renderer/') && e.full.endsWith('.css'))) entry.data = Buffer.from(removeGradients(entry.data.toString()));
for (const entry of entries.filter(e => e.full.startsWith('out/renderer/assets/') && e.full.endsWith('.js'))) {
  const text = entry.data.toString();
  const cleaned = text.replace(/bg-\[(?:repeating-)?(?:linear|radial|conic)-gradient\([^\]`"]*\)\]/g, '');
  if (cleaned !== text) entry.data = Buffer.from(cleaned);
}
edit('out/renderer/index.html', source => source.replace('<title>OpenCode</title>', '<title>OpenCode+</title>').replace('</head>', '<link rel="stylesheet" href="./plus.css"><script defer src="./plus.js"></script></head>').replace('./favicon-v3.svg', './plus-icon.svg').replace(/<link rel="icon" type="image\/png"[^>]*>\s*/, '').replace(/<link rel="shortcut icon"[^>]*>\s*/, ''));
function add(name, data) {
  const parts = name.split('/'); let node = header;
  for (const part of parts.slice(0, -1)) node = node.files[part] ||= { files: {} };
  const item = node.files[parts.at(-1)] = { size: data.length, offset: '0' };
  entries.push({ full: name, item, data });
}
add('out/renderer/plus.css', Buffer.concat([fs.readFileSync('src/plus.css'), Buffer.from('\n'), fs.readFileSync('src/navigation.css')]));
add('out/renderer/plus.js', Buffer.concat([fs.readFileSync('src/project-lifecycle.js'), Buffer.from('\n'), fs.readFileSync('src/session-lifecycle.js'), Buffer.from('\n'), fs.readFileSync('src/plus.js')]));
add('out/renderer/plus-icon.svg', fs.readFileSync('src/icon.svg'));
add('out/renderer/plus-license.txt', fs.readFileSync('LICENSE'));
add('LICENSE.OpenCodePlus.txt', fs.readFileSync('LICENSE'));
add('LEGAL.OpenCodePlus.md', fs.readFileSync('LEGAL.md'));
add('LICENSE.OpenCode.MIT.txt', fs.readFileSync('LICENSE.OpenCode.txt'));
const hash = b => crypto.createHash('sha256').update(b).digest('hex');
let offset = 0;
for (const entry of entries) {
  entry.item.offset = String(offset); entry.item.size = entry.data.length;
  if (entry.item.integrity) {
    const blockSize = entry.item.integrity.blockSize || 4194304;
    const blocks = [];
    for (let i = 0; i < entry.data.length; i += blockSize) blocks.push(hash(entry.data.subarray(i, i + blockSize)));
    entry.item.integrity = { algorithm: 'SHA256', hash: hash(entry.data), blockSize, blocks };
  }
  offset += entry.data.length;
}
const json = Buffer.from(JSON.stringify(header));
const padded = Math.ceil((json.length + 4) / 4) * 4;
const pickle = Buffer.alloc(4 + padded); pickle.writeUInt32LE(padded, 0); pickle.writeUInt32LE(json.length, 4); json.copy(pickle, 8);
const size = Buffer.alloc(8); size.writeUInt32LE(4, 0); size.writeUInt32LE(pickle.length, 4);
if (fs.existsSync(destination) && process.argv[2] !== '--repair-owned-build') throw new Error('Destination already exists. Refuse to overwrite a running or user-modified build.');
if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination, { recursive: true });
  for (const item of fs.readdirSync(original)) {
    if (['resources', 'Uninstall OpenCode.exe'].includes(item)) continue;
    fs.cpSync(path.join(original,item),path.join(destination,item),{recursive:true});
  }
  fs.mkdirSync(path.join(destination,'resources'),{recursive:true});
  for (const item of fs.readdirSync(path.join(original,'resources'))) {
    if (['source','maintenance','app.asar'].includes(item)) continue;
    fs.cpSync(path.join(original,'resources',item),path.join(destination,'resources',item),{recursive:true});
  }
}
fs.writeFileSync(path.join(destination, 'resources/app.asar'), Buffer.concat([size, pickle, ...entries.map(e => e.data)]));
if (fs.existsSync(path.join(destination, 'OpenCode.exe'))) fs.renameSync(path.join(destination, 'OpenCode.exe'), path.join(destination, 'OpenCode+.exe'));
fs.mkdirSync('dist', { recursive: true});
fs.writeFileSync('dist/build.json', JSON.stringify({ version: '2.0.24', original, destination, originalArchiveHash: hash(bytes), archiveHash: hash(fs.readFileSync(path.join(destination, 'resources/app.asar'))), files: entries.length, backendPolicy: 'discover existing service only; never start, stop or upgrade' }, null, 2));
console.log(`Built ${destination}; original installation untouched; ${entries.length} packed files.`);
