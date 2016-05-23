$(document).ready(function() {	
	$('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 500, 'linear');
        //$('.navbar-collapse').removeClass('in');
        event.preventDefault();
    });

    $('.navbar-brand').bind('click', function(event) {
       $('.navbar-collapse').removeClass('in');
        event.preventDefault();
    });


    // Highlight the top nav as scrolling occurs
	$('body').scrollspy({
    	target: '.navbar-fixed-top'
	})

	// Closes the Responsive Menu on Menu Item Click
	$('.navbar-collapse ul li a').click(function() {
    	$('.navbar-toggle:visible').click();
	});


	$(".carousel").swipe({

	  swipe: function(event, direction, distance, duration, fingerCount, fingerData) {

	    if (direction == 'left') $(this).carousel('next');
	    if (direction == 'right') $(this).carousel('prev');

	  },
	  allowPageScroll:"vertical"

	});

});