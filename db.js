// db.js - полная версия со всеми методами
class Database {
    constructor() {
        console.log('Database initialized');
        this.init();
    }

    init() {
        if (!localStorage.getItem('users')) {
            localStorage.setItem('users', JSON.stringify([]));
        }
        if (!localStorage.getItem('projects')) {
            const defaultProjects = [
                {
                    id: 1,
                    title: "Интернет-магазин",
                    description: "Полнофункциональный интернет-магазин с корзиной и оплатой",
                    technologies: ["HTML", "CSS", "JavaScript"],
                    image: "https://static.xway.ru/seo-wb/1-block/wb-logo.webp"
                },
                {
                    id: 2,
                    title: "Социальная сеть",
                    description: "Социальная платформа для общения и обмена контентом",
                    technologies: ["React", "Node.js", "MongoDB"],
                    image: "https://www.edial.ru/wp-content/uploads/2020/06/WB.jpg"
                },
                {
                    id: 3,
                    title: "Мобильное приложение",
                    description: "Кроссплатформенное мобильное приложение",
                    technologies: ["React Native", "Firebase"],
                    image: "https://www.edial.ru/wp-content/uploads/2020/06/WB.jpg"
                }
            ];
            localStorage.setItem('projects', JSON.stringify(defaultProjects));
        }
        if (!localStorage.getItem('contacts')) {
            localStorage.setItem('contacts', JSON.stringify([]));
        }
    }

    // === МЕТОДЫ ДЛЯ ПОЛЬЗОВАТЕЛЕЙ ===
    getUsers() {
        return JSON.parse(localStorage.getItem('users')) || [];
    }

    registerUser(userData) {
        const users = this.getUsers();
        const existingUser = users.find(user => user.email === userData.email);
        if (existingUser) throw new Error('Пользователь с таким email уже существует');

        const user = { 
            id: Date.now(), 
            name: userData.name,
            email: userData.email,
            password: userData.password,
            createdAt: new Date().toISOString() 
        };
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        return user;
    }

    loginUser(email, password) {
        const users = this.getUsers();
        const user = users.find(u => u.email === email && u.password === password);
        if (!user) throw new Error('Неверный email или пароль');
        return user;
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('currentUser'));
    }

    setCurrentUser(user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
    }

    logout() {
        localStorage.removeItem('currentUser');
    }

    // === МЕТОДЫ ДЛЯ ПРОЕКТОВ ===
    getProjects() {
        const projects = JSON.parse(localStorage.getItem('projects')) || [];
        console.log('Loading projects:', projects.length);
        return projects;
    }

    addProject(project) {
        const projects = this.getProjects();
        project.id = Date.now();
        projects.push(project);
        localStorage.setItem('projects', JSON.stringify(projects));
        return project;
    }

    // === МЕТОДЫ ДЛЯ КОНТАКТОВ ===
    addContact(contact) {
        const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        contact.id = Date.now();
        contact.createdAt = new Date().toISOString();
        contacts.push(contact);
        localStorage.setItem('contacts', JSON.stringify(contacts));
        return contact;
    }

    getContacts() {
        return JSON.parse(localStorage.getItem('contacts')) || [];
    }
}

// Создаем глобальный экземпляр базы данных
const db = new Database();