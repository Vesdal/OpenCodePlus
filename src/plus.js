(() => {
  'use strict';
  const NAME = 'OpenCode+';
  const italian = () => (document.documentElement.lang || navigator.language || '').startsWith('it');
  window.__opencodePlus = {
    transition(action) {
      if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) return action();
      const transition = document.startViewTransition(action);
      transition.finished.catch(() => {});
    },
    animateSettings() {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      requestAnimationFrame(() => {
        const panels = document.querySelectorAll('.settings-content');
        if (!panels.length) return;
        for (const panel of panels) {
          panel.getAnimations().forEach(animation => animation.cancel());
          panel.animate([{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }], { duration: 240, easing: 'cubic-bezier(.22,.8,.24,1)' });
        }
      });
    },
    notifyRemoved(row) {
      row?.classList.add('plus-leaving');
      let status = document.querySelector('.plus-status');
      if (!status) { status = document.createElement('div'); status.className = 'plus-status'; status.setAttribute('role', 'status'); document.body.append(status); }
      status.classList.remove('plus-leaving');
      status.textContent = italian() ? 'Rimosso dai recenti. File e sessioni conservati.' : 'Removed from recents. Files and sessions are preserved.';
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => { status.classList.add('plus-leaving'); setTimeout(() => status.remove(), 260); }, 3600);
    }
  };
  // Title only: the logo is replaced at build time, so no DOM-wide observer runs during streaming.
  const fixTitle = () => { if (/^OpenCode(?!\+)/.test(document.title)) document.title = document.title.replace(/^OpenCode/, NAME); };
  const title = document.querySelector('title');
  if (title) new MutationObserver(fixTitle).observe(title, { childList: true, characterData: true, subtree: true });
  fixTitle();
})();
