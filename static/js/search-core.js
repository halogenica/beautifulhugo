(function () {
  'use strict';

  var cachedEnginePromise = null;

  function getProviderConfig() {
    return window.searchProviderConfig || {};
  }

  function getProviderName() {
    return getProviderConfig().provider || 'none';
  }

  function getProvider() {
    var providerName = getProviderName();
    if (providerName === 'none') {
      return null;
    }

    var providers = window.BeautifulHugoSearchProviders || {};
    var provider = providers[providerName];

    if (!provider) {
      throw new Error('Unsupported search provider: ' + providerName);
    }

    return provider;
  }

  window.BeautifulHugoSearch = {
    getProviderName: getProviderName,
    isEnabled: function () {
      return getProviderName() !== 'none';
    },
    getEngine: function () {
      if (!cachedEnginePromise) {
        var provider = getProvider();
        cachedEnginePromise = provider ? provider.createSearchEngine(getProviderConfig()) : Promise.resolve(null);
      }

      return cachedEnginePromise;
    }
  };
})();
