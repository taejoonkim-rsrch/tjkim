(() => {
  const header = document.getElementById('site-header');
  const links = [...document.querySelectorAll('[data-nav-link]')];
  const sections = [...document.querySelectorAll('[data-nav-section]')];

  if (!header || !links.length || !sections.length) return;

  const activate = (id) => {
    links.forEach((link) => {
      const active = link.dataset.navLink === id;
      link.classList.toggle('is-active', active);
      if (active) {
        link.setAttribute('aria-current', 'location');
        link.scrollIntoView({ block: 'nearest', inline: 'nearest' });
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  let scheduled = false;
  const updateActiveSection = () => {
    const mobileMenu = window.matchMedia('(max-width: 820px)').matches;
    const marker = mobileMenu ? header.offsetHeight + 28 : 28;
    let current = sections[0].dataset.navSection;

    for (const section of sections) {
      if (section.getBoundingClientRect().top <= marker) {
        current = section.dataset.navSection;
      } else {
        break;
      }
    }

    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
      current = sections[sections.length - 1].dataset.navSection;
    }

    activate(current);
    scheduled = false;
  };

  const scheduleUpdate = () => {
    if (!scheduled) {
      scheduled = true;
      window.requestAnimationFrame(updateActiveSection);
    }
  };

  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);
  window.addEventListener('hashchange', scheduleUpdate);
  updateActiveSection();
})();
