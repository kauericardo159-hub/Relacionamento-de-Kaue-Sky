(function() {
    'use strict';

    // Bloqueia execução caso o site esteja em manutenção
    if (typeof emManutencao !== 'undefined' && emManutencao === true) {
        return; 
    }

    // --- 1. ESTILIZAÇÃO DO BOTÃO CELEBRAÇÃO ---
    const estilosBotao = document.createElement('style');
    estilosBotao.textContent = `
        .wrapper-botao-texto {
            width: 100%;
            max-width: 580px;
            margin-top: 24px;
            display: flex;
            justify-content: center;
            align-items: center;
            animation: surgirBotao 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .btn-mesversario-texto {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            width: 100%;
            padding: 16px 24px;
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(244, 114, 182, 0.15));
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 20px;
            text-decoration: none;
            font-family: 'Poppins', sans-serif;
            color: #ffffff;
            font-size: 1rem;
            font-weight: 600;
            letter-spacing: 0.5px;
            backdrop-filter: blur(14px);
            -webkit-backdrop-filter: blur(14px);
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35),
                        inset 0 1px 1px rgba(255, 255, 255, 0.1);
            transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), 
                        border-color 0.3s ease, 
                        box-shadow 0.3s ease,
                        background 0.3s ease;
        }

        .btn-mesversario-texto i {
            font-size: 1.15rem;
            background: linear-gradient(45deg, #3b82f6, #f472b6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            transition: transform 0.3s ease;
        }

        /* --- EFEITOS INTERATIVOS DE HOVER --- */
        .btn-mesversario-texto:hover {
            transform: translateY(-3px);
            border-color: rgba(244, 114, 182, 0.4);
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.22), rgba(244, 114, 182, 0.22));
            box-shadow: 0 18px 35px rgba(244, 114, 182, 0.1);
        }

        .btn-mesversario-texto:hover i {
            transform: scale(1.2) rotate(8deg);
        }

        .btn-mesversario-texto:active {
            transform: translateY(-1px);
        }

        @keyframes surgirBotao {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* --- AJUSTE RESPONSIVO (MOBILE) --- */
        @media (max-width: 600px) {
            .wrapper-botao-texto {
                max-width: 100%;
                padding: 0 4px;
                margin-top: 18px;
            }
            .btn-mesversario-texto {
                padding: 14px 18px;
                font-size: 0.9rem;
                border-radius: 16px;
            }
        }
    `;
    document.head.appendChild(estilosBotao);

    // --- 2. CONSTRUÇÃO ESTRUTURAL DO COMPONENTE ---
    const wrapperElemento = document.createElement('div');
    wrapperElemento.className = 'wrapper-botao-texto';

    const linkBotao = document.createElement('a');
    linkBotao.href = '1texto.html';
    linkBotao.className = 'btn-mesversario-texto';
    linkBotao.innerHTML = `
        <i class="fa-solid fa-heart-text-square"></i>
        <span>Um pequeno texto pro nosso 1 mês de namoro 💕</span>
    `;
    
    wrapperElemento.appendChild(linkBotao);

    // --- 3. INJEÇÃO ESTRATÉGICA (ANTES DOS CRÉDITOS) ---
    function injetarAntesDosCreditos() {
        const containerCreditos = document.querySelector('.container-creditos');
        
        if (containerCreditos) {
            // Se encontrar o container de créditos, injeta o botão exatamente antes dele
            containerCreditos.parentNode.insertBefore(wrapperElemento, containerCreditos);
        } else {
            // Fallback: Caso o script rode antes dos créditos existirem na página,
            // ele tenta se pendurar logo após o card secundário.
            const cardSecundario = document.querySelector('.card-secundario');
            if (cardSecundario) {
                cardSecundario.parentNode.insertBefore(wrapperElemento, cardSecundario.nextSibling);
            } else {
                document.body.appendChild(wrapperElemento);
            }
        }
    }

    // Pequeno atraso controlado para garantir que a árvore do DOM e os outros scripts já se estruturaram
    setTimeout(injetarAntesDosCreditos, 150);

})();
