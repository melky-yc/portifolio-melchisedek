# Imagens dos Projetos

Este diretório contém as imagens dos projetos do portfólio.

## Estrutura recomendada:

- `frontend-project.jpg` - Screenshot do projeto frontend
- `ui-ux-project.jpg` - Screenshot do projeto UI/UX  
- `portfolio-fullstack.jpg` - Screenshot do portfólio fullstack

## Especificações das imagens:

- **Formato**: JPG ou WebP (recomendado)
- **Dimensões**: 400x200px (proporção 2:1)
- **Qualidade**: Otimizada para web (80-90% de qualidade)
- **Peso**: Máximo 100KB por imagem

## Como adicionar novas imagens:

1. Adicione a imagem no diretório `public/img/projects/`
2. Atualize o atributo `data-src` no HTML correspondente
3. Teste o lazy loading e a responsividade

## Exemplo de uso no HTML:

```html
<img src="placeholder.svg" 
     alt="Screenshot do projeto" 
     class="project-screenshot lazy"
     data-src="img/projects/meu-projeto.jpg"
     loading="lazy">
```
