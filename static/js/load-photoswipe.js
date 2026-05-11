/*
  Put this file in /static/js/load-photoswipe.js
  Documentation and licence at https://github.com/liwenyip/hugo-easy-gallery/
*/

/* PhotoSwipe 5 integration for Beautiful Hugo */
$(document).ready(function () {
    var items = [];
    var figureEls = [];

    // Scan all <figure> elements and build the slide data array.
    $('figure').each(function () {
        if ($(this).attr('class') === 'no-photoswipe') return true;

        var $figure = $(this);
        var $a = $figure.find('a');
        if (!$a.length) return true;

        var src = $a.attr('href');
        var sizeAttr = $a.data('size');
        var width = sizeAttr ? parseInt(sizeAttr.split('x')[0], 10) : 0;
        var height = sizeAttr ? parseInt(sizeAttr.split('x')[1], 10) : 0;

        var $figcaption = $figure.find('figcaption');
        var captionHtml = '';
        if ($figcaption.length) {
            captionHtml = $figcaption.html();
        }

        items.push({
            src: src,
            width: width,
            height: height,
            alt: $figure.find('img').attr('alt') || '',
            caption: captionHtml
        });
        figureEls.push($figure[0]);
    });

    if (!items.length) return;

    // Resolve all missing dimensions, pre-caching images in the process.
    Promise.all(items.map(function (item) {
        if (item.width > 0 && item.height > 0) {
            return Promise.resolve(item);
        }
        return new Promise(function (resolve) {
            var img = new Image();
            img.onload = function () {
                item.width = img.naturalWidth;
                item.height = img.naturalHeight;
                resolve(item);
            };
            img.onerror = function () {
                item.width = 800;
                item.height = 600;
                resolve(item);
            };
            // Start loading without blocking UI
            img.src = item.src;
        });
    })).then(function () {
        // Lightbox options kept minimal – rely on PhotoSwipe 5 defaults
        var lightbox = new PhotoSwipeLightbox({
            dataSource: items,
            pswpModule: PhotoSwipe,
            bgOpacity: 1,
            showHideAnimationType: 'fade',
            padding: { top: 40, bottom: 40, left: 40, right: 40 }
        });

        lightbox.on('uiRegister', function () {
            lightbox.pswp.ui.registerElement({
                name: 'default-caption',
                order: 9,
                isButton: false,
                appendTo: 'root',
                onInit: function (el) {
                    el.style.position = 'absolute';
                    el.style.bottom = '15px';
                    el.style.left = '0';
                    el.style.right = '0';
                    el.style.padding = '0 20px';
                    el.style.color = 'rgba(255, 255, 255, 0.7)';
                    el.style.fontSize = '14px';
                    el.style.textAlign = 'center';
                    el.style.pointerEvents = 'none';

                    lightbox.pswp.on('change', function () {
                        var slide = lightbox.pswp.currSlide;
                        if (slide && slide.data && slide.data.caption) {
                            el.innerHTML = slide.data.caption;
                            var $attrLink = el.querySelector('a');
                            if ($attrLink) {
                                $attrLink.style.pointerEvents = 'auto';
                                $attrLink.style.color = 'rgba(255, 255, 255, 0.8)';
                            }
                            var $attr = el.querySelector('p.attr');
                            if ($attr) {
                                $attr.style.fontSize = '0.9em';
                                $attr.style.opacity = '0.8';
                            }
                        } else {
                            el.innerHTML = '';
                        }
                    });
                }
            });
        });

        lightbox.init();

        // Wire up click handlers.
        $('figure').each(function () {
            if ($(this).attr('class') === 'no-photoswipe') return true;
            if (!$(this).find('a').length) return true;

            $(this).on('click', function (event) {
                if ($(event.target).closest('figcaption a').length) return;
                event.preventDefault();
                var idx = figureEls.indexOf(this);
                if (idx >= 0) {
                    lightbox.loadAndOpen(idx);
                }
            });
        });
    });
});
