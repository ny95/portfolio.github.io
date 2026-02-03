const sectionLinks = document.querySelectorAll('.section-nav a');
const sections = document.querySelectorAll('main section');
const projectTrack = document.querySelector('.project-track');

const activateLink = (id) => {
  sectionLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${id}`;
    link.classList.toggle('active', isActive);
  });
};

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activateLink(entry.target.id);
      }
    });
  },
  {
    threshold: 0.4,
  }
);

sections.forEach((section) => navObserver.observe(section));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
  }
);

document.querySelectorAll('.reveal').forEach((element) => {
  revealObserver.observe(element);
});

if (projectTrack) {
  projectTrack.addEventListener(
    'wheel',
    (event) => {
      if (projectTrack.scrollWidth <= projectTrack.clientWidth) {
        return;
      }

      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
        return;
      }

      const maxScrollLeft = projectTrack.scrollWidth - projectTrack.clientWidth;
      const atStart = projectTrack.scrollLeft <= 1;
      const atEnd = projectTrack.scrollLeft >= maxScrollLeft - 1;

      if ((event.deltaY < 0 && atStart) || (event.deltaY > 0 && atEnd)) {
        return;
      }

      event.preventDefault();
      projectTrack.scrollBy({
        left: event.deltaY,
        behavior: 'smooth',
      });
    },
    { passive: false }
  );
}

const expToggles = document.querySelectorAll('.exp-toggle');

expToggles.forEach((button) => {
  const targetId = button.getAttribute('aria-controls');
  const target = targetId ? document.getElementById(targetId) : null;
  const label = button.querySelector('.exp-toggle-text');

  if (!target || !label) {
    return;
  }

  button.addEventListener('click', () => {
    const isOpen = button.getAttribute('aria-expanded') === 'true';
    const nextOpen = !isOpen;
    const openText = button.dataset.openText || 'View Details';
    const closeText = button.dataset.closeText || 'Hide Details';

    button.setAttribute('aria-expanded', String(nextOpen));
    target.classList.toggle('is-open', nextOpen);
    target.setAttribute('aria-hidden', String(!nextOpen));
    label.textContent = nextOpen ? closeText : openText;
  });
});
