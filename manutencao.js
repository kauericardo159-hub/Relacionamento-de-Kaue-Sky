(function() {
    // Verifica de forma segura se a manutenção precisa ser exibida
    if (typeof emManutencao !== 'undefined' && emManutencao === true) {
        
        // Fallbacks de segurança caso as variáveis globais não estejam declaradas
        const titulo = typeof tituloManutencao !== 'undefined' ? tituloManutencao : "Manutenção em Andamento";
        const mensagem = typeof mensagemManutencao !== 'undefined' ? mensagemManutencao : "Estamos preparando novidades! Voltamos em breve.";
        const isManual = typeof emManutencaoManual !== 'undefined' ? emManutencaoManual : false;
        const dataAlvo = typeof dataAlvoObjeto !== 'undefined' ? dataAlvoObjeto : null;
        
        // 1. Estilização CSS Premium Otimizada (Injetada dinamicamente)
        const style = document.createElement('style');
        style.innerHTML = `
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&display=swap');

            /* Registro da variável para animação por hardware (GPU) */
            @property --borda-angulo {
                syntax: '<angle>';
                initial-value: 0deg;
                inherits: false;
            }

            #tela-manutencao {
                position: fixed;
                top: 0; left: 0; width: 100vw; height: 100vh;
                background: linear-gradient(rgba(14, 16, 27, 0.82), rgba(14, 16, 27, 0.9)), url('fundomanutencao.jpeg');
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
                background-attachment: fixed;
                color: #f8fafc;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                z-index: 999999;
                text-align: center;
                padding: 20px;
                font-family: 'Poppins', sans-serif;
                overflow-y: auto;
            }

            /* --- CARD DE MANUTENÇÃO GLASSMORPHISM --- */
            .manutencao-card {
                background: rgba(14, 16, 27, 0.65);
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
                padding: 3.5rem 2.5rem;
                border-radius: 32px;
                
                /* Borda em movimento ultra-suave */
                border: 5px solid transparent;
                background-clip: padding-box, border-box;
                background-origin: padding-box, border-box;
                background-image: linear-gradient(rgba(14, 16, 27, 0.85), rgba(14, 16, 27, 0.85)), 
                                  conic-gradient(from var(--borda-angulo), #3b82f6, #f472b6, #3b82f6);
                
                box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.8),
                            0 0 50px rgba(244, 114, 182, 0.08);
                max-width: 550px;
                width: 100%;
                animation: flutuarManutencao 5s ease-in-out infinite, rotacionarBordaMaint 6s linear infinite;
            }

            @keyframes flutuarManutencao {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-8px); }
            }

            @keyframes rotacionarBordaMaint {
                to { --borda-angulo: 360deg; }
            }

            .manutencao-icone-wrapper {
                margin-bottom: 24px;
            }

            .manutencao-icone {
                font-size: 3.8rem;
                background: linear-gradient(45deg, #3b82f6, #f472b6);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                animation: rodarEngrenagem 12s linear infinite;
                filter: drop-shadow(0 2px 8px rgba(244, 114, 182, 0.2));
            }

            @keyframes rodarEngrenagem {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }

            .manutencao-card h2 { 
                color: #ffffff; 
                font-size: 2.1rem; 
                font-weight: 800;
                margin-bottom: 14px;
                letter-spacing: -0.5px;
            }

            .manutencao-card p {
                color: #cbd5e1;
                font-size: 1rem;
                line-height: 1.6;
                margin-bottom: 0;
            }

            /* Container do Cronograma */
            .info-agendamento-container {
                margin-top: 28px;
                padding-top: 24px;
                border-top: 1px solid rgba(255, 255, 255, 0.08);
                display: flex;
                flex-direction: column;
                gap: 14px;
            }

            .texto-data-abertura {
                font-size: 0.8rem;
                color: #94a3b8;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 1.2px;
            }

            .texto-data-abertura span {
                color: #3b82f6;
                font-weight: 700;
            }

            .cronometro-regressivo {
                font-size: 1.15rem;
                font-weight: 700;
                color: #f472b6;
                letter-spacing: 0.5px;
                background: rgba(244, 114, 182, 0.08);
                padding: 10px 24px;
                border-radius: 16px;
                display: inline-block;
                margin: 0 auto;
                border: 1px solid rgba(244, 114, 182, 0.2);
                box-shadow: inset 0 2px 4px rgba(244, 114, 182, 0.02);
            }

            /* --- CARD DE CRÉDITOS ABAIXO --- */
            .container-creditos-manutencao {
                margin-top: 30px;
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 100%;
                max-width: 260px;
                background: rgba(14, 16, 27, 0.6);
                border: 1px solid rgba(255, 255, 255, 0.06);
                padding: 16px;
                border-radius: 24px;
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
                box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
                transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.3s ease;
            }

            .container-creditos-manutencao:hover {
                transform: translateY(-4px);
                border-color: rgba(244, 114, 182, 0.25);
            }

            .texto-feito-por {
                font-size: 0.62rem;
                text-transform: uppercase;
                letter-spacing: 2px;
                color: #64748b;
                font-weight: 700;
                margin-bottom: 12px;
            }

            .perfil-autor {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;
                margin-bottom: 14px;
            }

            .foto-github {
                width: 48px;
                height: 48px;
                border-radius: 50%;
                border: 2px solid rgba(255, 255, 255, 0.1);
                object-fit: cover;
                transition: border-color 0.3s ease, transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }

            .container-creditos-manutencao:hover .foto-github {
                border-color: #f472b6;
                transform: scale(1.08);
            }

            .nome-autor {
                font-size: 0.9rem;
                font-weight: 700;
                color: #e2e8f0;
                letter-spacing: 0.3px;
            }

            .link-github-botao {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                background: rgba(255, 255, 255, 0.03);
                border: 1px solid rgba(255, 255, 255, 0.06);
                padding: 8px 16px;
                border-radius: 12px;
                text-decoration: none;
                color: #94a3b8;
                font-size: 0.72rem;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 1px;
                transition: all 0.25s ease;
                width: 100%;
            }

            .link-github-botao:hover {
                color: #ffffff;
                background: #24292e;
                border-color: rgba(255, 255, 255, 0.15);
                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            }

            /* --- DESIGN RESPONSIVo ADAPTATIVO --- */
            @media (max-width: 600px) {
                #tela-manutencao { padding: 16px; }
                .manutencao-card { padding: 2.5rem 1.3rem; border-radius: 24px; border-width: 4px; }
                .manutencao-icone { font-size: 3.2rem; }
                .manutencao-card h2 { font-size: 1.6rem; }
                .manutencao-card p { font-size: 0.92rem; }
                .cronometro-regressivo { font-size: 0.95rem; padding: 8px 16px; border-radius: 12px; }
                .container-creditos-manutencao { margin-top: 20px; padding: 14px; border-radius: 20px; }
                .foto-github { width: 42px; height: 42px; }
                .nome-autor { font-size: 0.82rem; }
            }
        `;
        document.head.appendChild(style);

        // 2. Construção da Estrutura Base no DOM
        document.body.innerHTML = `
            <div id="tela-manutencao">
                <div class="manutencao-card">
                    <div class="manutencao-icone-wrapper">
                        <i class="fa-solid fa-gears manutencao-icone"></i>
                    </div>
                    <h2>${titulo}</h2>
                    <p>${mensagem}</p>
                    
                    <!-- Área do Cronômetro -->
                    <div id="bloco-cronograma" class="info-agendamento-container" style="display: none;">
                        <div id="data-previsao-texto" class="texto-data-abertura"></div>
                        <div id="contador-regressivo-tempo" class="cronometro-regressivo"></div>
                    </div>
                </div>

                <!-- Créditos Integrados abaixo do Card -->
                <div class="container-creditos-manutencao">
                    <span class="texto-feito-por">Site feito por:</span>
                    <div class="perfil-autor">
                        <img src="https://avatars.githubusercontent.com/u/250105175?s=400&u=57b36eaa005058605036e22b91ea7136ec8d3f7f&v=4" class="foto-github" alt="Foto KaueTheProtogen">
                        <span class="nome-autor">KaueTheProtogen</span>
                    </div>
                    <a href="https://github.com/kauericardo159-hub" target="_blank" rel="noopener noreferrer" class="link-github-botao">
                        <i class="fa-brands fa-github"></i>
                        <span>Github</span>
                    </a>
                </div>
            </div>
        `;

        // 3. Execução do Cronômetro com suporte a múltiplos dias
        if (dataAlvo && !isManual) {
            const blocoCronograma = document.getElementById('bloco-cronograma');
            const dataTextoEl = document.getElementById('data-previsao-texto');
            const contadorEl = document.getElementById('contador-regressivo-tempo');

            const alvoTimestamp = dataAlvo.getTime();

            // Formatação amigável PT-BR (DD/MM/AAAA às HH:MM)
            const dia = String(dataAlvo.getDate()).padStart(2, '0');
            const mes = String(dataAlvo.getMonth() + 1).padStart(2, '0');
            const ano = dataAlvo.getFullYear();
            const horas = String(dataAlvo.getHours()).padStart(2, '0');
            const minutos = String(dataAlvo.getMinutes()).padStart(2, '0');

            dataTextoEl.innerHTML = `Previsão de liberação: <span>${dia}/${mes}/${ano} às ${horas}:${minutos}</span>`;
            blocoCronograma.style.display = 'flex';

            function atualizarRelogioRegressivo() {
                const agoraTimestamp = new Date().getTime();
                const diferenca = alvoTimestamp - agoraTimestamp;

                if (diferenca <= 0) {
                    clearInterval(intervaloCronometro);
                    window.location.reload();
                    return;
                }

                // Cálculo estruturado incluindo Dias
                const tDias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
                const tHoras = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const tMinutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
                const tSegundos = Math.floor((diferenca % (1000 * 60)) / 1000);

                const hDisplay = String(tHoras).padStart(2, '0');
                const mDisplay = String(tMinutos).padStart(2, '0');
                const sDisplay = String(tSegundos).padStart(2, '0');

                // Exibe o dia apenas se for maior que zero para não sobrecarregar a interface
                if (tDias > 0) {
                    contadorEl.innerText = `Abre em: ${tDias}d ${hDisplay}h ${mDisplay}m ${sDisplay}s`;
                } else {
                    contadorEl.innerText = `Abre em: ${hDisplay}h ${mDisplay}m ${sDisplay}s`;
                }
            }

            atualizarRelogioRegressivo();
            const intervaloCronometro = setInterval(atualizarRelogioRegressivo, 1000);
        }
    }
})();
