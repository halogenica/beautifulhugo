const resultsPerPage = 10;
let searchEngine = null;
let cachedResults = [];
let cachedQuery = '';

// Utility: escape HTML to prevent XSS
function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Utility: decode HTML entities (e.g. from indexed content) before re-escaping
function decodeHtml(text) {
  if (!text) return '';
  return new DOMParser().parseFromString(text, 'text/html').body.textContent || '';
}

// Utility: update URL without reloading. Use push=true only for explicit
// page changes; typing keeps replaceState so it does not spam history.
function updateUrl(query, page, push) {
  const newUrl = new URL(window.location);
  if (query) {
    newUrl.searchParams.set('q', query);
  } else {
    newUrl.searchParams.delete('q');
  }

  if (page && page > 1) {
    newUrl.searchParams.set('page', page);
  } else {
    newUrl.searchParams.delete('page');
  }
  if (push) {
    window.history.pushState({}, '', newUrl);
  } else {
    window.history.replaceState({}, '', newUrl);
  }
}

async function initSearch() {
  try {
    searchEngine = await window.BeautifulHugoSearch.getEngine();
    autoSearchFromUrl();
  } catch (e) {
    console.error('Failed to load search index:', e);
    const container = document.getElementById('resultsContainer');
    if (container) {
      container.innerHTML = '<div class="no-results">' + (window.searchConfig ? window.searchConfig.errorIndexLoad : '') + '</div>';
    }
  }
}

window.doSearch = function(page, push) {
  page = page || 1;
  const input = document.getElementById('searchInput');
  if (!input) return;
  const query = input.value.trim();

  if (!query) {
    updateUrl('', 1, push);
    const container = document.getElementById('resultsContainer');
    if (container) container.innerHTML = '';
    return;
  }

  updateUrl(query, page, push);

  const container = document.getElementById('resultsContainer');
  if (container) {
    container.innerHTML = '<div class="results-info">' + (window.searchConfig ? window.searchConfig.loadingText : '') + '</div>';
  }

  if (!searchEngine) {
    if (container) {
      container.innerHTML = '<div class="no-results">' + (window.searchConfig ? window.searchConfig.errorIndexLoading : '') + '</div>';
    }
    return;
  }

  const results = searchEngine.search(query);
  cachedResults = results;
  cachedQuery = query;
  renderResults(query, page);
};

function renderResults(query, page) {
  const container = document.getElementById('resultsContainer');
  if (!container) return;
  const totalResults = cachedResults.length;

  if (totalResults === 0) {
    const noResultsText = window.searchConfig ? window.searchConfig.noResultsText : '';
    container.innerHTML = '<div class="no-results">' + noResultsText + '<strong>' + escapeHtml(query) + '</strong></div>';
    return;
  }

  const start = (page - 1) * resultsPerPage;
  const end = Math.min(start + resultsPerPage, totalResults);
  const pageResults = cachedResults.slice(start, end);

  const resultText = totalResults > 1
    ? (window.searchConfig ? window.searchConfig.resultPlural : '')
    : (window.searchConfig ? window.searchConfig.resultSingular : '');
  let html = '<div class="results-info"> ' + totalResults + ' ' + resultText + '<strong>' + escapeHtml(query) + '</strong></div>';

    pageResults.forEach(function(data) {
      html += '<div class="result">';
      html += '<a class="result-title" href="' + escapeHtml(data.url) + '">' +
      escapeHtml(decodeHtml(data.title) || (window.searchConfig ? window.searchConfig.untitledText : '')) + '</a>';
    if (data.excerpt) {
      html += '<div class="result-excerpt">' + escapeHtml(decodeHtml(data.excerpt)) + '</div>';
    }
    html += '</div>';
  });

  container.innerHTML = html;

  const paginationContainer = document.getElementById('search-pagination');
  if (paginationContainer) {
    paginationContainer.innerHTML = renderPagination(page, totalResults);
  }
}

function renderPagination(currentPage, totalResults) {
  if (totalResults <= resultsPerPage) return '';

  const totalPages = Math.ceil(totalResults / resultsPerPage);
  let html = '<ul class="post-pager">';

  if (currentPage > 1) {
    const prevText = window.searchConfig ? window.searchConfig.prevText : '';
    html += '<li class="pager-prev">';
    html += '<button type="button" data-page="' + (currentPage - 1) + '">&larr; ' + prevText + '</button>';
    html += '</li>';
  }

  if (currentPage < totalPages) {
    const nextText = window.searchConfig ? window.searchConfig.nextText : '';
    html += '<li class="pager-next">';
    html += '<button type="button" data-page="' + (currentPage + 1) + '">' + nextText + ' &rarr;</button>';
    html += '</li>';
  }

  html += '</ul>';
  return html;
}

function autoSearchFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const query = params.get('q');
  const page = parseInt(params.get('page'), 10) || 1;

  if (query) {
    const input = document.getElementById('searchInput');
    if (input) {
      input.value = query;
      window.doSearch(page);
    }
  }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    initSearch();

    const searchInput = document.getElementById('searchInput');

    if (searchInput) {
      let debounceTimer;
      searchInput.addEventListener('input', function() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(function() { window.doSearch(); }, 200);
      });
      searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') window.doSearch();
      });
    }

    const paginationContainer = document.getElementById('search-pagination');
    if (paginationContainer) {
      paginationContainer.addEventListener('click', function(e) {
        const button = e.target.closest('[data-page]');
        if (!button) return;
        window.doSearch(Number(button.dataset.page), true);
      });
    }

    window.addEventListener('popstate', function() {
      const params = new URLSearchParams(window.location.search);
      const query = params.get('q');
      const container = document.getElementById('resultsContainer');
      const input = document.getElementById('searchInput');

      if (!query) {
        if (input) input.value = '';
        if (container) container.innerHTML = '';
        cachedResults = [];
        cachedQuery = '';
        return;
      }

      const page = parseInt(params.get('page'), 10) || 1;
      if (input) input.value = query;

      if (cachedResults.length > 0 && cachedQuery === query) {
        renderResults(query, page);
      } else {
        window.doSearch(page);
      }
    });
});
