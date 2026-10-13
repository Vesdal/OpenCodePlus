JSON.stringify({
  components: [...new Set([...document.querySelectorAll('[data-component]')].map(e => e.dataset.component))],
  slots: [...new Set([...document.querySelectorAll('[data-slot]')].map(e => e.dataset.slot))],
  buttons: [...document.querySelectorAll('button')].slice(0, 35).map(e => ({ label: e.getAttribute('aria-label'), text: e.innerText })),
  root: document.getElementById('root').innerHTML.slice(0, 3000)
})
