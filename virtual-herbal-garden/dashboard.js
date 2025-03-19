// Check login status
if (!localStorage.getItem('isLoggedIn')) {
    window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', () => {
    // Search functionality
    const searchBtn = document.querySelector('.discover-btn');
    const searchInput = document.querySelector('.search-box input');

    searchBtn.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            console.log('Searching for:', searchTerm);
            // Add your search logic here
        } else {
            alert('Please enter a plant name');
        }
    });

    // Logout functionality
    document.getElementById('logoutBtn').addEventListener('click', function() {
        localStorage.removeItem('isLoggedIn');
        window.location.href = 'login.html';
    });
});