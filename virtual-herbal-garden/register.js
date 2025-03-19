document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('registerBtn').addEventListener('click', function() {
        const name = document.getElementById('registerName').value.trim();
        const email = document.getElementById('registerEmail').value.trim();
        const password = document.getElementById('registerPassword').value.trim();
        const errorDiv = document.getElementById('registerError');

        if (!name || !email || !password) {
            errorDiv.textContent = 'Please fill in all fields.';
        } else if (!validateEmail(email)) {
            errorDiv.textContent = 'Please enter a valid email address.';
        } else {
            errorDiv.textContent = '';
            localStorage.setItem('isLoggedIn', true);
            window.location.href = 'dashboard.html';
        }
    });

    document.getElementById('registerName').addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            document.getElementById('registerEmail').focus();
        }
    });

    document.getElementById('registerEmail').addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            document.getElementById('registerPassword').focus();
        }
    });

    document.getElementById('registerPassword').addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            document.getElementById('registerBtn').click();
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});