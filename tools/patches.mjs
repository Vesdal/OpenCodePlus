export function replaceOnce(source, from, to) {
  if (source.split(from).length !== 2) throw new Error(`Unsupported build: expected one occurrence of ${from.slice(0, 90)}`);
  return source.replace(from, () => to);
}
export function patchRecents(source) {
  source = replaceOnce(source, 'recentlyClosed:r,remove:i,open(i)', 'recentlyClosed:r,forgetClosed(n){t(`recentlyClosed`,e.scope(),r().filter(e=>eE(e)!==eE(n)))},remove:i,open(i)');
  source = replaceOnce(source, 'project:{list:c,recentlyClosed:l,homedir:u', 'project:{forgetClosed:(e,n)=>t.ensureServerCtx(e).projects.forgetClosed(n),list:c,recentlyClosed:l,homedir:u');
  source = replaceOnce(source, 'project:{list:e.project.list,recentlyClosed:e.project.recentlyClosed', 'project:{forgetClosed:e.project.forgetClosed,list:e.project.list,recentlyClosed:e.project.recentlyClosed');
  source = replaceOnce(source, 'get onAddProjects(){return e.projects.project.add}', 'get onForgetClosed(){return e.projects.project.forgetClosed},get onAddProjects(){return e.projects.project.add}');
  const start = source.indexOf('function T3(e){'); const end = source.indexOf('function E3(e){', start);
  if (start < 0 || end < 0) throw new Error('Recent project component missing');
  const component = 'function T3(e){let t=()=>e.serverHealth(e.server)?.healthy===!1,n=()=>{let t=e.homedir,n=e.project.worktree;return t&&(n===t||n.startsWith(`${t}/`))?`~${n.slice(t.length)}`:n};return (()=>{let row=document.createElement(`div`);row.className=`plus-recent-row`;H(row,F(vV,{placement:`right`,get value(){return n()},get children(){return F(D3,{type:`button`,"data-component":`home-recently-closed-row`,get disabled(){return t()},onClick:()=>e.onAddProjects(e.server,[e.project.worktree]),get children(){return[F(O3,{get project(){return e.project},outline:!0}),(()=>{var t=t3();return H(t,()=>XL(e.project)),t})()]}})}}));let remove=document.createElement(`button`);remove.type=`button`;remove.className=`plus-remove-recent`;remove.textContent=`×`;let label=e.language.t(`home.recentlyClosed`)===`Chiusi di recente`?`Rimuovi dai recenti`:`Remove from recents`;remove.setAttribute(`aria-label`,label+`: `+XL(e.project));remove.title=label;remove.addEventListener(`click`,t=>{t.stopPropagation();e.onForgetClosed(e.server,e.project.worktree);window.__opencodePlus?.notifyRemoved(row)});row.append(remove);return row})()}';
  return source.slice(0, start) + component + source.slice(end);
}
// Balanced parentheses preserve surrounding CSS and solid fallbacks.
export function removeGradients(css) {
  const pattern = /(?:repeating-)?(?:linear|radial|conic)-gradient\(/g;
  let match;
  while ((match = pattern.exec(css))) {
    let depth = 1, end = pattern.lastIndex;
    while (end < css.length && depth) { if (css[end] === '(') depth++; else if (css[end] === ')') depth--; end++; }
    if (depth) throw new Error('Unbalanced CSS gradient');
    css = css.slice(0, match.index) + 'none' + css.slice(end); pattern.lastIndex = match.index + 4;
  }
  return css;
}
