/**
 * Script para atualizar automaticamente o cache buster
 * Execute este script sempre que fizer atualizações no portfólio
 */

// Função para gerar timestamp atual
function generateTimestamp() {
    return Math.floor(Date.now() / 1000);
}

// Função para gerar versão baseada na data
function generateVersion() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    
    return `${year}.${month}.${day}.${hour}${minute}`;
}

// Função para atualizar o cache buster no HTML
function updateCacheBuster() {
    const version = generateVersion();
    const timestamp = generateTimestamp();
    
    console.log(`🔄 Atualizando cache buster para versão: ${version}`);
    console.log(`📅 Timestamp: ${timestamp}`);
    
    // Aqui você pode adicionar lógica para atualizar automaticamente
    // os arquivos HTML, CSS e JS com a nova versão
    
    return {
        version: version,
        timestamp: timestamp,
        cssUrl: `css/style.css?v=${version}`,
        jsUrl: `js/script.js?v=${version}`
    };
}

// Função para verificar se há atualizações
function checkForUpdates() {
    const lastUpdate = localStorage.getItem('portfolio_last_update');
    const currentVersion = generateVersion();
    
    if (lastUpdate !== currentVersion) {
        console.log('🆕 Nova versão detectada! Forçando reload...');
        localStorage.setItem('portfolio_last_update', currentVersion);
        
        // Força reload da página
        window.location.reload(true);
    }
}

// Executar verificação quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    // Verificar atualizações a cada 5 minutos
    setInterval(checkForUpdates, 5 * 60 * 1000);
    
    // Log da versão atual
    const currentVersion = generateVersion();
    console.log(`🚀 Portfólio carregado - Versão: ${currentVersion}`);
});

// Exportar funções para uso manual
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        generateTimestamp,
        generateVersion,
        updateCacheBuster,
        checkForUpdates
    };
}
