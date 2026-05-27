const CACHE_NAME = 'ks-app-cache-v2';

// 1. Lista de todos os arquivos que o App vai guardar na memória para rodar rápido e offline
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './card1.css',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './fundo2.png',
  // Lista de todos os seus arquivos JS modulares:
  './manutencao.js',
  './fontes.js',
  './card1.js',
  './card2.js',
  './creditos.js',
  './estrelas.js',
  './botao.js',
  './pwa-style.js',
  './protecao.js',
  './clique-limpo.js',
  './atualizacao.js'
];

// 2. Evento de Instalação: Salva todos os arquivos estruturais no cache do celular
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('K & S PWA: Armazenando arquivos essenciais em cache...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 3. Evento de Ativação: Limpa caches antigos quando você atualizar a versão (ex: mudar de v2 para v3)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('K & S PWA: Removendo cache antigo expirado:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 4. Estratégia de Cache Inteligente: Carrega do cache instantaneamente, mas busca atualizações na rede
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Se o arquivo já está no cache, entrega ele na hora (o app abre instantâneo)
      if (cachedResponse) {
        // Faz uma busca em segundo plano na rede para atualizar o cache para a próxima abertura
        fetch(event.request).then((networkResponse) => {
          if (networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse));
          }
        }).catch(() => { /* Ignora erros de rede se estiver offline */ });

        return cachedResponse;
      }
      // Se o arquivo não estava no cache (ex: uma nova foto), busca na rede normalmente
      return fetch(event.request);
    })
  );
});

// 5. PONTE DE COMUNICAÇÃO DE ALTA PERFORMANCE (O segredo para o botão "Atualizar" funcionar)
self.addEventListener('message', (event) => {
  if (event.data && event.data.action === 'skipWaiting') {
    console.log('K & S PWA: Comando recebido! Forçando atualização e ignorando espera...');
    self.skipWaiting();
  }
});
