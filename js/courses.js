$(document).ready(function(){
    // Initialize Owl Carousel for courses section with custom navigation
    const coursesCarousel = $('#coursesCarousel').owlCarousel({
        rtl: true,
        loop: true,
        margin: 20,
        nav: false, // Disable default navigation
        dots: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        smartSpeed: 800,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });

    // Handle custom navigation buttons
    $('.custom-prev').click(function() {
        coursesCarousel.trigger('prev.owl.carousel', [500]);
    });

    $('.custom-next').click(function() {
        coursesCarousel.trigger('next.owl.carousel', [500]);
    });
});
