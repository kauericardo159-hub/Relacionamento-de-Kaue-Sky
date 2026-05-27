(function() {
    'use strict';
    if (typeof emManutencao !== 'undefined' && emManutencao === true) return;

    const DATA_RELACIONAMENTO = new Date('2026-04-25T01:30:00-03:00');
    const LABELS = { anos: 'Anos', meses: 'Meses', semanas: 'Semanas', dias: 'Dias', horas: 'Horas', minutos: 'Minutos', segundos: 'Segundos' };

    // --- CRIAÇÃO DA ESTRUTURA COMPLETA ---
    const cardPrincipal = document.createElement('div');
    cardPrincipal.className = 'card';
    cardPrincipal.innerHTML = `
        <img src="efeito1.png" class="efeito-img efeito-esquerdo" alt="Efeito" loading="eager">
        <img src="efeito2.png" class="efeito-img efeito-direito" alt="Efeito" loading="eager">
        
        <div class="topo-relacionamento">
            <div class="perfil-container">
                <div class="perfil-wrapper kaue-borda">
                    <img src="kaue.png" class="foto-perfil" alt="Kauê">
                    <img src="moldura2.png" class="moldura" alt="Moldura">
                </div>
                <span class="nome nome-kaue">Kauê</span>
            </div>
            
            <div class="centro-container">
                <div class="meme-wrapper"><img src="meme.gif" class="meme-gif" alt="Meme"></div>
                <span class="e-simbolo">&</span>
            </div>
            
            <div class="perfil-container">
                <div class="perfil-wrapper sky-borda">
                    <img src="sky.png" class="foto-perfil" alt="Sky">
                    <img src="moldura1.png" class="moldura" alt="Moldura">
                </div>
                <span class="nome nome-sky">Sky</span>
            </div>
        </div>

        <div class="info-tempo">
            <p class="subtitulo">
                <i class="fa-solid fa-heart" style="color: #f472b6;"></i> 
                Juntos desde 25/04/2026 
                <i class="fa-solid fa-heart" style="color: #3b82f6;"></i>
            </p>
            <div id="contador" class="contador-horizontal"></div>
        </div>
    `;
    document.body.appendChild(cardPrincipal);

    // --- LÓGICA DE CÁLCULO E RENDERIZAÇÃO ---
    const contador = document.getElementById('contador');
    
    function atualizarContador() {
        const agora = new Date();
        const diff = (agora - DATA_RELACIONAMENTO) / 1000;
        if (diff < 0) return;

        // Cálculo de unidades
        let totalSegundos = Math.floor(diff);
        const anos = Math.floor(totalSegundos / 31536000); totalSegundos %= 31536000;
        const meses = Math.floor(totalSegundos / 2592000); totalSegundos %= 2592000;
        const semanas = Math.floor(totalSegundos / 604800); totalSegundos %= 604800;
        const dias = Math.floor(totalSegundos / 86400); totalSegundos %= 86400;
        const horas = Math.floor(totalSegundos / 3600); totalSegundos %= 3600;
        const minutos = Math.floor(totalSegundos / 60);
        const segundos = totalSegundos % 60;

        const dados = [anos, meses, semanas, dias, horas, minutos, segundos];
        const chaves = ['anos', 'meses', 'semanas', 'dias', 'horas', 'minutos', 'segundos'];

        if (contador.innerHTML === "") {
            chaves.forEach((chave, index) => {
                contador.innerHTML += `
                    <div class="tempo-item">
                        <span class="valor" id="val-${chave}">0</span>
                        <span class="label">${LABELS[chave]}</span>
                    </div>`;
            });
        }

        // Atualização SEM zeros à esquerda
        chaves.forEach((chave, index) => {
            const el = document.getElementById(`val-${chave}`);
            if (el) {
                // Aqui removemos o padStart para exibir apenas o número puro (sem o zero à esquerda)
                el.textContent = dados[index];
                el.className = dados[index] > 0 ? 'valor valor-ativo' : 'valor valor-zero';
            }
        });
    }

    setInterval(atualizarContador, 1000);
    atualizarContador();
})();
