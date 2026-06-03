const sliderWrapper = document.getElementById('sliderWrapper');
const prevBtn = document.getElementById('prevSliderBtn');
const nextBtn = document.getElementById('nextSliderBtn');
const dotsContainer = document.getElementById('sliderDots');

let currentIndex = 0;

function getCardsPerView() {
    return window.innerWidth >= 768 ? 3 : 1;
}

function updateSlider() {
    if (!sliderWrapper) return;

    const cardsPerView = getCardsPerView();
    const totalCards = document.querySelectorAll('.featured-card').length;
    const totalPages = Math.ceil(totalCards / cardsPerView);
    const maxIndex = totalPages - 1;

    if (currentIndex > maxIndex) currentIndex = maxIndex;
    if (currentIndex < 0) currentIndex = 0;

    const cardWidth = document.querySelector('.featured-card')?.offsetWidth || 0;
    const gap = 20;
    const translateX = -currentIndex * (cardWidth + gap) * cardsPerView;

    sliderWrapper.style.transform = `translateX(${translateX}px)`;
    updateDots(totalPages, cardsPerView);
}

function updateDots(totalPages, cardsPerView) {
    if (!dotsContainer) return;

    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === currentIndex) dot.classList.add('active');
        dot.addEventListener('click', () => {
            currentIndex = i;
            updateSlider();
        });
        dotsContainer.appendChild(dot);
    }
}

function nextSlide() {
    const cardsPerView = getCardsPerView();
    const totalCards = document.querySelectorAll('.featured-card').length;
    const totalPages = Math.ceil(totalCards / cardsPerView);
    if (currentIndex < totalPages - 1) {
        currentIndex++;
        updateSlider();
    }
}

function prevSlide() {
    if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
    }
}

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
}

window.addEventListener('resize', updateSlider);

const featuredCards = document.querySelectorAll('.featured-card');
const resizeObserver = new ResizeObserver(updateSlider);
featuredCards.forEach(card => resizeObserver.observe(card));

setTimeout(updateSlider, 100);

// ============ LOGIN / LOGOUT ============
window.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const rememberMe = localStorage.getItem('rememberMe');

    if (isLoggedIn === 'true' && rememberMe === 'true') {
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
        setTimeout(updateSlider, 150);
        setTimeout(updateCarousel, 150);
    }
});

document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    if (email && password) {
        localStorage.setItem('isLoggedIn', 'true');
        if (rememberMe) {
            localStorage.setItem('rememberMe', 'true');
            localStorage.setItem('userEmail', email);
        } else {
            localStorage.setItem('rememberMe', 'false');
            sessionStorage.setItem('isLoggedIn', 'true');
        }

        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';

        setTimeout(updateSlider, 150);
        setTimeout(updateCarousel, 150);
    } else {
        alert('Por favor completa todos los campos');
    }
});

const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', function (e) {
        e.preventDefault();
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('rememberMe');
        sessionStorage.removeItem('isLoggedIn');
        location.reload();
    });
}

// ============ NAVEGACIÓN ============
const navInicio = document.getElementById('navInicio');
const navInfo = document.getElementById('navInfo');
const comencemosBtn = document.getElementById('comencemosBtn');
const heroSection = document.querySelector('.hero');
const infoSection = document.getElementById('infoSection');

function mostrarInicio() {
    if (heroSection) heroSection.style.display = 'flex';
    if (infoSection) infoSection.style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function mostrarInformacion() {
    if (heroSection) heroSection.style.display = 'none';
    if (infoSection) infoSection.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
        currentIndex = 0;
        updateSlider();
        carouselIndex = 0;
        updateCarousel();
    }, 100);
}

if (comencemosBtn) comencemosBtn.addEventListener('click', mostrarInformacion);

if (navInicio) navInicio.addEventListener('click', function (e) {
    e.preventDefault();
    mostrarInicio();
});

if (navInfo) navInfo.addEventListener('click', function (e) {
    e.preventDefault();
    mostrarInformacion();
});

const carouselTrack = document.getElementById('carouselTrack');
const carouselPrevBtn = document.getElementById('carouselPrevBtn');
const carouselNextBtn = document.getElementById('carouselNextBtn');
const carouselDotsContainer = document.getElementById('carouselDots');

let carouselIndex = 0;

function getCarouselCardsPerView() {
    return window.innerWidth >= 768 ? 3 : 1;
}

function updateCarousel() {
    if (!carouselTrack) return;

    const carouselCards = document.querySelectorAll('.carousel-card');
    const carouselCardsPerView = getCarouselCardsPerView();
    const totalCards = carouselCards.length;
    const totalPages = Math.ceil(totalCards / carouselCardsPerView);
    const maxIndex = totalPages - 1;

    if (carouselIndex > maxIndex) carouselIndex = maxIndex;
    if (carouselIndex < 0) carouselIndex = 0;

    const cardWidth = carouselCards[0]?.offsetWidth || 0;
    const gap = 20;
    const translateX = -carouselIndex * (cardWidth + gap) * carouselCardsPerView;

    carouselTrack.style.transform = `translateX(${translateX}px)`;
    updateCarouselDots(totalPages);
}

function updateCarouselDots(totalPages) {
    if (!carouselDotsContainer) return;

    carouselDotsContainer.innerHTML = '';
    for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (i === carouselIndex) dot.classList.add('active');
        dot.addEventListener('click', () => {
            carouselIndex = i;
            updateCarousel();
        });
        carouselDotsContainer.appendChild(dot);
    }
}

function nextCarousel() {
    const totalCards = document.querySelectorAll('.carousel-card').length;
    const totalPages = Math.ceil(totalCards / getCarouselCardsPerView());
    if (carouselIndex < totalPages - 1) {
        carouselIndex++;
        updateCarousel();
    }
}

function prevCarousel() {
    if (carouselIndex > 0) {
        carouselIndex--;
        updateCarousel();
    }
}

if (carouselPrevBtn && carouselNextBtn) {
    carouselPrevBtn.addEventListener('click', prevCarousel);
    carouselNextBtn.addEventListener('click', nextCarousel);
}

window.addEventListener('resize', updateCarousel);
setTimeout(updateCarousel, 100);

// ============ MODAL ============
const modal = document.getElementById('insectModal');
const closeModal = document.querySelector('.close-modal');
const modalCloseBtn = document.querySelector('.modal-close-btn');

function abrirModal(insectData) {
    document.getElementById('modalNombre').textContent = insectData.nombre;
    document.getElementById('modalHabitat').textContent = insectData.habitat;
    document.getElementById('modalCientifico').textContent = insectData.cientifico || 'No disponible';
    document.getElementById('modalDato').textContent = insectData.datoCurioso;

    const iconos = {
        'Mariposa': '🦋',
        'Escarabajo': '🐞',
        'Mantis': '🦗',
        'Libélula': '🐉',
        'Hormiga': '🐜'
    };

    let iconoElegido = '🦋';
    for (const [key, value] of Object.entries(iconos)) {
        if (insectData.nombre.includes(key)) {
            iconoElegido = value;
            break;
        }
    }
    document.querySelector('.modal-insect-icon').textContent = iconoElegido;
    modal.style.display = 'flex';
}

function cerrarModal() {
    modal.style.display = 'none';
}

if (closeModal) closeModal.addEventListener('click', cerrarModal);
if (modalCloseBtn) modalCloseBtn.addEventListener('click', cerrarModal);

window.addEventListener('click', (e) => {
    if (e.target === modal) cerrarModal();
});

document.addEventListener('click', (e) => {
    const card = e.target.closest('.carousel-card');
    if (card) {
        const insectDataAttr = card.getAttribute('data-insect');
        if (insectDataAttr) {
            try {
                abrirModal(JSON.parse(insectDataAttr));
            } catch (error) {
                console.error('Error al parsear datos del insecto:', error);
            }
        }
    }
});

document.querySelectorAll('.insect-item').forEach(item => {
    item.addEventListener('click', function (e) {
        e.stopPropagation();
        const isActive = this.classList.contains('active');

        const column = this.closest('.comparison-column');
        column.querySelectorAll('.insect-item').forEach(other => other.classList.remove('active'));

        if (!isActive) this.classList.add('active');
    });
});

// Animación de fact-cards al entrar en vista
const comparisonSection = document.querySelector('.comparison-section');
if (comparisonSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.fact-card').forEach((card, index) => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.transition = 'all 0.5s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100 + 50);
                });
                observer.disconnect();
            }
        });
    }, { threshold: 0.3 });

    observer.observe(comparisonSection);
}

function actualizarFechaHora() {
    const ahora = new Date();
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const dia = dias[ahora.getDay()];
    const fecha = ahora.getDate().toString().padStart(2, '0');
    const mes = (ahora.getMonth() + 1).toString().padStart(2, '0');
    const anio = ahora.getFullYear();
    let horas = ahora.getHours();
    const minutos = ahora.getMinutes().toString().padStart(2, '0');
    const ampm = horas >= 12 ? 'p.m.' : 'a.m.';
    horas = horas % 12 || 12;
    const elemento = document.getElementById('fechaHora');
    if (elemento) elemento.textContent = `${dia} ${fecha}/${mes}/${anio} ${horas}:${minutos} ${ampm}`;
}

actualizarFechaHora();
setInterval(actualizarFechaHora, 60000);