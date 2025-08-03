$(document).ready(function() {
    // Load text content from external file
    function loadTextContent() {
        if (typeof TEXT_CONTENT !== 'undefined') {
            $('#mainTitle').text(TEXT_CONTENT.mainTitle);
            $('#majorTitle').text(TEXT_CONTENT.major);
            $('#dayOfWeek').text(TEXT_CONTENT.dayOfWeek);
            $('#dayNumber').text(TEXT_CONTENT.day);
            $('#month').text(TEXT_CONTENT.month);
            $('#time').text(TEXT_CONTENT.time);
            $('#university').text(TEXT_CONTENT.university);
            $('#address').text(TEXT_CONTENT.address);
            $('#city').text(TEXT_CONTENT.city);
            $('#phone').text(TEXT_CONTENT.phone);
            $('#directionButton').text(TEXT_CONTENT.directionButton);
            $('#parkingTitle').text(TEXT_CONTENT.parkingTitle);
            $('#parkingLocation1').text(TEXT_CONTENT.parkingLocation1);
            $('#parkingLocation2').text(TEXT_CONTENT.parkingLocation2);
            
            // Debug: Check if button text is loaded
            console.log('Direction button text:', TEXT_CONTENT.directionButton);
            console.log('Button element:', $('#directionButton').length);
            
            // Load image
            if (TEXT_CONTENT.imageUrl) {
                $('#graduationImage').attr('src', TEXT_CONTENT.imageUrl);
            }
        } else {
            console.error('TEXT_CONTENT is not defined');
        }
    }

    // Load text content when page loads
    loadTextContent();

    // Google Maps direction button
    $('#directionBtn').on('click', function(e) {
        e.preventDefault();
        console.log('Direction button clicked');
        
        // Address coordinates for the specific address
        const address = "59C Nguyễn Đình Chiểu, phường Xuân Hòa, thành phố Hồ Chí Minh";
        const encodedAddress = encodeURIComponent(address);
        
        // Open Google Maps with directions
        const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
        window.open(mapsUrl, '_blank');
    });

    // Add flower confetti effect on page load
    function createConfetti() {
        const flowers = [
            'asset/flower/tulip_1.png',
            'asset/flower/tulip_3.png',
            'asset/flower/chamomile.png'
        ];
        const confettiCount = 12;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = $('<div class="confetti"></div>');
            const flower = flowers[Math.floor(Math.random() * flowers.length)];
            
            // Random position for left or right side only
            let left;
            if (Math.random() < 0.5) {
                // Left side: 0% to 25%
                left = Math.random() * 25;
            } else {
                // Right side: 75% to 100%
                left = 75 + Math.random() * 25;
            }
            
            const animationDelay = Math.random() * 3;
            const animationDuration = Math.random() * 3 + 2;
            
            // Responsive flower size
            let size;
            if (window.innerWidth <= 767) {
                // Mobile: 15-20px
                size = Math.random() * 5 + 15;
            } else {
                // Desktop/Tablet: 20-40px
                size = Math.random() * 20 + 20;
            }
            
            confetti.css({
                'position': 'fixed',
                'width': size + 'px',
                'height': size + 'px',
                'background-image': `url(${flower})`,
                'background-size': 'contain',
                'background-repeat': 'no-repeat',
                'background-position': 'center',
                'left': left + '%',
                'top': '-20px',
                'z-index': '9999',
                'pointer-events': 'none',
                'animation': `fall ${animationDuration}s linear ${animationDelay}s infinite`
            });
            
            $('body').append(confetti);
        }
    }

    // Add CSS for confetti
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            @keyframes fall {
                to {
                    transform: translateY(100vh) rotate(360deg);
                }
            }
        `)
        .appendTo('head');

    // Trigger confetti after 1 second
    setTimeout(createConfetti, 1000);

    // Continuous typing effect function
    function continuousTypeWriter(element, text, speed = 100) {
        let i = 0;
        let isTyping = true;
        
        // Start with empty text
        element.text('');
        
        function type() {
            if (i < text.length && isTyping) {
                element.text(element.text() + text.charAt(i));
                i++;
                setTimeout(type, speed);
            } else if (i >= text.length) {
                // Wait a bit before starting to delete
                setTimeout(deleteText, 2000);
            }
        }
        
        function deleteText() {
            if (element.text().length > 0 && isTyping) {
                element.text(element.text().slice(0, -1));
                setTimeout(deleteText, speed / 2); // Delete faster than typing
            } else {
                // Wait a bit before starting to type again
                setTimeout(() => {
                    i = 0;
                    type();
                }, 1000);
            }
        }
        
        // Start the continuous typing
        type();
    }

    // Start continuous typing effect after page loads
    setTimeout(function() {
        if (typeof TEXT_CONTENT !== 'undefined') {
            continuousTypeWriter($('.graduate-name'), TEXT_CONTENT.graduateName, 150);
        }
    }, 2000);

    // Add click effect to decorative elements
    $('.decoration-dots span').on('click', function() {
        $(this).css({
            'transform': 'scale(1.5)',
            'background': '#E098AE'
        });
        
        setTimeout(() => {
            $(this).css({
                'transform': 'scale(1)',
                'background': '#BBEDF2'
            });
        }, 300);
    });

    // Image loading functionality
    $('.graduation-image').on('load', function() {
        $(this).parent().addClass('loaded');
    });

    $('.graduation-image').on('error', function() {
        // Fallback if image fails to load
        $(this).attr('src', 'https://via.placeholder.com/400x300/E098AE/FFFFFF?text=Ảnh+Tốt+Nghiệp');
        $(this).parent().addClass('loaded');
    });

    // Debug: Check if direction button exists
    console.log('Direction button element exists:', $('#directionBtn').length);
    console.log('Direction button text element exists:', $('#directionButton').length);
});