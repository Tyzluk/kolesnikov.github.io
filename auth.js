// auth.js - исправленная рабочая версия
document.addEventListener('DOMContentLoaded', function() {
    console.log('Auth.js loaded!');
    
    // Инициализация табов
    initTabs();
    
    // Настройка обработчиков форм
    setupForms();
});

// Инициализация переключения табов
function initTabs() {
    const loginTab = document.querySelector('[data-tab="login"]');
    const registerTab = document.querySelector('[data-tab="register"]');
    
    console.log('Tabs found:', loginTab, registerTab);
    
    if (loginTab) {
        loginTab.addEventListener('click', function() {
            switchToTab('login');
        });
    }
    
    if (registerTab) {
        registerTab.addEventListener('click', function() {
            switchToTab('register');
        });
    }
}

// Переключение на конкретный таб
function switchToTab(tabName) {
    console.log('Switching to tab:', tabName);
    
    // Убрать активные классы со всех кнопок
    const allTabs = document.querySelectorAll('.tab-btn');
    allTabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Скрыть все формы
    const allForms = document.querySelectorAll('.auth-form');
    allForms.forEach(form => {
        form.classList.remove('active');
    });
    
    // Активировать выбранную кнопку
    const activeTab = document.querySelector('[data-tab="${tabName}"]');
    if (activeTab) {
        activeTab.classList.add('active');
    }
    
    // Показать выбранную форму
    const activeForm = document.getElementById(tabName + 'Form');
    if (activeForm) {
        activeForm.classList.add('active');
    }
}

// Настройка обработчиков форм
function setupForms() {
    // Форма входа
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }
    
    // Форма регистрации
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleRegister();
        });
    }
}

// Обработка входа
function handleLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    console.log('Login attempt:', email);
    
    if (!email || !password) {
        showMessage('Заполните все поля', 'error');
        return;
    }
    
    try {
        const user = db.loginUser(email, password);
        db.setCurrentUser(user);
        showMessage('✅ Вход успешен! Перенаправляем...', 'success');
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    } catch (error) {
        showMessage('❌ ' + error.message, 'error');
    }
}

// Обработка регистрации
function handleRegister() {
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    
    console.log('Register attempt:', name, email);
    
    if (!name || !email || !password) {
        showMessage('Заполните все поля', 'error');
        return;
    }
    
    if (password.length < 6) {
        showMessage('Пароль должен быть не менее 6 символов', 'error');
        return;
    }
    
    try {
        const userData = { 
            name: name, 
            email: email, 
            password: password 
        };
        const user = db.registerUser(userData);
        showMessage('✅ Регистрация успешна! Теперь войдите в аккаунт.', 'success');
        
        // Очищаем форму и переключаем на вход
        document.getElementById('registerForm').reset();
        setTimeout(() => {
            switchToTab('login');
        }, 2000);
    } catch (error) {
        showMessage('❌ ' + error.message, 'error');
    }
}

// Показать сообщение
function showMessage(text, type) {
    const messageDiv = document.getElementById('authMessage');
    if (messageDiv) {
        messageDiv.textContent = text;
        messageDiv.className = 'message' + {type};
        
        setTimeout(() => {
            messageDiv.textContent = '';
            messageDiv.className = 'message';
        }, 5000);
    }
}