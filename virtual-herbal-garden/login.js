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

document.getElementById('loginBtn').addEventListener('click', function() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const errorDiv = document.getElementById('loginError');

    if (!email || !password) {
        errorDiv.textContent = 'Please fill in all fields.';
    } else if (!validateEmail(email)) {
        errorDiv.textContent = 'Please enter a valid email address.';
    } else {
        errorDiv.textContent = '';
        localStorage.setItem('isLoggedIn', true);
        window.location.href = 'dashboard.html';
    }
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

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}