#!/usr/bin/env python3
# Script para corrigir o nome do arquivo CV no HTML

# Ler o arquivo HTML
with open('public/index.html', 'r', encoding='utf-8') as file:
    content = file.read()

# Substituir o nome do arquivo (hífen para underscore)
old_href = 'href="curriculo-melchisedek.pdf"'
new_href = 'href="curriculo_melchisedek.pdf"'

# Fazer a substituição
updated_content = content.replace(old_href, new_href)

# Escrever o arquivo atualizado
with open('public/index.html', 'w', encoding='utf-8') as file:
    file.write(updated_content)

print("✅ Nome do arquivo CV corrigido!")
print("📄 Arquivo correto: curriculo_melchisedek.pdf")
print("🔗 Link atualizado no HTML")
