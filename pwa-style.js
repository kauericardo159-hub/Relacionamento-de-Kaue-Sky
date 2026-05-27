(function() {
    'use strict';

    // Não executa se estiver em manutenção
    if (typeof emManutencao !== 'undefined' && emManutencao === true) return;

    // 1. Injeção de Estilos Cinematográficos (Cenário App vs Site)
    const estilos = document.createElement('style');
    estilos.textContent = `
        /* --- TELA DE INTRODUÇÃO (SPLASH SCREEN APP) --- */
        .splash-pwa-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: #000000;
            z-index: 100000;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            transition: opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), visibility 0.8s;
        }

        .splash-logo {
            width: 150px;
            height: 150px;
            object-fit: contain;
            filter: drop-shadow(0 0 20px rgba(244, 114, 182, 0.4));
            opacity: 0;
            transform: scale(0.8) translateY(10px);
            animation: surgirLogo 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s forwards;
        }

        .splash-carregando {
            margin-top: 24px;
            width: 40px;
            height: 2px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 2px;
            overflow: hidden;
            position: relative;
        }

        .splash-barra {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 50%;
            background: linear-gradient(90deg, #f472b6, #3b82f6);
            border-radius: 2px;
            animation: carregarSplash 1.6s ease-in-out infinite;
        }

        @keyframes surgirLogo {
            to { opacity: 1; transform: scale(1) translateY(0); }
        }

        @keyframes carregarSplash {
            0% { left: -50%; }
            100% { left: 100%; }
        }

        /* --- CARD DE INSTALAÇÃO IN-APP (VISÃO SÓ NO NAVEGADOR) --- */
        .banner-instalacao-pwa {
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            width: calc(100% - 40px);
            max-width: 340px;
            background: rgba(13, 18, 30, 0.75);
            border: 1px solid rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            padding: 16px;
            border-radius: 24px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.5);
            z-index: 9998;
            display: flex;
            align-items: center;
            gap: 14px;
            opacity: 0;
            transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .banner-instalacao-pwa.mostrar {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }

        .pwa-icone-mini {
            width: 48px;
            height: 48px;
            border-radius: 12px;
            object-fit: cover;
            border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .pwa-info-texto {
            display: flex;
            flex-direction: column;
            flex: 1;
            text-align: left;
        }

        .pwa-txt-titulo {
            font-family: 'Poppins', sans-serif;
            font-size: 0.8rem;
            font-weight: 700;
            color: #ffffff;
        }

        .pwa-txt-desc {
            font-family: 'Poppins', sans-serif;
            font-size: 0.65rem;
            color: #94a3b8;
        }

        .btn-instalar-pwa {
            background: linear-gradient(135deg, #f472b6, #3b82f6);
            border: none;
            padding: 8px 14px;
            border-radius: 12px;
            color: #ffffff;
            font-family: 'Poppins', sans-serif;
            font-size: 0.7rem;
            font-weight: 700;
            cursor: pointer;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .btn-instalar-pwa:hover {
            transform: scale(1.05);
            box-shadow: 0 0 12px rgba(244, 114, 182, 0.3);
        }
    `;
    document.head.appendChild(estilos);

    // 2. Detecção de Ambiente: Ele está abrindo como APP instalado ou no Navegador?
    const estaNoApp = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;

    if (estaNoApp) {
        // --- COMPORTAMENTO DO APLICATIVO INSTALADO ---
        // Cria uma tela de boot escura com o logotipo desenhado humano do K&S surgindo
        const splash = document.createElement('div');
        splash.className = 'splash-pwa-container';
        splash.innerHTML = `
            <img src="icon-512.png" class="splash-logo" alt="K & S">
            <div class="splash-carregando">
                <div class="splash-barra"></div>
            </div>
        `;
        document.body.appendChild(splash);

        // Remove a splash screen com transição suave após carregar os elementos de fundo
        window.addEventListener('load', () => {
            setTimeout(() => {
                splash.style.opacity = '0';
                splash.style.visibility = 'hidden';
                setTimeout(() => splash.remove(), 800);
            }, 2200); // 2.2 segundos de imersão de boot
        });

    } else {
        // --- COMPORTAMENTO DO SITE NO NAVEGADOR ---
        // Exibe um card minimalista e elegante convidando o usuário a instalar o app dedicado
        let capturaInstalacao = null;

        window.addEventListener('beforeinstallprompt', (e) => {
            // Previne o pop-up feio padrão do navegador cinza
            e.preventDefault();
            capturaInstalacao = e;

            // Cria nosso próprio prompt estilizado integrado à UI
            const banner = document.createElement('div');
            banner.className = 'banner-instalacao-pwa';
            banner.innerHTML = `
                <img src="icon-192.png" class="pwa-icone-mini" alt="Icone K&S">
                <div class="pwa-info-texto">
                    <span class="pwa-txt-titulo">Instalar Aplicativo</span>
                    <span class="pwa-txt-desc">Acesse nossa contagem direto da tela inicial.</span>
                </div>
                <button class="btn-instalar-pwa" id="gatilho-instalar-pwa">Adicionar</button>
            `;
            document.body.appendChild(banner);

            // Anima a entrada do prompt após 3 segundos navegando no site
            setTimeout(() => {
                banner.classList.add('mostrar');
            }, 3000);

            // Executa a instalação premium ao clicar
            document.getElementById('gatilho-instalar-pwa').addEventListener('click', () => {
                banner.classList.remove('mostrar');
                if (capturaInstalacao) {
                    capturaInstalacao.prompt();
                    capturaInstalacao.userChoice.then((escolha) => {
                        if (escolha.outcome === 'accepted') {
                            console.log('K & S: Usuário aceitou instalar a aplicação.');
                        }
                        capturaInstalacao = null;
                        setTimeout(() => banner.remove(), 500);
                    });
                }
            });
        });
    }
})();
