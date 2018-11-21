$( document ).ready(function() {
  var myKaTeXOptions = {
    // LaTeX like math delimiters
    delimiters: [
    {left: "$$", right: "$$", display: true},
    {left: "\\[", right: "\\]", display: true},
    {left: "$", right: "$", display: false},
    {left: "\\(", right: "\\)", display: false}
    ],
    throwOnError: false
  };

  // Showdown extension has to preceed object definition
  showdown.extension('unquote', function() {
    return [
    // repair math formula incorrectly parsed by Showdown
    // from: https://blag.nullteilerfrei.de/2017/06/23/wordpress-katex-and-the-showdown/
    { type: 'lang', regex:  /&gt;/g, replace: '>' },
    { type: 'lang', regex:  /&lt;/g, replace: '<' },
    { type: 'lang', regex: /&amp;/g, replace: '&' },
    ]
  });
  // Showdown converts Markdown to HTML
  var converter = new showdown.Converter({extensions:['unquote']});
  converter.setFlavor('github');

  // Detect textarea event
  var oldVal = "";
  $('textarea[name="fields[comment]"]').on("change keyup paste", function() {
    var currentVal = $(this).val();
    if(currentVal === oldVal) {
      return; // check to prevent multiple simultaneous triggers
    }
    oldVal = currentVal;

    // first parse math, then parse Markdown
    $('#commentPreview').text(oldVal);
    renderMathInElement(commentPreview, myKaTeXOptions);
    var rawHTML = converter.makeHtml($('#commentPreview').html());
    $('#commentPreview').html(rawHTML);
  });
});
