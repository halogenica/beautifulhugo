(function () {
  var panel = document.getElementById('toc-panel');
  if (!panel) return;

  var mode = panel.getAttribute('data-toc-mode') || 'headings';

  function removePanel() {
    panel.remove();
    var navToggle = document.getElementById('toc-toggle');
    if (navToggle) navToggle.remove();
  }

  if (mode === 'posts') {
    if (!panel.querySelector('.toc-post-list li')) {
      removePanel();
      return;
    }
  } else {
    if (panel.querySelectorAll('#TableOfContents a').length <= 1) {
      removePanel();
      return;
    }
  }

  var toggle = document.getElementById('toc-toggle');
  var offcanvas = bootstrap.Offcanvas.getOrCreateInstance(panel);
  var returnFocus = true;

  if (toggle) {
    toggle.addEventListener('click', function () {
      offcanvas.toggle();
    });
  }

  panel.addEventListener('show.bs.offcanvas', function () {
    if (toggle) toggle.setAttribute('aria-expanded', 'true');
  });
  panel.addEventListener('hide.bs.offcanvas', function () {
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
    returnFocus = panel.contains(document.activeElement);
  });
  panel.addEventListener('hidden.bs.offcanvas', function () {
    if (!returnFocus || !toggle) return;
    // Focus would otherwise show the toggle's tooltip until the next blur.
    // Tooltip.show() is queued, so hide() after focus() is too early; disable
    // the tooltip across the focus call instead.
    var tip = bootstrap.Tooltip.getInstance(toggle);
    if (tip) tip.disable();
    toggle.focus();
    if (tip) setTimeout(function () { tip.enable(); }, 0);
  });

  // Following a link should leave focus on the destination, not the toggle.
  panel.addEventListener('click', function (e) {
    if (e.target.closest('a[href]')) {
      offcanvas.hide();
      returnFocus = false;
    }
  });

  if (mode === 'posts') {
    var postLinks = panel.querySelectorAll('.toc-post-list a');

    var postPreviews = document.querySelectorAll('.post-preview');
    if (postPreviews.length === 0) return;

    var activePostLink = null;

    // The panel lists every post, but the page shows one pager of previews,
    // so match previews to links by URL rather than by index.
    var linkByHref = {};
    postLinks.forEach(function (link) {
      linkByHref[link.pathname] = link;
    });

    function setActivePost(preview) {
      if (activePostLink) activePostLink.classList.remove('toc-active');
      var anchor = preview.querySelector('a[href]');
      var link = anchor ? linkByHref[anchor.pathname] : null;
      if (link) {
        link.classList.add('toc-active');
        activePostLink = link;
        link.scrollIntoView({ block: 'nearest', behavior: 'instant' });
      }
    }

    var postObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActivePost(entry.target);
        });
      },
      {
        rootMargin: '-80px 0px -70% 0px',
        threshold: 0,
      }
    );

    postPreviews.forEach(function (el) {
      postObserver.observe(el);
    });
  } else {
    var headings = [];
    document.querySelectorAll('.blog-post h2, .blog-post h3, .blog-post h4, .blog-post h5, .blog-post h6').forEach(function (h) {
      if (h.id) headings.push(h);
    });

    if (headings.length === 0) return;

    var activeLink = null;

    function setActive(id) {
      if (activeLink) activeLink.classList.remove('toc-active');
      var link = panel.querySelector('a[href="#' + CSS.escape(id) + '"]');
      if (link) {
        link.classList.add('toc-active');
        activeLink = link;
        link.scrollIntoView({ block: 'nearest', behavior: 'instant' });
      }
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -70% 0px',
        threshold: 0,
      }
    );

    headings.forEach(function (h) {
      observer.observe(h);
    });
  }
})();
