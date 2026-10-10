import fs from 'node:fs';
const targets = await (await fetch('http://127.0.0.1:9333/json/list')).json();
const target = targets.find(t => t.type === 'page' && t.url.startsWith('oc://renderer'));
if (!target) throw new Error('Custom renderer not found');
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });
let id = 0; const pending = new Map();
ws.onmessage = e => { const value = JSON.parse(e.data); const handler = pending.get(value.id); if (handler) { pending.delete(value.id); value.error ? handler.reject(value.error) : handler.resolve(value.result); } };
function call(method, params = {}) { return new Promise((resolve, reject) => { const key = ++id; pending.set(key, { resolve, reject }); ws.send(JSON.stringify({ id: key, method, params })); }); }
try {
  if (process.argv[2] === 'screenshot') {
    const result = await call('Page.captureScreenshot', { format: 'png' }); fs.mkdirSync('qa', { recursive: true }); fs.writeFileSync(process.argv[3] || 'qa/desktop.png', Buffer.from(result.data, 'base64')); console.log('Screenshot saved');
  } else {
    const expression = process.argv[2] === 'file' ? fs.readFileSync(process.argv[3], 'utf8') : process.argv[2] || '({title:document.title,text:document.body.innerText.slice(0,4000)})';
    const result = await call('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true }); console.log(JSON.stringify(result, null, 2));
  }
} finally { ws.close(); }
