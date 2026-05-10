jQuery(document).ready(function ($) {
    // Initialize each marquee
    $('.block-marquee-wrapper').each(function () {
        var marqueeWrapper = $(this);
        var marqueeTrack = marqueeWrapper.find('.block-marquee__track');
        var marqueeItems = marqueeTrack.children();
        var isRTL = $('html').attr('dir') === 'rtl'; // Check if the document is in RTL

        // Clone the items and append to the track for smooth infinite effect
        marqueeItems.clone().appendTo(marqueeTrack);

        // Calculate the total width of all items
        var totalWidth = 0;
        marqueeItems.each(function () {
            totalWidth += $(this).outerWidth(true); // Get width including margin
        });

        // Set the width of the track to be twice the total width of items (for infinite loop)
        marqueeTrack.css('width', totalWidth * 2);

        // Set up the animation loop
        var currentPos = 0;
        var step = 1; // Adjust step to control speed

        function animateMarquee() {
            // Adjust the direction based on the document's text direction (RTL or LTR)
            if (isRTL) {
                currentPos += step; // Move to the right for RTL
                marqueeTrack.css('transform', 'translateX(' + currentPos + 'px)');

                // If the first item scrolls out of view, move it to the end in RTL
                if (currentPos >= totalWidth) {
                    currentPos = 0; // Reset the position
                    marqueeTrack.css('transform', 'translateX(' + currentPos + 'px)');
                }
            } else {
                currentPos -= step; // Move to the left for LTR
                marqueeTrack.css('transform', 'translateX(' + currentPos + 'px)');

                // If the first item scrolls out of view, move it to the end in LTR
                if (Math.abs(currentPos) >= totalWidth) {
                    currentPos = 0; // Reset the position
                    marqueeTrack.css('transform', 'translateX(' + currentPos + 'px)');
                }
            }

            requestAnimationFrame(animateMarquee);
        }

        animateMarquee(); // Start the animation
    });
});