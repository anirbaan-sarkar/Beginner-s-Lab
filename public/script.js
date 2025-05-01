document.addEventListener('DOMContentLoaded', () => {

    // --- Update Footer Year ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Ask a Question Form Submission ---
    const queryForm = document.getElementById('query-form');
    const formStatus = document.getElementById('form-status');
    const submitButton = document.getElementById('submit-button');

    if (queryForm && formStatus && submitButton) {
        queryForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent default form submission

            formStatus.textContent = '';
            formStatus.className = ''; // Reset classes

            // Get form data (Subject is now hidden, but we include it)
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim(); // Get hidden value
            const question = document.getElementById('question').value.trim();

            if (!name || !email || !subject || !question) {
                formStatus.textContent = 'Please fill out all required fields.';
                formStatus.className = 'error';
                return;
            }

            const formData = { name, email, subject, question };

            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...'; // Add loading indicator

            try {
                const response = await fetch('/submit-question', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                const result = await response.json();

                if (response.ok) {
                    formStatus.textContent = result.message || 'Question sent successfully!';
                    formStatus.className = 'success';
                    queryForm.reset();
                } else {
                    formStatus.textContent = result.message || 'An error occurred. Please try again.';
                    formStatus.className = 'error';
                }

            } catch (error) {
                console.error('Form submission error:', error);
                formStatus.textContent = 'Network error. Please check your connection and try again.';
                formStatus.className = 'error';
            } finally {
                submitButton.disabled = false;
                 // Restore original button text with icon
                submitButton.innerHTML = '<i class="fa-regular fa-envelope"></i> Submit Question';
            }
        });
    }

    // --- Admin Login Button Placeholder ---
    const adminLoginBtn = document.getElementById('admin-login-btn');
    if (adminLoginBtn) {
        adminLoginBtn.addEventListener('click', () => {
            // In a real app, this would redirect to an admin login page (e.g., /admin)
            // Or trigger a login modal.
            alert('Admin Login: This would typically lead to a separate admin login page.');
        });
    }

    // --- Optional: Smooth scroll for hero buttons linking to sections ---
     const readBlogsButton = document.querySelector('.btn-primary'); // Assuming this targets blog section
     const askQuestionButton = document.querySelector('.btn-secondary-outline'); // Assuming this targets ask section

     if(readBlogsButton) {
         readBlogsButton.addEventListener('click', (e) => {
             const targetSection = document.getElementById('content-sections');
             if(targetSection) {
                 // e.preventDefault(); // Keep default if # link is used in href
                 targetSection.scrollIntoView({ behavior: 'smooth' });
             }
         });
     }

     if(askQuestionButton) {
         askQuestionButton.addEventListener('click', (e) => {
             const targetSection = document.getElementById('ask-question-card');
             if(targetSection) {
                  // e.preventDefault(); // Keep default if # link is used in href
                 targetSection.scrollIntoView({ behavior: 'smooth', block: 'center' }); // Try to center the card
             }
         });
     }


}); // End DOMContentLoaded