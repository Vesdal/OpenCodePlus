window.__plusSessionServerKey = server => Q.key(server);
function plusStart() {
  const tabs=wL(), home=rH(); let started=false;
  T(()=>{
    if(started||window.__plusChatInitialized||!tabs.ready()||!tabs.recentReady())return;
    const server=home.server.focused(), project=home.project.newSession();
    const last=tabs.store.find(t=>t.type===`session`&&bL(t)===tabs.recentKey())||tabs.store.findLast(t=>t.type===`session`);
    if(!server||(!project&&!last))return;
    started=true;
    window.__plusChatInitialized=true;
    if(last)tabs.select(last);
    else home.project.openNewSession();
  });
  const root=document.createElement(`div`);root.className=`plus-empty-projects`;
  const heading=document.createElement(`h2`);heading.textContent=`No projects found`;
  const text=document.createElement(`p`);text.textContent=`Create a project first to start a chat.`;
  const add=document.createElement(`button`);add.textContent=`Add project`;add.type=`button`;
  add.onclick=()=>{const server=home.server.focused();if(server)WU(home).project.choose(server)};
  root.append(heading,text,add);return root;
}
function plusSidebar() {
   const home=rH(), projects=WU(home), tabs=wL(), settings=jH(), language=TD();
  window.__plusTabsRemove=(serverKey,sessionIDs)=>{try{tabs.removeSessions({server:serverKey,sessionIDs})}catch{}};
  let initialized=false,startupTimer;
  A(()=>clearTimeout(startupTimer));
  T(()=>{
    if(initialized||window.__plusChatInitialized||!tabs.ready()||!tabs.recentReady())return;
    const server=home.server.focused(),project=home.project.newSession();
    const last=tabs.store.find(t=>t.type===`session`&&bL(t)===tabs.recentKey())||tabs.store.findLast(t=>t.type===`session`);
    if(!server||(!project&&!last))return;
    initialized=true;
    window.__plusChatInitialized=true;
    if(last)tabs.select(last);else home.project.openNewSession();
  });
  const root=document.createElement(`div`);root.className=`plus-navigation`;
  const button=(label,action,cls=``)=>{const b=document.createElement(`button`);b.type=`button`;b.textContent=label;b.className=cls;b.addEventListener(`click`,action);return b};
  const [pins,setPins]=S(JSON.parse(localStorage.getItem(`plus.pins`)||`[]`));
  const pin=(key)=>{setPins(p=>p.includes(key)?p.filter(k=>k!==key):[...p,key]);localStorage.setItem(`plus.pins`,JSON.stringify(pins()))};
  const iconButton=(label,kind,action)=>{const b=button(``,e=>{e.stopPropagation();action()},`plus-row-action`);b.title=label;b.setAttribute(`aria-label`,label);b.innerHTML=kind===`delete`?`<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 10v7m4-7v7"/></svg>`:`<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="m8 3 8 0-1 6 3 4H6l3-4-1-6ZM12 13v8"/></svg>`;return b};
  const confirmAction=(title,message,action)=>{
    const dialog=document.createElement(`dialog`);dialog.className=`plus-confirm`;
    const heading=document.createElement(`h2`);heading.textContent=title;
    const text=document.createElement(`p`);text.textContent=message;
    const error=document.createElement(`p`);error.setAttribute(`role`,`alert`);
    const cancel=button(`Cancel`,()=>dialog.close());
    const accept=button(`Confirm`,async()=>{accept.disabled=true;try{await action();dialog.close()}catch{error.textContent=`Unable to complete the operation. Retry.`;accept.disabled=false}},title.includes(`permanently`)?`plus-danger`:``);
    dialog.append(heading,text,error,cancel,accept);dialog.addEventListener(`close`,()=>dialog.remove(),{once:true});document.body.append(dialog);dialog.showModal();cancel.focus();
  };
  const sessionRow=(server,session,project,onRemoved,unfoldered=false)=>{
    const row=document.createElement(`div`);row.className=`plus-session-row`;
    const route=gL(),key=`session:${Q.key(server)}:${session.id}`;
    const open=button(session.title||`New session`,()=>home.project.openProjectSession(server,project?.worktree||session.location.directory,session),`plus-session`);
    T(()=>{open.dataset.active=String(route.route().sessionId===session.id)});row.append(open);
    if(unfoldered){const p=iconButton(`Pin session`,`pin`,()=>pin(key));T(()=>p.setAttribute(`aria-pressed`,String(pins().includes(key))));row.append(p)}
    row.append(iconButton(`Move session to bin`,`delete`,()=>{
      const ctx=home.server.context(server),ids=c6(ctx.data.session.list(),session.id);
      window.__plusSessions.close(Q.key(server),session,ids);
      tabs.removeSessions({server:Q.key(server),sessionIDs:ids.length?ids:[session.id]});onRemoved();
    }));
    return row;
  };
  const header=document.createElement(`div`);header.className=`plus-nav-header`;
  const logo=document.createElement(`img`);logo.src=`./plus-icon.svg`;logo.alt=`OpenCode+`;header.append(logo);
  const toggle=button(``,()=>{const aside=root.closest(`aside`);const closed=aside.dataset.collapsed!==`true`;aside.dataset.collapsed=String(closed);localStorage.setItem(`plus.sidebar.collapsed`,String(closed));toggle.setAttribute(`aria-expanded`,String(!closed));toggle.title=closed?`Expand sidebar`:`Collapse sidebar`},`plus-nav-toggle`);
  toggle.innerHTML=`<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="3"/><path d="M9 4v16"/><path class="plus-collapse-arrow" d="m16 9-3 3 3 3"/></svg>`;
  toggle.title=`Collapse sidebar`;
  toggle.setAttribute(`aria-label`,`Collapse or expand sidebar`);header.append(toggle);root.append(header);
  const list=document.createElement(`div`);list.className=`plus-projects`;root.append(list);
  H(list,F(He,{get each(){return home.server.list()},children:server=>{
    const group=document.createElement(`div`);
    H(group,F(He,{get each(){return home.project.forServer(server).map(p=>p.worktree).sort((a,b)=>Number(pins().includes(`project:${Q.key(server)}:${b}`))-Number(pins().includes(`project:${Q.key(server)}:${a}`)))},children:worktree=>{
      const project=home.project.forServer(server).find(p=>p.worktree===worktree);
      const [expanded,setExpanded]=S(false),[loading,setLoading]=S(false),[error,setError]=S(false),[sessions,setSessions]=S([]);
      const row=document.createElement(`section`);row.className=`plus-project`;
      const name=project.name||project.worktree.split(/[\\/]/).filter(Boolean).at(-1)||project.worktree;
      let generation=0,controller;
      const load=async()=>{controller?.abort();controller=new AbortController();const signal=controller.signal;const current=++generation;setLoading(true);setError(false);try{
        const ctx=home.server.context(server);
        const all=await r6((e,n)=>ctx.sdk.api.session.list(e,n),signal);
        if(current===generation)setSessions(all.filter(s=>!s.parentID&&!s.time.archived&&!window.__plusSessions.hidden(Q.key(server),s.id)&&[project.worktree,...project.sandboxes||[]].some(d=>eE(d)===eE(s.location.directory))).sort((a,b)=>(b.time.updated||b.time.created)-(a.time.updated||a.time.created)));
      }catch{if(current===generation&&!signal.aborted)setError(true)}finally{if(current===generation)setLoading(false)}};
      let dropdownAnimation,desiredOpen=false;
      const title=button(name,()=>{const open=!desiredOpen;desiredOpen=open;title.setAttribute(`aria-expanded`,String(open));dropdownAnimation?.cancel();
        if(open){setExpanded(true);load()}
        else{generation++;controller?.abort();setLoading(false)}
        if(matchMedia('(prefers-reduced-motion: reduce)').matches){if(!open){setExpanded(false);setSessions([])};return}
        const height=content.scrollHeight;
        dropdownAnimation=content.animate(open?[{height:`0px`,opacity:0},{height:`${height}px`,opacity:1}]:[{height:`${height}px`,opacity:1},{height:`0px`,opacity:0}],{duration:180,easing:`cubic-bezier(.2,.8,.2,1)`});
        content.style.overflow=`hidden`;
        dropdownAnimation.onfinish=()=>{content.style.overflow=``;dropdownAnimation.cancel();dropdownAnimation=undefined;if(!open){setExpanded(false);setSessions([])}};
      },`plus-project-title`);title.title=project.worktree;
      const projectHeader=document.createElement(`div`);projectHeader.className=`plus-project-header`;projectHeader.append(title);
      const key=`project:${Q.key(server)}:${worktree}`,p=iconButton(`Pin project`,`pin`,()=>pin(key));T(()=>p.setAttribute(`aria-pressed`,String(pins().includes(key))));projectHeader.append(p);
      projectHeader.append(iconButton(`Move project to bin`,`delete`,()=>{
        // Bin the project together with all of its sessions (restorable, nothing deleted).
        const serverKey=Q.key(server);
        (async()=>{
          try{
            const ctx=home.server.context(server);
            const all=await r6((e,n)=>ctx.sdk.api.session.list(e,n));
            const dirs=[project.worktree,...project.sandboxes||[]].map(eE);
            for(const s of all.filter(s=>!s.parentID&&!s.time.archived&&!window.__plusSessions.hidden(serverKey,s.id)&&dirs.includes(eE(s.location.directory)))){
              const ids=c6(ctx.data.session.list(),s.id);
              window.__plusSessions.close(serverKey,s,ids);
              window.__plusTabsRemove(serverKey,ids.length?ids:[s.id]);
            }
          }catch{}
          projects.project.close(server,project.worktree);
        })();
      }));row.append(projectHeader);
      const content=document.createElement(`div`);content.className=`plus-project-sessions`;row.append(content);
      T(()=>{content.hidden=!expanded()});
      H(content,F(R,{get when(){return expanded()},get children(){return [
        button(`+ New session`,()=>home.project.openProjectNewSession(server,project.worktree),`plus-new-session`),
        F(R,{get when(){return loading()},get children(){const n=document.createElement(`p`);n.textContent=`Loading…`;return n}}),
        F(R,{get when(){return error()},get children(){return button(`Unable to load. Retry`,load)}}),
        F(He,{get each(){return sessions()},children:session=>sessionRow(server,session,project,()=>setSessions(s=>s.filter(x=>x.id!==session.id)))})
      ]}}));
      const refreshBin=()=>{if(expanded())load()};window.addEventListener(`plus-sessions-restored`,refreshBin);
      A(()=>{window.removeEventListener(`plus-sessions-restored`,refreshBin);generation++;controller?.abort();dropdownAnimation?.cancel();setSessions([])});return row;
    }}));
    const [loose,setLoose]=S([]),[looseError,setLooseError]=S(false);let looseController;
    const refreshLoose=async()=>{looseController?.abort();const controller=new AbortController();looseController=controller;try{const ctx=home.server.context(server);const all=await r6((e,n)=>ctx.sdk.api.session.list(e,n),controller.signal);if(controller.signal.aborted)return;const directories=home.project.forServer(server).flatMap(p=>[p.worktree,...p.sandboxes||[]]);setLoose(window.__plusLooseSessions(all,directories,eE));setLooseError(false)}catch{if(!controller.signal.aborted)setLooseError(true)}};
    const looseSection=document.createElement(`section`);looseSection.className=`plus-loose-sessions`;group.append(looseSection);
    looseSection.append(button(`Other sessions · Refresh`,refreshLoose,`plus-loose-refresh`));
    H(looseSection,F(R,{get when(){return looseError()},get children(){return button(`Unable to load. Retry`,refreshLoose)}}));
     H(looseSection,F(He,{get each(){const dirs=home.project.forServer(server).flatMap(p=>[p.worktree,...p.sandboxes||[]]).map(eE);return loose().filter(s=>!window.__plusSessions.hidden(Q.key(server),s.id)&&!dirs.includes(eE(s.location.directory))).sort((a,b)=>Number(pins().includes(`session:${Q.key(server)}:${b.id}`))-Number(pins().includes(`session:${Q.key(server)}:${a.id}`)))},children:s=>sessionRow(server,s,null,()=>setLoose(all=>all.filter(x=>x.id!==s.id)),true)}));
      window.addEventListener(`plus-sessions-restored`,refreshLoose);
      let projectDirectories;
      T(()=>{const directories=home.project.forServer(server).flatMap(p=>[p.worktree,...p.sandboxes||[]]).map(eE).sort().join(`\n`);if(directories!==projectDirectories){projectDirectories=directories;refreshLoose()}});
      A(()=>{window.removeEventListener(`plus-sessions-restored`,refreshLoose);looseController?.abort();setLoose([])});return group;
  }}));
   const footer=document.createElement(`div`);footer.className=`plus-nav-footer`;
  footer.append(button(`+ Add project`,()=>{const server=home.server.focused();if(server)projects.project.choose(server)}));
  const settingsButton=button(``,()=>window.__opencodePlus.transition(settings),`plus-nav-settings`);settingsButton.title=`Settings`;settingsButton.setAttribute(`aria-label`,`Settings`);
  H(settingsButton,F(bN,{name:`settings-gear`,size:`small`}));footer.append(settingsButton);root.append(footer);
  queueMicrotask(()=>{const aside=root.closest(`aside`);if(aside){aside.dataset.collapsed=localStorage.getItem(`plus.sidebar.collapsed`)||`false`;toggle.setAttribute(`aria-expanded`,String(aside.dataset.collapsed!==`true`))}});
  return root;
}
