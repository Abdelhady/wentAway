$(document).ready(function(){
  $(document).wentAway({
    period: 2000,
    wentAwayCallback: function(){
        // one way of calling your custom code when
        // user wentAway
        console.log('wentAwayCallback');
        $("#away").show();
        $("#here").hide();
      },
      isBackCallback: function(){
       console.log('isBackCallback');
       $("#away").hide();
       $("#here").show();
     }
   });

  $("#active").wentAway({
    period: 2000,
    wentAwayCallback: function(){
      console.log('wentAwayCallback active');
      $("#active").addClass("inActive");
        $("#awayFromBox").show();
        $("#hereOnBox").hide();
    },
    isBackCallback: function(){
      console.log('isBackCallback active');
      $("#active").removeClass("inActive");
       $("#awayFromBox").hide();
       $("#hereOnBox").show();
    }
  });

});

// $(document).on("userWentAway", function () {
//     // another way of calling your custom code when
//     // user wentAway
//     console.log('user went away');
//     $("#active").addClass("inActive");
//     $("#away").show();
//     $("#here").hide();
// });

// $(document).on("userIsBack", function () {
//   console.log('user came back');
//   $("#active").removeClass("inActive");
//   $("#away").hide();
//   $("#here").show();
// });