const modeToggle = document.getElementById('mode-toggle');
const toggleButton = document.getElementById('toggle-button');
const toggleIcon = document.getElementById('toggle-icon');

const setDarkMode = () => {
    document.documentElement.style.setProperty('--bg-color', '#222');
    document.documentElement.style.setProperty('--text-color', '#fff');
    localStorage.setItem('theme', 'dark');
    toggleIcon.classList.add('moon');
    toggleIcon.classList.remove('sun');
};

const setLightMode = () => {
    document.documentElement.style.setProperty('--bg-color', '#fff');
    document.documentElement.style.setProperty('--text-color', '#222');
    localStorage.setItem('theme', 'light');
    toggleIcon.classList.add('sun');
    toggleIcon.classList.remove('moon');
};

const toggleMode = () => {
    const currentMode = localStorage.getItem('theme') || 'light';
    if (currentMode === 'light') {
        setDarkMode();
    } else {
        setLightMode();
    }
};

toggleButton.addEventListener('click', toggleMode);

document.addEventListener('DOMContentLoaded', () => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
        setDarkMode();
    } else {
        setLightMode();
    }
});

const fetchLoginData = async () => {
    try {
        const response = await fetch('/user.json');
        const data = await response.json();
        const username = data.user1.username;
        const password = data.user1.password;
        const role = data.user1.role;

        const enteredUsername = document.getElementById('username').value;
        const enteredPassword = document.getElementById('password').value;
        if (enteredUsername === username && enteredPassword === password) {
            document.cookie = `user=${username}; pass=${password}; role=${role};`;
            window.location.href = '/user/dashboard.html';
        } else {
            console.log('Invalid username or password.');
            alert('Invalid username or password. Please try again.');
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
};

const loginForm = document.querySelector('form');
if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        fetchLoginData();
    });
} else {
    console.error('Login form element not found.');
}
