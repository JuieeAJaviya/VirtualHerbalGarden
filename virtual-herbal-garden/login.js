const leafContainer = document.querySelector('.leaf-container');
const leafEmojis = ["🍃", "🌿", "🍂", "🍁", "☘️"];

function createLeaf() {
    const leaf = document.createElement('div');
    leaf.classList.add('leaf');
    leaf.style.left = Math.random() * 100 + 'vw';
    leaf.style.animationDuration = Math.random() * 3 + 5 + 's';
    leaf.style.fontSize = Math.random() * 10 + 20 + 'px';
    leaf.textContent = leafEmojis[Math.floor(Math.random() * leafEmojis.length)];
    leafContainer.appendChild(leaf);

    setTimeout(() => {
        leaf.remove();
    }, 8000);
}

setInterval(createLeaf, 300);

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');

    // अगर यूजर पहले से लॉग्ड इन है तो डैशबोर्ड पर भेज दें
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.isLoggedIn) {
        window.location.replace('dashboard.html');
        return;
    }

    // लॉगिन फॉर्म सबमिशन हैंडल करें
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;

        // बेसिक वैलिडेशन
        if (!email || !password) {
            showError('कृपया सभी फील्ड भरें');
            return;
        }

        // ईमेल वैलिडेशन
        if (!isValidEmail(email)) {
            showError('कृपया वैध ईमेल एड्रेस डालें');
            return;
        }

        // रजिस्टर्ड यूजर्स से चेक करें
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            // लॉगिन सक्सेसफुल
            localStorage.setItem('currentUser', JSON.stringify({
                fullName: user.fullName,
                email: user.email,
                isLoggedIn: true,
                loginTime: new Date().toISOString()
            }));

            // सक्सेस मैसेज दिखाएं
            loginError.style.display = 'block';
            loginError.style.color = '#4CAF50';
            loginError.textContent = 'लॉगिन सफल! डैशबोर्ड पर रीडायरेक्ट कर रहे हैं...';

            // एनिमेटेड ट्रांजिशन के साथ डैशबोर्ड पर रीडायरेक्ट
            document.body.style.opacity = '0';
            setTimeout(() => {
                window.location.replace('dashboard.html');
            }, 1500);
        } else {
            // अगर ईमेल रजिस्टर्ड नहीं है तो रजिस्ट्रेशन पेज पर भेजें
            if (!users.some(u => u.email === email)) {
                showError('यह ईमेल रजिस्टर्ड नहीं है। कृपया पहले रजिस्टर करें।');
                setTimeout(() => {
                    window.location.replace('register.html');
                }, 2000);
            } else {
                // अगर ईमेल रजिस्टर्ड है लेकिन पासवर्ड गलत है
                showError('गलत पासवर्ड। कृपया दोबारा प्रयास करें।');
            }
        }
    });

    // एरर मैसेज दिखाने का फंक्शन
    function showError(message) {
        loginError.style.display = 'block';
        loginError.style.color = '#e74c3c';
        loginError.textContent = message;
    }

    // ईमेल वैलिडेशन फंक्शन
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // फॉलिंग लीव्स एनिमेशन
    const leafContainer = document.querySelector('.leaf-container');
    const leafEmojis = ['🌿', '🍃', '🍂', '🌱'];

    function createLeaf() {
        const leaf = document.createElement('div');
        leaf.className = 'leaf';
        leaf.textContent = leafEmojis[Math.floor(Math.random() * leafEmojis.length)];
        leaf.style.left = Math.random() * 100 + 'vw';
        leaf.style.animationDuration = Math.random() * 3 + 2 + 's';
        leaf.style.opacity = Math.random() * 0.5 + 0.5;
        leafContainer.appendChild(leaf);

        // लीफ को कुछ समय बाद हटा दें
        setTimeout(() => {
            leaf.remove();
        }, 5000);
    }

    // हर 300ms में एक नया लीफ बनाएं
    setInterval(createLeaf, 300);
});

document.getElementById('loginEmail').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('loginPassword').focus();
    }
});

document.getElementById('loginPassword').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('loginBtn').click();
    }
});
