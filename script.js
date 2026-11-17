document.addEventListener('DOMContentLoaded', () => {
  const year = new Date().getFullYear();

  document.querySelectorAll('footer p').forEach((footerText) => {
    footerText.innerHTML = footerText.innerHTML.replace(/\d{4}/, year);
  });

  const menuToggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#primary-navigation');

  if (menuToggle && navigation) {
    const closeMenu = () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation menu');
      document.querySelector('header').classList.remove('menu-open');
    };

    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isExpanded));
      menuToggle.setAttribute(
        'aria-label',
        isExpanded ? 'Open navigation menu' : 'Close navigation menu'
      );
      document.querySelector('header').classList.toggle('menu-open', !isExpanded);
    });

    navigation.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) closeMenu();
    });
  }

  const contactForm = document.querySelector('.contact-form-container form');

  if (!contactForm) return;

  const statusBox = document.createElement('p');
  statusBox.className = 'form-status';
  contactForm.appendChild(statusBox);

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = (formData.get('name') || '').toString().trim();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      statusBox.textContent = 'Please fill in all the required fields.';
      statusBox.classList.remove('success');
      statusBox.classList.add('error');
      return;
    }

    statusBox.textContent = `Thanks${name ? ', ' + name : ''}! Your message has been sent successfully.`;
    statusBox.classList.remove('error');
    statusBox.classList.add('success');
    contactForm.reset();
  });
});
