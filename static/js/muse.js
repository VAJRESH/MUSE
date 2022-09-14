$(document).ready(function () {
  $(
    "#mainubtanBlock, #paintedDiyaBlock, #soapBlock, #ship, #nameVolunteer, #other, #transactionid, #DiwaliStall, #giftHamperBlock",
  ).hide();

  $("#agarbatti").click(function () {
    if ($(this).hasClass("active-link")) return;
    $("#mainAgarbattiBlock").slideToggle();
    $("#agarbatti").toggleClass("active-link");

    $("#mainubtanBlock").slideUp();
    $("#paintedDiyaBlock").slideUp();
    $("#soapBlock").slideUp();
    $("#giftHamperBlock").slideUp();

    $("#ubtan").removeClass("active-link");
    $("#diya").removeClass("active-link");
    $("#soap").removeClass("active-link");
    $("#gift-hamper").removeClass("active-link");
  });

  $("#ubtan").click(function () {
    if ($(this).hasClass("active-link")) return;
    $("#mainubtanBlock").slideToggle();
    $("#ubtan").toggleClass("active-link");

    $("#mainAgarbattiBlock").slideUp();
    $("#paintedDiyaBlock").slideUp();
    $("#soapBlock").slideUp();
    $("#giftHamperBlock").slideUp();

    $("#agarbatti").removeClass("active-link");
    $("#diya").removeClass("active-link");
    $("#soap").removeClass("active-link");
    $("#gift-hamper").removeClass("active-link");
  });

  $("#diya").click(function () {
    if ($(this).hasClass("active-link")) return;
    $("#paintedDiyaBlock").slideToggle();
    $("#diya").toggleClass("active-link");

    $("#mainAgarbattiBlock").slideUp();
    $("#mainubtanBlock").slideUp();
    $("#soapBlock").slideUp();
    $("#giftHamperBlock").slideUp();

    $("#agarbatti").removeClass("active-link");
    $("#ubtan").removeClass("active-link");
    $("#soap").removeClass("active-link");
    $("#gift-hamper").removeClass("active-link");
  });

  $("#soap").click(function () {
    if ($(this).hasClass("active-link")) return;
    $("#soapBlock").slideToggle();
    $("#soap").toggleClass("active-link");

    $("#mainAgarbattiBlock").slideUp();
    $("#mainubtanBlock").slideUp();
    $("#paintedDiyaBlock").slideUp();
    $("#giftHamperBlock").slideUp();

    $("#agarbatti").removeClass("active-link");
    $("#ubtan").removeClass("active-link");
    $("#diya").removeClass("active-link");
    $("#gift-hamper").removeClass("active-link");
  });

  $("#gift-hamper").click(function () {
    if ($(this).hasClass("active-link")) return;
    $("#giftHamperBlock").slideToggle();
    $("#gift-hamper").toggleClass("active-link");

    $("#mainAgarbattiBlock").slideUp();
    $("#mainubtanBlock").slideUp();
    $("#paintedDiyaBlock").slideUp();
    $("#soapBlock").slideUp();

    $("#agarbatti").removeClass("active-link");
    $("#ubtan").removeClass("active-link");
    $("#diya").removeClass("active-link");
    $("#soap").removeClass("active-link");
  });

  $("#yes").click(function () {
    $("#ship").slideDown("slow");
    $(".shipReq").attr("required", true);
  });

  $("#no").click(function () {
    $("#ship").slideUp();
    $(".shipReq").attr("required", false);
  });

  $("#neft").click(function () {
    $("#transactionid").slideDown("slow");
    $("#isPaid").slideUp();
    $(".neftReq").attr("required", true);
  });

  $("#cash").click(function () {
    $("#isPaid").slideDown("slow");
    $("#transactionid").slideUp();
    $(".neftReq").attr("required", false);
  });

  $("#mode").change(function () {
    if ($(this).val() == "VSM Volunteer") {
      $("#nameVolunteer").show();
      $(".volunteer-name").attr("required", true);
      $(".others-req").attr("required", false);
      $(".diwali-stalls").attr("required", false);
      $("#other").hide();
      $("#DiwaliStall").hide();
    } else if ($(this).val() == "Other") {
      $("#other").show();
      $(".others-req").attr("required", true);
      $(".volunteer-name").attr("required", false);
      $(".diwali-stalls").attr("required", false);
      $("#nameVolunteer").hide();
      $("#DiwaliStall").hide();
    } else if ($(this).val() == "Diwali Stalls") {
      $("#DiwaliStall").show();
      $(".diwali-stalls").attr("required", true);
      $(".volunteer-name").attr("required", false);
      $(".others-req").attr("required", false);
      $("#nameVolunteer").hide();
      $("#other").hide();
    } else {
      $("#nameVolunteer").hide();
      $("#other").hide();
      $("#DiwaliStall").hide();
      $(".volunteer-name").attr("required", false);
      $(".others-req").attr("required", false);
      $(".diwali-stalls").attr("required", false);
    }
  });

  $(".mobile-number").keyup(function () {
    const value = $(this).val();
    if (value.length > 10) {
      $(this).val(value.substr(0, 10));
      return;
    }
    if (value.length !== 10) {
      $(this).css("border", "1px solid red");
      $(".mobile-error").show();
    } else {
      $(this).css("border", "");
      $(".mobile-error").hide();
    }
  });

  $(".pin-code").keyup(function () {
    const value = $(this).val();
    if (value.length > 6) {
      $(this).val(value.substr(0, 6));
      return;
    }
    if (value.length !== 6) {
      $(this).css("border", "1px solid red");
      $(".pin-code-error").show();
    } else {
      $(this).css("border", "");
      $(".pin-code-error").hide();
    }
  });

  $(".mobile-error").hide();
  $(".pin-code-error").hide();
});

// function disabledSubmitButton(isValid){
//   if(isValid.every(item => item)){
//     $(".registerbtn").prop("disabled",true);
//   } else {
//     $(".registerbtn").prop("disabled",true);
//   }
// }

// function validateForm(){
//   let isValid = [false,false];
//   disabledSubmitButton([false]);
//   $('.mobile-number').keyup( function() {
//     const value = $(this).val();
//     disabledSubmitButton([false]);
//     if(value.length > 10){
//       $(this).val(value.substr(0,10));
//       return;
//     }
//     if(value.length !== 10){
//       $(this).css("border","1px solid red");
//       isValid[1] = false;

//     } else {
//       $(this).css("border","");
//       isValid[1] = true;
//     }
//     disabledSubmitButton(isValid);
//   });

//   $('.pin-code').keyup( function() {
//     const value = $(this).val();
//     disabledSubmitButton([false]);
//     if(value.length > 6){
//       $(this).val(value.substr(0,6));
//       return;
//     }
//     if(value.length !== 6){
//       $(this).css("border","1px solid red");
//       isValid[2] = false;
//     } else {
//       $(this).css("border","");
//       isValid[2] = true;
//     }
//     disabledSubmitButton(isValid);
//   });
// }
