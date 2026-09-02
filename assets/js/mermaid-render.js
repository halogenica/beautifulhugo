document.addEventListener('DOMContentLoaded', function() {
  if (typeof mermaid === 'undefined') return;
  var sources = document.querySelectorAll('.mermaid-src');
  if (sources.length === 0) return;
  var idx = 0;
  function renderNext() {
    if (idx >= sources.length) return;
    var src = sources[idx];
    var code = src.textContent;
    var container = src.previousElementSibling;
    var lightEl = container.querySelector('.theme-light');
    var darkEl = container.querySelector('.theme-dark');
    var id = 'mermaid-' + idx;
    if (lightEl) {
      mermaid.initialize({startOnLoad: false, theme: 'default'});
      mermaid.render(id + '-light', code).then(function(result) {
        lightEl.innerHTML = result.svg;
        if (darkEl) {
          mermaid.initialize({startOnLoad: false, theme: 'dark'});
          mermaid.render(id + '-dark', code).then(function(result2) {
            darkEl.innerHTML = result2.svg;
            idx++;
            renderNext();
          });
        } else {
          idx++;
          renderNext();
        }
      });
    } else if (darkEl) {
      mermaid.initialize({startOnLoad: false, theme: 'dark'});
      mermaid.render(id + '-dark', code).then(function(result) {
        darkEl.innerHTML = result.svg;
        idx++;
        renderNext();
      });
    }
  }
  renderNext();
});
