// Static comments
// from: https://github.com/eduardoboucas/popcorn/blob/gh-pages/js/main.js
(function () {
  var form = document.querySelector('.js-form');
  if (!form) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var url = form.getAttribute('action');
    var data = new URLSearchParams(new FormData(form)).toString();

    form.classList.add('form--loading');

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.onreadystatechange = function () {
      if(xhr.readyState === XMLHttpRequest.DONE) {
        var status = xhr.status;
        if (status >= 200 && status < 400) {
          showModal('Perfect !', 'Thanks for your comment! It will show on the site once it has been approved. .');
        } else {
          console.error(xhr.statusText);
          showModal('Error', 'Sorry, there was an error with the submission!');
        }
        form.classList.remove('form--loading');
      }
    };

    xhr.send(data);
  });

  document.querySelectorAll('.js-close-modal').forEach(function (button) {
    button.addEventListener('click', closeModal);
  });

  // Close on Escape and trap focus inside modal
  document.addEventListener('keydown', function (e) {
    if (!document.body.classList.contains('show-modal')) return;
    if (e.key === 'Escape') {
      closeModal();
    }
    if (e.key === 'Tab') {
      var modal = document.querySelector('.modal');
      var focusable = Array.prototype.filter.call(
        modal.querySelectorAll('a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'),
        function (el) { return el.offsetParent !== null; }
      );
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
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
    document.body.classList.remove('show-modal');
  }

  function showModal(title, message) {
    document.querySelector('.js-modal-title').textContent = title;
    document.querySelector('.js-modal-text').innerHTML = message;

    document.body.classList.add('show-modal');
    // Move focus into modal for accessibility
    setTimeout(function () {
      var close = document.querySelector('.js-close-modal');
      if (close) close.focus();
    }, 0);
  }
})();
