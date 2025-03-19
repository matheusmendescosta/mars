document.addEventListener('DOMContentLoaded', () => {
  function updateCounter() {
    chrome.storage.local.get('blockedAds', (data) => {
      let count = data.blockedAds || 0;
      document.getElementById('counter').innerText = count;
    });
  }

  let simulateBlockBtn = document.getElementById('simulate-block');
  let toggleBtn = document.getElementById('toggle');

  if (simulateBlockBtn) {
    simulateBlockBtn.addEventListener('click', () => {
      chrome.storage.local.get('blockedAds', (data) => {
        let count = (data.blockedAds || 0) + 1;
        chrome.storage.local.set({ blockedAds: count }, updateCounter);
      });
    });
  } else {
    console.error("Botão 'simulate-block' não encontrado!");
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', async () => {
      let rules = await chrome.declarativeNetRequest.getEnabledRulesets();
      if (rules.length > 0) {
        await chrome.declarativeNetRequest.updateEnabledRulesets({
          disableRulesetIds: ['ruleset_1'],
        });
        alert('AdBlocker Desativado');
      } else {
        await chrome.declarativeNetRequest.updateEnabledRulesets({
          enableRulesetIds: ['ruleset_1'],
        });
        alert('AdBlocker Ativado');
      }
    });
  } else {
    console.error("Botão 'toggle' não encontrado!");
  }

  updateCounter();
  setInterval(updateCounter, 1000);
});
