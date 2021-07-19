jQuery(document).ready(function ($) {
    "use strict";



    $.fn.is_on_screen = function () {
        var win = $(window);
        var viewport = {
            top: win.scrollTop(),
            left: win.scrollLeft()
        };
        viewport.right = viewport.left + win.width();
        viewport.bottom = viewport.top + win.height();

        var bounds = this.offset();
        bounds.right = bounds.left + this.outerWidth();
        bounds.bottom = bounds.top + this.outerHeight();

        return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
    };

    $('#menu_toggle').live('click', function () {
        $(this).toggleClass('open');
        $('.mobile_header .top_nav_mobile').slideToggle(300);
        return false;
    });

    $(".mobile_header .top_nav_mobile .main_menu_nav > li.menu-item-has-children > a").after('<span class="arrow"><i></i></span>');
    $(".mobile_header .top_nav_mobile .main_menu_nav > li.menu-item-has-children > .sub-menu > .menu-item-has-children > a").after('<span class="arrow"><i class="fa fa-chevron-down"></i></span>');

    $(".mobile_header .top_nav_mobile .main_menu_nav > li.menu-item-has-children .arrow").live('click', function () {
        $(this).toggleClass('active');
        $(this).closest('li').find('> ul').slideToggle(300);
    });

    $(".mobile_header .top_nav_mobile .main_menu_nav > li.menu-item-has-children > a").live('click', function () {
        if ($(this).attr('href') == '#') {
            $(this).closest('li').find('ul').slideToggle(300);
            $(this).closest('li').find('.arrow').toggleClass('active');
        }
    });
    var window_width = jQuery(window).width();

    $('.quantity_actions span').on('click', function () {
        var quantityContainer = $(this).closest('.quantity'),
            quantityInput = quantityContainer.find('.qty'),
            quantityVal = quantityInput.attr('value');

        if ($(this).hasClass('plus')) {
            quantityInput.attr('value', parseInt(quantityVal) + 1);
        } else if ($(this).hasClass('minus')) {
            if (quantityVal > 1) {
                quantityInput.attr('value', parseInt(quantityVal) - 1);
            }
        }
    });

    $("#header .top_nav, .header_style_2#header .header_top").affix({
        offset: {
            top: 250
        }
    });

    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        stm_animate_block();
    } else {
        $(".stm_animation").css('opacity', 1);
    }

    jQuery(window).scroll(function () {
        if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            stm_animate_block();
        } else {
            $(".stm_animation").css('opacity', 1);
        }
    });

    $('.single-product .product-type-variable table.variations select').live("change", function () {
        $(this).parent().find('.select2-selection__rendered').text($(this).find('option[value="' + $(this).val() + '"]').text());
    });
    $(".scroll").click(function (event) {
        event.preventDefault();
        $('html,body').animate({
            scrollTop: $(this.hash).offset().top
        }, 1000);
    });


});

function stm_animate_block() {
    jQuery('.stm_animation').each(function () {
        if (jQuery(this).attr('data-animate')) {
            var animation_blocks = jQuery(this).children('*');
            var animationName = jQuery(this).attr('data-animate'),
                animationDuration = jQuery(this).attr('data-animation-duration') + 's',
                animationDelay = jQuery(this).attr('data-animation-delay');
            var style = 'opacity:1;-webkit-animation-delay:' + animationDelay + 's;-webkit-animation-duration:' + animationDuration + '; -moz-animation-delay:' + animationDelay + 's;-moz-animation-duration:' + animationDuration + '; animation-delay:' + animationDelay + 's;';
            var container_style = 'opacity:1;-webkit-transition-delay: ' + (animationDelay) + 's; -moz-transition-delay: ' + (animationDelay) + 's; transition-delay: ' + (animationDelay) + 's;';
            if (isAppear(jQuery(this))) {
                jQuery(this).attr('style', container_style);
                jQuery.each(animation_blocks, function (index, value) {
                    jQuery(this).attr('style', style);
                    jQuery(this).addClass('animated').addClass(animationName);
                });
            }
        }
    });
}

function isAppear(id) {
    var window_scroll = jQuery(window).scrollTop();
    var window_height = jQuery(window).height();

    if (jQuery(id).hasClass('stm_viewport')) {
        var start_effect = jQuery(id).data('viewport_position');
    }

    if (typeof (start_effect) === 'undefined' || start_effect == '') {
        var percentage = 2;
    } else {
        var percentage = 100 - start_effect;
    }
    var element_top = jQuery(id).offset().top;
    var position = element_top - window_scroll;

    var cut = window_height - (window_height * (percentage / 100));
    if (position <= cut) {
        return true;
    } else {
        return false;
    }
}

function demosItemTemplate(state) {
    if (!state.id) {
        return state.text;
    }
    var $state = jQuery(
        '<span class="' + state.element.value + '"> ' + state.text + '</span>'
    );
    return $state;
}

jQuery(document).ready(function ($) {
    "use strict";
    var testimonial_carousel = $("#testimonial_carousel");
    testimonial_carousel.slick({
        dots: false,
        infinite: true,
        arrows: true,
        prevArrow: "<div class=\"slick_prev\"><i class=\"fa fa-chevron-left\"></i></div>",
        nextArrow: "<div class=\"slick_next\"><i class=\"fa fa-chevron-right\"></i></div>",
        autoplaySpeed: 5000,
        autoplay: true,
        slidesToShow: 2,
        cssEase: "cubic-bezier(0.455, 0.030, 0.515, 0.955)",
        responsive: [{
            breakpoint: 769,
            settings: {
                slidesToShow: 1
            }
                }]
    });
    //     $('.services-elaborate').slideUp(); 
    //    $('.btn-service-view-more').click(function(){
    //        $(this).parent().parent().parent().parent().find('.services-elaborate').slideToggle(1000);
    //    });

});
