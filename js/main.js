// ===== PORTFOLIO UI =====

let currentSlide = 0;

const testimonials = [

    {
        author: "Michael Kania, CEO",
        company: "dytab GmbH (Germany) • November 2024",
        text: `Ms. Aissa was always an extremely motivated employee. She approached difficult tasks with great enthusiasm and always found sensible and practicable solutions. She was extremely reliable and her working style was always characterized by very careful planning and a systematic approach. Even when the workload was very high, Ms. Aissa proved to be a resilient employee and went above and beyond the call of duty.`
    },
    {
        author: "Michael Kania, CEO",
        company: "dytab GmbH (Germany) • November 2024",
        text: `Frau Aissa war eine stets äußerst motivierte Mitarbeiterin (Praktikantin). Schwierige Aufgaben ging sie mit großem Elan an und fand dabei immer sinnvolle und praktikable Lösungen. Sie war äußerst zuverlässig, und ihr Arbeitsstil war stets geprägt durch sehr sorgfältige Planung und Systematik. Auch bei sehr hohem Arbeitsanfall erwies sich Frau Aissa als belastbare Mitarbeiterin und ging überlegt, ruhig und zielorientiert vor. Ihre Arbeitsergebnisse waren, auch bei wechselnden Anforderungen und unter sehr schwierigen Bedingungen, stets von sehr guter Qualität. Frau Aissa hat unsere Erwartungen stets in jeder Hinsicht erfüllt. Wir waren mit ihren Leistungen jederzeit äußerst zufrieden. Gegenüber Vorgesetzten und Mitarbeitern verhielt Frau Aissa sich stets vorbildlich. Sie trug zu einer hervorragenden und effizienten Teamarbeit bei. Wir schätzen ihre Leistungen sehr und wünschen ihr für die berufliche und persönliche Zukunft viel Erfolg.`
    }, {
        author: "Salah Sammari, CEO",
        company: "Tradrly (Tunisia) • February 2026",
        text: `Ms. Mariem Aissa has worked with us at Tradrly as a Data Scientist for a period of 10 months.
During this time, she demonstrated strong technical skills, professionalism, and a high level of commitment to her work.
She has been involved in developing data-driven solutions, working with machine learning models, and contributing to various projects that required analytical thinking and problem-solving abilities.
Her capacity to quickly understand complex concepts and transform them into practical solutions has been highly valuable to our team.
In addition to her technical expertise, Ms. Mariem Aissa is a reliable and collaborative team member.
She communicates effectively, adapts well to challenges, and consistently meets deadlines.
Based on her performance and dedication, I strongly recommend Ms. Mariem Aissa for any opportunity in the field of Data Science.
I am confident that she will be a valuable asset to any organization.`
    },
];

function applyTheme(theme) {
    const root = document.documentElement;
    const sunIcon = document.getElementById('sunIcon');
    const moonIcon = document.getElementById('moonIcon');

    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    if (sunIcon) sunIcon.style.display = theme === 'dark' ? 'none' : 'block';
    if (moonIcon) moonIcon.style.display = theme === 'dark' ? 'block' : 'none';
}

function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    if (!themeToggle) return;
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
}

function openTestimonialModal(index) {
    const item = testimonials[index];
    const overlay = document.getElementById('tmOverlay');
    const author = document.getElementById('tmAuthor');
    const company = document.getElementById('tmCompany');
    const fullText = document.getElementById('tmFullText');

    if (!item || !overlay || !author || !company || !fullText) return;

    author.textContent = item.author;
    company.textContent = item.company;
    fullText.textContent = item.text;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeTMModal() {
    const overlay = document.getElementById('tmOverlay');
    if (!overlay) return;
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

function goToSlide(index) {
    const track = document.getElementById('testimonialsTrack');
    const dots = document.querySelectorAll('.t-dot');
    const slides = document.querySelectorAll('#testimonialsTrack .testimonial-card');

    if (!track || !slides.length) return;

    currentSlide = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
}

function moveSlider(direction) {
    const slides = document.querySelectorAll('#testimonialsTrack .testimonial-card');
    if (!slides.length) return;
    goToSlide(currentSlide + direction);
}

function openBridgSignModal() {
    const modal = document.getElementById('bridgSignModal');
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeBridgSignModal() {
    const modal = document.getElementById('bridgSignModal');
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
    document.querySelectorAll('.bs-video').forEach(video => video.pause());
}

function handleBSOverlayClick(event) {
    const modal = document.getElementById('bridgSignModal');
    if (event.target === modal) closeBridgSignModal();
}

function switchBSTab(tab, btn) {
    document.querySelectorAll('.bs-video').forEach(video => video.pause());
    document.querySelectorAll('.bs-tab').forEach(item => item.classList.remove('active'));
    document.querySelectorAll('.bs-panel').forEach(panel => panel.classList.remove('active'));

    if (btn) btn.classList.add('active');
    const targetPanel = document.getElementById(`bs-panel-${tab}`);
    if (targetPanel) targetPanel.classList.add('active');
}

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (event) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;

            const target = document.querySelector(href);
            if (!target) return;

            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    document.querySelectorAll('.experience-card, .education-card, .project-card, .skill-category, .contact-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

function initContactCards() {
    document.querySelectorAll('.contact-card').forEach(card => {
        card.addEventListener('click', function (event) {
            const href = this.getAttribute('href');
            if (!href) return;
            if (href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('/cdn-cgi/')) return;
            event.preventDefault();
            window.open(href, '_blank', 'noopener');
        });
    });
}

function initKeyboardShortcuts() {
    document.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape') return;
        closeTMModal();
        closeBridgSignModal();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initSmoothScrolling();
    initAnimations();
    initContactCards();
    goToSlide(0);
    initKeyboardShortcuts();
});

window.openTestimonialModal = openTestimonialModal;
window.closeTMModal = closeTMModal;
window.goToSlide = goToSlide;
window.moveSlider = moveSlider;
window.openBridgSignModal = openBridgSignModal;
window.closeBridgSignModal = closeBridgSignModal;
window.handleBSOverlayClick = handleBSOverlayClick;
window.switchBSTab = switchBSTab;
