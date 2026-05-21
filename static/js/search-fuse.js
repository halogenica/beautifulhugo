(function () {
  'use strict';

  // --- search engine cache ---

  var cachedEnginePromise = null;

  // --- fuse provider ---

  function fetchSearchIndex(url) {
    return fetch(url)
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

  // --- BeautifulHugoSearch global ---

  function getProviderConfig() {
    return window.searchProviderConfig || {};
  }

  window.BeautifulHugoSearch = {
    getEngine: function () {
      if (!cachedEnginePromise) {
        var config = getProviderConfig();
        cachedEnginePromise = fetchSearchIndex(config.searchIndexURL)
          .then(createFuseEngine);
      }

      return cachedEnginePromise;
    }
  };

  // --- navbar search UI ---

  var searchEngine = null;
  var searchLoadingPromise = null;
  var debounceTimer = null;

  function loadSearch(callback) {
    if (searchEngine) { callback(); return; }
    if (searchLoadingPromise) {
      searchLoadingPromise.then(callback).catch(function () {});
      return;
    }

    searchLoadingPromise = window.BeautifulHugoSearch.getEngine()
      .then(function (engine) {
        searchEngine = engine;
        callback();
      })
      .catch(function (e) {
        console.error('navbar-search: failed to load index', e);
      })
      .finally(function () {
        searchLoadingPromise = null;
      });
  }

  function openSearch() {
    var overlay = document.getElementById('navbar-search-overlay');
    var input = document.getElementById('navbar-search-input');
    var avatar = document.querySelector('.navbar-custom .avatar-container');
    var navbar = document.querySelector('.navbar-custom');
    if (!overlay) return;
    overlay.classList.add('open');
    overlay.removeAttribute('aria-hidden');
    if (avatar) avatar.style.visibility = 'hidden';
    if (navbar) navbar.classList.add('navbar-search-active');
    if (input) { input.focus(); input.select(); }
    loadSearch(function () {}); // pre-load index in background
    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('click', handleOutsideClick);
  }

  function closeSearch() {
    var overlay = document.getElementById('navbar-search-overlay');
    var results = document.getElementById('navbar-search-results');
    var avatar = document.querySelector('.navbar-custom .avatar-container');
    var navbar = document.querySelector('.navbar-custom');
    if (!overlay) return;
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    if (avatar) avatar.style.visibility = '';
    if (navbar) navbar.classList.remove('navbar-search-active');
    if (results) results.innerHTML = '';
    document.removeEventListener('keydown', handleKeydown);
    document.removeEventListener('click', handleOutsideClick);
    var toggle = document.getElementById('search-toggle');
    if (toggle) toggle.focus();
  }

  function handleKeydown(e) {
    if (e.key === 'Escape') {
      closeSearch();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      navigateResults(1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      navigateResults(-1);
    }
  }

  function handleOutsideClick(e) {
    var overlay = document.getElementById('navbar-search-overlay');
    var toggle = document.getElementById('search-toggle');
    if (overlay && toggle && !overlay.contains(e.target) && !toggle.contains(e.target)) {
      closeSearch();
    }
  }

  function navigateResults(dir) {
    var results = document.getElementById('navbar-search-results');
    var input = document.getElementById('navbar-search-input');
    if (!results) return;
    var items = Array.from(results.querySelectorAll('.navbar-search-result-item'));
    var currentIdx = items.indexOf(document.activeElement);
    if (dir === 1) {
      if (currentIdx < items.length - 1) items[currentIdx + 1].focus();
    } else {
      if (currentIdx <= 0) { if (input) input.focus(); }
      else items[currentIdx - 1].focus();
    }
  }

  function decodeHtml(text) {
    if (!text) return '';
    return new DOMParser().parseFromString(text, 'text/html').body.textContent || '';
  }

  function escapeHtml(text) {
    if (!text) return '';
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function doSearch(query) {
    var results = document.getElementById('navbar-search-results');
    if (!results) return;
    if (!query || query.length < 2) { results.innerHTML = ''; return; }
    if (!searchEngine) { loadSearch(function () { doSearch(query); }); return; }

    var hits = searchEngine.search(query, { limit: 8 });
    var cfg = window.searchConfig || {};

    if (hits.length === 0) {
      results.innerHTML = '<div class="navbar-search-no-results">' +
        escapeHtml(cfg.noResultsText || 'No results for ') +
        '<strong>' + escapeHtml(query) + '</strong></div>';
      return;
    }

    var html = '';
    hits.forEach(function (hit) {
      var title = hit.title || cfg.untitledText || 'Untitled';
      html += '<a class="navbar-search-result-item" href="' + escapeHtml(hit.url) + '">';
      html += '<span class="navbar-search-result-title">' + escapeHtml(decodeHtml(title)) + '</span>';
      if (hit.excerpt) {
        html += '<span class="navbar-search-result-excerpt">' + escapeHtml(decodeHtml(hit.excerpt)) + '</span>';
      }
      html += '</a>';
    });
    results.innerHTML = html;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.getElementById('search-toggle');
    var closeBtn = document.getElementById('navbar-search-close');
    var input = document.getElementById('navbar-search-input');

    if (!toggle) return;

    toggle.addEventListener('click', function () {
      var overlay = document.getElementById('navbar-search-overlay');
      if (overlay && overlay.classList.contains('open')) {
        closeSearch();
      } else {
        openSearch();
      }
    });

    if (closeBtn) closeBtn.addEventListener('click', closeSearch);

    if (input) {
      input.addEventListener('input', function () {
        clearTimeout(debounceTimer);
        var query = this.value.trim();
        debounceTimer = setTimeout(function () { doSearch(query); }, 300);
      });

      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          var results = document.getElementById('navbar-search-results');
          if (results) {
            var first = results.querySelector('.navbar-search-result-item');
            if (first) { first.click(); return; }
          }
          // Fall back to search page if configured
          var searchPageURL = window.searchProviderConfig && window.searchProviderConfig.searchPageURL;
          if (searchPageURL && this.value.trim()) {
            window.location.href = searchPageURL + '?q=' + encodeURIComponent(this.value.trim());
          }
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          navigateResults(1);
        }
      });
    }
  });
})();
