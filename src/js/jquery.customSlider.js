(function($){
    jQuery.fn.customSlider = function(options){
        options = $.extend({
            nav: 1,
            dots: 1
        }, options);

        // init slider wrapper
        let slides = $(this).find('.customSlider-slide');
        $(this).html(`<div class="customSlider-wrapper"></div>`);
        for (let i = 0; i < slides.length; i++){
            $(this).find('.customSlider-wrapper').append(slides[i]);
        }
        let sliderWrapper = $('.customSlider-wrapper'), translate;

        // init nav
        if(options.nav === 1){
            $(this).append(`
            <div class="customSlider-controls">
            <span class="customSlider-controls--nav prev">
                <svg class="icon" width="30"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 504C119 504 8 393 8 256S119 8 256 8s248 111 248 248-111 248-248 248zm116-292H256v-70.9c0-10.7-13-16.1-20.5-8.5L121.2 247.5c-4.7 4.7-4.7 12.2 0 16.9l114.3 114.9c7.6 7.6 20.5 2.2 20.5-8.5V300h116c6.6 0 12-5.4 12-12v-64c0-6.6-5.4-12-12-12z"></path></svg>
            </span>
            <span class="customSlider-controls--nav next">
                <svg class="icon" width="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zM140 300h116v70.9c0 10.7 13 16.1 20.5 8.5l114.3-114.9c4.7-4.7 4.7-12.2 0-16.9l-114.3-115c-7.6-7.6-20.5-2.2-20.5 8.5V212H140c-6.6 0-12 5.4-12 12v64c0 6.6 5.4 12 12 12z"></path></svg>
            </span>
            </div>
            `);
        }

        // init dots
        if(options.dots === 1){
            let countSlides = $(this).find(sliderWrapper).children().length;
            $(this).append(`<div class="customSlider-dots"></div>`);
            for (let i = 0; i < countSlides; i++){
                $(this).find('.customSlider-dots').append(`
                <span class="dot" data-index="${i}">
                    <svg class="icon" width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg>
                </span>
            `);
            }
        }

        var slideActive = 1;
        var slideCount = sliderWrapper.children().length;
        currentSlide();

        function nextSlide() {
            if (slideActive == slideCount || slideActive <= 0 || slideActive > slideCount) {
                sliderWrapper.css('transform', 'translate(0, 0)');
                slideActive = 1;
            } else {
                translate = -100 * (slideActive);
                sliderWrapper.css({
                    'transform': 'translate(' + translate + '%, 0)',
                    '-webkit-transform': 'translate(' + translate + '%, 0)',
                    '-ms-transform': 'translate(' + translate + '%, 0)',
                });
                slideActive++;
            }
            currentSlide();
        }

        function prevSlide() {
            if (slideActive == 1 || slideActive <= 0 || slideActive > slideCount) {
                translate = -100 * (slideCount - 1);
                sliderWrapper.css({
                    'transform': 'translate(' + translate + '%, 0)',
                    '-webkit-transform': 'translate(' + translate + '%, 0)',
                    '-ms-transform': 'translate(' + translate + '%, 0)',
                });
                slideActive = slideCount;
            } else {
                translate = -100 * (slideActive - 2);
                sliderWrapper.css({
                    'transform': 'translate(' + translate + '%, 0)',
                    '-webkit-transform': 'translate(' + translate + '%, 0)',
                    '-ms-transform': 'translate(' + translate + '%, 0)',
                });
                slideActive--;
            }
            currentSlide();
        }

        function currentSlide(){
            $( ".dot" ).each(function( index ) {
                if((index + 1) == slideActive){
                    $(this).addClass('active');
                } else {
                    $(this).removeClass('active');
                }
            });
        }

        let actions = function(){
            $(this).find('.next').click( function(){
                nextSlide();
            });
            $(this).find('.prev').click( function(){
                prevSlide();
            });
            $(this).find('.dot').click( function(){
                let dotIndex = $(this).data('index');
                if(dotIndex + 1 != slideActive){
                    translate = -100 * (dotIndex);
                    sliderWrapper.css({
                        'transform': 'translate(' + translate + '%, 0)',
                        '-webkit-transform': 'translate(' + translate + '%, 0)',
                        '-ms-transform': 'translate(' + translate + '%, 0)',
                    });
                    slideActive = dotIndex + 1;
                }
                currentSlide();
            });
        };

        return this.each(actions);
    };
})(jQuery);