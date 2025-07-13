$(document).ready(function () {
  $("#contact-form").on("submit", function (e) {
    e.preventDefault();
    var $form = $(this);
    var $btn = $form.find('button[type="submit"]');
    var $btnText = $btn.find(".btn-text");
    var $btnLoading = $btn.find(".btn-loading");
    var $success = $("#form-success");

    // Show loading spinner
    $btn.prop("disabled", true);
    $btnText.hide();
    $btnLoading.show();

    $.ajax({
      url: $form.attr("action"),
      method: $form.attr("method"),
      data: $form.serialize(),
      dataType: "json",
      success: function () {
        $form[0].reset();
        $success.fadeIn();
        setTimeout(function () {
          $success.fadeOut();
        }, 4000);
      },
      error: function () {
        alert("There was an error sending your message. Please try again.");
      },
      complete: function () {
        $btn.prop("disabled", false);
        $btnText.show();
        $btnLoading.hide();
      },
    });
  });
});
