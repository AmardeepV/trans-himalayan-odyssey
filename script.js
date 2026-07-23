const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

toggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(isOpen));
  toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});

document.querySelectorAll('.nav a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle?.setAttribute('aria-expanded', 'false');
}));

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const typewriter = document.querySelector('[data-typewriter]');

if (typewriter) {
  const message = typewriter.textContent.trim().replace(/\s+/g, ' ');
  let played = false;
  const animateMessage = () => {
    if (played) return;
    played = true;
    typewriter.textContent = '';
    [...message].forEach((character, index) => setTimeout(() => {
      typewriter.textContent += character;
    }, index * 43));
  };
  new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) animateMessage();
  }), { threshold: 0.45 }).observe(typewriter);
}

const enquiryForm = document.getElementById('enquiry-form');
const contactRecipient = 'adwasheree@gmail.com';

if (enquiryForm) {
  const journeyField = document.getElementById('journey');
  const requestedJourney = new URLSearchParams(window.location.search).get('journey');
  if (requestedJourney) journeyField.value = [...journeyField.options].find((option) => option.text.startsWith(requestedJourney))?.value || 'Not sure yet';

  enquiryForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const details = Object.fromEntries(new FormData(enquiryForm));
    const subject = `Himalayan ride enquiry — ${details.journey}`;
    const body = `Name: ${details.name}\nEmail: ${details.email}\nJourney: ${details.journey}\nRiders: ${details.riders}\n\nMessage:\n${details.message}`;
    document.getElementById('form-status').textContent = 'Opening your email app with your enquiry—please send the prepared email to complete it.';
    window.location.href = `mailto:${contactRecipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

const rideConfigurator = document.getElementById('ride-configurator');

if (rideConfigurator) {
  const passGroups = document.querySelectorAll('.pass-group');
  const addPassChoices = (group, passes) => {
    const choices = group.querySelector('.config-choice');
    passes.forEach((pass) => choices.insertAdjacentHTML('beforeend', `<label><input type="checkbox" name="passes" value="${pass}" /> ${pass}</label>`));
  };

  passGroups[0].querySelector('h3').textContent = 'Ladakh / Leh & Zanskar';
  addPassChoices(passGroups[0], ['Mig La', 'Sirsir La', 'Singe La']);
  addPassChoices(passGroups[1], ['Shinku La']);

  rideConfigurator.addEventListener('submit', (event) => {
    event.preventDefault();
    const details = new FormData(rideConfigurator);
    const selected = (name) => details.getAll(name).join(', ') || 'Not selected';
    const subject = `Configured Himalayan ride — ${details.get('name')}`;
    const body = `Name: ${details.get('name')}\nEmail: ${details.get('email')}\n\nMotorcycle: ${details.get('motorcycle')}\nAccommodation: ${details.get('accommodation')}\nRiding gear: ${selected('gear')}\nLuggage: ${details.get('luggage')}\nFood: ${selected('food')}\n\nMountain passes: ${selected('passes')}\n\nRoute notes:\n${details.get('notes') || 'None'}`;
    document.getElementById('config-status').textContent = 'Opening your email app with your configuration—please send the prepared email to complete it.';
    window.location.href = `mailto:${contactRecipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
