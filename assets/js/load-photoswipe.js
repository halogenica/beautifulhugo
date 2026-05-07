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

        items.push({
            src: src,
            width: width,
            height: height,
            alt: $figure.find('img').attr('alt') || ''
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
        lightbox.init();

        // Wire up click handlers.
        $('figure').each(function () {
            if ($(this).attr('class') === 'no-photoswipe') return true;
            if (!$(this).find('a').length) return true;

            $(this).on('click', function (event) {
                event.preventDefault();
                var idx = figureEls.indexOf(this);
                if (idx >= 0) {
                    lightbox.loadAndOpen(idx);
                }
            });
        });
    });
});
