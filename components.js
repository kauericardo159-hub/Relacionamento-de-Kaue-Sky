/* ==========================================================================
      COMPONENTS SYSTEM - NEXUS GRID V5.0 (TITANIUM ADAPTIVE)
      Novidades: Cores Dinâmicas, Status Preview e Moldura Sync
========================================================================== */

function loadComponents() {
    // 1. Carrega dados do motor Nexus para sincronizar cores e status
    const profile = typeof NexusStorage !== 'undefined' ? NexusStorage.loadProfile() : {
        nick: localStorage.getItem('nexus_user_nick') || '@visitante',
        avatar: localStorage.getItem('nexus_user_avatar') || 'user-photo.jpg',
        favColor: '#ff8c00',
        statusEmoji: '💭',
        statusText: ''
    };

    // Formata o status para não ficar gigante no topo
    const shortStatus = profile.statusText ? profile.statusText.substring(0, 12) + "..." : "Sintonizado";

    const style = document.createElement('style');
    style.id = 'nexus-components-core';
    style.innerHTML = `
        :root {
            --user-color: ${profile.favColor || '#ff8c00'};
            --user-glow: ${profile.favColor}66; /* Cor com transparência para brilho */
        }

        /* --- NAVBAR TOPO (NEXUS GRID) --- */
        .navbar-topo {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 25px;
            background: rgba(5, 5, 5, 0.8);
            backdrop-filter: blur(25px) saturate(150%);
            -webkit-backdrop-filter: blur(25px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            position: sticky;
            top: 0;
            z-index: 10000;
        }

        .logo-box { display: flex; align-items: center; gap: 10px; cursor: pointer; }
        .logo-box img { width: 30px; height: 30px; filter: drop-shadow(0 0 5px var(--user-glow)); }
        .logo-box span { 
            font-weight: 900; 
            font-size: 1.1rem; 
            color: #fff; 
            letter-spacing: -0.5px;
            font-family: 'Inter', sans-serif;
        }
        .logo-box span b { color: var(--user-color); text-shadow: 0 0 10px var(--user-glow); }

        .user-header-info { display: flex; align-items: center; gap: 15px; }
        .user-text-wrap { display: flex; flex-direction: column; text-align: right; }
        .user-text-wrap .name { font-weight: 900; font-size: 0.85rem; color: #fff; letter-spacing: 0.5px; }
        
        /* Status do Usuário (Emoji + Texto) */
        .user-bio-status {
            font-size: 0.65rem;
            color: #666;
            font-weight: 700;
            margin-top: 1px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 4px;
        }
        .user-bio-status b { color: var(--user-color); }

        /* Sistema de Bolinha Online (Não mexer na lógica de stats-auto-system) */
        .status-row { 
            display: flex; 
            align-items: center; 
            justify-content: flex-end; 
            gap: 5px; 
            margin-top: 3px;
        }
        .status-icon { width: 10px; height: 10px; object-fit: contain; }
        .status-text { font-size: 0.55rem; font-weight: 900; color: #444; text-transform: uppercase; letter-spacing: 1px; }

        .mini-avatar-header { 
            width: 42px; 
            height: 42px; 
            border-radius: 14px; /* Estilo levemente quadrado/arredondado moderno */
            border: 2px solid var(--user-color); 
            box-shadow: 0 0 15px var(--user-glow);
            object-fit: cover; 
            background: #111;
            transition: 0.3s;
        }

        /* --- FLOATING DOCK V5 --- */
        .menu-inferior {
            position: fixed;
            bottom: 25px; 
            left: 50%;
            transform: translateX(-50%);
            width: 90%;
            max-width: 350px;
            height: 75px;
            background: rgba(10, 10, 10, 0.7);
            backdrop-filter: blur(30px);
            -webkit-backdrop-filter: blur(30px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 28px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            z-index: 9999;
            box-shadow: 0 20px 40px rgba(0,0,0,0.6);
        }

        .nav-item { 
            text-decoration: none; 
            display: flex; 
            flex-direction: column; 
            align-items: center; 
            color: #555; 
            flex: 1;
            transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Ícones mudam de cor com o tema do usuário */
        .nav-item img { 
            width: 22px; 
            height: 22px; 
            opacity: 0.3; 
            filter: grayscale(1);
            transition: 0.3s; 
        }

        .nav-item span { 
            font-size: 0.5rem; 
            font-weight: 900; 
            margin-top: 8px; 
            letter-spacing: 1.5px; 
            text-transform: uppercase;
        }
        
        /* Item Ativo - Brilho e Cor do Usuário */
        .nav-item.active { color: var(--user-color); }
        .nav-item.active img { 
            opacity: 1; 
            filter: grayscale(0) drop-shadow(0 0 8px var(--user-glow)); 
            transform: translateY(-2px);
        }
        .nav-item.active span { text-shadow: 0 0 10px var(--user-glow); }

        @media (min-width: 1024px) {
            .menu-inferior { width: 300px; bottom: 30px; }
            .navbar-topo { padding: 15px 10%; }
        }
    `;
    document.head.appendChild(style);

    // Estrutura do Topo (NEXUS GRID)
    const headerHTML = `
        <header class="navbar-topo">
            <div class="logo-box" onclick="window.location.href='index.html'">
                <img src="icon.png" onerror="this.src='https://cdn-icons-png.flaticon.com/512/9435/9435134.png'">
                <span>NEXUS<b>GRID</b></span>
            </div>
            
            <div class="user-header-info">
                <div class="user-text-wrap">
                    <span class="name">${profile.nick}</span>
                    <div class="user-bio-status">
                        <span>${profile.statusEmoji || '💭'}</span>
                        <b>${shortStatus}</b>
                    </div>
                    <div class="status-row">
                        <img src="status-online.png" class="status-icon" id="current-status-img">
                        <span class="status-text" id="current-status-text">Online</span>
                    </div>
                </div>
                <img src="${profile.avatar}" class="mini-avatar-header" onerror="this.src='user-photo.jpg'">
            </div>
        </header>
    `;

    // Lógica de Ativação
    const path = window.location.pathname;
    const isHome = path.includes('index.html') || path.endsWith('/') || path === '';
    const isPerfil = path.includes('perfil.html');
    const isConfig = path.includes('configuracoes.html') || path.includes('EditarPerfil.html');

    const navHTML = `
        <nav class="menu-inferior">
            <a href="index.html" class="nav-item ${isHome ? 'active' : ''}">
                <img src="home-icon.png" alt="Início">
                <span>HOME</span>
            </a>
            <a href="perfil.html" class="nav-item ${isPerfil ? 'active' : ''}">
                <img src="profile-icon.png" alt="Perfil">
                <span>PERFIL</span>
            </a>
            <a href="configuracoes.html" class="nav-item ${isConfig ? 'active' : ''}">
                <img src="config-icon.png" alt="Ajustes">
                <span>NEXUS</span>
            </a>
        </nav>
    `;

    document.body.insertAdjacentHTML('afterbegin', headerHTML);
    document.body.insertAdjacentHTML('beforeend', navHTML);
}

// Inicializa os componentes
window.addEventListener('DOMContentLoaded', loadComponents);
