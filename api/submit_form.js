/**
 * ========================================
 * API ROUTE PARA FORMULÁRIO DE CONTATO
 * ========================================
 * Arquivo específico para Vercel Functions
 * Autor: Melchisedek Lima
 */

const nodemailer = require('nodemailer');
const validator = require('validator');

// ========================================
// CONFIGURAÇÃO DO NODEMAILER
// ========================================

const transporter = nodemailer.createTransporter({
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

// ========================================
// VALIDAÇÃO DE DADOS
// ========================================

const validateFormData = (data) => {
    const errors = [];

    // Validar nome
    if (!data.name || typeof data.name !== 'string') {
        errors.push('Nome é obrigatório');
    } else if (data.name.trim().length < 2 || data.name.trim().length > 100) {
        errors.push('Nome deve ter entre 2 e 100 caracteres');
    }

    // Validar email
    if (!data.email || typeof data.email !== 'string') {
        errors.push('Email é obrigatório');
    } else if (!isValidEmail(data.email)) {
        errors.push('Email inválido');
    }

    // Validar mensagem
    if (!data.message || typeof data.message !== 'string') {
        errors.push('Mensagem é obrigatória');
    } else if (data.message.trim().length < 10 || data.message.trim().length > 2000) {
        errors.push('Mensagem deve ter entre 10 e 2000 caracteres');
    }

    return errors;
};

// ========================================
// HANDLER PRINCIPAL
// ========================================

export default async function handler(req, res) {
    // Configurar CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Responder a requisições OPTIONS
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Apenas aceitar POST
    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            message: 'Método não permitido'
        });
    }

    try {
        // Verificar se as variáveis de ambiente estão configuradas
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.RECIPIENT_EMAIL) {
            console.error('Variáveis de ambiente não configuradas');
            return res.status(500).json({
                success: false,
                message: 'Configuração do servidor incompleta'
            });
        }

        const { name, email, message } = req.body;

        // Validar dados
        const validationErrors = validateFormData({ name, email, message });
        if (validationErrors.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Dados inválidos',
                errors: validationErrors
            });
        }

        // Sanitizar dados
        const sanitizedData = {
            name: sanitizeInput(name),
            email: sanitizeInput(email),
            message: sanitizeInput(message)
        };

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

        console.log(`Email enviado com sucesso de: ${sanitizedData.email}`);

        res.status(200).json({
            success: true,
            message: 'Mensagem enviada com sucesso!'
        });

    } catch (error) {
        console.error('Erro ao enviar email:', error);

        res.status(500).json({
            success: false,
            message: 'Erro ao enviar a mensagem. Tente novamente mais tarde.',
            error: process.env.NODE_ENV === 'production' ? 'Erro interno' : error.message
        });
    }
}
