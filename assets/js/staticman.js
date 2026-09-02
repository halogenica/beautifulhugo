// Static comments
// from: https://github.com/eduardoboucas/popcorn/blob/gh-pages/js/main.js
(function ($) {
  var $comments = $('.js-comments');

  $('.js-form').submit(function () {
    var form = this;
    let url = $(this).attr('action');
    let data = $(this).serialize();

    $(form).addClass('form--loading');

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.onreadystatechange = function () {
      if(xhr.readyState === XMLHttpRequest.DONE) {
        var status = xhr.status;
        if (status >= 200 && status < 400) {
          showModal('Perfect !', 'Thanks for your comment! It will show on the site once it has been approved. .');
          $(form).removeClass('form--loading');
        } else {
          console.error(xhr.statusText);
          showModal('Error', 'Sorry, there was an error with the submission!');
          $(form).removeClass('form--loading');
        }
      }
    };

    xhr.send(data);

    return false;
  });

  $('.js-close-modal').click(closeModal);

  // Close on Escape and trap focus inside modal
  $(document).on('keydown', function (e) {
    if (!$('body').hasClass('show-modal')) return;
    if (e.key === 'Escape') {
      closeModal();
    }
    if (e.key === 'Tab') {
      var $modal = $('.modal');
      var focusable = $modal.find('a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])').filter(':visible');
      var first = focusable.first()[0];
      var last = focusable.last()[0];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  function closeModal() {
    $('body').removeClass('show-modal');
  }

  function showModal(title, message) {
    $('.js-modal-title').text(title);
    $('.js-modal-text').html(message);

    $('body').addClass('show-modal');
    // Move focus into modal for accessibility
    setTimeout(function () {
      $('.js-close-modal').focus();
    }, 0);
  }
})(jQuery);
