document.addEventListener('DOMContentLoaded', () => {
  const formData = { email: "", message: "" };
  const form = document.querySelector('.feedback-form');

  const saveFormData = () => {
      localStorage.setItem('feedback-form-state', JSON.stringify(formData));
    };

  const loadFormData = () => {
    const savedData = localStorage.getItem('feedback-form-state');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        formData.email = parsedData.email ? parsedData.email.trim() : "";
        formData.message = parsedData.message ? parsedData.message.trim() : "";
        form.elements.email.value = formData.email;
        form.elements.message.value = formData.message;
      } catch (error) {
        console.error('Error parsing saved data:', error);
      }
    }
  };

  loadFormData();

  form.addEventListener('input', (event) => {
    const { name, value } = event.target;
    formData[name] = value.trim();
    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    if (!formData.email || !formData.message) {
      alert('Fill please all fields');
      return;
    }
    
    console.log('Inputed data:', formData);
    
    localStorage.removeItem('feedback-form-state');
    formData.email = "";
    formData.message = "";
    form.reset();
  });
})