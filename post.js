// Shared enhancements for individual posts: reading progress and sharing.
(() => {
  const body = document.querySelector('.reading-body');
  if (body && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const progress = document.createElement('div');
    progress.className = 'reading-progress';
    progress.setAttribute('aria-hidden', 'true');
    document.body.prepend(progress);
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - innerHeight;
      progress.style.width = `${scrollable > 0 ? (scrollY / scrollable) * 100 : 0}%`;
    };
    update();
    addEventListener('scroll', update, {passive: true});
    addEventListener('resize', update);
  }

  const copy = document.querySelector('.share-copy');
  if (copy && navigator.clipboard) {
    copy.hidden = false;
    copy.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(copy.dataset.url);
        copy.textContent = 'Link copied ✓';
      } catch {
        copy.textContent = 'Copy failed';
      }
      setTimeout(() => { copy.textContent = 'Copy link'; }, 2000);
    });
  }

  const native = document.querySelector('.share-native');
  if (native && navigator.share) {
    native.hidden = false;
    native.addEventListener('click', () => {
      navigator.share({title: native.dataset.title, url: native.dataset.url}).catch(() => {});
    });
  }
})();
