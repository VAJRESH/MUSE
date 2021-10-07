$(document).ready(function () {
  $(
    "#mainubtanBlock, #paintedDiyaBlock, #soapBlock, #ship, #nameVolunteer, #other, #transactionid"
  ).hide();

  $("#agarbatti").click(function () {
    if ($(this).hasClass('active-link')) return;
    $("#mainAgarbattiBlock").slideToggle();
    $("#agarbatti").toggleClass("active-link");

    $("#mainubtanBlock").slideUp();
    $("#paintedDiyaBlock").slideUp();
    $("#soapBlock").slideUp();

    $("#ubtan").removeClass("active-link");
    $("#diya").removeClass("active-link");
    $("#soap").removeClass("active-link");
  });

  $("#ubtan").click(function () {
    if ($(this).hasClass('active-link')) return;
    $("#mainubtanBlock").slideToggle();
    $("#ubtan").toggleClass("active-link");

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
    $("#mainubtanBlock").slideUp();
    $("#soapBlock").slideUp();

    $("#agarbatti").removeClass("active-link");
    $("#ubtan").removeClass("active-link");
    $("#soap").removeClass("active-link");
  });

  $("#soap").click(function () {
    if ($(this).hasClass('active-link')) return;
    $("#soapBlock").slideToggle();
    $("#soap").toggleClass("active-link");

    $("#mainAgarbattiBlock").slideUp();
    $("#mainubtanBlock").slideUp();
    $("#paintedDiyaBlock").slideUp();

    $("#agarbatti").removeClass("active-link");
    $("#ubtan").removeClass("active-link");
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

  $("#mode").change(function () {
    if ($(this).val() == 'VSM Volunteer') {
      $("#nameVolunteer").show();
      $("#other").hide();
    } else if ($(this).val() == 'Other') {
      $("#other").show();
      $("#nameVolunteer").hide();
    } else {
      $("#nameVolunteer").hide();
      $("#other").hide();
    }
  });

 
});


