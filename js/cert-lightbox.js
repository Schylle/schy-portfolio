/* cert-lightbox.js — click any cert image to view full screen */
document.addEventListener('DOMContentLoaded', () => {

  // Create the lightbox element once
  const lb = document.createElement('div');
  lb.className = 'cert-lightbox';
  lb.innerHTML = `
    <button class="cert-lightbox-close" aria-label="Close">&times;</button>
    <img src="" alt="Certificate full view">
  `;
  document.body.appendChild(lb);

  const lbImg   = lb.querySelector('img');
  const lbClose = lb.querySelector('.cert-lightbox-close');

  function openLightbox(src, alt) {
    lbImg.src = src;
    lbImg.alt = alt || 'Certificate';
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { lbImg.src = ''; }, 300);
  }

  // Attach click to every cert-img-slot that has a real image
  document.querySelectorAll('.cert-img-slot').forEach(slot => {
    const img = slot.querySelector('img');
    if (!img) return; // placeholder, no image yet

    slot.addEventListener('click', () => {
      openLightbox(img.src, img.alt);
    });
  });

  // Close on backdrop click or close button
  lb.addEventListener('click', e => {
    if (e.target === lb || e.target === lbClose) closeLightbox();
  });

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
  });
});
