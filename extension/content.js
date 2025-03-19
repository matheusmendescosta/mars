// Variável global para rastrear o estado de anúncio
let adCheckInterval;

// Função principal para detectar e pular anúncios
function adBlocker() {
  // Limpa qualquer intervalo existente
  clearInterval(adCheckInterval);
  
  // Cria um novo intervalo para verificar anúncios frequentemente
  adCheckInterval = setInterval(() => {
    // Verifica se estamos em um anúncio
    const adElement = document.querySelector('.ad-showing') || 
                     document.querySelector('.ytp-ad-player-overlay');
    
    if (adElement) {
      console.log('Anúncio detectado, tentando pular...');
      
      // Tenta clicar no botão de pular
      const skipButton = document.querySelector('.ytp-ad-skip-button') || 
                         document.querySelector('.ytp-ad-skip-button-modern');
      
      if (skipButton) {
        console.log('Botão de pular encontrado, clicando...');
        skipButton.click();
      } else {
        // Se não há botão, tenta pular o anúncio avançando o vídeo
        const video = document.querySelector('video');
        if (video) {
          console.log('Forçando avanço do anúncio...');
          if (video.duration) video.currentTime = video.duration;
          // Força continuação da reprodução
          video.play().catch(() => {});
        }
      }
    }
  }, 300); // Verificação muito frequente (a cada 300ms)
}

// Inicia o bloqueador
adBlocker();

// Reinicia o bloqueador quando a página muda
document.addEventListener('yt-navigate-finish', adBlocker);

// Adiciona observador para detectar mudanças na página que podem conter anúncios
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.addedNodes.length > 0) {
      // Se novos nós foram adicionados, verifica se há anúncios
      if (document.querySelector('.ad-showing') || 
          document.querySelector('.ytp-ad-player-overlay')) {
        adBlocker();
        break;
      }
    }
  }
});

// Configura o observador para monitorar todo o corpo do documento
observer.observe(document.body, {
  childList: true,
  subtree: true
});

console.log('Bloqueador de anúncios simplificado iniciado');