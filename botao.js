(function() {
    'use strict';

    // Só executa o script se o site NÃO estiver em manutenção
    if (typeof emManutencao !== 'undefined' && emManutencao === true) {
        return; 
    }

    // 1. Injeção de Estilos CSS para o Botão e Efeito de Ocultar
    const estilos = document.createElement('style');
    estilos.textContent = `
        /* Container fixo para centralizar o botão no topo da tela */
        .container-gatilho-painel {
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 9999; /* Garante que fique acima de tudo */
            width: auto;
            display: flex;
            justify-content: center;
        }

        /* Estilização Premium do Botão */
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
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Efeito de passar o mouse */
        .btn-toggle-paineis:hover {
            background: rgba(13, 18, 30, 0.85);
            border-color: rgba(244, 114, 182, 0.4); /* Brilho rosa sutil */
            color: #ffffff;
            transform: translateY(2px) scale(1.02);
            box-shadow: 0 12px 28px rgba(244, 114, 182, 0.1);
        }

        /* Estilo do Ícone Interno */
        .btn-toggle-paineis i {
            font-size: 0.85rem;
            transition: transform 0.3s ease;
        }

        /* Classe de transição suave que será aplicada nos cards e créditos */
        .card, .card-secundario, .container-creditos {
            transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }

        /* Classe ativa que esconde os elementos sem quebrar o layout */
        .paineis-ocultos {
            opacity: 0 !important;
            transform: translateY(20px) scale(0.95) !important;
            pointer-events: none !important;
        }
    `;
    document.head.appendChild(estilos);

    // 2. Criação da Estrutura do Botão no DOM
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

    // 3. Lógica de Alternância (Toggle)
    botao.addEventListener('click', () => {
        // Seleciona de forma dinâmica todos os painéis criados pelos outros arquivos JS
        const elementosParaOcultar = document.querySelectorAll('.card, .card-secundario, .container-creditos');
        const textoBtn = document.getElementById('texto-btn-paineis');
        const iconeBtn = botao.querySelector('i');

        // Verifica se o primeiro painel encontrado já está oculto
        const primeiroElemento = elementosParaOcultar[0];
        const estaoOcultos = primeiroElemento ? primeiroElemento.classList.contains('paineis-ocultos') : false;

        elementosParaOcultar.forEach(el => {
            if (estaoOcultos) {
                el.classList.remove('paineis-ocultos');
            } else {
                el.classList.add('paineis-ocultos');
            }
        });

        // Atualiza o estado visual do botão principal
        if (estaoOcultos) {
            textoBtn.textContent = 'Esconder painéis';
            iconeBtn.className = 'fa-solid fa-eye-slash';
        } else {
            textoBtn.textContent = 'Mostrar painéis';
            iconeBtn.className = 'fa-solid fa-eye';
        }
    });

})();
