(() => {
  const timeline = document.querySelector('.timeline');
  if (!timeline) return;
  const controls = timeline.querySelector('.year-filters');
  const buttons = [...controls.querySelectorAll('button[data-year]')];
  const cards = [...document.querySelectorAll('.post-card[data-year]')];
  const entries = [...timeline.querySelectorAll('li[data-year]')];
  const list = timeline.querySelector('.timeline-entries');
  const count = timeline.querySelector('.timeline-count');
  function selectYear(year) {
    const visible = [];
    cards.forEach(card => { card.hidden = year !== 'all' && card.dataset.year !== year; });
    entries.forEach(entry => {
      entry.hidden = year !== 'all' && entry.dataset.year !== year;
      entry.classList.remove('last-visible');
      if (!entry.hidden) visible.push(entry);
    });
    visible.at(-1)?.classList.add('last-visible');
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.year === year)));
    count.textContent = `${year === 'all' ? 'All years' : year} · ${visible.length} ${visible.length === 1 ? 'entry' : 'entries'}`;
    list.scrollTop = 0;
    list.scrollLeft = 0;
  }
  controls.hidden = false;
  controls.addEventListener('click', event => {
    const button = event.target.closest('button[data-year]');
    if (!button) return;
    selectYear(button.dataset.year);
    const layout = document.querySelector('.blog-layout');
    if (layout.getBoundingClientRect().top < 0) {
      layout.scrollIntoView({block: 'start', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
    }
  });
  // An entry opened via a bookmark or browser history must never stay filtered out.
  function revealHash() {
    const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    const card = target?.closest('.post-card');
    if (card?.hidden) {
      selectYear(card.dataset.year);
      target.scrollIntoView({block: 'start'});
    }
  }
  selectYear('all');
  addEventListener('hashchange', revealHash);
})();
