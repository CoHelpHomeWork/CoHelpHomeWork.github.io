'use strict';
// No external libraries, requests, analytics, cookies, or persistent identifiers.
document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.results-carousel');
  if (!carousel) return;
  const slides = [...carousel.querySelectorAll('[data-slide]')];
  const controls = document.querySelector('.carousel-controls');
  const dots = [...controls.querySelectorAll('[data-index]')];
  const status = controls.querySelector('.slide-position');
  if (!slides.length) return;
  let active = 0;
  const show = next => {
    active = (next + slides.length) % slides.length;
    slides.forEach((slide, index) => { slide.hidden = index !== active; });
    dots.forEach((dot, index) => dot.setAttribute('aria-pressed', String(index === active)));
    status.textContent = `${active + 1} / ${slides.length}`;
  };
  controls.querySelectorAll('[data-direction]').forEach(button => {
    button.addEventListener('click', () => show(active + Number(button.dataset.direction)));
  });
  dots.forEach(dot => dot.addEventListener('click', () => show(Number(dot.dataset.index))));
  carousel.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      show(active + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  // Progressive enhancement: without JavaScript all figures remain readable.
  carousel.classList.add('is-enhanced');
  controls.hidden = false;
  show(0);
});
