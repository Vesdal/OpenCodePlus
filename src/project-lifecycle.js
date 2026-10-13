// Desktop-owned project registrations. Never removes user directories or shared service data.
(() => {
  const key = 'plus.projectLifecycle.v1', retention = 30 * 24 * 60 * 60 * 1000;
  let state = JSON.parse(localStorage.getItem(key) || '{}');
  const normalize = directory => directory.replace(/\\/g, '/').replace(/\/$/, '').toLowerCase();
  const bucket = scope => state[scope] ||= {};
  const save = () => { localStorage.setItem(key, JSON.stringify(state)); window.dispatchEvent(new Event('plus-projects-changed')); };
  const expire = scope => {
    let changed = false;
    for (const entry of Object.values(bucket(scope))) if (entry.status === 'bin' && Date.now() - entry.closedAt >= retention) { entry.status = 'deleted'; changed = true; }
    if (changed) save();
  };
  window.__plusProjects = {
    close(scope, directory) { bucket(scope)[normalize(directory)] = { directory, status: 'bin', closedAt: Date.now() }; save(); },
    restore(scope, directory) { bucket(scope)[normalize(directory)] = { directory, status: 'active' }; save(); },
    remove(scope, directory) { bucket(scope)[normalize(directory)] = { directory, status: 'deleted' }; save(); },
    hidden(scope, directory) { expire(scope); const entry = bucket(scope)[normalize(directory)]; return !!entry && entry.status !== 'active'; },
    bin(scope, legacy = []) {
      for (const directory of legacy) if (!bucket(scope)[normalize(directory)]) bucket(scope)[normalize(directory)] = { directory, status: 'bin', closedAt: Date.now() };
      if (legacy.length) localStorage.setItem(key, JSON.stringify(state));
      expire(scope);
      return Object.values(bucket(scope)).filter(entry => entry.status === 'bin');
    },
    days(entry) { return Math.max(0, Math.ceil((entry.closedAt + retention - Date.now()) / 86400000)); }
  };
  localStorage.removeItem('plus.startup');
})();
