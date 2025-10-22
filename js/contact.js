// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formMessage = document.getElementById('formMessage');

  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone') || '',
        message: formData.get('message')
      };

      // Show loading state
      showMessage('loading', 'Nachricht wird gesendet...');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Wird gesendet...';

      try {
        // Build API URL from config
        const apiUrl = `${CONFIG.API_BASE_URL}${CONFIG.ENDPOINTS.CONTACT}`;
        
        // Send to backend
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
          showMessage('success', result.message);
          contactForm.reset();
        } else {
          showMessage('error', result.message);
        }
      } catch (error) {
        console.error('Error:', error);
        showMessage('error', 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.');
      } finally {
        // Reset button state
        submitBtn.disabled = false;
        submitBtn.textContent = 'Senden';
      }
    });
  }

  function showMessage(type, message) {
    formMessage.className = `form-message ${type}`;
    formMessage.textContent = message;
    formMessage.style.display = 'block';
    
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
      setTimeout(() => {
        formMessage.style.display = 'none';
      }, 5000);
    }
  }
});

