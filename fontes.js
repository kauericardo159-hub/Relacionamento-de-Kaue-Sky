(function() {
    'use strict';

    if (typeof emManutencao !== 'undefined' && emManutencao === true) return;

    // 1. Importa a fonte com estilo "Jazz/Handwritten" direto do servidor do Google
    const linkFonte = document.createElement('link');
    linkFonte.rel = 'stylesheet';
    linkFonte.href = 'https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap';
    document.head.appendChild(linkFonte);

    // 2. Injeção de Estilos aplicando a nova fonte nos contadores e textos
    const estilosFontes = document.createElement('style');
    estilosFontes.textContent = `
        /* Aplica a fonte estilosa em todos os textos normais e números do contador */
        html, body, p, span, div, button {
            font-family: 'Patrick Hand', 'Cool Jazz', 'CoolJazz', sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        /* Mantém os números do contador grandes e bem visíveis com a nova fonte */
        .valor {
            font-family: 'Patrick Hand', sans-serif !important;
            font-size: 1.4rem !important; /* Ajuste sutil para o estilo da fonte */
        }

        /* --- PROTEÇÃO DO DESIGN ORIGINAL --- */

        /* Garante que os ícones do Font Awesome continuem funcionando perfeitamente */
        .fa, .fas, .far, .fab, .fa-solid, .fa-regular, .fa-brands, i {
            font-family: 'Font Awesome 6 Free', 'Font Awesome 6 Brands', 'Font Awesome' !important;
            font-weight: 900 !important;
        }

        /* Mantém a Poppins estritamente nos títulos/nomes para preservar o design premium */
        .card-secundario-titulo, 
        .nome, 
        .subtitulo,
        .pwa-txt-titulo {
            font-family: 'Poppins', sans-serif !important;
        }
    `;

    document.head.appendChild(estilosFontes);
})();
