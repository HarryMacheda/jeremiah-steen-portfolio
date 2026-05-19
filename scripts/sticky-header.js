document.addEventListener('DOMContentLoaded', function(){
  const menu = document.querySelector('menu');
  const sticky = document.getElementById('sticky-header');
  if(!menu || !sticky) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.intersectionRatio === 0) {
        sticky.classList.add('visible');
        sticky.setAttribute('aria-hidden','false');
      } else {
        sticky.classList.remove('visible');
        sticky.setAttribute('aria-hidden','true');
      }
    });
  }, { threshold: [0] });

  observer.observe(menu);
});
