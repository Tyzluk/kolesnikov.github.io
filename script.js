// script.js - с улучшенной обработкой ошибок
document.addEventListener('DOMContentLoaded', function() {
    console.log('Script.js loaded');
    
    // Даем время на загрузку базы данных
    setTimeout(initializeApp, 100);
});

function initializeApp() {
    // Проверяем что база данных загрузилась
    if (typeof db === 'undefined') {
        console.error('Database not found!');
        showError('База данных не загружена');
        return;
    }

    // Проверяем что все методы существуют
    if (typeof db.getProjects !== 'function') {
        console.error('getProjects method missing!');
        showError('Метод getProjects не найден');
        return;
    }

    console.log('Database ready, initializing app...');
    
    updateAuthLink();
    loadProjects();
    setupContactForm();
}

// Обновление ссылки авторизации
function updateAuthLink() {
    const authLink = document.getElementById('authLink');
    if (!authLink) {
        console.log('Auth link not found');
        return;
    }

    try {
        const currentUser = db.getCurrentUser();
        
        if (currentUser) {
            authLink.textContent = 'Выйти (' + currentUser.name + ')';
            authLink.href = '#';
            authLink.onclick = function(e) {
                e.preventDefault();
                db.logout();
                window.location.reload();
            };
        } else {
            authLink.textContent = 'Войти';
            authLink.href = 'auth.html';
            authLink.onclick = null;
        }
    } catch (error) {
        console.error('Error in updateAuthLink:', error);
    }
}

// Загрузка проектов
function loadProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid) {
        console.log('Projects grid not found');
        return;
    }

    try {
        console.log('Loading projects...');
        const projects = db.getProjects();
        console.log('Projects loaded:', projects);

        if (projects.length === 0) {
            projectsGrid.innerHTML = '<p>Проекты не найдены</p>';
            return;
        }

        projectsGrid.innerHTML = projects.map(project => `
            <div class="project-card">
                <img src="https://www.edial.ru/wp-content/uploads/2020/06/WB.jpg" alt="${project.title}" style="width:30%; height:30%; object-fit:cover; border-radius:5px;">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="technologies">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
        `).join('');

        console.log('Projects rendered successfully');
    } catch (error) {
        console.error('Error loading projects:', error);
        projectsGrid.innerHTML = '<p>Ошибка загрузки проектов</p>';
    }
}

// Настройка формы контактов
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) {
        console.log('Contact form not found');
        return;
    }

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        try {
            const formData = new FormData(contactForm);
            const contact = {
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message')
            };

            db.addContact(contact);
            alert('✅ Сообщение отправлено! Спасибо за ваше обращение.');
            contactForm.reset();
        } catch (error) {
            console.error('Error sending contact:', error);
            alert('❌ Ошибка при отправке сообщения.');
        }
    });
}

// Показать ошибку
function showError(message) {
    console.error('App Error:', message);
    // Можно добавить отображение ошибки на странице
}
function loadPortfolioProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid) return;

    const projects = [
        {
            id: 1,
            title: "Веб-платформа для фотографов",
            description: "Социальная сеть для фотографов с возможностью публикации работ, заказа съёмок и общения с клиентами.",
            technologies: ["React", "Node.js", "MongoDB", "Express"],
            image: "https://picsum.photos/400/250?random=1",
            category: "web"
        },
        {
            id: 2, 
            title: "Мобильное приложение для трекинга задач",
            description: "Приложение для управления личными и рабочими задачами с синхронизацией между устройствами.",
            technologies: ["React Native", "Firebase", "Redux"],
            image: "https://picsum.photos/400/250?random=2",
            category: "mobile"
        },
        {
            id: 3,
            title: "Интернет-магазин современной техники",
            description: "Полнофункциональный магазин с системой рекомендаций, отзывами и быстрой оплатой.",
            technologies: ["Vue.js", "Laravel", "MySQL", "Stripe"],
            image: "https://picsum.photos/400/250?random=3", 
            category: "ecommerce"
        }
    ];

    projectsGrid.innerHTML = projects.map(project => `
        <div class="project-card">
            <img src="${project.image}" alt="${project.title}" class="project-image">
            <div class="project-content">
                <h3>${project.title}</h3>
                <p class="description">${project.description}</p>
                <div class="technologies">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="#" class="project-link primary">Демо</a>
                    <a href="#" class="project-link">GitHub</a>
                </div>
            </div>
        </div>
    `).join('');
}