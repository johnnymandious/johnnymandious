const gallery = document.querySelector('.art-gallery');

// The image links still open the full-size file if <dialog> is unavailable.
if (gallery && typeof HTMLDialogElement !== 'undefined') {
  const lightbox = document.createElement('dialog');
  lightbox.className = 'art-lightbox';
  lightbox.setAttribute('aria-labelledby', 'art-lightbox-title');
  lightbox.innerHTML = '<div class="art-lightbox-bar"><div class="art-lightbox-nav"><button type="button" data-step="-1" aria-label="Previous artwork">← Prev</button><button type="button" data-step="1" aria-label="Next artwork">Next →</button></div><button class="art-lightbox-close" type="button" aria-label="Close artwork">Close ×</button></div><img alt=""><div class="art-lightbox-caption"><strong id="art-lightbox-title"></strong><time></time></div>';
  document.body.append(lightbox);

  const image = lightbox.querySelector('img');
  const title = lightbox.querySelector('strong');
  const date = lightbox.querySelector('time');
  const nav = lightbox.querySelector('.art-lightbox-nav');
  const links = [...gallery.querySelectorAll('.art-open')];
  let current = 0;

  nav.hidden = links.length < 2;

  function show(index) {
    current = (index + links.length) % links.length;
    const link = links[current];
    const card = link.closest('.art-card');
    const thumb = link.querySelector('img');
    const cardDate = card.querySelector('time');
    image.src = link.href;
    image.alt = thumb.alt;
    title.textContent = card.querySelector('h2').textContent;
    date.textContent = cardDate.textContent;
    date.dateTime = cardDate.dateTime;
  }

  gallery.addEventListener('click', (event) => {
    const link = event.target.closest('.art-open');
    if (!link || !gallery.contains(link)) return;
    event.preventDefault();
    show(links.indexOf(link));
    lightbox.showModal();
  });

  nav.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-step]');
    if (button) show(current + Number(button.dataset.step));
  });
  lightbox.addEventListener('keydown', (event) => {
    if (links.length < 2) return;
    if (event.key === 'ArrowRight') show(current + 1);
    if (event.key === 'ArrowLeft') show(current - 1);
  });

  lightbox.querySelector('.art-lightbox-close').addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) lightbox.close();
  });
  lightbox.addEventListener('close', () => {
    image.removeAttribute('src');
    links[current]?.focus();
  });
}
