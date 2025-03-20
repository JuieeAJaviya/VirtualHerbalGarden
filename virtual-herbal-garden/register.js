document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const registerError = document.getElementById('registerError');

    // अगर यूजर पहले से लॉग्ड इन है तो डैशबोर्ड पर भेज दें
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.isLoggedIn) {
        window.location.replace('dashboard.html');
        return;
    }

    // फॉर्म सबमिशन हैंडल करें
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('registerEmail').value.trim();
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // वैलिडेशन
        if (!fullName || !email || !password || !confirmPassword) {
            showError('कृपया सभी फील्ड भरें');
            return;
        }

        if (!isValidEmail(email)) {
            showError('कृपया वैध ईमेल एड्रेस डालें');
            return;
        }

        if (password.length < 6) {
            showError('पासवर्ड कम से कम 6 अक्षर का होना चाहिए');
            return;
        }

        if (password !== confirmPassword) {
            showError('पासवर्ड मैच नहीं कर रहे हैं');
            return;
        }

        // चेक करें कि ईमेल पहले से रजिस्टर्ड तो नहीं है
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.some(user => user.email === email)) {
            showError('यह ईमेल पहले से रजिस्टर्ड है');
            return;
        }

        // नया यूजर बनाएं
        const newUser = {
            fullName,
            email,
            password,
            registeredAt: new Date().toISOString()
        };

        // यूजर को लोकल स्टोरेज में सेव करें
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // सक्सेस मैसेज दिखाएं
        registerError.style.display = 'block';
        registerError.style.color = '#4CAF50';
        registerError.textContent = 'रजिस्ट्रेशन सफल! लॉगिन पेज पर रीडायरेक्ट कर रहे हैं...';

        // एनिमेटेड ट्रांजिशन के साथ लॉगिन पेज पर रीडायरेक्ट
        document.body.style.opacity = '0';
        setTimeout(() => {
            window.location.replace('login.html');
        }, 1500);
    });

    // एरर मैसेज दिखाने का फंक्शन
    function showError(message) {
        registerError.style.display = 'block';
        registerError.style.color = '#e74c3c';
        registerError.textContent = message;
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
