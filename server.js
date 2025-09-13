/**
 * ========================================
 * PORTFÓLIO MELCHISEDEK - SERVER OTIMIZADO
 * ========================================
 * Versão: 2.0.0
 * Autor: Melchisedek Lima
 * Descrição: Servidor Express otimizado com segurança e performance
 */

const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const morgan = require('morgan');
const validator = require('validator');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// ========================================
// CONFIGURAÇÕES DE SEGURANÇA
// ========================================

// Helmet para headers de segurança
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'"],
            frameSrc: ["'none'"],
            objectSrc: ["'none'"],
            upgradeInsecureRequests: []
        }
    },
    crossOriginEmbedderPolicy: false
}));

// CORS configurado
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// ========================================
// MIDDLEWARES DE PERFORMANCE
// ========================================

// Compressão gzip
app.use(compression({
    level: 6,
    threshold: 1024,
    filter: (req, res) => {
        if (req.headers['x-no-compression']) {
            return false;
        }
        return compression.filter(req, res);
    }
}));

// Logging em produção
if (NODE_ENV === 'production') {
    app.use(morgan('combined'));
} else {
    app.use(morgan('dev'));
}

// ========================================
// RATE LIMITING
// ========================================

// Rate limiting geral
const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // máximo 100 requests por IP
    message: {
        error: 'Muitas requisições deste IP, tente novamente em 15 minutos.',
        retryAfter: 15 * 60
    },
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => {
        // Pular rate limiting para health checks
        return req.path === '/health';
    }
});

// Rate limiting específico para formulário
const formLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5, // máximo 5 tentativas por IP
    message: {
        error: 'Muitas tentativas de envio de formulário. Tente novamente em 15 minutos.',
        retryAfter: 15 * 60
    },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true
});

app.use(generalLimiter);
app.use('/submit_form', formLimiter);

// ========================================
// MIDDLEWARES DE PARSING
// ========================================

app.use(express.json({
    limit: '10mb',
    verify: (req, res, buf) => {
        // Verificar se o JSON é válido
        try {
            JSON.parse(buf);
        } catch (e) {
            throw new Error('JSON inválido');
        }
    }
}));

app.use(express.urlencoded({
    extended: true,
    limit: '10mb',
    parameterLimit: 1000
}));

// ========================================
// MIDDLEWARE DE VALIDAÇÃO
// ========================================

const validateContactForm = [
    body('name')
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Nome deve ter entre 2 e 100 caracteres')
        .escape(),
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Email inválido')
        .isLength({ max: 254 })
        .withMessage('Email muito longo'),
    body('message')
        .trim()
        .isLength({ min: 10, max: 2000 })
        .withMessage('Mensagem deve ter entre 10 e 2000 caracteres')
        .escape()
];

// ========================================
// CONFIGURAÇÃO DO NODEMAILER
// ========================================

let transporter;

const initializeTransporter = () => {
    // Verificar variáveis de ambiente
    const requiredEnvVars = ['EMAIL_USER', 'EMAIL_PASS', 'RECIPIENT_EMAIL'];
    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

    if (missingVars.length > 0) {
        console.error('Variáveis de ambiente obrigatórias não encontradas:', missingVars);
        process.exit(1);
    }

    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        pool: true,
        maxConnections: 5,
        maxMessages: 100,
        rateLimit: 10
    });

    // Verificar conexão
    transporter.verify((error) => {
        if (error) {
            console.error('Erro na configuração do email:', error);
        } else {
            console.log('Servidor de email configurado com sucesso');
        }
    });
};

// ========================================
// UTILITÁRIOS
// ========================================

const sanitizeInput = (input) => {
    if (typeof input !== 'string') {
        return input;
    }
    return input
        .trim()
        .replace(/[<>]/g, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+=/gi, '');
};

const isValidEmail = (email) => {
    return validator.isEmail(email) && email.length <= 254;
};

// Função de log removida - usando morgan para logging

// ========================================
// ROTAS ESTÁTICAS
// ========================================

// Servir arquivos estáticos com cache
app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: NODE_ENV === 'production' ? '1y' : '0',
    etag: true,
    lastModified: true,
    setHeaders: (res, path) => {
        // Cache agressivo para assets em produção
        if (NODE_ENV === 'production') {
            const staticExtensions = ['.css', '.js', '.png', '.jpg', '.jpeg', '.gif', '.svg'];
            if (staticExtensions.some(ext => path.endsWith(ext))) {
                res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
            }
        } else {
            // Em desenvolvimento, desabilitar cache para HTML, CSS e JS
            if (path.endsWith('.html') || path.endsWith('.css') || path.endsWith('.js')) {
                res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
                res.setHeader('Pragma', 'no-cache');
                res.setHeader('Expires', '0');
            }
        }
    }
}));

// ========================================
// ROTAS DA API
// ========================================

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: NODE_ENV
    });
});

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota de contato com validação
app.post('/submit_form', validateContactForm, async(req, res) => {
    try {
        // Verificar erros de validação
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Dados inválidos',
                errors: errors.array()
            });
        }

        const { name, email, message } = req.body;

        // Sanitização adicional
        const sanitizedData = {
            name: sanitizeInput(name),
            email: sanitizeInput(email),
            message: sanitizeInput(message)
        };

        // Validação extra de email
        if (!isValidEmail(sanitizedData.email)) {
            return res.status(400).json({
                success: false,
                message: 'Email inválido'
            });
        }

        // Configurar email
        const mailOptions = {
            from: {
                name: 'Portfólio Melchisedek',
                address: process.env.EMAIL_USER
            },
            to: process.env.RECIPIENT_EMAIL,
            replyTo: sanitizedData.email,
            subject: `Nova Mensagem do Portfólio - ${sanitizedData.name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #00bfff;">Nova Mensagem do Portfólio</h2>
                    <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p><strong>Nome:</strong> ${sanitizedData.name}</p>
                        <p><strong>Email:</strong> ${sanitizedData.email}</p>
                        <p><strong>Data:</strong> ${new Date().toLocaleString('pt-BR')}</p>
                    </div>
                    <div style="background: white; padding: 20px; border-left: 4px solid #00bfff;">
                        <h3>Mensagem:</h3>
                        <p style="white-space: pre-wrap;">${sanitizedData.message}</p>
                    </div>
                </div>
            `,
            text: `
                Nova Mensagem do Portfólio
                
                Nome: ${sanitizedData.name}
                Email: ${sanitizedData.email}
                Data: ${new Date().toLocaleString('pt-BR')}
                
                Mensagem:
                ${sanitizedData.message}
            `
        };

        // Enviar email
        await transporter.sendMail(mailOptions);

        // Log do envio
        console.log(`Email enviado com sucesso de: ${sanitizedData.email}`);

        res.status(200).json({
            success: true,
            message: 'Mensagem enviada com sucesso!'
        });

    } catch (error) {
        console.error('Erro ao enviar email:', error);

        // Não expor detalhes do erro em produção
        const errorMessage = NODE_ENV === 'production'
            ? 'Erro interno do servidor'
            : error.message;

        res.status(500).json({
            success: false,
            message: 'Erro ao enviar a mensagem. Tente novamente mais tarde.',
            error: errorMessage
        });
    }
});

// ========================================
// MIDDLEWARE DE ERRO
// ========================================

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Rota não encontrada',
        path: req.originalUrl
    });
});

// Error handler global
app.use((error, req, res) => {
    console.error('Erro não tratado:', error);

    res.status(500).json({
        success: false,
        message: NODE_ENV === 'production'
            ? 'Erro interno do servidor'
            : error.message
    });
});

// ========================================
// INICIALIZAÇÃO DO SERVIDOR
// ========================================

const startServer = async() => {
    try {
        // Inicializar transporter de email
        initializeTransporter();

        // Iniciar servidor
        app.listen(PORT, () => {
            console.log(`🚀 Servidor rodando na porta ${PORT}`);
            console.log(`🌍 Ambiente: ${NODE_ENV}`);
            console.log(`📧 Email configurado: ${process.env.EMAIL_USER}`);
            console.log(`⏰ Iniciado em: ${new Date().toLocaleString('pt-BR')}`);
        });
    } catch (error) {
        console.error('Erro ao iniciar servidor:', error);
        process.exit(1);
    }
};

// ========================================
// GRACEFUL SHUTDOWN
// ========================================

const gracefulShutdown = (signal) => {
    console.log(`\n${signal} recebido. Iniciando shutdown graceful...`);

    if (transporter) {
        transporter.close();
    }

    process.exit(0);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// ========================================
// INICIAR SERVIDOR
// ========================================

startServer();