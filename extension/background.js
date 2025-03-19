chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ blockedAds: 0 }, () => {
    if (chrome.runtime.lastError) {
      console.error(
        'Erro ao inicializar o contador:',
        chrome.runtime.lastError
      );
    } else {
      console.log('AdBlocker ativado! Contador zerado.');
    }
  });
});
