(function() {
    'use strict';
    if (typeof emManutencao !== 'undefined' && emManutencao === true) return;

    const DATA_CONHECIMENTO = new Date('2022-12-16T00:00:00-03:00');

    // 1. Criação do elemento
    const cardSecundario = document.createElement('div');
    cardSecundario.className = 'card-secundario';
    cardSecundario.id = 'container-card-secundario'; // Adicionei um ID para facilitar a busca
    cardSecundario.innerHTML = `
        <h3 class="card-secundario-titulo">Nos conhecemos há:</h3>
        <div id="contador-tempo-conhecidos" class="contador-pequeno">Calculando...</div>
    `;

    // 2. Inserção no DOM
    const tentarInserir = setInterval(() => {
        const refCard1 = document.querySelector('.card');
        if (refCard1) {
            refCard1.parentNode.insertBefore(cardSecundario, refCard1.nextSibling);
            clearInterval(tentarInserir);
            // 3. Força a primeira execução imediata após a inserção
            atualizarContadorConhecidos();
        }
    }, 100);

    // 4. Lógica de cálculo
    function atualizarContadorConhecidos() {
        const container = document.getElementById('contador-tempo-conhecidos');
        if (!container) return; // Se não achou o elemento, interrompe

        const agora = new Date();
        
        let anos = agora.getFullYear() - DATA_CONHECIMENTO.getFullYear();
        let meses = agora.getMonth() - DATA_CONHECIMENTO.getMonth();
        let dias = agora.getDate() - DATA_CONHECIMENTO.getDate();

        if (dias < 0) {
            meses--;
            const mesAnterior = new Date(agora.getFullYear(), agora.getMonth(), 0);
            dias += mesAnterior.getDate();
        }
        if (meses < 0) {
            anos--;
            meses += 12;
        }

        // Renderização forçada
        container.innerHTML = `
            <span class="tempo-destaque">${anos}</span> anos, 
            <span class="tempo-destaque">${meses}</span> meses e 
            <span class="tempo-destaque">${dias}</span> dias
        `;
    }

    // 5. Ciclo de atualização
    setInterval(atualizarContadorConhecidos, 60000); // Mudei para 1 minuto para garantir atualização constante
    atualizarContadorConhecidos();
})();
