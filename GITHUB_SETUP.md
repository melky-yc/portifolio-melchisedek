# 🚀 Como Enviar o Projeto para o GitHub

## 📋 Pré-requisitos
- Conta no GitHub criada
- Git instalado no seu computador
- Projeto funcionando localmente

## 🔧 Passo a Passo

### 1. **Inicializar o Git no Projeto**
```bash
# Na pasta do projeto (port-project)
git init
```

### 2. **Criar arquivo .gitignore**
```bash
# Criar arquivo .gitignore para ignorar arquivos desnecessários
echo "node_modules/" > .gitignore
echo ".env" >> .gitignore
echo "*.log" >> .gitignore
echo ".DS_Store" >> .gitignore
echo "Thumbs.db" >> .gitignore
```

### 3. **Adicionar arquivos ao Git**
```bash
# Adicionar todos os arquivos
git add .

# Verificar o status
git status
```

### 4. **Fazer o primeiro commit**
```bash
git commit -m "🚀 Initial commit: Portfolio Melchisedek Lima"
```

### 5. **Criar repositório no GitHub**
1. Acesse [github.com](https://github.com)
2. Clique em **"New repository"** (botão verde)
3. Nome: `portfolio-melchisedek` (ou o nome que preferir)
4. Descrição: `Portfólio profissional - Front-end Developer & UI/UX Designer`
5. Marque **"Public"**
6. **NÃO** marque "Add a README file" (já temos um)
7. Clique em **"Create repository"**

### 6. **Conectar com o GitHub**
```bash
# Adicionar o repositório remoto (substitua SEU_USUARIO pelo seu username)
git remote add origin https://github.com/SEU_USUARIO/portfolio-melchisedek.git

# Verificar se foi adicionado
git remote -v
```

### 7. **Enviar para o GitHub**
```bash
# Enviar o código
git push -u origin main
```

## 🔄 Comandos para Atualizações Futuras

### Quando fizer mudanças:
```bash
# 1. Ver o que mudou
git status

# 2. Adicionar mudanças
git add .

# 3. Fazer commit
git commit -m "✨ Descrição da mudança"

# 4. Enviar para GitHub
git push
```

## 📁 Estrutura que será enviada:
```
portfolio-melchisedek/
├── public/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   ├── index.html
│   ├── sw.js
│   └── manifest.json
├── server.js
├── package.json
├── package-lock.json
├── .eslintrc.js
├── README.md
└── .gitignore
```

## ⚠️ Importante
- **NÃO** envie o arquivo `.env` (contém senhas)
- **NÃO** envie a pasta `node_modules/` (muito pesada)
- O arquivo `.gitignore` já está configurado para isso

## 🎉 Pronto!
Seu portfólio estará disponível em:
`https://github.com/SEU_USUARIO/portfolio-melchisedek`
