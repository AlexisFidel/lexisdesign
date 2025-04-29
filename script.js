// Loader & AOS Initialization
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS después de que todo esté cargado
    window.addEventListener('load', function() {
        setTimeout(function() {
            const loader = document.getElementById('loader');
            if(loader) {
                loader.style.transition = 'opacity 0.5s ease-out';
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                    
                    // Inicializar AOS con mejores parámetros
                    if (typeof AOS !== 'undefined') {
                        AOS.init({
                            duration: 800,
                            easing: 'ease-in-out-quart',
                            once: true,
                            mirror: false,
                            offset: 120,
                            delay: 100
                        });
                    }
                }, 500);
            }
        }, 1500);
    });

    // Hamburguer Menu Toggle mejorado
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');
    
    if(hamburger && nav) {
        // Crear overlay dinámicamente
        const overlay = document.createElement('div');
        overlay.className = 'nav-overlay';
        document.body.appendChild(overlay);
        
        // Agregar índice a los enlaces para animación escalonada
        const navLinks = document.querySelectorAll('.nav a');
        navLinks.forEach((link, i) => {
            link.style.setProperty('--i', i);
        });
        
        hamburger.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.classList.toggle('active');
            this.setAttribute('aria-expanded', !isExpanded);
            nav.classList.toggle('active');
            overlay.classList.toggle('active');
            
            // Bloquear scroll cuando el menú está abierto
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });
        // Cerrar menú al hacer clic en overlay o enlace
        overlay.addEventListener('click', () => {
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            nav.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                nav.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Header scroll effect optimizado
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    function handleScroll() {
        const currentScroll = window.scrollY;
        
        if (currentScroll <= 0) {
            header.classList.remove('scrolled');
            return;
        }
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }
    
    // Usar requestAnimationFrame para mejor rendimiento
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Back to Top Button mejorado
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            backToTop.classList.toggle('active', window.scrollY > 300);
        });
        
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Contact Form Validation mejorado
    const contactForm = document.querySelector('.contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if(!name || !email || !message) {
                alert('Por favor complete todos los campos requeridos.');
                return;
            }
            
            // Simular envío (puedes reemplazar con fetch/AJAX)
            alert('¡Gracias por su mensaje! Nos pondremos en contacto pronto.');
            this.reset();
        });
    }

    // Demo Overlay optimizado
    const demoButtons = document.querySelectorAll('.btn-demo');
    const demoOverlay = document.getElementById('demoOverlay');
    const demoFrame = document.getElementById('demoFrame');
    const closeDemo = document.getElementById('closeDemo');
    const closeDemoBtn = document.getElementById('closeDemoBtn');

    function closeDemoHandler() {
        demoOverlay.classList.remove('active');
        setTimeout(() => {
            demoFrame.src = '';
            document.body.style.overflow = '';
        }, 300); // Esperar a que termine la transición
    }

    if (demoButtons.length && demoOverlay && demoFrame) {
        demoButtons.forEach(button => {
            button.addEventListener('click', function() {
                const demoUrl = this.getAttribute('data-demo-url');
                if(demoUrl) {
                    demoFrame.src = demoUrl;
                    demoOverlay.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });
    }

    if(closeDemo) closeDemo.addEventListener('click', closeDemoHandler);
    if(closeDemoBtn) closeDemoBtn.addEventListener('click', closeDemoHandler);

    if (demoOverlay) {
        demoOverlay.addEventListener('click', function(e) {
            if (e.target === demoOverlay) {
                closeDemoHandler();
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && demoOverlay && demoOverlay.classList.contains('active')) {
            closeDemoHandler();
        }
    });

    // Optimización para móviles: evitar zoom en inputs
    document.addEventListener('DOMContentLoaded', function() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            const viewport = document.querySelector('meta[name="viewport"]');
            if (viewport) {
                viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
            }
        }
    });

    // Precarga de imágenes críticas
    function preloadImages() {
        const images = ['images/hero.png', 'images/demo-1.png'];
        images.forEach(img => {
            const image = new Image();
            image.src = img;
        });
    }
    
    // Llamar a la precarga después de que todo lo crítico esté cargado
    setTimeout(preloadImages, 1000);
});