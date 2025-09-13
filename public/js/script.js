/**
 * ========================================
 * PORTFÓLIO MELCHISEDEK - SCRIPT OTIMIZADO
 * ========================================
 * Versão: 2.0.0
 * Autor: Melchisedek Lima
 * Descrição: Script principal com funcionalidades otimizadas
 */

// ========================================
// CONFIGURAÇÕES E CONSTANTES
// ========================================

const CONFIG = {
    animationDelay: 150,
    modalTransition: 300,
    debounceDelay: 300,
    apiEndpoints: {
        submitForm: '/submit_form'
    },
    selectors: {
        year: '#year',
        navToggle: '.nav-toggle',
        navList: '.nav-list',
        navLinks: '.nav-link',
        stacksSection: '#stacks',
        progressBars: '.progress-fill',
        contactForm: '.contact-form',
        successModal: '#success-modal',
        closeButton: '.close-button'
    },
    classes: {
        active: 'active',
        visible: 'visible',
        loading: 'loading',
        error: 'error'
    }
};

// ========================================
// UTILITÁRIOS
// ========================================

const Utils = {
    // Debounce para otimizar eventos
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle para limitar execuções
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Verificar se elemento está visível
    isElementVisible(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // Animar elemento quando entra na viewport
    animateOnScroll(element, animationClass = 'fade-in') {
        // Verificar se IntersectionObserver está disponível
        if (!('IntersectionObserver' in window)) {
            // Fallback: adicionar classe diretamente
            element.classList.add(animationClass);
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(animationClass);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(element);
    },

    // Validar email
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    // Sanitizar input
    sanitizeInput(input) {
        return input.trim().replace(/[<>]/g, '');
    }
};

// ========================================
// GERENCIADOR DE ESTADO
// ========================================

const StateManager = {
    state: {
        isMenuOpen: false,
        isFormSubmitting: false,
        isModalOpen: false
    },

    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.notifyListeners();
    },

    listeners: [],

    subscribe(callback) {
        this.listeners.push(callback);
    },

    notifyListeners() {
        this.listeners.forEach(callback => callback(this.state));
    }
};

// ========================================
// GERENCIADOR DE PERFORMANCE
// ========================================

const PerformanceManager = {
    // Lazy loading de imagens
    initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                        }
                        observer.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback para navegadores antigos
            document.querySelectorAll('img[data-src]').forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                }
            });
        }
    },

    // Preload de recursos críticos
    preloadCriticalResources() {
        const criticalResources = [
            'css/style.css',
            'js/script.js'
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            link.as = resource.endsWith('.css') ? 'style' : 'script';
            document.head.appendChild(link);
        });
    },

    // Otimizar animações
    optimizeAnimations() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.style.setProperty('--transition-fast', '0.01ms');
            document.documentElement.style.setProperty('--transition-normal', '0.01ms');
            document.documentElement.style.setProperty('--transition-slow', '0.01ms');
        }
    }
};

// ========================================
// GERENCIADOR DE NAVEGAÇÃO
// ========================================

const NavigationManager = {
    init() {
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupActiveNavigation();
    },

    setupMobileMenu() {
        const navToggle = document.querySelector(CONFIG.selectors.navToggle);
        const navList = document.querySelector(CONFIG.selectors.navList);

        if (!navToggle || !navList) {
            return;
        }

        navToggle.addEventListener('click', () => {
            const isOpen = StateManager.state.isMenuOpen;
            StateManager.setState({ isMenuOpen: !isOpen });

            navToggle.classList.toggle(CONFIG.classes.active);
            navList.classList.toggle(CONFIG.classes.active);

            // Acessibilidade
            navToggle.setAttribute('aria-expanded', !isOpen);
        });

        // Fechar menu ao clicar em link
        document.querySelectorAll(CONFIG.selectors.navLinks).forEach(link => {
            link.addEventListener('click', () => {
                StateManager.setState({ isMenuOpen: false });
                navToggle.classList.remove(CONFIG.classes.active);
                navList.classList.remove(CONFIG.classes.active);
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    },

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();

                const targetId = anchor.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    },

    setupActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll(CONFIG.selectors.navLinks);

        const updateActiveNav = Utils.throttle(() => {
            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                if (window.scrollY >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove(CONFIG.classes.active);
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add(CONFIG.classes.active);
                }
            });
        }, 100);

        window.addEventListener('scroll', updateActiveNav);
    }
};

// ========================================
// GERENCIADOR DE ANIMAÇÕES
// ========================================

const AnimationManager = {
    init() {
        this.setupProgressBars();
        this.setupScrollAnimations();
    },

    setupProgressBars() {
        // Função removida - não há mais barras de progresso na nova seção de stacks
        // As animações agora são feitas via CSS com hover effects nos ícones
    },

    animateProgressBars() {
        // Função removida - não há mais barras de progresso na nova seção de stacks
    },

    setupScrollAnimations() {
        const animatedElements = document.querySelectorAll('.project-card, .stack-category, .info-block');

        // Verificar se IntersectionObserver está disponível
        if (!('IntersectionObserver' in window)) {
            // Fallback: adicionar classe diretamente
            animatedElements.forEach(element => {
                element.classList.add('fade-in-up');
            });
            return;
        }

        animatedElements.forEach(element => {
            Utils.animateOnScroll(element, 'fade-in-up');
        });
    }
};

// ========================================
// GERENCIADOR DE FORMULÁRIO
// ========================================

const FormManager = {
    init() {
        this.setupFormValidation();
        this.setupFormSubmission();
    },

    setupFormValidation() {
        const form = document.querySelector(CONFIG.selectors.contactForm);
        if (!form) {
            return;
        }

        const inputs = form.querySelectorAll('input, textarea');

        inputs.forEach(input => {
            // Validação em tempo real
            input.addEventListener('blur', () => {
                this.validateField(input);
            });

            // Limpar erros ao digitar
            input.addEventListener('input', () => {
                this.clearFieldError(input);
            });
        });
    },

    validateField(field) {
        const value = Utils.sanitizeInput(field.value);
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        // Validação específica por campo
        switch (fieldName) {
        case 'name':
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Nome deve ter pelo menos 2 caracteres';
            }
            break;
        case 'email':
            if (!Utils.isValidEmail(value)) {
                isValid = false;
                errorMessage = 'Por favor, insira um email válido';
            }
            break;
        case 'message':
            if (value.length < 10) {
                isValid = false;
                errorMessage = 'Mensagem deve ter pelo menos 10 caracteres';
            }
            break;
        default:
            // Campo não reconhecido
            break;
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        } else {
            this.clearFieldError(field);
        }

        return isValid;
    },

    showFieldError(field, message) {
        this.clearFieldError(field);

        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.id = `${field.name}-error`;

        field.parentNode.appendChild(errorElement);
        field.classList.add(CONFIG.classes.error);
        field.setAttribute('aria-invalid', 'true');
    },

    clearFieldError(field) {
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }

        field.classList.remove(CONFIG.classes.error);
        field.removeAttribute('aria-invalid');
    },

    async setupFormSubmission() {
        const form = document.querySelector(CONFIG.selectors.contactForm);
        if (!form) {
            return;
        }

        form.addEventListener('submit', async(e) => {
            e.preventDefault();

            if (StateManager.state.isFormSubmitting) {
                return;
            }

            // Validação completa
            const inputs = form.querySelectorAll('input, textarea');
            let isFormValid = true;

            inputs.forEach(input => {
                if (!this.validateField(input)) {
                    isFormValid = false;
                }
            });

            if (!isFormValid) {
                NotificationManager.showNotification('Por favor, corrija os erros no formulário', 'error');
                return;
            }

            await this.submitForm(form);
        });
    },

    async submitForm(form) {
        StateManager.setState({ isFormSubmitting: true });

        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;

        // Mostrar estado de loading
        this.showLoadingState(submitButton);

        try {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            const response = await fetch(CONFIG.apiEndpoints.submitForm, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                ModalManager.showModal();
                form.reset();
                NotificationManager.showNotification('Mensagem enviada com sucesso!', 'success');
            } else {
                const errorText = await response.text();
                throw new Error(errorText || 'Erro no servidor');
            }

        } catch (error) {
            console.error('Erro ao enviar formulário:', error);
            NotificationManager.showNotification('Erro ao enviar mensagem. Tente novamente.', 'error');
        } finally {
            this.hideLoadingState(submitButton, originalText);
            StateManager.setState({ isFormSubmitting: false });
        }
    },

    showLoadingState(button) {
        button.disabled = true;
        button.classList.add(CONFIG.classes.loading);
        button.innerHTML = `
            <span class="btn-loading">
                <i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Enviando...
            </span>
        `;
    },

    hideLoadingState(button, originalText) {
        button.disabled = false;
        button.classList.remove(CONFIG.classes.loading);
        button.innerHTML = originalText;
    }
};

// ========================================
// GERENCIADOR DE MODAL
// ========================================

const ModalManager = {
    init() {
        this.setupModalEvents();
        this.setupKeyboardNavigation();
    },

    setupModalEvents() {
        const modal = document.querySelector(CONFIG.selectors.successModal);
        const closeButton = document.querySelector(CONFIG.selectors.closeButton);

        if (!modal || !closeButton) {
            return;
        }

        // Fechar com botão
        closeButton.addEventListener('click', () => {
            this.hideModal();
        });

        // Fechar clicando fora
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.hideModal();
            }
        });
    },

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && StateManager.state.isModalOpen) {
                this.hideModal();
            }
        });
    },

    showModal() {
        const modal = document.querySelector(CONFIG.selectors.successModal);
        if (!modal) {
            return;
        }

        StateManager.setState({ isModalOpen: true });
        modal.style.display = 'flex';
        modal.classList.add(CONFIG.classes.visible);
        modal.setAttribute('aria-hidden', 'false');

        // Foco no botão de fechar
        const closeButton = modal.querySelector(CONFIG.selectors.closeButton);
        if (closeButton) {
            closeButton.focus();
        }

        // Prevenir scroll do body
        document.body.style.overflow = 'hidden';
    },

    hideModal() {
        const modal = document.querySelector(CONFIG.selectors.successModal);
        if (!modal) {
            return;
        }

        StateManager.setState({ isModalOpen: false });
        modal.classList.remove(CONFIG.classes.visible);
        modal.setAttribute('aria-hidden', 'true');

        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }, CONFIG.modalTransition);
    }
};

// ========================================
// GERENCIADOR DE NOTIFICAÇÕES
// ========================================

const NotificationManager = {
    showNotification(message, type = 'info') {
        // Remove notificações existentes
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getIconForType(type)}" aria-hidden="true"></i>
                <span>${message}</span>
                <button class="notification-close" aria-label="Fechar notificação">&times;</button>
            </div>
        `;

        // Estilos inline para garantir que funcione
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${this.getColorForType(type)};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            z-index: 1003;
            animation: slideInRight 0.3s ease;
            max-width: 400px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        `;

        document.body.appendChild(notification);

        // Evento para fechar
        const closeButton = notification.querySelector('.notification-close');
        closeButton.addEventListener('click', () => {
            notification.remove();
        });

        // Auto-remove após 5 segundos
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    },

    getIconForType(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-triangle',
            warning: 'exclamation-circle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    },

    getColorForType(type) {
        const colors = {
            success: '#4caf50',
            error: '#f44336',
            warning: '#ff9800',
            info: '#2196f3'
        };
        return colors[type] || '#2196f3';
    }
};

// ========================================
// INICIALIZAÇÃO PRINCIPAL
// ========================================

const App = {
    init() {
        this.setupYear();
        this.initializeManagers();
        this.setupGlobalEventListeners();
        PerformanceManager.preloadCriticalResources();
        PerformanceManager.optimizeAnimations();
    },

    setupYear() {
        const yearElement = document.querySelector(CONFIG.selectors.year);
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    },

    initializeManagers() {
        NavigationManager.init();
        AnimationManager.init();
        FormManager.init();
        ModalManager.init();
    },

    setupGlobalEventListeners() {
        // Resize handler otimizado
        window.addEventListener('resize', Utils.debounce(() => {
            // Lógica de resize se necessário
        }, CONFIG.debounceDelay));

        // Scroll handler otimizado
        window.addEventListener('scroll', Utils.throttle(() => {
            // Lógica de scroll se necessário
        }, 16)); // ~60fps

        // Error handling global
        window.addEventListener('error', (e) => {
            console.error('Erro global:', e.error);
            NotificationManager.showNotification('Ocorreu um erro inesperado', 'error');
        });

        // Unhandled promise rejection
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Promise rejeitada:', e.reason);
            NotificationManager.showNotification('Erro na aplicação', 'error');
        });
    }
};

// ========================================
// EXPOSIÇÃO DE FUNÇÕES GLOBAIS
// ========================================

// Expor funções necessárias globalmente
window.showSuccessModal = () => ModalManager.showModal();
window.hideModal = () => ModalManager.hideModal();
window.showNotification = (message, type) => NotificationManager.showNotification(message, type);

// ========================================
// INICIALIZAÇÃO QUANDO DOM ESTIVER PRONTO
// ========================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
} else {
    App.init();
}

// ========================================
// SERVICE WORKER (PWA)
// ========================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registrado com sucesso:', registration);
            })
            .catch(registrationError => {
                console.log('Falha no registro do SW:', registrationError);
            });
    });
} else {
    console.log('Service Worker não suportado neste navegador');
}