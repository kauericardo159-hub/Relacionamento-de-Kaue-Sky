(function() {
    'use strict';

    // --- CONTROLE DE DATA E EXECUÇÃO ---
    const agora = new Date();
    const anoAtual = agora.getFullYear();
    const mesAtual = agora.getMonth() + 1; // Janeiro é 0
    const diaAtual = agora.getDate();

    // TRAVA TEMPORAL CRÍTICA: O botão só existirá no dia do mesversário (25/05/2026)
    if (anoAtual !== 2026 || mesAtual !== 5 || diaAtual !== 25) {
        return; // Encerra silenciosamente e não injeta nada na página nos outros dias
    }

    // Bloqueia execução caso o site esteja em manutenção
    if (typeof emManutencao !== 'undefined' && emManutencao === true) {
        return; 
    }

    // --- 1. ESTILIZAÇÃO DO BOTÃO COMEMORATIVO ---
    const estilosBotao = document.createElement('style');
    estilosBotao.textContent = `
        .wrapper-botao-texto {
            width: 100%;
            max-width: 580px;
            margin-top: 26px;
            display: flex;
            justify-content: center;
            align-items: center;
            animation: surgirBotao 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .btn-mesversario-texto {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 14px;
            width: 100%;
            padding: 18px 28px;
            
            /* Fundo estilo Glassmorphism sofisticado com toque de cor */
            background: linear-gradient(135deg, rgba(14, 16, 27, 0.75), rgba(20, 24, 43, 0.85));
            
            /* Borda mágica usando gradiente translúcido */
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 22px;
            text-decoration: none;
            font-family: 'Poppins', sans-serif;
            color: #ffffff;
            font-size: 1rem;
            font-weight: 600;
            letter-spacing: 0.5px;
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            
            /* Sombra suave + Glow comemorativo nas pontas */
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4),
                        0 0 20px rgba(244, 114, 182, 0.1),
                        inset 0 1px 1px rgba(255, 255, 255, 0.15);
            
            position: relative;
            overflow: hidden;
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
                        border-color 0.3s ease, 
                        box-shadow 0.3s ease;
        }

        /* Efeito de brilho de borda personalizado via pseudo-elemento */
        .btn-mesversario-texto::before {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: 22px;
            padding: 1.5px;
            background: linear-gradient(90deg, #3b82f6, #f472b6, #3b82f6);
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            opacity: 0.4;
            transition: opacity 0.3s ease;
        }

        .btn-mesversario-texto i {
            font-size: 1.25rem;
            background: linear-gradient(45deg, #3b82f6, #f472b6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            filter: drop-shadow(0 2px 4px rgba(244, 114, 182, 0.2));
            animation: pulsoIcone 2s infinite ease-in-out;
        }

        /* --- ANIMAÇÕES --- */
        @keyframes surgirBotao {
            from { opacity: 0; transform: translateY(15px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulsoIcone {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.15) rotate(5deg); }
        }

        /* --- HOVER INTERATIVO --- */
        .btn-mesversario-texto:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.45),
                        0 0 25px rgba(244, 114, 182, 0.25),
                        0 0 10px rgba(59, 130, 246, 0.15);
        }

        .btn-mesversario-texto:hover::before {
            opacity: 1; /* Intensifica a borda colorida ao passar o mouse */
        }

        .btn-mesversario-texto:active {
            transform: translateY(-1px);
        }

        /* --- VERSÃO MOBILE ADAPTADA --- */
        @media (max-width: 600px) {
            .wrapper-botao-texto {
                max-width: 100%;
                padding: 0 8px;
                margin-top: 20px;
            }
            .btn-mesversario-texto {
                padding: 15px 20px;
                font-size: 0.88rem;
                border-radius: 18px;
                gap: 10px;
            }
            .btn-mesversario-texto::before {
                border-radius: 18px;
            }
            .btn-mesversario-texto i {
                font-size: 1.1rem;
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
            containerCreditos.parentNode.insertBefore(wrapperElemento, containerCreditos);
        } else {
            const cardSecundario = document.querySelector('.card-secundario');
            if (cardSecundario) {
                cardSecundario.parentNode.insertBefore(wrapperElemento, cardSecundario.nextSibling);
            } else {
                document.body.appendChild(wrapperElemento);
            }
        }
    }

    setTimeout(injetarAntesDosCreditos, 150);

})();
