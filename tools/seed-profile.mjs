import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync, backup } from 'node:sqlite';
const original = path.join(process.env.APPDATA, 'ai.opencode.desktop');
const target = path.join(process.env.APPDATA, 'ai.opencode.desktop.plus.custom-20261009');
if (fs.existsSync(target)) throw new Error('Refusing to overwrite existing profile');
fs.mkdirSync(target, { recursive: true });
// Chromium cookies/auth remain untouched. Provider credentials are managed by the shared service.
for (const item of fs.readdirSync(original)) {
  if (['Preferences', 'Local State', 'opencode.settings'].includes(item) || item.startsWith('window-state-')) fs.copyFileSync(path.join(original, item), path.join(target, item));
}
const db = new DatabaseSync(path.join(original, 'drafts.sqlite'), { readOnly: true });
await backup(db, path.join(target, 'drafts.sqlite')); db.close();
console.log('Consistent desktop preference/draft snapshot created; original profile unchanged.');
