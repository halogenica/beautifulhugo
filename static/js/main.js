// Dean Attali / Beautiful Jekyll 2016

var main = {

  bigImgEl : null,
  numImgs : null,

  init : function() {
    // Shorten the navbar after scrolling a little bit down
    $(window).scroll(function() {
        if ($(".navbar").offset().top > 50) {
            $(".navbar").addClass("top-nav-short");
        } else {
            $(".navbar").removeClass("top-nav-short");
        }
    });

    // On mobile, hide the avatar when expanding the navbar menu
    $('#main-navbar').on('show.bs.collapse', function () {
      $(".navbar").addClass("top-nav-expanded");
    });
    $('#main-navbar').on('hidden.bs.collapse', function () {
      $(".navbar").removeClass("top-nav-expanded");
    });

    // On mobile, when clicking on a multi-level navbar menu, show the child links
    // Also handles keyboard (Enter and Space) for accessibility
    $('#main-navbar').on("click keydown", ".navlinks-parent", function(e) {
      if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') {
        return;
      }
      if (e.type === 'keydown') {
        e.preventDefault();
      }
      var target = e.target;
      var isExpanded = false;
      $.each($(".navlinks-parent"), function(key, value) {
        if (value == target) {
          var showing = $(value).parent().toggleClass("show-children").hasClass("show-children");
          isExpanded = showing;
        } else {
          $(value).parent().removeClass("show-children");
          $(value).attr("aria-expanded", "false");
        }
      });
      $(target).attr("aria-expanded", isExpanded ? "true" : "false");
    });

    // Ensure nested navbar menus are not longer than the menu header
    var menus = $(".navlinks-container");
    if (menus.length > 0) {
      var navbar = $("#main-navbar").find("ul");
      var fakeMenuHtml = "<li class='fake-menu' style='display:none;'><a></a></li>";
      navbar.append(fakeMenuHtml);
      var fakeMenu = $(".fake-menu");

      $.each(menus, function(i) {
        var parent = $(menus[i]).find(".navlinks-parent");
        var children = $(menus[i]).find(".navlinks-children a");
        var words = [];
        $.each(children, function(idx, el) { words = words.concat($(el).text().trim().split(/\s+/)); });
        var maxwidth = 0;
        $.each(words, function(id, word) {
          fakeMenu.html("<a>" + word + "</a>");
          var width =  fakeMenu.width();
          if (width > maxwidth) {
            maxwidth = width;
          }
        });
        $(menus[i]).css('min-width', maxwidth + 'px')
      });

      fakeMenu.remove();
    }

    // show the big header image
    main.initImgs();

    // Initialize Bootstrap 5 tooltips
    var tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    [...tooltipTriggerList].map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
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
          hljsDark.disabled = !isDark;
        }
        updateThemeTooltip(state);
      }

      // Initialize from localStorage
      var savedTheme = localStorage.getItem('theme');
      if (themeStates.indexOf(savedTheme) !== -1) {
        updateThemeUI(savedTheme);
      }

      // Listen for system color-scheme changes
      var darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
      if (darkModeQuery.addEventListener) {
        darkModeQuery.addEventListener('change', function() {
          var current = localStorage.getItem('theme') || 'auto';
          if (current === 'auto') {
            updateThemeUI('auto');
          }
        });
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
    // If the page was large images to randomly select from, choose an image
    if ($("#header-big-imgs").length > 0) {
      main.bigImgEl = $("#header-big-imgs");
      main.numImgs = main.bigImgEl.attr("data-num-img");

          // 2fc73a3a967e97599c9763d05e564189
    // set an initial image
    var imgInfo = main.getImgInfo();
    var src = imgInfo.src;
    var desc = imgInfo.desc;
    var position = imgInfo.position;
      main.setImg(src, desc, position);

    // If the user prefers reduced motion, skip the cycling animation
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // For better UX, prefetch the next image so that it will already be loaded when we want to show it
      var getNextImg = function() {
      var imgInfo = main.getImgInfo();
      var src = imgInfo.src;
      var desc = imgInfo.desc;
      var position = imgInfo.position;

    var prefetchImg = new Image();
      prefetchImg.src = src;
    // if I want to do something once the image is ready: `prefetchImg.onload = function(){}`

      setTimeout(function(){
                  var img = $("<div></div>").addClass("big-img-transition").css("background-image", 'url(' + src + ')');
        if (position !== undefined) {
          img.css("background-position", position);
        }
        $(".intro-header.big-img").prepend(img);
        setTimeout(function(){ img.css("opacity", "1"); }, 50);

      // after the animation of fading in the new image is done, prefetch the next one
        //img.one("transitioned webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
      setTimeout(function() {
        main.setImg(src, desc, position);
      img.remove();
        getNextImg();
      }, 1000);
        //});
      }, 6000);
      };

    // If there are multiple images, cycle through them
    if (main.numImgs > 1) {
        getNextImg();
    }
    }
  },

  getImgInfo : function() {
    var randNum = Math.floor((Math.random() * main.numImgs) + 1);
    var src = main.bigImgEl.attr("data-img-src-" + randNum);
  var desc = main.bigImgEl.attr("data-img-desc-" + randNum);
  var position = main.bigImgEl.attr("data-img-position-" + randNum);

  return {
    src : src,
    desc : desc,
    position : position
  }
  },

  setImg : function(src, desc, position) {
  $(".intro-header.big-img").css("background-image", 'url(' + src + ')');
  if (position !== undefined) {
    $(".intro-header.big-img").css("background-position", position);
  }
  else {
    // Remove background-position if added to the prev image.
    $(".intro-header.big-img").css("background-position", "");
  }
  if (typeof desc !== typeof undefined && desc !== false) {
    // Check for Markdown link
    var mdLinkRe = /\[(.*?)\]\((.+?)\)/;
    if (desc.match(mdLinkRe)) {
      // Split desc into parts, extracting md links
      var splitDesc = desc.split(mdLinkRe);

      // Build new description
      var imageDesc = $(".img-desc");
      splitDesc.forEach(function (element, index){
        // Check element type. If links every 2nd element is link text, and every 3rd link url
        if (index % 3 === 0) {
          // Regular text, just append it
          imageDesc.append(element);
        }
        if (index % 3 === 1) {
          // Link text - do nothing at the moment
        }
        if (index % 3 === 2) {
          // Link url - Create anchor tag with text
          var link = $("<a>", {
            "href": element,
            "target": "_blank",
            "rel": "noopener noreferrer"
          }).text(splitDesc[index - 1]);
          imageDesc.append(link);
        }
      });
      imageDesc.show();
    } else {
      $(".img-desc").text(desc).show();
    }
  } else {
    $(".img-desc").hide();
  }
  }
};

// 2fc73a3a967e97599c9763d05e564189

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

          const codeText = codeBlockClone.textContent
              .split('\n')
              .map(line => line.trim())
              .join('\n');

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
