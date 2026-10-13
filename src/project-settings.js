function plusProjectRevision() {
  const [revision, update] = ke(0);
  const changed = () => update(value => value + 1);
  window.addEventListener('plus-projects-changed', changed);
  ze(() => window.removeEventListener('plus-projects-changed', changed));
  return revision;
}
function plusProjectsPage(e) {
  const context = O().ensureServerCtx(e.server), revision = plusProjectRevision();
  const sessionServer = () => window.__plusSessionServerKey(e.server);
  const sessionPrefix = 'session-bin:';
  const restoreEntry = key => key.startsWith(sessionPrefix) ? window.__plusSessions.restore(sessionServer(), key.slice(sessionPrefix.length)) : context.projects.open(key);
  const root = document.createElement('div'); root.className = 'plus-project-manager';
  const button = (label, action, danger = false) => {
    const node = document.createElement('button'); node.type = 'button'; node.textContent = label;
    if (danger) node.className = 'plus-danger';
    node.onclick = action; return node;
  };
  const listAllSessions = async api => {
    const out = [];
    let cursor;
    for(;;){
      const page = await api.session.list({limit: 5000, order: 'desc', parentID: null, ...(cursor ? {cursor} : {})});
      out.push(...page.data);
      if (page.data.length < 5000 || !page.cursor?.next) return out;
      cursor = page.cursor.next;
    }
  };
  const normDir = d => d.replace(/\\/g, '/').replace(/\/$/, '').toLowerCase();
  const confirmDelete = (directories, done) => {
    if (!directories.length) return;
    const dialog = document.createElement('dialog'); dialog.className = 'plus-confirm';
    const heading = document.createElement('h2'); heading.textContent = directories.length === 1 ? 'Delete permanently?' : 'Delete ' + directories.length + ' items permanently?';
    const message = document.createElement('p'); message.textContent = 'This permanently deletes the selected items from this computer to free space. Session data is removed and cannot be restored. Project files on disk are preserved.';
    const error = document.createElement('p'); error.setAttribute('role', 'alert');
    const cancel = button('Cancel', () => dialog.close());
    const accept = button('Delete permanently', async () => {
      accept.disabled = true;
      try {
        const api = context.sdk.api.session;
        const binSessions = window.__plusSessions.bin(sessionServer());
        for (const directory of directories) {
          if (directory.startsWith(sessionPrefix)) {
            const id = directory.slice(sessionPrefix.length);
            const entry = binSessions.find(x => x.session.id === id);
            const ids = [...new Set(entry ? [entry.session.id, ...entry.ids] : [id])];
            await window.__plusPurgeSessionIds(api, ids);
            try { window.__plusTabsRemove?.(sessionServer(), ids); } catch {}
            window.__plusSessions.remove(sessionServer(), id);
          } else {
            const active = ht(context).find(p => p.worktree === directory);
            const dirs = new Set((active ? [active.worktree, ...active.sandboxes || []] : [directory]).map(normDir));
            const top = (await listAllSessions(api)).filter(s => !s.time.archived && dirs.has(normDir(s.location.directory)));
            const ids = new Set();
            for (const s of top) ids.add(s.id);
            for (const entry of binSessions.filter(x => dirs.has(normDir(x.session.location.directory)))) {
              ids.add(entry.session.id);
              for (const id of entry.ids) ids.add(id);
            }
            const purged = await window.__plusPurgeSessionIds(api, [...ids]);
            try { window.__plusTabsRemove?.(sessionServer(), purged); } catch {}
            for (const entry of binSessions.filter(x => purged.includes(x.session.id))) window.__plusSessions.remove(sessionServer(), entry.session.id);
            context.projects.deleteRegistration(directory);
          }
        }
        done(); dialog.close();
      } catch {
        error.textContent = 'Unable to permanently delete. Retry.';
        accept.disabled = false;
      }
    }, true);
    dialog.append(heading, message, error, cancel, accept); document.body.append(dialog);
    dialog.addEventListener('close', () => dialog.remove(), { once: true }); dialog.showModal(); cancel.focus();
  };
  const heading = document.createElement('div'); heading.className = 'plus-manager-heading';
  const title = document.createElement('h2'); title.textContent = 'Projects';
  heading.append(title);
  root.append(heading);
  const selections = [], menus = new Set();
  const bulk = document.createElement('div'); bulk.className = 'plus-bulk-bar'; bulk.hidden = true;
  bulk.setAttribute('aria-label','Selected project actions');
  const refreshBulk = () => {
    const active = selections.filter(s => s.selected.size);
    const total = active.reduce((sum,s)=>sum+s.selected.size,0);
    for (const menu of menus) { menu.hidden = total > 0; if(total) menu.open = false; }
    bulk.hidden = !total; bulk.replaceChildren();
    if (!total) return;
    const count = document.createElement('span'); count.textContent = total + ' selected'; count.setAttribute('role','status'); bulk.append(count);
    const run = inBin => { for(const s of active.filter(s=>s.inBin===inBin)){const directories=[...s.selected];s.selected.clear();for(const directory of directories)inBin?restoreEntry(directory):context.projects.close(directory);s.update()}refreshBulk() };
    if(active.some(s=>!s.inBin))bulk.append(button('Move to bin',()=>run(false)));
    if(active.some(s=>s.inBin))bulk.append(button('Restore',()=>run(true)));
    bulk.append(button('Delete permanently',()=>confirmDelete(active.flatMap(s=>[...s.selected]),()=>{for(const s of active){s.selected.clear();s.update()}refreshBulk()}),true));
    bulk.append(button('Cancel selection',()=>{for(const s of selections){s.selected.clear();s.update()}refreshBulk()}));
  };
  const section = (label, inBin) => {
    const selected = new Set(), checks = new Map();
    const panel = document.createElement('section'); panel.className = 'plus-manager-section';
    const title = document.createElement('h3'); title.textContent = label;
    const description = document.createElement('p'); description.textContent = inBin ? 'Binned projects and sessions. Projects can be restored within 30 days; binned sessions restore with them. Delete permanently removes session data from this computer to free space; project files on disk are preserved.' : 'Manage projects and their settings.';
    const toolbar = document.createElement('div'); toolbar.className = 'plus-selection-toolbar';
    const allLabel = document.createElement('label'), all = document.createElement('input'); all.type = 'checkbox';
    allLabel.append(all, document.createTextNode('Select all'));
    const rows = document.createElement('div'); rows.className = 'plus-manager-rows';
    let entries = [];
    const updateSelection = () => {
      all.checked = entries.length > 0 && selected.size === entries.length;
      all.indeterminate = selected.size > 0 && selected.size < entries.length;
      all.disabled = !entries.length;
      for (const [directory, check] of checks) check.checked = selected.has(directory);
      refreshBulk();
    };
    selections.push({selected,inBin,update:updateSelection});
    all.onchange = () => { selected.clear(); if (all.checked) entries.forEach(entry => selected.add(entry.worktree)); updateSelection(); };
    toolbar.append(allLabel); panel.append(title, description, toolbar, rows); root.append(panel);
    H(() => {
      revision();
      // Import legacy closed entries before filtering the active inventory.
      const bin = context.projects.bin();
      entries = inBin ? [...bin.map(entry => ({worktree:entry.directory,closedAt:entry.closedAt})), ...window.__plusSessions.bin(sessionServer()).map(entry => ({worktree:sessionPrefix+entry.session.id,name:entry.session.title||'New session',directory:entry.session.location.directory,session:true}))] : ht(context).filter(project => !context.projects.isRemoved(project.worktree));
      const available = new Set(entries.map(entry => entry.worktree));
      for (const directory of selected) if (!available.has(directory)) selected.delete(directory);
      for(const menu of rows.querySelectorAll('.plus-project-menu'))menus.delete(menu);
      rows.replaceChildren(); checks.clear(); title.textContent = label + ' (' + entries.length + ')';
      if (!entries.length) { const empty = document.createElement('p'); empty.textContent = inBin ? 'The bin is empty.' : 'No projects found. Create a project first to start a chat.'; rows.append(empty); }
      for (const project of entries) {
        const row = document.createElement('div'); row.className = 'plus-manager-row'; row.dataset.directory = project.worktree;
        const check = document.createElement('input'); check.type = 'checkbox'; check.setAttribute('aria-label','Select ' + project.worktree);
        check.onchange = () => { check.checked ? selected.add(project.worktree) : selected.delete(project.worktree); updateSelection(); }; checks.set(project.worktree,check);
        const copy = document.createElement('div'); copy.className = 'plus-project-copy';
        const name = document.createElement('strong'); name.textContent = project.name || project.worktree.split(/[\\/]/).filter(Boolean).at(-1) || project.worktree;
        const path = document.createElement('span'); path.textContent = project.session ? 'Session · '+project.directory : project.worktree + (inBin ? ' · ' + window.__plusProjects.days(project) + ' days left' : '');
        copy.append(name,path);
        row.append(check,copy);
        const menu=document.createElement('details');menu.className='plus-project-menu';
        const trigger=document.createElement('summary');trigger.textContent='•••';trigger.setAttribute('aria-label','Actions for '+project.worktree);
        const actions=document.createElement('div');actions.className='plus-project-menu-items';
        const action=(label,callback,danger=false)=>button(label,()=>{menu.open=false;callback()},danger);
        if(!inBin)actions.append(action('Project settings',()=>e.onOpenProject(project)));
        actions.append(action(inBin?'Restore':'Move to bin',()=>inBin?restoreEntry(project.worktree):context.projects.close(project.worktree)));
        actions.append(action('Delete permanently',()=>confirmDelete([project.worktree],()=>{selected.delete(project.worktree);updateSelection()}),true));
        menu.append(trigger,actions);menus.add(menu);row.append(menu);
        menu.addEventListener('toggle',()=>{if(menu.open)for(const other of menus)if(other!==menu)other.open=false});
        menu.addEventListener('keydown',event=>{if(event.key==='Escape'){menu.open=false;trigger.focus()}});
        rows.append(row);
      }
      updateSelection();
    });
  };
  section('Active projects',false); section('Bin',true);
  root.append(bulk);
  const dismiss=event=>{for(const menu of menus)if(!menu.contains(event.target))menu.open=false};
  document.addEventListener('click',dismiss);ze(()=>document.removeEventListener('click',dismiss));
  return root;
}
