(function() {
    'use strict';

    if (typeof emManutencao !== 'undefined' && emManutencao === true) return;

    // 1. Injeção Visual da Caixa de Alerta de Atualização
    const estilos = document.createElement('style');
    estilos.textContent = `
        .prompt-atualizacao-pwa {
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            width: calc(100% - 40px);
            max-width: 340px;
            background: rgba(13, 18, 30, 0.8);
            border: 1px solid rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            padding: 18px;
            border-radius: 24px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.6);
            z-index: 100001; /* Fica acima até da Splash Screen */
            display: flex;
            flex-direction: column;
            gap: 14px;
            opacity: 0;
            transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .prompt-atualizacao-pwa.mostrar {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }

        .prompt-pwa-topo {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .prompt-pwa-txt {
            display: flex;
            flex-direction: column;
            text-align: left;
        }

        .prompt-pwa-titulo {
            font-family: 'Poppins', sans-serif;
            font-size: 0.85rem;
            font-weight: 700;
            color: #ffffff;
        }

        .prompt-pwa-desc {
            font-family: 'Patrick Hand', sans-serif;
            font-size: 0.8rem;
            color: #94a3b8;
            line-height: 1.2;
        }

        .prompt-pwa-botoes {
            display: flex;
            gap: 8px;
            width: 100%;
        }

        .btn-pwa-acao {
            flex: 1;
            padding: 10px;
            border-radius: 12px;
            font-family: 'Poppins', sans-serif;
            font-size: 0.72rem;
            font-weight: 700;
            cursor: pointer;
            border: none;
            transition: transform 0.2s ease, background 0.2s ease;
            -webkit-tap-highlight-color: transparent;
        }

        .btn-pwa-atualizar {
            background: linear-gradient(135deg, #f472b6, #3b82f6);
            color: #ffffff;
        }

        .btn-pwa-recusar {
            background: rgba(255, 255, 255, 0.06);
            border: 1px solid rgba(255, 255, 255, 0.08);
            color: #94a3b8;
        }

        .btn-pwa-acao:hover {
            transform: scale(1.02);
        }
    `;
    document.head.appendChild(estilos);

    // 2. Escuta do Service Worker para capturar novas atualizações
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(reg => {
            // Se houver um novo sw.js esperando para ser ativado
            if (reg.waiting) {
                invocarPromptAtualizacao(reg.waiting);
                return;
            }

            // Se uma nova atualização chegar enquanto o app estiver aberto
            reg.addEventListener('updatefound', () => {
                const novoWorker = reg.installing;
                novoWorker.addEventListener('statechange', () => {
                    if (novoWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        invocarPromptAtualizacao(novoWorker);
                    }
                });
            });
        });

        // Evento que recarrega a página de forma limpa assim que o novo Service Worker assume o controle
        let reiniciando = false;
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            if (!reiniciando) {
                reiniciando = true;
                window.location.reload();
            }
        });
    }

    // 3. Função que monta a interface idêntica ao prompt de instalação
    function invocarPromptAtualizacao(workerEspera) {
        // Evita duplicar o banner na tela
        if (document.getElementById('prompt-atualizar-sistema')) return;

        const banner = document.createElement('div');
        banner.id = 'prompt-atualizar-sistema';
        banner.className = 'prompt-atualizacao-pwa';
        banner.innerHTML = `
            <div class="prompt-pwa-topo">
                <img src="icon-192.png" style="width: 42px; height: 42px; border-radius: 10px;" alt="K&S">
                <div class="prompt-pwa-txt">
                    <span class="prompt-pwa-titulo">Atualização Disponível</span>
                    <span class="prompt-pwa-desc">Novas melhorias prontas para o nosso app!</span>
                </div>
            </div>
            <div class="prompt-pwa-botoes">
                <button class="btn-pwa-acao btn-pwa-recusar" id="btn-pwa-ignorar">Depois</button>
                <button class="btn-pwa-acao btn-pwa-atualizar" id="btn-pwa-aplicar">Atualizar</button>
            </div>
        `;
        document.body.appendChild(banner);

        // Mostra o card suavemente subindo do rodapé
        setTimeout(() => banner.classList.add('mostrar'), 800);

        // Ação de Aplicar Atualização imediatamente
        document.getElementById('btn-pwa-aplicar').addEventListener('click', () => {
            banner.classList.remove('mostrar');
            // Manda um comando para o Service Worker parar a espera e atualizar os arquivos na hora
            workerEspera.postMessage({ action: 'skipWaiting' });
        });

        // Ação de fechar e atualizar depois
        document.getElementById('btn-pwa-ignorar').addEventListener('click', () => {
            banner.classList.remove('mostrar');
            setTimeout(() => banner.remove(), 500);
        });
    }
})();
