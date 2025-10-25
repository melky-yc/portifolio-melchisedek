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

// Sistema de Internacionalização
const TRANSLATIONS = {
    pt: {
        // Navegação
        nav: {
            inicio: 'Início',
            sobre: 'Sobre Mim',
            projetos: 'Projetos',
            stacks: 'Stacks',
            habilidades: 'Habilidades',
            contato: 'Contato'
        },
        // Hero Section
        hero: {
            title: 'Melchisedek Lima',
            subtitle: 'Front-end Developer & UI/UX Designer',
            // eslint-disable-next-line max-len
            description: 'Crio interfaces modernas e responsivas, unindo design intuitivo e código eficiente para entregar experiências digitais funcionais e atraentes.',
            stats: {
                projetos: 'Projetos',
                tecnologias: 'Tecnologias',
                anos: 'Anos'
            },
            buttons: {
                verProjetos: 'Ver Projetos',
                contato: 'Entre em Contato',
                downloadCV: 'Download CV'
            }
        },
        // Seção Sobre
        sobre: {
            title: 'Sobre Mim',
            quemSou: 'Quem eu sou?',
            // eslint-disable-next-line max-len
            quemSouText: 'Sou um estudante de Ciência da Computação apaixonado por tecnologia e design digital. Durante minha jornada acadêmica, tenho me dedicado ao estudo de desenvolvimento front-end e design de interfaces, buscando sempre unir estética, usabilidade e performance.',
            emQueAcredito: 'Em que acredito?',
            // eslint-disable-next-line max-len
            emQueAcreditoText: 'Acredito que uma boa experiência do usuário nasce da combinação entre código limpo e design inteligente, por isso meu foco é criar interfaces modernas, responsivas e acessíveis, que tornem a interação com a tecnologia mais simples e agradável.',
            objetivo: 'Qual é meu objetivo?',
            // eslint-disable-next-line max-len
            objetivoText: 'Meu objetivo é me tornar um Front-end Developer e UI/UX Designer, entregando soluções digitais que uniam inovação, funcionalidade e experiência premium.',
            stats: {
                graduacao: 'Ciência da Computação',
                graduacaoDesc: 'Graduação em andamento',
                tecnologias: '8+ Tecnologias',
                tecnologiasDesc: 'Dominadas e em constante evolução',
                projetos: '5+ Projetos',
                projetosDesc: 'Desenvolvidos e em produção',
                colaboracao: 'Colaboração',
                colaboracaoDesc: 'Trabalho em equipe e comunicação'
            }
        },
        // Seção Projetos
        projetos: {
            title: 'Meus Projetos',
            filters: {
                todos: 'Todos',
                frontend: 'Front-end',
                fullstack: 'Full-stack',
                uiUx: 'UI/UX',
                mobile: 'Mobile'
            },
            status: {
                concluido: 'Concluído',
                emDesenvolvimento: 'Em Desenvolvimento'
            },
            verTodos: 'Ver Todos no GitHub'
        },
        // Seção Stacks
        stacks: {
            title: 'Minhas Stacks',
            // eslint-disable-next-line max-len
            subtitle: 'Uma visão abrangente das minhas competências técnicas e das ferramentas que utilizo para transformar ideias em realidade.',
            frontend: 'Front-end',
            backend: 'Back-end',
            database: 'Banco de Dados',
            tools: 'Ferramentas & UX/UI'
        },
        // Seção Habilidades
        habilidades: {
            title: 'Habilidades Soft',
            // eslint-disable-next-line max-len
            subtitle: 'Além das competências técnicas, desenvolvo habilidades interpessoais essenciais para o sucesso profissional.',
            comunicacao: 'Comunicação',
            lideranca: 'Liderança',
            aprendizado: 'Aprendizado',
            skills: {
                comunicacaoEfetiva: 'Comunicação Efetiva',
                apresentacoes: 'Apresentações',
                inglesIntermediario: 'Inglês Intermediário',
                gestaoEquipe: 'Gestão de Equipe',
                tomadaDecisao: 'Tomada de Decisão',
                planejamentoEstrategico: 'Planejamento Estratégico',
                pensamentoCritico: 'Pensamento Crítico',
                resolucaoProblemas: 'Resolução de Problemas',
                aprendizadoContinuo: 'Aprendizado Contínuo'
            }
        },
        // Seção Contato
        contato: {
            title: 'Entre em Contato',
            subtitle: 'Vamos conversar!',
            // eslint-disable-next-line max-len
            description: 'Estou sempre aberto a novas oportunidades, colaborações e conversas interessantes. Se você tem um projeto em mente, quer discutir tecnologia ou apenas trocar ideias, não hesite em entrar em contato!',
            quickContact: {
                whatsapp: 'WhatsApp',
                agendarReuniao: 'Agendar Reunião',
                emailDireto: 'Email Direto'
            },
            form: {
                nome: 'Seu nome completo',
                email: 'seu.email@exemplo.com',
                mensagem: 'Conte-me sobre seu projeto ou ideia...',
                enviar: 'Enviar Mensagem',
                enviando: 'Enviando...'
            },
            modal: {
                sucesso: 'Mensagem enviada com sucesso!',
                agradecimento: 'Agradeço o seu contato. Responderei o mais breve possível.'
            }
        },
        // Footer
        footer: {
            copyright: 'Feito com suor e muito código.'
        }
    },
    en: {
        // Navigation
        nav: {
            inicio: 'Home',
            sobre: 'About',
            projetos: 'Projects',
            stacks: 'Stacks',
            habilidades: 'Skills',
            contato: 'Contact'
        },
        // Hero Section
        hero: {
            title: 'Melchisedek Lima',
            subtitle: 'Front-end Developer & UI/UX Designer',
            // eslint-disable-next-line max-len
            description: 'I create modern and responsive interfaces, combining intuitive design and efficient code to deliver functional and attractive digital experiences.',
            stats: {
                projetos: 'Projects',
                tecnologias: 'Technologies',
                anos: 'Years'
            },
            buttons: {
                verProjetos: 'View Projects',
                contato: 'Get in Touch',
                downloadCV: 'Download CV'
            }
        },
        // About Section
        sobre: {
            title: 'About Me',
            quemSou: 'Who am I?',
            // eslint-disable-next-line max-len
            quemSouText: 'I am a Computer Science student passionate about technology and digital design. During my academic journey, I have dedicated myself to studying front-end development and interface design, always seeking to combine aesthetics, usability and performance.',
            emQueAcredito: 'What do I believe in?',
            // eslint-disable-next-line max-len
            emQueAcreditoText: 'I believe that a good user experience is born from the combination of clean code and intelligent design, which is why my focus is on creating modern, responsive and accessible interfaces that make interaction with technology simpler and more pleasant.',
            objetivo: 'What is my goal?',
            // eslint-disable-next-line max-len
            objetivoText: 'My goal is to become a Front-end Developer and UI/UX Designer, delivering digital solutions that combine innovation, functionality and premium experience.',
            stats: {
                graduacao: 'Computer Science',
                graduacaoDesc: 'Degree in progress',
                tecnologias: '8+ Technologies',
                tecnologiasDesc: 'Mastered and constantly evolving',
                projetos: '5+ Projects',
                projetosDesc: 'Developed and in production',
                colaboracao: 'Collaboration',
                colaboracaoDesc: 'Teamwork and communication'
            }
        },
        // Projects Section
        projetos: {
            title: 'My Projects',
            filters: {
                todos: 'All',
                frontend: 'Front-end',
                fullstack: 'Full-stack',
                uiUx: 'UI/UX',
                mobile: 'Mobile'
            },
            status: {
                concluido: 'Completed',
                emDesenvolvimento: 'In Development'
            },
            verTodos: 'View All on GitHub'
        },
        // Stacks Section
        stacks: {
            title: 'My Stacks',
            // eslint-disable-next-line max-len
            subtitle: 'A comprehensive view of my technical skills and the tools I use to transform ideas into reality.',
            frontend: 'Front-end',
            backend: 'Back-end',
            database: 'Database',
            tools: 'Tools & UX/UI'
        },
        // Skills Section
        habilidades: {
            title: 'Soft Skills',
            subtitle: 'Beyond technical skills, I develop interpersonal skills essential for professional success.',
            comunicacao: 'Communication',
            lideranca: 'Leadership',
            aprendizado: 'Learning',
            skills: {
                comunicacaoEfetiva: 'Effective Communication',
                apresentacoes: 'Presentations',
                inglesIntermediario: 'Intermediate English',
                gestaoEquipe: 'Team Management',
                tomadaDecisao: 'Decision Making',
                planejamentoEstrategico: 'Strategic Planning',
                pensamentoCritico: 'Critical Thinking',
                resolucaoProblemas: 'Problem Solving',
                aprendizadoContinuo: 'Continuous Learning'
            }
        },
        // Contact Section
        contato: {
            title: 'Get in Touch',
            subtitle: "Let's talk!",
            // eslint-disable-next-line max-len
            description: 'I am always open to new opportunities, collaborations and interesting conversations. If you have a project in mind, want to discuss technology or just exchange ideas, do not hesitate to get in touch!',
            quickContact: {
                whatsapp: 'WhatsApp',
                agendarReuniao: 'Schedule Meeting',
                emailDireto: 'Direct Email'
            },
            form: {
                nome: 'Your full name',
                email: 'your.email@example.com',
                mensagem: 'Tell me about your project or idea...',
                enviar: 'Send Message',
                enviando: 'Sending...'
            },
            modal: {
                sucesso: 'Message sent successfully!',
                agradecimento: 'Thank you for your contact. I will respond as soon as possible.'
            }
        },
        // Footer
        footer: {
            copyright: 'Made with sweat and lots of code.'
        }
    }
};

const CONFIG = {
    animationDelay: 80,
    modalTransition: 250,
    debounceDelay: 200,
    apiEndpoints: {
        submitForm: '/api/submit_form'
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
        closeButton: '.close-button',
        themeToggle: '.theme-toggle',
        projectFilters: '.filter-btn',
        projectCards: '.project-card',
        backToTop: '.back-to-top',
        statNumbers: '.stat-number',
        scrollReveal: '.scroll-reveal'
    },
    classes: {
        active: 'active',
        visible: 'visible',
        loading: 'loading',
        error: 'error',
        revealed: 'revealed'
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
    // Lazy loading de imagens otimizado
    initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        this.loadImage(img);
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback para navegadores antigos
            document.querySelectorAll('img[data-src]').forEach(img => {
                this.loadImage(img);
            });
        }
    },

    // Carregar imagem com tratamento de erro
    loadImage(img) {
        if (!img.dataset.src) {
            return;
        }

        // Mostrar skeleton loading
        img.classList.add('loading');

        const tempImg = new Image();
        tempImg.onload = () => {
            img.src = img.dataset.src;
            img.classList.remove('lazy', 'loading');
            img.classList.add('loaded');
        };
        tempImg.onerror = () => {
            img.classList.remove('lazy', 'loading');
            // Manter placeholder em caso de erro
            console.warn('Erro ao carregar imagem:', img.dataset.src);
        };
        tempImg.src = img.dataset.src;
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

                    // Scroll suave com animação customizada
                    this.smoothScrollTo(targetPosition, 1000);
                }
            });
        });
    },

    // Função para scroll suave customizado
    smoothScrollTo(targetPosition, duration = 1000) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) {
                startTime = currentTime;
            }
            const timeElapsed = currentTime - startTime;
            const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }

        // Função de easing suave
        function easeInOutCubic(t, b, c, d) {
            t /= d / 2;
            if (t < 1) {
                return c / 2 * t * t * t + b;
            }
            t -= 2;
            return c / 2 * (t * t * t + 2) + b;
        }

        requestAnimationFrame(animation);
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
        const animatedElements = document.querySelectorAll(
            '.project-card, .stack-category, .skill-category, .stat-card, .info-block'
        );

        // Verificar se IntersectionObserver está disponível
        if (!('IntersectionObserver' in window)) {
            // Fallback: adicionar classe diretamente
            animatedElements.forEach(element => {
                element.classList.add('revealed');
            });
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Adicionar delay baseado na posição do elemento (reduzido)
                    const rect = entry.target.getBoundingClientRect();
                    const delay = Math.min(rect.top / window.innerHeight * 100, 100);

                    setTimeout(() => {
                        entry.target.classList.add('revealed');
                    }, delay);

                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(element => {
            observer.observe(element);
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
            if (value.length < 5) {
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
                AccessibilityManager.announceToScreenReader('Mensagem enviada com sucesso!');
            } else {
                const errorText = await response.text();
                throw new Error(errorText || 'Erro no servidor');
            }

        } catch (error) {
            console.error('Erro ao enviar formulário:', error);
            NotificationManager.showNotification('Erro ao enviar mensagem. Tente novamente.', 'error');
            AccessibilityManager.announceToScreenReader('Erro ao enviar mensagem. Tente novamente.');
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
// GERENCIADOR DE IDIOMAS
// ========================================

const LanguageManager = {
    currentLanguage: 'pt',

    init() {
        this.setupLanguageToggle();
        this.loadSavedLanguage();
    },

    setupLanguageToggle() {
        const languageToggle = document.querySelector('.language-toggle');
        if (!languageToggle) {
            return;
        }

        languageToggle.addEventListener('click', () => {
            this.toggleLanguage();
        });
    },

    toggleLanguage() {
        const newLanguage = this.currentLanguage === 'pt' ? 'en' : 'pt';
        this.setLanguage(newLanguage);
    },

    setLanguage(language) {
        this.currentLanguage = language;
        localStorage.setItem('language', language);

        // Atualizar texto do botão
        const languageText = document.querySelector('.language-text');
        if (languageText) {
            languageText.textContent = language.toUpperCase();
        }

        // Atualizar atributo lang do HTML
        document.documentElement.setAttribute('lang', language === 'pt' ? 'pt-BR' : 'en');

        // Aplicar traduções
        this.applyTranslations(language);
    },

    loadSavedLanguage() {
        const savedLanguage = localStorage.getItem('language') || 'pt';
        this.setLanguage(savedLanguage);
    },

    applyTranslations(language) {
        const translations = TRANSLATIONS[language];
        if (!translations) {
            return;
        }

        // Navegação
        this.updateNavigation(translations.nav);

        // Hero Section
        this.updateHero(translations.hero);

        // Seção Sobre
        this.updateAbout(translations.sobre);

        // Seção Projetos
        this.updateProjects(translations.projetos);

        // Seção Stacks
        this.updateStacks(translations.stacks);

        // Seção Habilidades
        this.updateSkills(translations.habilidades);

        // Seção Contato
        this.updateContact(translations.contato);

        // Footer
        this.updateFooter(translations.footer);
    },

    updateNavigation(nav) {
        const navLinks = document.querySelectorAll('.nav-link');
        const navTexts = ['inicio', 'sobre', 'projetos', 'stacks', 'habilidades', 'contato'];

        navLinks.forEach((link, index) => {
            if (navTexts[index]) {
                link.textContent = nav[navTexts[index]];
            }
        });
    },

    updateHero(hero) {
        // Título e subtítulo
        const heroTitle = document.querySelector('#hero-title');
        if (heroTitle) {
            heroTitle.innerHTML = `
                <span class="title-line">Melchisedek</span>
                <span class="title-line highlight">Lima</span>
            `;
        }

        const subtitle = document.querySelector('.subtitle');
        if (subtitle) {
            subtitle.innerHTML = `
                <span class="subtitle-text">Front-end Developer</span>
                <span class="subtitle-separator">&</span>
                <span class="subtitle-text">UI/UX Designer</span>
            `;
        }

        // Descrição
        const description = document.querySelector('.description');
        if (description) {
            description.textContent = hero.description;
        }

        // Estatísticas
        const statLabels = document.querySelectorAll('.stat-label');
        const statKeys = ['projetos', 'tecnologias', 'anos'];
        statLabels.forEach((label, index) => {
            if (statKeys[index]) {
                label.textContent = hero.stats[statKeys[index]];
            }
        });

        // Botões
        const buttons = document.querySelectorAll('.cta-buttons .btn');
        const buttonKeys = ['verProjetos', 'contato', 'downloadCV'];
        buttons.forEach((button, index) => {
            if (buttonKeys[index] && button.querySelector('i')) {
                const text = button.querySelector('i').nextSibling;
                if (text) {
                    text.textContent = 'ㅤ' + hero.buttons[buttonKeys[index]];
                }
            }
        });
    },

    updateAbout(sobre) {
        // Título
        const title = document.querySelector('#sobre-title');
        if (title) {
            title.innerHTML = `Sobre <span class="highlight">Mim</span>`;
        }

        // Textos da seção sobre
        const bioText = document.querySelector('.bio-text');
        if (bioText) {
            bioText.innerHTML = `
                <h2>${sobre.quemSou}</h2>
                <p>${sobre.quemSouText}</p>
                <h2>${sobre.emQueAcredito}</h2>
                <p>${sobre.emQueAcreditoText}</p>
                <h2>${sobre.objetivo}</h2>
                <p>${sobre.objetivoText}</p>
            `;
        }

        // Estatísticas pessoais
        const statCards = document.querySelectorAll('.stat-card');
        const statKeys = ['graduacao', 'tecnologias', 'projetos', 'colaboracao'];
        const statDescs = ['graduacaoDesc', 'tecnologiasDesc', 'projetosDesc', 'colaboracaoDesc'];

        statCards.forEach((card, index) => {
            const title = card.querySelector('h4');
            const desc = card.querySelector('p');

            if (title && statKeys[index]) {
                title.textContent = sobre.stats[statKeys[index]];
            }
            if (desc && statDescs[index]) {
                desc.textContent = sobre.stats[statDescs[index]];
            }
        });
    },

    updateProjects(projetos) {
        // Título
        const title = document.querySelector('#projetos-title');
        if (title) {
            title.innerHTML = `Meus <span class="highlight">Projetos</span>`;
        }

        // Filtros
        const filterButtons = document.querySelectorAll('.filter-btn');
        const filterKeys = ['todos', 'frontend', 'fullstack', 'uiUx', 'mobile'];

        filterButtons.forEach((button, index) => {
            if (filterKeys[index]) {
                button.textContent = projetos.filters[filterKeys[index]];
            }
        });

        // Status dos projetos
        const statusBadges = document.querySelectorAll('.status-badge');
        statusBadges.forEach(badge => {
            if (badge.classList.contains('completed')) {
                badge.textContent = projetos.status.concluido;
            } else if (badge.classList.contains('in-progress')) {
                badge.textContent = projetos.status.emDesenvolvimento;
            }
        });

        // Botão "Ver Todos"
        const seeMoreBtn = document.querySelector('.btn-more');
        if (seeMoreBtn) {
            seeMoreBtn.textContent = projetos.verTodos;
        }
    },

    updateStacks(stacks) {
        // Título
        const title = document.querySelector('#stacks-title');
        if (title) {
            title.innerHTML = `Minhas <span class="highlight">Stacks</span>`;
        }

        // Subtítulo
        const subtitle = document.querySelector('.section-subtitle');
        if (subtitle) {
            subtitle.textContent = stacks.subtitle;
        }

        // Categorias
        const categoryTitles = document.querySelectorAll('.stack-category .category-title');
        const categoryKeys = ['frontend', 'backend', 'database', 'tools'];

        categoryTitles.forEach((title, index) => {
            if (categoryKeys[index]) {
                title.textContent = stacks[categoryKeys[index]];
            }
        });
    },

    updateSkills(habilidades) {
        // Título
        const title = document.querySelector('#habilidades-title');
        if (title) {
            title.innerHTML = `Habilidades <span class="highlight">Soft</span>`;
        }

        // Subtítulo
        const subtitle = document.querySelector('.section-habilidades .section-subtitle');
        if (subtitle) {
            subtitle.textContent = habilidades.subtitle;
        }

        // Categorias
        const categoryTitles = document.querySelectorAll('.skill-category .category-title');
        const categoryKeys = ['comunicacao', 'lideranca', 'aprendizado'];

        categoryTitles.forEach((title, index) => {
            if (categoryKeys[index]) {
                title.textContent = habilidades[categoryKeys[index]];
            }
        });

        // Skills individuais
        const skillItems = document.querySelectorAll('.skill-item span');
        const skillKeys = [
            'comunicacaoEfetiva', 'apresentacoes', 'inglesIntermediario',
            'gestaoEquipe', 'tomadaDecisao', 'planejamentoEstrategico',
            'pensamentoCritico', 'resolucaoProblemas', 'aprendizadoContinuo'
        ];

        skillItems.forEach((item, index) => {
            if (skillKeys[index]) {
                item.textContent = habilidades.skills[skillKeys[index]];
            }
        });
    },

    updateContact(contato) {
        // Título
        const title = document.querySelector('#contato-title');
        if (title) {
            title.innerHTML = `Entre em <span class="highlight">Contato</span>`;
        }

        // Subtítulo e descrição
        const subtitle = document.querySelector('.contato-info h3');
        if (subtitle) {
            subtitle.textContent = contato.subtitle;
        }

        const description = document.querySelector('.contato-info p');
        if (description) {
            description.textContent = contato.description;
        }

        // Botões de contato rápido
        const quickBtns = document.querySelectorAll('.quick-btn span');
        const quickKeys = ['whatsapp', 'agendarReuniao', 'emailDireto'];

        quickBtns.forEach((btn, index) => {
            if (quickKeys[index]) {
                btn.textContent = contato.quickContact[quickKeys[index]];
            }
        });

        // Formulário
        const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
        const formKeys = ['nome', 'email', 'mensagem'];

        formInputs.forEach((input, index) => {
            if (formKeys[index]) {
                input.placeholder = contato.form[formKeys[index]];
            }
        });

        const submitBtn = document.querySelector('.contact-form button[type="submit"]');
        if (submitBtn) {
            submitBtn.querySelector('.btn-text').textContent = contato.form.enviar;
        }

        // Modal
        const modalTitle = document.querySelector('#modal-title');
        if (modalTitle) {
            modalTitle.textContent = contato.modal.sucesso;
        }

        const modalText = document.querySelector('.modal-content p');
        if (modalText) {
            modalText.textContent = contato.modal.agradecimento;
        }
    },

    updateFooter(footer) {
        const footerText = document.querySelector('footer p');
        if (footerText) {
            footerText.innerHTML = `&copy; <span id="year"></span> Melchisedek Lima. ${footer.copyright}`;
        }
    }
};

// ========================================
// GERENCIADOR DE TEMA
// ========================================

const ThemeManager = {
    init() {
        this.setupThemeToggle();
        this.loadSavedTheme();
    },

    setupThemeToggle() {
        const themeToggle = document.querySelector(CONFIG.selectors.themeToggle);
        if (!themeToggle) {
            return;
        }

        themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });
    },

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Atualizar ícone do toggle
        const icon = document.querySelector(CONFIG.selectors.themeToggle + ' i');
        if (icon) {
            icon.className = newTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
    },

    loadSavedTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);

        const icon = document.querySelector(CONFIG.selectors.themeToggle + ' i');
        if (icon) {
            icon.className = savedTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }
};

// ========================================
// GERENCIADOR DE FILTROS DE PROJETOS
// ========================================

const ProjectFilterManager = {
    init() {
        this.setupFilters();
    },

    setupFilters() {
        const filterButtons = document.querySelectorAll(CONFIG.selectors.projectFilters);
        const projectCards = document.querySelectorAll(CONFIG.selectors.projectCards);

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');

                // Atualizar botões ativos
                filterButtons.forEach(btn => btn.classList.remove(CONFIG.classes.active));
                button.classList.add(CONFIG.classes.active);

                // Filtrar projetos
                this.filterProjects(projectCards, filter);
            });
        });
    },

    filterProjects(cards, filter) {
        cards.forEach(card => {
            const category = card.getAttribute('data-category');

            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    }
};

// ========================================
// GERENCIADOR DE ACESSIBILIDADE
// ========================================

const AccessibilityManager = {
    init() {
        this.setupKeyboardNavigation();
        this.setupFocusManagement();
        this.setupAriaLiveRegions();
        this.setupReducedMotion();
    },

    setupKeyboardNavigation() {
        // Navegação por teclado melhorada
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });

        // Skip links
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.target.classList.contains('skip-link')) {
                e.target.click();
            }
        });
    },

    setupFocusManagement() {
        // Gerenciar foco em modais
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    ModalManager.hideModal();
                }
            });
        });

        // Focus trap para modais
        this.setupFocusTrap();
    },

    setupFocusTrap() {
        const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

        const trapFocus = (element) => {
            const focusableContent = element.querySelectorAll(focusableElements);
            const firstFocusableElement = focusableContent[0];
            const lastFocusableElement = focusableContent[focusableContent.length - 1];

            element.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    if (e.shiftKey) {
                        if (document.activeElement === firstFocusableElement) {
                            lastFocusableElement.focus();
                            e.preventDefault();
                        }
                    } else {
                        if (document.activeElement === lastFocusableElement) {
                            firstFocusableElement.focus();
                            e.preventDefault();
                        }
                    }
                }
            });
        };

        document.querySelectorAll('.modal').forEach(trapFocus);
    },

    setupAriaLiveRegions() {
        // Criar região live para atualizações dinâmicas
        if (!document.getElementById('aria-live-region')) {
            const liveRegion = document.createElement('div');
            liveRegion.id = 'aria-live-region';
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            liveRegion.className = 'sr-only';
            document.body.appendChild(liveRegion);
        }
    },

    setupReducedMotion() {
        // Respeitar preferência de movimento reduzido
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.classList.add('reduced-motion');
        }

        window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
            if (e.matches) {
                document.documentElement.classList.add('reduced-motion');
            } else {
                document.documentElement.classList.remove('reduced-motion');
            }
        });
    },

    announceToScreenReader(message) {
        const liveRegion = document.getElementById('aria-live-region');
        if (liveRegion) {
            liveRegion.textContent = message;
            setTimeout(() => {
                liveRegion.textContent = '';
            }, 1000);
        }
    }
};

// ========================================
// GERENCIADOR DE ANIMAÇÕES DE SCROLL
// ========================================

const ScrollAnimationManager = {
    init() {
        this.setupScrollReveal();
        this.setupBackToTop();
        this.setupCounterAnimations();
    },

    setupScrollReveal() {
        const elements = document.querySelectorAll(CONFIG.selectors.scrollReveal);
        const sections = document.querySelectorAll('section');

        if (!('IntersectionObserver' in window)) {
            elements.forEach(el => el.classList.add(CONFIG.classes.revealed));
            sections.forEach(section => section.classList.add('visible'));
            return;
        }

        // Observer para elementos individuais com animação progressiva
        const elementObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const rect = entry.target.getBoundingClientRect();
                    const delay = Math.min(rect.top / window.innerHeight * 150, 150);

                    setTimeout(() => {
                        entry.target.classList.add(CONFIG.classes.revealed);
                    }, delay);

                    elementObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        elements.forEach(el => elementObserver.observe(el));

        // Observer para seções com animação mais suave
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const rect = entry.target.getBoundingClientRect();
                    const delay = Math.min(rect.top / window.innerHeight * 200, 200);

                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, delay);

                    sectionObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -60px 0px'
        });

        sections.forEach(section => sectionObserver.observe(section));
    },

    setupBackToTop() {
        const backToTopBtn = document.querySelector(CONFIG.selectors.backToTop);
        if (!backToTopBtn) {
            return;
        }

        window.addEventListener('scroll', Utils.throttle(() => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add(CONFIG.classes.visible);
            } else {
                backToTopBtn.classList.remove(CONFIG.classes.visible);
            }
        }, 100));

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    },

    setupCounterAnimations() {
        const counters = document.querySelectorAll(CONFIG.selectors.statNumbers);

        if (!('IntersectionObserver' in window)) {
            counters.forEach(counter => this.animateCounter(counter));
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    },

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 1200;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
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
        LanguageManager.init();
        ThemeManager.init();
        ProjectFilterManager.init();
        ScrollAnimationManager.init();
        PerformanceManager.initLazyLoading();
        AccessibilityManager.init();
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