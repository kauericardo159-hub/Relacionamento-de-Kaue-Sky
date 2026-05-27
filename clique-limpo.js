(function() {
    'use strict';

    if (typeof emManutencao !== 'undefined' && emManutencao === true) return;

    // Injeção de estilo CSS para remover o realce azul de cliques no mobile
    const estiloToque = document.createElement('style');
    estiloToque.textContent = `
        /* Remove o flash azul padrão do Android/Chrome e iOS/Safari */
        button, 
        a, 
        input, 
        select, 
        textarea, 
        div, 
        span, 
        img,
        .btn-toggle-paineis,
        .card,
        .perfil-wrapper {
            -webkit-tap-highlight-color: transparent !important;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0) !important;
            outline: none !important;
        }

        /* Remove a borda de foco cinza/preta que alguns navegadores colocam ao clicar */
        button:focus, a:focus, div:focus {
            outline: none !important;
            box-shadow: none !important;
        }
    `;

    document.head.appendChild(estiloToque);
})();
