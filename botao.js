(function() {
    'use strict';

    if (typeof emManutencao !== 'undefined' && emManutencao === true) {
        return; 
    }

    // 1. Injeção de Estilos Otimizados para Performance de Hardware
    const estilos = document.createElement('style');
    estilos.textContent = `
        .container-gatilho-painel {
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 9999;
            width: auto;
            display: flex;
            justify-content: center;
        }

        .btn-toggle-paineis {
            background: rgba(13, 18, 30, 0.65);
            border: 1px solid rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            padding: 10px 20px;
            border-radius: 50px;
            color: #e2e8f0;
            font-family: 'Poppins', sans-serif;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            cursor: pointer;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
            display: flex;
            align-items: center;
            gap: 8px;
            /* Otimizado para usar apenas transform e opacity no hover */
            transition: transform 0.2s cubic-bezier(0.25, 1, 0.5, 1), background-color 0.2s ease, border-color 0.2s ease;
        }

        .btn-toggle-paineis:hover {
            background: rgba(13, 18, 30, 0.85);
            border-color: rgba(244, 114, 182, 0.4);
            color: #ffffff;
            transform: translateY(2px) scale(1.02);
        }

        .btn-toggle-paineis i {
            font-size: 0.85rem;
        }

        /* Elementos principais ganham preparação de GPU nativa */
        .card, .card-secundario, .container-creditos {
            will-change: transform, opacity;
            transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s cubic-bezier(0.25, 1, 0.5, 1) !important;
        }

        /* Estado oculto usando apenas propriedades aceleradas por Hardware */
        .paineis-ocultos {
            opacity: 0 !important;
            transform: translateY(15px) scale(0.97) !important;
            pointer-events: none !important;
        }
    `;
    document.head.appendChild(estilos);

    // 2. Criação da Estrutura Inicial no DOM
    const containerBotao = document.createElement('div');
    containerBotao.className = 'container-gatilho-painel';

    const botao = document.createElement('button');
    botao.className = 'btn-toggle-paineis';
    botao.innerHTML = `
        <i class="fa-solid fa-eye-slash"></i>
        <span id="texto-btn-paineis">Esconder painéis</span>
    `;

    containerBotao.appendChild(botao);
    document.body.appendChild(containerBotao);

    // Cache estático das referências textuais e de ícone
    const textoBtn = document.getElementById('texto-btn-paineis');
    const iconeBtn = botao.querySelector('i');
    let estaoOcultos = false;

    // 3. Lógica Otimizada (Evita QuerySelector repetitivo no clique)
    botao.addEventListener('click', () => {
        // Busca os elementos dinamicamente apenas na hora do clique, mas faz o loop de forma atômica
        const elementos = document.querySelectorAll('.card, .card-secundario, .container-creditos');
        
        // Altera o estado lógico interno primeiro (Muitíssimo mais rápido)
        estaoOcultos = !estaoOcultos;

        // Atualização de UI em lote (Batching)
        requestAnimationFrame(() => {
            elementos.forEach(el => {
                if (estaoOcultos) {
                    el.classList.add('paineis-ocultos');
                } else {
                    el.classList.remove('paineis-ocultos');
                }
            });

            // Atualização dos textos de estado
            if (estaoOcultos) {
                textoBtn.textContent = 'Mostrar painéis';
                iconeBtn.className = 'fa-solid fa-eye';
            } else {
                textoBtn.textContent = 'Esconder painéis';
                iconeBtn.className = 'fa-solid fa-eye-slash';
            }
        });
    });

})();
