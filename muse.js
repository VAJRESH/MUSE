
$(document).ready(function () {
    $("#mainAgarbattiBlock, #mainUtnaBlock, #ship, #nameVolunteer, #other, #transactionid").hide()
   
    $("#agarbatti").click(function () {
        $("#mainAgarbattiBlock").slideToggle();
        $( "#agarbatti" ).toggleClass( "active-link" );
        $("#mainUtnaBlock").slideUp();
        $( "#utna" ).removeClass( "active-link" );
    });

    $("#utna").click(function () {
        $("#mainUtnaBlock").slideToggle();
        $( "#utna" ).toggleClass( "active-link" );
        $("#mainAgarbattiBlock").slideUp();
        $( "#agarbatti" ).removeClass( "active-link" );
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
    
    $(function() {
        $('#mode').change(function(){
            if ($(this).val() == 1){
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




