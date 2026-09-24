const gallery = document.querySelector('.art-gallery');

// The image links still open the full-size file if <dialog> is unavailable.
if (gallery && typeof HTMLDialogElement !== 'undefined') {
  const lightbox = document.createElement('dialog');
  lightbox.className = 'art-lightbox';
  lightbox.setAttribute('aria-labelledby', 'art-lightbox-title');
  lightbox.innerHTML = '<button class="art-lightbox-close" type="button" aria-label="Close artwork">Close ×</button><img alt=""><div class="art-lightbox-caption"><strong id="art-lightbox-title"></strong><time></time></div>';
  document.body.append(lightbox);

  const image = lightbox.querySelector('img');
  const title = lightbox.querySelector('strong');
  const date = lightbox.querySelector('time');

  gallery.addEventListener('click', (event) => {
    const link = event.target.closest('.art-open');
    if (!link || !gallery.contains(link)) return;

    const card = link.closest('.art-card');
    const thumb = link.querySelector('img');
    const cardDate = card.querySelector('time');
    event.preventDefault();
    image.src = link.href;
    image.alt = thumb.alt;
    title.textContent = card.querySelector('h2').textContent;
    date.textContent = cardDate.textContent;
    date.dateTime = cardDate.dateTime;
    lightbox.showModal();
  });

  lightbox.querySelector('.art-lightbox-close').addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) lightbox.close();
  });
  lightbox.addEventListener('close', () => image.removeAttribute('src'));
}
