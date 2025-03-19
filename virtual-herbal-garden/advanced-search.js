document.addEventListener('DOMContentLoaded', () => {
    // Advanced search functionality
    const advancedSearchBtn = document.querySelector('.advanced-search-btn');
    
    advancedSearchBtn.addEventListener('click', () => {
        // Collect all filter values
        const filters = {
            name: document.querySelector('input[name="plant-name"]').value,
            category: document.querySelector('select[name="category"]').value,
            properties: document.querySelector('select[name="properties"]').value
        };

        // Perform advanced search
        console.log('Advanced search with filters:', filters);
        // Add your advanced search logic here
    });

    // Logout functionality
    document.getElementById('logoutBtn').addEventListener('click', () => {
        window.location.href = 'login.html';
    });
});