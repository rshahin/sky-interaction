$( document ).ready(function() {

  $("input#no-satellite").change(function() {
    $("input#no-satellite").not(this).prop('checked', false);  
    $.ajaxSetup({cache:false});
      if ($(this).is(':checked')) {
        $("#content-ajax").load("check.html", function() {
        });
      }
  });

  var timeOut;


    $(document).ajaxStart(function(){
        timeOut = setTimeout(function () {
          $("#wait").css("display", "block");
      }, 500);
    });

    $(document).ajaxComplete(function(){
        clearTimeout(timeOut);
        $("#wait").css("display", "none");
        $("#content-ajax").slideDown();
        $('html,body').animate({scrollTop: $("#content-ajax").offset().top},'slow');
    });

    $("a.weather-check").click(function(e) {
      e.preventDefault();
      $("a.weather-check").removeClass("clicked");
      $(this).addClass("clicked");
      $(this).closest('.option').children('a.error-button').addClass("clicked");
      $("#content-ajax").html("");
      $.ajaxSetup({cache:false});
          $("#content-ajax").load("check.html", function() {
      });
    });


  $("#settings, #admin_settings" ).on( "click", function() {
        $(this).toggleClass("on");
        $( "#drop-menu" ).slideToggle( "fast" );
  });

});


$('.mobile-nav').click(function () {
    $('nav').toggleClass('active'); 
  });





var resizeElements;

$(document).ready(function() {

  // Set up common variables
  // --------------------------------------------------

  var bar = ".search_bar";
  var input = bar + " input[type='text']";
  var button = bar + " button[type='submit']";
  var dropdown = bar + " .search_dropdown";
  var dropdownLabel = dropdown + " > span";
  var dropdownList = dropdown + " ul";
  var dropdownListItems = dropdownList + " li";


  // Set up common functions
  // --------------------------------------------------

  resizeElements = function() {
    var barWidth = $(bar).outerWidth();

    var labelWidth = $(dropdownLabel).outerWidth();
    $(dropdown).width(labelWidth);

    var dropdownWidth = $(dropdown).outerWidth();
    var buttonWidth = $(button).outerWidth();
    var inputWidth = barWidth - dropdownWidth - buttonWidth;
    var inputWidthPercent = inputWidth / barWidth * 100 + "%";

    $(input).css({ 'margin-left': dropdownWidth, 'width': inputWidthPercent });
  }

  function dropdownOn() {
    $(dropdownList).fadeIn(25);
    $(dropdown).addClass("active");
  }

  function dropdownOff() {
    $(dropdownList).fadeOut(25);
    $(dropdown).removeClass("active");
  }


  // Initialize initial resize of initial elements 
  // --------------------------------------------------
  resizeElements();


  // Toggle new dropdown menu on click
  // --------------------------------------------------

  $(dropdown).click(function(event) {
    if ($(dropdown).hasClass("active")) {
      dropdownOff();
    } else {
      dropdownOn();
    }

    event.stopPropagation();
    return false;
  });

  $("html").click(dropdownOff);


  // Activate new dropdown option and show tray if applicable
  // --------------------------------------------------

  $(dropdownListItems).click(function() {
    $(this).siblings("li.selected").removeClass("selected");
    $(this).addClass("selected");

    // Focus the input
    $(this).parents("form.search_bar:first").find("input[type=text]").focus();

    var labelText = $(this).text();
    $(dropdownLabel).text(labelText);

    resizeElements();

  });


  // Resize all elements when the window resizes
  // --------------------------------------------------

  $(window).resize(function() {
    resizeElements();
  });
});