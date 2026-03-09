// Login Functionality
document.addEventListener('DOMContentLoaded', () => {
      const loginForm = document.getElementById('loginForm');
      const errorMessage = document.getElementById('errorMessage');

      // Check if user is already logged in
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      if (isLoggedIn === 'true') {
            window.location.href = 'dashboard.html';
      }

      // Handle form submission
      loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();

            // Demo credentials
            const ADMIN_USERNAME = 'admin';
            const ADMIN_PASSWORD = 'admin123';

            // Validate credentials
            if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
                  // Successful login
                  localStorage.setItem('isLoggedIn', 'true');
                  localStorage.setItem('username', username);

                  // Show success message briefly before redirect
                  errorMessage.style.display = 'none';

                  // Redirect to dashboard
                  window.location.href = 'dashboard.html';
            } else {
                  // Show error message
                  const errorText = document.getElementById('errorText') || document.getElementById('errorMessage');
                  if (document.getElementById('errorText')) {
                        document.getElementById('errorText').textContent = 'Invalid username or password. Please try again.';
                  } else {
                        errorMessage.textContent = 'Invalid username or password. Please try again.';
                  }
                  // Clear password field
                  document.getElementById('password').value = '';
            }
      });

      // Clear error message when user starts typing
      document.getElementById('username').addEventListener('input', () => {
            errorMessage.style.display = 'none';
      });

      document.getElementById('password').addEventListener('input', () => {
            errorMessage.style.display = 'none';
      });
});
