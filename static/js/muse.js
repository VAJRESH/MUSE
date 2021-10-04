$(document).ready(function () {
  $(
    "#mainUtnaBlock, #paintedDiyaBlock, #soapBlock, #ship, #nameVolunteer, #other, #transactionid"
  ).hide();

  $("#agarbatti").click(function () {
    if ($(this).hasClass('active-link')) return;
    $("#mainAgarbattiBlock").slideToggle();
    $("#agarbatti").toggleClass("active-link");

    $("#mainUtnaBlock").slideUp();
    $("#paintedDiyaBlock").slideUp();
    $("#soapBlock").slideUp();

    $("#utna").removeClass("active-link");
    $("#diya").removeClass("active-link");
    $("#soap").removeClass("active-link");
  });

  $("#utna").click(function () {
    if ($(this).hasClass('active-link')) return;
    $("#mainUtnaBlock").slideToggle();
    $("#utna").toggleClass("active-link");

    $("#mainAgarbattiBlock").slideUp();
    $("#paintedDiyaBlock").slideUp();
    $("#soapBlock").slideUp();

    $("#agarbatti").removeClass("active-link");
    $("#diya").removeClass("active-link");
    $("#soap").removeClass("active-link");
  });

  $("#diya").click(function () {
    if ($(this).hasClass('active-link')) return;
    $("#paintedDiyaBlock").slideToggle();
    $("#diya").toggleClass("active-link");

    $("#mainAgarbattiBlock").slideUp();
    $("#mainUtnaBlock").slideUp();
    $("#soapBlock").slideUp();

    $("#agarbatti").removeClass("active-link");
    $("#utna").removeClass("active-link");
    $("#soap").removeClass("active-link");
  });

  $("#soap").click(function () {
    if ($(this).hasClass('active-link')) return;
    $("#soapBlock").slideToggle();
    $("#soap").toggleClass("active-link");

    $("#mainAgarbattiBlock").slideUp();
    $("#mainUtnaBlock").slideUp();
    $("#paintedDiyaBlock").slideUp();

    $("#agarbatti").removeClass("active-link");
    $("#utna").removeClass("active-link");
    $("#diya").removeClass("active-link");
  });

  $("#yes").click(function () {
    $("#ship").slideDown("slow");
  });

  $("#no").click(function () {
    $("#ship").slideUp();
  });

  $("#neft").click(function () {
    $("#transactionid").slideDown("slow");
  });

  $("#cash").click(function () {
    $("#transactionid").slideUp();
  });

  $(function () {
    $("#mode").change(function () {
      if ($(this).val() == 1) {
        $("#nameVolunteer").show();
        $("#other").hide();
      } else if ($(this).val() == 5) {
        $("#other").show();
        $("#nameVolunteer").hide();
      } else {
        $("#nameVolunteer").hide();
        $("#other").hide();
      }
    });
  });
});
