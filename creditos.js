(function() {
    // Só executa o script se o site NÃO estiver em manutenção
    if (typeof emManutencao !== 'undefined' && emManutencao === true) {
        return; 
    }

    const estilos = document.createElement('style');
    estilos.textContent = `
        .container-creditos {
            margin: 35px auto;
            width: 100%;
            max-width: 340px;
            background: rgba(13, 18, 30, 0.5);
            border: 1px solid rgba(255, 255, 255, 0.08);
            padding: 16px 20px;
            border-radius: 24px;
            backdrop-filter: blur(16px);
            display: flex;
            align-items: center;
            gap: 16px;
            cursor: pointer;
            text-decoration: none;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }

        .container-creditos:hover {
            transform: translateY(-4px);
            border-color: rgba(59, 130, 246, 0.5);
            background: rgba(13, 18, 30, 0.7);
            box-shadow: 0 15px 30px rgba(59, 130, 246, 0.15);
        }

        .foto-github {
            width: 55px;
            height: 55px;
            border-radius: 18px;
            object-fit: cover;
            border: 2px solid rgba(255, 255, 255, 0.1);
        }

        .info-wrapper {
            display: flex;
            flex-direction: column;
            text-align: left;
        }

        .label-topo {
            font-size: 0.6rem;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: #64748b;
            font-weight: 700;
            margin-bottom: 2px;
        }

        .titulo-role {
            font-size: 0.75rem;
            color: #3b82f6;
            font-weight: 700;
            text-transform: uppercase;
        }

        .nome-autor {
            font-size: 1.05rem;
            font-weight: 700;
            color: #f8fafc;
            line-height: 1.2;
        }
    `;
    document.head.appendChild(estilos);

    // 2. Criação da Estrutura (Agora é um link único)
    const linkCreditos = document.createElement('a');
    linkCreditos.className = 'container-creditos';
    linkCreditos.href = "https://github.com/kauericardo159-hub";
    linkCreditos.target = "_blank";
    linkCreditos.rel = "noopener noreferrer";
    
    linkCreditos.innerHTML = `
        <img src="https://avatars.githubusercontent.com/u/250105175?s=400&u=57b36eaa005058605036e22b91ea7136ec8d3f7f&v=4" class="foto-github" alt="KaueTheProtogen">
        <div class="info-wrapper">
            <span class="label-topo">Site feito por:</span>
            <span class="titulo-role">Owner</span>
            <span class="nome-autor">KaueTheProtogen</span>
        </div>
    `;

    // 3. Inserção
    setTimeout(() => {
        const cardSecundario = document.querySelector('.card-secundario');
        if (cardSecundario) {
            cardSecundario.parentNode.insertBefore(linkCreditos, cardSecundario.nextSibling);
        } else {
            document.body.appendChild(linkCreditos);
        }
    }, 120);
})();
