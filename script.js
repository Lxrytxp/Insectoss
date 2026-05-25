const sliderWrapper = document.getElementById('sliderWrapper');
const prevBtn = document.getElementById('prevSliderBtn');
const nextBtn = document.getElementById('nextSliderBtn');
const dotsContainer = document.getElementById('sliderDots');

let currentIndex = 0;
let totalCards = 0;
let cardsPerView = 1;

function getCardsPerView() {
    if (window.innerWidth >= 768) {
        return 3; 
    } else {
        return 1; 
    }
}

function updateSlider() {
    if (!sliderWrapper) return;
    
    cardsPerView = getCardsPerView();
    totalCards = document.querySelectorAll('.featured-card').length;
    

    const totalPages = Math.ceil(totalCards / cardsPerView);
    const maxIndex = totalPages - 1;
    
    if (currentIndex > maxIndex) currentIndex = maxIndex;
    if (currentIndex < 0) currentIndex = 0;
    
    const cardWidth = document.querySelector('.featured-card')?.offsetWidth || 0;
    const gap = 20; 

    const translateX = -currentIndex * (cardWidth + gap) * cardsPerView;
    
    sliderWrapper.style.transform = `translateX(${translateX}px)`;
    
    updateDots();
}

function updateDots() {
    if (!dotsContainer) return;
    
    cardsPerView = getCardsPerView();
    totalCards = document.querySelectorAll('.featured-card').length;
    const totalDots = Math.ceil(totalCards / cardsPerView);
    
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalDots; i++) {
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
    cardsPerView = getCardsPerView();
    totalCards = document.querySelectorAll('.featured-card').length;
    const totalPages = Math.ceil(totalCards / cardsPerView);
    const maxIndex = totalPages - 1;
    
    if (currentIndex < maxIndex) {
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

window.addEventListener('resize', () => {
    updateSlider();
});

const observer = new ResizeObserver(() => {
    updateSlider();
});

const featuredCards = document.querySelectorAll('.featured-card');
featuredCards.forEach(card => observer.observe(card));

setTimeout(() => {
    updateSlider();
}, 100);

window.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const rememberMe = localStorage.getItem('rememberMe');
    
    if (isLoggedIn === 'true' && rememberMe === 'true') {
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
    }
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
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
        
        console.log(`Bienvenido ${email}`);
    } else {
        alert('Por favor completa todos los campos');
    }
});



const navInicio = document.getElementById('navInicio');
const navInfo = document.getElementById('navInfo');
const comencemosBtn = document.getElementById('comencemosBtn');
const heroSection = document.getElementById('heroSection');
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
    }, 100);
}

if (comencemosBtn) {
    comencemosBtn.addEventListener('click', mostrarInformacion);
}

// Eventos de navegación
if (navInicio) {
    navInicio.addEventListener('click', function(e) {
        e.preventDefault();
        mostrarInicio();
    });
}

if (navInfo) {
    navInfo.addEventListener('click', function(e) {
        e.preventDefault();
        mostrarInformacion();
    });
}

const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        logout();
    });
}


function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('rememberMe');
    sessionStorage.removeItem('isLoggedIn');
    location.reload();
}


const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        setTimeout(() => {
            mostrarInicio();
        }, 100);
    });
}



const venomCards = document.querySelectorAll('.venom-card');
if (venomCards.length > 0) {
    venomCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Pequeña vibración al pasar el mouse
            card.style.transform = 'scale(1.02)';
            card.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
        });
    });
}

const mortalBadges = document.querySelectorAll('.venom-badge');
if (mortalBadges.length > 0) {
    mortalBadges.forEach(badge => {
        if (badge.textContent.includes('MORTAL')) {
            const card = badge.closest('.venom-card');
            if (card) {
                card.addEventListener('click', () => {
                    const insectName = card.querySelector('.venom-card-front h3')?.textContent || 'Este insecto';
                    console.log(`⚠️ ADVERTENCIA: ${insectName} es extremadamente peligroso ⚠️`);
                });
            }
        }
    });
}

function mostrarEstadisticasVeneno() {
    const stats = {
        'Más peligroso': 'Hormiga Bala (dolor nivel 4+)',
        'Más mortal': 'Escorpión Amarillo',
        'Muerte por año': 'Más de 5,000 por escorpiones',
        'Tratamiento': 'Antiveneno específico para cada especie'
    };
    
    console.log('📊 ESTADÍSTICAS DE INSECTOS VENENOSOS:', stats);
}


const observerVenom = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
            const infoSection = document.getElementById('infoSection');
            if (infoSection && infoSection.style.display === 'block') {
                mostrarEstadisticasVeneno();
            }
        }
    });
});

const infoSectionVenom = document.getElementById('infoSection');
if (infoSectionVenom) {
    observerVenom.observe(infoSectionVenom, { attributes: true });
}

const carouselTrack = document.getElementById('carouselTrack');
const carouselPrevBtn = document.getElementById('carouselPrevBtn');
const carouselNextBtn = document.getElementById('carouselNextBtn');
const carouselDotsContainer = document.getElementById('carouselDots');

let carouselIndex = 0;
let carouselCards = [];
let carouselCardsPerView = 1;

function getCarouselCardsPerView() {
    if (window.innerWidth >= 768) {
        return 3;
    } else {
        return 1;
    }
}

function updateCarousel() {
    if (!carouselTrack) return;
    
    carouselCards = document.querySelectorAll('.carousel-card');
    carouselCardsPerView = getCarouselCardsPerView();
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
    const totalPages = Math.ceil(totalCards / carouselCardsPerView);
    const maxIndex = totalPages - 1;
    
    if (carouselIndex < maxIndex) {
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

window.addEventListener('resize', () => {
    updateCarousel();
});

const modal = document.getElementById('insectModal');
const closeModal = document.querySelector('.close-modal');
const modalCloseBtn = document.querySelector('.modal-close-btn');

function abrirModal(insectData) {
    document.getElementById('modalNombre').textContent = insectData.nombre;
    document.getElementById('modalHabitat').textContent = insectData.habitat;
    document.getElementById('modalCientifico').textContent = insectData.cientifico || 'No disponible';
    document.getElementById('modalDato').textContent = insectData.datoCurioso;
    
    // Cambiar el ícono según el insecto
    const iconElement = document.querySelector('.modal-insect-icon');
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
    iconElement.textContent = iconoElegido;
    
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
                const insectData = JSON.parse(insectDataAttr);
                abrirModal(insectData);
            } catch (error) {
                console.error('Error al parsear datos del insecto:', error);
            }
        }
    }
});

setTimeout(() => {
    updateCarousel();
}, 100);

document.querySelectorAll('.insect-item').forEach(item => {
    item.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');
        
        const column = this.closest('.comparison-column');
        const otherItems = column.querySelectorAll('.insect-item');
        
        otherItems.forEach(otherItem => {
            if (otherItem !== this && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
    });
});

const comparisonSection = document.querySelector('.comparison-section');
if (comparisonSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cards = document.querySelectorAll('.fact-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.transition = 'all 0.5s ease';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    }, index * 100);
                });
                observer.disconnect();
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(comparisonSection);
}