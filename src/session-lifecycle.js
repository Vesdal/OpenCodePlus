(() => {
  // Keep only sessions actually rendered in the loose-session inventory.
  // Project sessions remain available through their original project loader.
  window.__plusLooseSessions = (sessions, directories, normalize) => {
    const known = new Set(directories.map(normalize));
    return sessions.filter(session => !known.has(normalize(session.location.directory)));
  };
  const key = 'plus.session-bin';
  const compact = session => ({id: session.id, title: session.title, location: {directory: session.location.directory}});
  const decode = value => JSON.parse(value || '[]').map(entry => ({...entry, session: compact(entry.session)}));
  let entries = decode(localStorage.getItem(key));
  let hidden = new Map();
  const index = () => { hidden = new Map(); for (const entry of entries) { if (!hidden.has(entry.server)) hidden.set(entry.server, new Set()); for (const id of entry.ids) hidden.get(entry.server).add(id); } };
  index();
  const read = () => entries;
  const write = entries => {
    localStorage.setItem(key, JSON.stringify(entries));
    // Update the in-memory index once per mutation, not once per rendered row.
    update(entries);
    window.dispatchEvent(new Event('plus-projects-changed'));
  };
  const update = value => { entries = value; index(); };
  window.addEventListener('storage', event => { if (event.key === key) { update(decode(event.newValue)); window.dispatchEvent(new Event('plus-projects-changed')); window.dispatchEvent(new Event('plus-sessions-restored')); } });
  window.__plusSessions = {
    bin: server => read().filter(entry => entry.server === server && entry.status !== 'deleted'),
    hidden: (server, id) => hidden.get(server)?.has(id) || false,
    close(server, session, ids) {
      write([...read().filter(entry => entry.server !== server || entry.session.id !== session.id),
        {server, session: compact(session), ids: [...new Set([session.id, ...ids])], closedAt: Date.now()}]);
    },
    restore(server, id) {
      write(read().filter(entry => entry.server !== server || entry.session.id !== id));
      window.dispatchEvent(new Event('plus-sessions-restored'));
    },
    remove(server, id) {
      write(read().map(entry => entry.server === server && entry.session.id === id ? {...entry, status: 'deleted'} : entry));
    }
  };
})();
