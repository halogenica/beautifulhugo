$( document ).ready(function() {
  // Detect textarea event
  $('textarea[name="fields[comment]"]').on("change keyup paste", function() {
    var oldVal = "";
    var currentVal = $(this).val();
    if(currentVal == oldVal) {
      return; // check to prevent multiple simultaneous triggers
    }

    oldVal = currentVal;
    //action to be performed on textarea changed
    renderMD($(this), $("#comment-preview"));
    myKaTeXOptions.throwOnError = false; // d
    renderMathInElement(comment-preview);
  });

  // Showdown
  var converter = new showdown.Converter({tables: true});
  function renderMD(inElem, outElem){
    rawHTML = converter.makeHtml(inElem.val());
    outElem.html(rawHTML);
  }
});
