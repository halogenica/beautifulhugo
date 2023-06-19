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

  $('.js-close-modal').click(function () {
    $('body').removeClass('show-modal');
  });

  function showModal(title, message) {
    $('.js-modal-title').text(title);
    $('.js-modal-text').html(message);

    $('body').addClass('show-modal');
  }
})(jQuery);
