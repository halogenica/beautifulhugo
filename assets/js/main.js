// Dean Attali / Beautiful Jekyll 2016

var main = {

  bigImgEl : null,
  numImgs : null,

  init : function() {
    var navbar = document.querySelector('.navbar');
    var mainNavbar = document.getElementById('main-navbar');

    // Shorten the navbar after scrolling a little bit down
    if (navbar) {
      window.addEventListener('scroll', function() {
        navbar.classList.toggle('top-nav-short', window.scrollY > 50);
      });
    }

    // On mobile, hide the avatar when expanding the navbar menu
    if (navbar && mainNavbar) {
      mainNavbar.addEventListener('show.bs.collapse', function () {
        navbar.classList.add('top-nav-expanded');
      });
      mainNavbar.addEventListener('hidden.bs.collapse', function () {
        navbar.classList.remove('top-nav-expanded');
      });
    }

    // show the big header image
    main.initImgs();

    // Initialize Bootstrap 5 tooltips
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(function (tooltipTriggerEl) {
      new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Theme toggle
    var themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      var themeStates = ['auto', 'light', 'dark'];
      var themeIcons = {
        auto: document.getElementById('theme-icon-auto'),
        light: document.getElementById('theme-icon-light'),
        dark: document.getElementById('theme-icon-dark')
      };

      function updateThemeTooltip(state) {
        var tooltipText = themeToggle.getAttribute('data-tooltip-' + state) || '';
        themeToggle.setAttribute('title', tooltipText);
        themeToggle.setAttribute('data-bs-original-title', tooltipText);
        var bsTooltip = bootstrap.Tooltip.getInstance(themeToggle);
        if (bsTooltip) {
          bsTooltip.dispose();
          new bootstrap.Tooltip(themeToggle);
          if (themeToggle.matches(':hover')) {
            bootstrap.Tooltip.getOrCreateInstance(themeToggle).show();
          }
        }
      }

      function updateThemeUI(state) {
        for (var key in themeIcons) {
          if (themeIcons[key]) {
            themeIcons[key].style.display = (key === state) ? '' : 'none';
          }
        }
        if (state === 'dark') {
          document.documentElement.setAttribute('data-theme', 'dark');
        } else if (state === 'light') {
          document.documentElement.setAttribute('data-theme', 'light');
        } else {
          if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
          } else {
            document.documentElement.removeAttribute('data-theme');
          }
        }
        var hljsDark = document.getElementById('hljs-dark');
        if (hljsDark) {
          var isDark = (state === 'dark') || (state === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
          hljsDark.media = isDark ? 'all' : 'not all';
        }
        updateThemeTooltip(state);
      }

      // Initialize from localStorage
      var savedTheme = localStorage.getItem('theme');
      if (themeStates.indexOf(savedTheme) !== -1) {
        updateThemeUI(savedTheme);
      } else {
        updateThemeUI('auto');
      }

      themeToggle.addEventListener('click', function() {
        var current = localStorage.getItem('theme') || 'auto';
        var next = themeStates[(themeStates.indexOf(current) + 1) % themeStates.length];
        updateThemeUI(next);
        localStorage.setItem('theme', next);
      });
    }
  },

  initImgs : function() {
    // If the page has large images to randomly select from, choose an image
    main.bigImgEl = document.getElementById('header-big-imgs');
    if (!main.bigImgEl) return;
    main.numImgs = parseInt(main.bigImgEl.getAttribute('data-num-img'), 10) || 0;

    // set an initial image
    var imgInfo = main.getImgInfo();
    main.setImg(imgInfo.src, imgInfo.desc, imgInfo.position);

    // If the user prefers reduced motion, skip the cycling animation
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    var header = document.querySelector('.intro-header.big-img');

    // For better UX, prefetch the next image so that it will already be loaded when we want to show it
    var getNextImg = function() {
      var next = main.getImgInfo();

      var prefetchImg = new Image();
      prefetchImg.src = next.src;

      setTimeout(function() {
        var img = document.createElement('div');
        img.className = 'big-img-transition';
        img.style.backgroundImage = 'url(' + next.src + ')';
        if (next.position !== null) {
          img.style.backgroundPosition = next.position;
        }
        header.prepend(img);
        setTimeout(function() { img.style.opacity = '1'; }, 50);

        // after the animation of fading in the new image is done, prefetch the next one
        setTimeout(function() {
          main.setImg(next.src, next.desc, next.position);
          img.remove();
          getNextImg();
        }, 1000);
      }, 6000);
    };

    // If there are multiple images, cycle through them
    if (main.numImgs > 1) {
      getNextImg();
    }
  },

  getImgInfo : function() {
    var randNum = Math.floor((Math.random() * main.numImgs) + 1);
    return {
      src : main.bigImgEl.getAttribute('data-img-src-' + randNum),
      desc : main.bigImgEl.getAttribute('data-img-desc-' + randNum),
      position : main.bigImgEl.getAttribute('data-img-position-' + randNum)
    };
  },

  setImg : function(src, desc, position) {
    var header = document.querySelector('.intro-header.big-img');
    header.style.backgroundImage = 'url(' + src + ')';
    // Reset background-position if the previous image set one.
    header.style.backgroundPosition = position !== null ? position : '';

    var imageDesc = document.querySelector('.img-desc');
    if (desc === null) {
      imageDesc.style.display = 'none';
      return;
    }
    imageDesc.textContent = '';
    // Markdown links in the description become anchors: [text](url)
    var mdLinkRe = /\[(.*?)\]\((.+?)\)/;
    var splitDesc = desc.split(mdLinkRe);
    // After split, every 3rd element is text, then link text, then link url
    splitDesc.forEach(function (element, index) {
      if (index % 3 === 0) {
        imageDesc.append(element);
      } else if (index % 3 === 2) {
        var link = document.createElement('a');
        link.href = element;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = splitDesc[index - 1];
        imageDesc.append(link);
      }
    });
    imageDesc.style.display = '';
  }
};

document.addEventListener('DOMContentLoaded', main.init);
/**
 * Add copy button to code block
 */
document.addEventListener('DOMContentLoaded', () => {
  const highlights = document.querySelectorAll('.row div.highlight');
  highlights.forEach((highlight) => {
      const copyButton = document.createElement('button');
      copyButton.classList.add('copyCodeButton', 'btn', 'btn-sm', 'btn-outline-secondary');
      copyButton.setAttribute('title', 'Copy to clipboard');
      copyButton.innerHTML = '<i class="fa-regular fa-copy"></i>';
      highlight.appendChild(copyButton);

      const codeBlock = highlight.querySelector('code[data-lang]');
      if (!codeBlock) return;

      copyButton.addEventListener('click', () => {
          const codeBlockClone = codeBlock.cloneNode(true);

          const lineNumbers = codeBlockClone.querySelectorAll('.ln');
          lineNumbers.forEach(ln => ln.remove());

          const codeText = codeBlockClone.textContent.replace(/\n$/, '');

          navigator.clipboard.writeText(codeText)
              .then(() => {
                  copyButton.innerHTML = '<i class="fa-solid fa-check"></i>';
                  copyButton.classList.remove('btn-outline-secondary');
                  copyButton.classList.add('btn-success');

                  setTimeout(() => {
                      copyButton.innerHTML = '<i class="fa-regular fa-copy"></i>';
                      copyButton.classList.remove('btn-success');
                      copyButton.classList.add('btn-outline-secondary');
                  }, 1000);
              })
              .catch((err) => {
                  alert('Failed to copy text');
                  console.error('Something went wrong', err);
              });
      });
  });
});
