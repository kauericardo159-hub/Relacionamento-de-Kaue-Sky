(function() {
    // 1. Injeção de CSS de Alta Performance e Ampliação do Espaço de Fundo
    const style = document.createElement('style');
    style.innerHTML = `
        /* Canvas fixo em segunda camada - Processamento direto via Hardware */
        #universo-canvas-estrelado {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 0;
            will-change: transform;
        }

        /* LIBERAÇÃO TOTAL DA FOTO: Aumenta drasticamente a rolagem para baixo */
        body::after {
            content: "";
            display: block;
            width: 100%;
            height: 450px; /* Espaço massivo para empurrar os cartões para cima e ver todo o fundo */
            pointer-events: none;
        }

        /* Suaviza o comportamento de rolagem no dispositivo */
        html {
            scroll-behavior: smooth;
        }
    `;
    document.head.appendChild(style);

    // 2. Criação do Elemento Único de Renderização
    const canvas = document.createElement('canvas');
    canvas.id = 'universo-canvas-estrelado';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    // Caracteres exatos enviados pelo seu namorado
    const glifosEstrelas = ['☆', '★', '✧', '•', '°', '✮', '✯', '✩', '✬', '✰'];
    
    // Paleta de cores combinando com o tema do site (com as variações de opacidade aplicadas via render)
    const coresTema = [
        { r: 255, g: 255, b: 255 }, // Branco puro
        { r: 59,  g: 130, b: 246 }, // Azul Sky (#3b82f6)
        { r: 244, g: 114, b: 182 }  // Rosa Kauê (#f472b6)
    ];

    const estrelas = [];
    
    // Redução da densidade para garantir fluidez absoluta (Mobile vs Desktop)
    const maxEstrelas = window.innerWidth < 600 ? 35 : 85;

    // Ajusta o tamanho do Canvas dinamicamente evitando distorção de pixels
    function redimensionarCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    redimensionarCanvas();
    window.addEventListener('resize', redimensionarCanvas);

    // 3. Inicialização do Array de Estrutura das Estrelas
    for (let i = 0; i < maxEstrelas; i++) {
        // Define a cor: 50% de chance de ser branca, 25% azul, 25% rosa
        const chanceCor = Math.random();
        let corEscolhida = coresTema[0]; // Padrão: Branco
        if (chanceCor > 0.50 && chanceCor <= 0.75) corEscolhida = coresTema[1]; // Azul
        if (chanceCor > 0.75) corEscolhida = coresTema[2]; // Rosa

        estrelas.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            caractere: glifosEstrelas[Math.floor(Math.random() * glifosEstrelas.length)],
            tamanho: Math.floor(Math.random() * 8) + 8, // Delicadas: entre 8px e 16px
            cor: corEscolhida,
            opacidadeBase: Math.random() * 0.35 + 0.20, // Ajustado para destacar melhor as cores
            velocidadeCintilacao: Math.random() * 0.02 + 0.006,
            fase: Math.random() * Math.PI
        });
    }

    // 4. Loop de Renderização Otimizado nativamente pelo Navegador
    function animarCeuEstrelado(tempo) {
        // Limpa a tela única de desenho antes do próximo frame
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < maxEstrelas; i++) {
            const e = estrelas[i];

            // Reajusta posição caso a tela mude de tamanho
            if (e.x > canvas.width) e.x = Math.random() * canvas.width;
            if (e.y > canvas.height) e.y = Math.random() * canvas.height;

            // Variação matemática da oscilação do brilho (suave e sem travar)
            e.fase += e.velocidadeCintilacao;
            const oscilacao = (Math.sin(e.fase) + 1) / 2; // Normaliza entre 0 e 1
            const opacidadeAtual = e.opacidadeBase + oscilacao * (0.75 - e.opacidadeBase);

            // Efeito Degradê Invisível: Estrelas perdem brilho perto da base para isolar a foto limpa
            const fatorDesaparecimentoBase = Math.min(1, (canvas.height - e.y) / 180);
            const opacidadeFinal = opacidadeAtual * fatorDesaparecimentoBase;

            // Ativa um leve efeito de brilho neon (Glow) para estrelas coloridas ou maiores que 12px
            if ((e.cor.g !== 255 || e.tamanho > 12) && window.innerWidth > 600) {
                ctx.shadowBlur = 8;
                ctx.shadowColor = `rgba(${e.cor.r}, ${e.cor.g}, ${e.cor.b}, ${opacidadeFinal})`;
            } else {
                ctx.shadowBlur = 0; // Desliga o efeito em mini estrelas ou mobile para poupar bateria
            }
            
            // Configuração de estilo de desenho no Canvas
            ctx.fillStyle = `rgba(${e.cor.r}, ${e.cor.g}, ${e.cor.b}, ${opacidadeFinal})`;
            ctx.font = `bold ${e.tamanho}px Poppins, Arial, sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            // Desenha o caractere diretamente na tela única
            ctx.fillText(e.caractere, e.x, e.y);
        }

        // Chama o próximo frame delegando o controle de energia e fluidez para o navegador
        requestAnimationFrame(animarCeuEstrelado);
    }

    // Inicia a execução da animação limpa
    requestAnimationFrame(animarCeuEstrelado);
})();
