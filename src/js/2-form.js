const formData = { email: "", message: "" };
const form = document.querySelector('.feedback-form');

document.addEventListener('DOMContentLoaded', () => {
  const savedData = localStorage.getItem('feedback-form-state');
  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData);
      formData.email = parsedData.email || "";
      formData.message = parsedData.message || "";
      form.elements.email.value = formData.email;
      form.elements.message.value = formData.message;
    } catch (error) {
      console.error('Error parsing saved data:', error);
    }
  }
});

form.addEventListener('input', (event) => {
  const { name, value } = event.target;
  if (name === 'email' || name === 'message') {
    formData[name] = value.trim();
    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
  }
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  if (!formData.email.trim() || !formData.message.trim()) {
    alert('Fill please all fields');
    return;
  }
  
  console.log({ email: formData.email, message: formData.message });
  localStorage.removeItem('feedback-form-state');
  formData.email = "";
  formData.message = "";
  form.reset();
});