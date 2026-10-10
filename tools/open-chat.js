(() => {
  const tab = [...document.querySelectorAll('[role="tab"], [data-titlebar-tab]')].find(e => e.innerText.includes('Fattibilità'));
  if (!tab) throw Error('Existing session tab missing');
  tab.click(); return 'Existing session selected, no prompt submitted';
})()
