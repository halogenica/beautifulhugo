(function () {
  'use strict';

  var fuseScriptPromise = null;

  function loadFuseScript(url) {
    if (typeof Fuse !== 'undefined') {
      return Promise.resolve();
    }

    if (!fuseScriptPromise) {
      fuseScriptPromise = new Promise(function (resolve, reject) {
        var script = document.createElement('script');
        script.src = url || '/js/fuse.js';
        script.onload = resolve;
        script.onerror = function () {
          reject(new Error('Failed to load Fuse.js'));
        };
        document.head.appendChild(script);
      });
    }

    return fuseScriptPromise;
  }

  function fetchSearchIndex(url) {
    return fetch(url || '/index.json')
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Network response was not ok: ' + response.status + ' ' + response.statusText);
        }

        return response.text();
      })
      .then(function (text) {
        try {
          return JSON.parse(text);
        } catch (parseError) {
          console.error('JSON parse error. Content start:', text.substring(0, 100));
          throw parseError;
        }
      });
  }

  function createFuseEngine(searchIndex) {
    var fuse = new Fuse(searchIndex, {
      keys: ['title', 'excerpt', 'content'],
      threshold: 0.3,
      includeScore: true,
      ignoreLocation: true,
      isCaseSensitive: false
    });

    return {
      search: function (query, options) {
        var limit = options && options.limit;
        var fuseOptions = limit ? { limit: limit } : undefined;
        return fuse.search(query, fuseOptions).map(function (result) {
          return result.item;
        });
      },
      lucky: function (query) {
        var results = fuse.search(query, { limit: 1 });
        return results.length > 0 ? results[0].item : null;
      }
    };
  }

  window.BeautifulHugoSearchProviders = window.BeautifulHugoSearchProviders || {};
  window.BeautifulHugoSearchProviders.fuse = {
    createSearchEngine: function (config) {
      return loadFuseScript(config.fuseJsURL)
        .then(function () {
          return fetchSearchIndex(config.searchIndexURL);
        })
        .then(createFuseEngine);
    }
  };
})();
