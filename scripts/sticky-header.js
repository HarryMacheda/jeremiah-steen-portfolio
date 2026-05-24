document.addEventListener('DOMContentLoaded', function(){
  const menu = document.querySelector('menu');
  const sticky = document.getElementById('sticky-header');
  if(!menu || !sticky) return;

  // Clone menu links into sticky header
  const stickyInner = sticky.querySelector('.sticky-inner');
  if(stickyInner) {
    const menuLinks = menu.querySelector('.links');
    
    if(menuLinks) {
      const linksClone = menuLinks.cloneNode(true);
      stickyInner.appendChild(linksClone);
    }
  }

  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY < lastScrollY) {
      // Scrolling up
      sticky.classList.add('show-links');
    } else {
      // Scrolling down
      sticky.classList.remove('show-links');
    }
    
    lastScrollY = currentScrollY;
  });

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
