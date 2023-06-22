document.addEventListener('DOMContentLoaded', function() {
    // Initialize Testimonials Carousel
    const testimonialsCarousel = $('#testimonialsCarousel').owlCarousel({
        rtl: true,
        loop: true,
        margin: 30,
        nav: false,
        dots: false,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        smartSpeed: 1000,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            1200: {
                items: 3
            }
        }
    });

    // Custom Navigation
    $('#testimonialsPrev').click(function() {
        testimonialsCarousel.trigger('prev.owl.carousel', [500]);
    });

    $('#testimonialsNext').click(function() {
        testimonialsCarousel.trigger('next.owl.carousel', [500]);
    });

    // Add hover pause
    $('.testimonials-carousel').on('mouseover', function() {
        testimonialsCarousel.trigger('stop.owl.autoplay');
    });

    $('.testimonials-carousel').on('mouseleave', function() {
        testimonialsCarousel.trigger('play.owl.autoplay');
    });

    // Add animation to testimonial items
    $('.testimonial-item').each(function(index) {
        $(this).attr('data-aos', 'fade-up');
        $(this).attr('data-aos-delay', (index * 100).toString());
    });
});
