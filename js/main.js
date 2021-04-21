const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('mobile-nav');
const links = document.getElementsByClassName('card-link');
const exit = document.getElementById('exit');
const detailSection = document.getElementById('details');
const form = document.getElementById('contact-form');
const formData = JSON.parse(localStorage.getItem('formData')) || {};

hamburger.addEventListener('click', () => {
  hamburger.style.opacity = 0;
  nav.style.display = 'block';
  setTimeout(() => {
    nav.style.opacity = 1;
  }, 50);
});

nav.addEventListener('click', () => {
  nav.style.opacity = 0;
  setTimeout(() => {
    nav.style.display = 'none';
  }, 400);
  hamburger.style.opacity = 1;
});

exit.addEventListener('click', () => {
  detailSection.style.opacity = 0;
  setTimeout(() => {
    detailSection.style.display = 'none';
  }, 400);
});

const createDetailsCard = (e) => {
  const liveDemo = e.target.dataset.demo;
  const github = e.target.href;
  const projectId = e.target.dataset.id;
  const project = document.getElementById(projectId);
  const children = document.getElementById(projectId).childNodes;
  document.getElementById('details-title').innerHTML = children[3].childNodes[1].innerHTML;
  document.getElementById('details-description-text').innerHTML = children[3].childNodes[3].innerHTML;
  document.getElementById('details-stacks').innerHTML = children[3].childNodes[5].innerHTML;
  document.getElementById('details-live').href = liveDemo;
  document.getElementById('details-github').href = github;
  detailSection.style.display = 'flex';
  document.getElementById('details-image').src = window
    .getComputedStyle(project, false)
    .backgroundImage.slice(4, -1)
    .replace(/"/g, '');
  setTimeout(() => {
    detailSection.style.opacity = 1;
  }, 50);
};

for (let i = 0; i < links.length; i += 1) {
  links[i].addEventListener('click', (e) => {
    e.preventDefault();
    createDetailsCard(e);
  });
}

const formConfig = () => {
  const widthOutput = document.body.clientWidth;
  const name = widthOutput >= '720'
    ? `
  <div class="name-form">
    <input
      type="text"
      name="name"
      id="name"
      placeholder="First name"
      maxlength="30"
      required
    />
    <input
      type="text"
      name="surname"
      id="surname"
      placeholder="Last name"
      maxlength="30"
      required
    />
  </div>`
    : `<input
  type="text"
  name="fullname"
  id="fullname"
  placeholder="Full name"
  maxlength="30"
  required
/>`;
  const formHTML = `<p id="error-field"></p>
  ${name}
  <input
    type="email"
    id="email"
    name="_replyto"
    placeholder="Email address"
    required
  />
  <textarea
    id="message"
    name="message"
    placeholder="Enter text here"
    maxlength="500"
    required
  ></textarea>
  <button type="submit" class="link centered-link">Send</button>`;
  form.innerHTML = formHTML;
};

window.addEventListener('resize', formConfig);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email');
  const regex = /^[a-z0-9_\-.]+@[a-z0-9-]+\.[a-z0-9-.]+$/g;
  if (!regex.test(email.value)) {
    const errorField = document.getElementById('error-field');
    email.style.borderColor = 'red';
    errorField.innerHTML = 'Please enter a lowercased email';
  } else {
    form.submit();
  }
});

const formFiller = () => {
  const inputs = document.getElementsByTagName('input');
  const text = document.getElementById('message');
  for (let i = 0; i < inputs.length; i += 1) {
    const element = inputs[i];
    element.value = formData[element.id] || '';
  }
  text.value = formData[text.id] || '';
};

formConfig();
formFiller();

form.addEventListener('change', () => {
  const inputs = document.getElementsByTagName('input');
  const text = document.getElementById('message');
  const newData = {};
  for (let i = 0; i < inputs.length; i += 1) {
    const element = inputs[i];
    newData[element.id] = element.value || '';
  }
  newData[text.id] = text.value || '';
  window.localStorage.setItem('formData', JSON.stringify(newData));
});
