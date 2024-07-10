const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

populateForm();

function onFormInput(event) {
  const formData = {
    email: form.elements.email.value,
    message: form.elements.message.value,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateForm() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    const { email, message } = JSON.parse(savedData);
    form.elements.email.value = email;
    form.elements.message.value = message;
  }
}

function onFormSubmit(event) {
  event.preventDefault();

  if (!form.elements.email.value || !form.elements.message.value) {
    alert('Please fill in all the fields!');
    return;
  }

  console.log({
    email: form.elements.email.value,
    message: form.elements.message.value,
  });

  form.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function throttle(func, delay) {
  let lastCall = 0;
  return function (...args) {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return func(...args);
  };
}
