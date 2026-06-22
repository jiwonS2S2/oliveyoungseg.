(() => {
  const screens = new Map([...document.querySelectorAll('.screen')].map(s => [s.id, s]));
  let current = 'home-en';

  function show(id, push = true) {
    if (!screens.has(id) || id === current) return;
    screens.get(current)?.classList.remove('active');
    screens.get(id).classList.add('active');
    current = id;
    if (push) history.pushState({ screen: id }, '', `#${id}`);
  }

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-target]');
    if (!btn) return;
    e.preventDefault();
    show(btn.dataset.target);
  }, { passive: false });

  window.addEventListener('popstate', (e) => {
    const id = e.state?.screen || location.hash.slice(1) || 'home-en';
    if (screens.has(id)) {
      screens.get(current)?.classList.remove('active');
      screens.get(id).classList.add('active');
      current = id;
    }
  });

  const initial = location.hash.slice(1);
  if (screens.has(initial) && initial !== current) {
    screens.get(current).classList.remove('active');
    screens.get(initial).classList.add('active');
    current = initial;
  }
  history.replaceState({ screen: current }, '', `#${current}`);

  document.addEventListener('gesturestart', e => e.preventDefault());
})();
