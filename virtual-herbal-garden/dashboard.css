// लॉगिन स्टेटस चेक करने का फंक्शन
function checkLoginStatus() {
    try {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser || !currentUser.isLoggedIn) {
            window.location.replace('login.html');
            return false;
        }
        return true;
    } catch (error) {
        console.error('Error checking login status:', error);
        window.location.replace('login.html');
        return false;
    }
}

// पेज लोड होने से पहले लॉगिन चेक
if (!checkLoginStatus()) {
    throw new Error('Not logged in');
}

document.addEventListener('DOMContentLoaded', () => {
    // दोबारा लॉगिन चेक
    if (!checkLoginStatus()) return;

    // लॉगआउट बटन का इवेंट हैंडलर
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            try {
                // लोकल स्टोरेज से यूजर डेटा हटाएं
                localStorage.removeItem('currentUser');
                
                // एनिमेटेड ट्रांजिशन के साथ लॉगिन पेज पर रीडायरेक्ट
                document.body.style.opacity = '0';
                setTimeout(() => {
                    window.location.replace('login.html');
                }, 500);
            } catch (error) {
                console.error('Error during logout:', error);
                window.location.replace('login.html');
            }
        });
    }

    // सर्च फंक्शनैलिटी
    const searchInput = document.querySelector('.search-box input');
    const discoverBtn = document.querySelector('.discover-btn');

    if (searchInput && discoverBtn) {
        discoverBtn.addEventListener('click', () => {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                // यहाँ सर्च लॉजिक जोड़ें
                console.log('Searching for:', searchTerm);
            }
        });

        // एंटर की प्रेस करने पर भी सर्च करें
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                discoverBtn.click();
            }
        });
    }

    try {
        // यूजर का स्वागत मैसेज दिखाएं
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.email) {
            const welcomeMessage = document.createElement('div');
            welcomeMessage.classList.add('welcome-message');
            welcomeMessage.textContent = `स्वागत है, ${currentUser.email}`;
            const dashboardContent = document.querySelector('.dashboard-content');
            const searchContainer = document.querySelector('.search-container');
            if (dashboardContent && searchContainer) {
                dashboardContent.insertBefore(welcomeMessage, searchContainer);
            }
        }
    } catch (error) {
        console.error('Error displaying welcome message:', error);
    }

    // Add scroll animation class to all plant cards
    const plantCards = document.querySelectorAll('.plant-card');
    plantCards.forEach(card => {
        card.classList.add('scroll-animation');
    });

    // Function to check if element is in viewport
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    // Function to handle scroll animation
    const handleScrollAnimation = () => {
        const scrollAnimElements = document.querySelectorAll('.scroll-animation');
        scrollAnimElements.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('visible');
            }
        });
    };

    // Initial check for elements in viewport
    handleScrollAnimation();

    // Add scroll event listener
    window.addEventListener('scroll', handleScrollAnimation);
});
