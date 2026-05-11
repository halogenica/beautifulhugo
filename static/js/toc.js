(function () {
  var wrapper = document.getElementById('toc-wrapper');
  if (!wrapper) return;

  var mode = wrapper.getAttribute('data-toc-mode') || 'headings';

  if (mode === 'posts') {
    var postList = wrapper.querySelector('.toc-post-list');
    var hasPosts = postList && postList.querySelector('li');
    if (!hasPosts) {
      wrapper.remove();
      var navToggle = document.getElementById('toc-toggle');
      if (navToggle) navToggle.remove();
      return;
    }
  } else {
    var tocNav = wrapper.querySelector('#TableOfContents');
    var hasItems = tocNav && tocNav.querySelector('li');
    if (!hasItems) {
      wrapper.remove();
      var navToggle = document.getElementById('toc-toggle');
      if (navToggle) navToggle.remove();
      return;
    }
    var allLinks = tocNav.querySelectorAll('a');
    if (allLinks.length <= 1) {
      wrapper.remove();
      var navToggle2 = document.getElementById('toc-toggle');
      if (navToggle2) navToggle2.remove();
      return;
    }
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

  if (mode === 'posts') {
    var postLinks = panel.querySelectorAll('.toc-post-list a');
    postLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        closePanel();
      });
    });

    var postPreviews = document.querySelectorAll('.post-preview');
    if (postPreviews.length === 0) {
      document.body.classList.add('toc-visible');
      return;
    }

    var activePostLink = null;

    function setActivePost(index) {
      if (activePostLink) activePostLink.classList.remove('toc-active');
      var link = postLinks[index];
      if (link) {
        link.classList.add('toc-active');
        activePostLink = link;
        link.scrollIntoView({ block: 'nearest', behavior: 'instant' });
      }
    }

    var postObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var idx = Array.prototype.indexOf.call(postPreviews, entry.target);
            if (idx >= 0) setActivePost(idx);
          }
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

    if (headings.length === 0) {
      document.body.classList.add('toc-visible');
      return;
    }

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

  document.body.classList.add('toc-visible');
})();
