(function () {
  var wrapper = document.getElementById('toc-wrapper');
  if (!wrapper) return;

  var tocNav = wrapper.querySelector('#TableOfContents');
  var hasItems = tocNav && tocNav.querySelector('li');
  if (!hasItems) {
    wrapper.remove();
    var navToggle = document.getElementById('toc-toggle');
    if (navToggle) navToggle.remove();
    return;
  }

  var toggle = document.getElementById('toc-toggle');
  var panel = document.getElementById('toc-panel');
  var close = document.getElementById('toc-close');
  var backdrop = document.getElementById('toc-backdrop');
  var isOpen = false;

  function openPanel() {
    isOpen = true;
    panel.classList.add('toc-open');
    backdrop.classList.add('toc-open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closePanel() {
    isOpen = false;
    panel.classList.remove('toc-open');
    backdrop.classList.remove('toc-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      if (isOpen) closePanel();
      else openPanel();
    });
  }

  close.addEventListener('click', closePanel);
  backdrop.addEventListener('click', closePanel);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen) closePanel();
  });

  var tocLinks = panel.querySelectorAll('#TableOfContents a');
  tocLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      closePanel();
    });
  });

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

  document.body.classList.add('toc-visible');
})();
