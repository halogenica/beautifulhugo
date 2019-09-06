// Static comments
// from: https://github.com/eduardoboucas/popcorn/blob/gh-pages/js/main.js
$( document ).ready(function() {
  var $comments = $('.js-comments');

  $('.js-form').submit(function () {
    var form = this;

    $(form).addClass('form--loading');
    $('button[type="submit"]:enabled').addClass('hidden'); // hide "submit"
    $('button[type="submit"]:disabled').removeClass('hidden'); // show "submitted"

    $.ajax({
      type: $(this).attr('method'),
      url: '{{ .api }}',
      data: $(this).serialize(),
      contentType: 'application/x-www-form-urlencoded',
      success: function (data) {
        showAlert('success');
        setTimeout(function(){ clearForm() }, 3000); // display success message for 3s
        $(form).removeClass('form--loading');
      },
      error: function (err) {
        console.log(err);
        showAlert('failed');
        $(form).removeClass('form--loading');
      }
    });

    return false;
  });

  function showAlert(msg) {
    if (msg == 'success') {
      $('.js-form .submit-success').removeClass('hidden');  // show submit success message
      $('.js-form .submit-failed').addClass('hidden'); // hide submit failed message
    } else {
      $('.js-form .submit-success').addClass('hidden'); // hide submit success message
      $('.js-form .submit-failed').removeClass('hidden');  // show submit failed message
    }
    $('button[type="submit"]:enabled').removeClass('hidden'); // show "submit"
    $('button[type="submit"]:disabled').addClass('hidden');  // hide "submitted"
  }

  function clearForm() {
    resetReplyTarget();
    $('.js-form input')
      .filter(function() {
        return this.name.match(/^fields\[.*\]$/);
      })
      .val(''); // empty all text & hidden fields
    $('.js-form textarea').val(''); // empty text area
    $('.js-form .submit-success').addClass('hidden'); // hide submission status
    $('.js-form .submit-failed').addClass('hidden'); // hide submission status
    $('#commentPreview').html(''); // empty comment preview
  }

  function resetReplyTarget() {
    $('.js-form .reply-notice .reply-name').text(''); // reset reply target
    $('.js-form .reply-notice img').remove(); // remove reply avatar
    $('.js-form .reply-notice a').remove(); // remove '×' button
    $('.js-form .reply-notice').addClass('hidden'); // hide reply target display
    $('.js-form input[name="fields[replyThread]"]').val('');
    $('.js-form input[name="fields[replyID]"]').val('');
    $('.js-form input[name="fields[replyName]"]').val('');
  }

  // record reply target when "reply to this comment" is pressed
  $('article.static-comment').on('click', 'a.reply-btn', function (evt){
    resetReplyTarget();
    var cmt = $(evt.delegateTarget);
    $('.js-form input[name="fields[replyThread]"]').val(this.title);
    $('.js-form input[name="fields[replyID]"]').val(this.id);
    authorTag = cmt.find('.comment-author');
    replyName = authorTag.text();
    $('.js-form input[name="fields[replyName]"]').val(replyName);

    // display reply target avatar and name
    $('.js-form .reply-notice').removeClass('hidden');
    $('.js-form .reply-name').text(replyName);
    avatarTag = cmt.find('.comment-avatar');
    // use clone to avoid removal of avatar in comments by resetReplyTarget()
    $('.js-form .reply-arrow').after(avatarTag.clone());
    // add button for removing reply target (static method would give error msg)
    closeBtn = $("<a class='close-btn btn'>\u2716</a>");
    $('.js-form .reply-notice').append(closeBtn);
  });

  // handle removal of reply target when '×' is pressed
  $('.js-form .reply-notice').on('click', 'a.close-btn', function(){
    resetReplyTarget();
  });

  // clear form when reset button is clicked
  $('.js-form button[type="reset"]').click(function (){
    clearForm();
  });
});
