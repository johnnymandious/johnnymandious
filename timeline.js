(() => {
  const timeline = document.querySelector('.timeline');
  if (!timeline) return;
  const controls = timeline.querySelector('.year-filters');
  const buttons = [...controls.querySelectorAll('button[data-year]')];
  const cards = [...document.querySelectorAll('.post-card[data-year]')];
  const entries = [...timeline.querySelectorAll('li[data-year]')];
  const list = timeline.querySelector('.timeline-entries');
  const count = timeline.querySelector('.timeline-count');
  const search = timeline.querySelector('.blog-search');
  const input = search?.querySelector('input');
  const noResults = document.querySelector('.no-results');
  let year = 'all';

  // Each card's searchable text: title, excerpt and date.
  const haystack = new Map(cards.map(card => [card.id, card.textContent.toLowerCase().replace(/\s+/g, ' ')]));

  function apply() {
    const query = (input?.value || '').trim().toLowerCase();
    const terms = query.split(/\s+/).filter(Boolean);
    const matches = card => (year === 'all' || card.dataset.year === year) &&
      terms.every(term => haystack.get(card.id).includes(term));
    const shown = new Set();
    cards.forEach(card => {
      card.hidden = !matches(card);
      if (!card.hidden) shown.add(card.id);
    });
    const visible = [];
    entries.forEach(entry => {
      const id = decodeURIComponent(entry.querySelector('a').hash.slice(1));
      entry.hidden = !shown.has(id);
      entry.classList.remove('last-visible');
      if (!entry.hidden) visible.push(entry);
    });
    visible.at(-1)?.classList.add('last-visible');
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.year === year)));
    const label = year === 'all' ? 'All years' : year;
    count.textContent = `${label}${query ? ` · “${query}”` : ''} · ${visible.length} ${visible.length === 1 ? 'entry' : 'entries'}`;
    if (noResults) noResults.hidden = visible.length > 0;
    list.scrollTop = 0;
    list.scrollLeft = 0;
  }

  function selectYear(value) {
    year = value;
    apply();
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

  if (search && input) {
    search.hidden = false;
    input.addEventListener('input', apply);
    input.addEventListener('keydown', event => {
      if (event.key === 'Escape' && input.value) {
        input.value = '';
        apply();
      }
    });
    // Support links such as blog.html?q=claude
    const initial = new URLSearchParams(location.search).get('q');
    if (initial) input.value = initial;
  }
  noResults?.querySelector('.clear-search')?.addEventListener('click', () => {
    if (input) input.value = '';
    selectYear('all');
    input?.focus();
  });

  // An entry opened via a bookmark or browser history must never stay filtered out.
  function revealHash() {
    const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    const card = target?.closest('.post-card');
    if (card?.hidden) {
      if (input) input.value = '';
      selectYear(card.dataset.year);
      target.scrollIntoView({block: 'start'});
    }
  }
  apply();
  addEventListener('hashchange', revealHash);
})();
