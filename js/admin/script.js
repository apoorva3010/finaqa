$(function () {
    $('#user_DOB').datepicker({
        format: "dd/mm/yyyy",
        clearBtn: true,
        autoclose: true,
        pickerPosition: 'top-left',
        showMeridian: false,
        formatViewType: 'time',
    });
});

jQuery(document).ready(function ($) {
    "use strict";
//    var testimonial_carousel = $("#testimonial_carousel");
//    testimonial_carousel.slick({
//        dots: false,
//        infinite: true,
//        arrows: true,
//        prevArrow: "<div class=\"slick_prev\"><i class=\"fa fa-chevron-left\"></i></div>",
//        nextArrow: "<div class=\"slick_next\"><i class=\"fa fa-chevron-right\"></i></div>",
//        autoplaySpeed: 5000,
//        autoplay: true,
//        slidesToShow: 2,
//        cssEase: "cubic-bezier(0.455, 0.030, 0.515, 0.955)",
//        responsive: [{
//            breakpoint: 769,
//            settings: {
//                slidesToShow: 1
//            }
//                }]
//    });

    var setREVStartSize = function () {
        try {
            var e = new Object,
                i = jQuery(window).width(),
                t = 9999,
                r = 0,
                n = 0,
                l = 0,
                f = 0,
                s = 0,
                h = 0;
            e.c = jQuery('#rev_slider_4_1');
            e.gridwidth = [1170];
            e.gridheight = [574];

            e.sliderLayout = "fullscreen";
            e.fullScreenAutoWidth = 'off';
            e.fullScreenAlignForce = 'off';
            e.fullScreenOffsetContainer = '';
            e.fullScreenOffset = '';
            if (e.responsiveLevels && (jQuery.each(e.responsiveLevels, function (e, f) {
                    f > i && (t = r = f, l = e), i > f && f > r && (r = f, n = e)
                }), t > r && (l = n)), f = e.gridheight[l] || e.gridheight[0] || e.gridheight, s = e.gridwidth[l] || e.gridwidth[0] || e.gridwidth, h = i / s, h = h > 1 ? 1 : h, f = Math.round(h * f), "fullscreen" == e.sliderLayout) {
                var u = (e.c.width(), jQuery(window).height());
                if (void 0 != e.fullScreenOffsetContainer) {
                    var c = e.fullScreenOffsetContainer.split(",");
                    if (c) jQuery.each(c, function (e, i) {
                        u = jQuery(i).length > 0 ? u - jQuery(i).outerHeight(!0) : u
                    }), e.fullScreenOffset.split("%").length > 1 && void 0 != e.fullScreenOffset && e.fullScreenOffset.length > 0 ? u -= jQuery(window).height() * parseInt(e.fullScreenOffset, 0) / 100 : void 0 != e.fullScreenOffset && e.fullScreenOffset.length > 0 && (u -= parseInt(e.fullScreenOffset, 0))
                }
                f = u
            } else void 0 != e.minHeight && f < e.minHeight && (f = e.minHeight);
            e.c.closest(".rev_slider_wrapper").css({
                height: f
            })

        } catch (d) {
            console.log("Failure at Presize of Slider:" + d)
        }
    };


    setREVStartSize();

    var tpj = jQuery;

    var revapi4;
    tpj(document).ready(function () {
        if (tpj("#rev_slider_4_1").revolution == undefined) {
            revslider_showDoubleJqueryError("#rev_slider_4_1");
        } else {
            revapi4 = tpj("#rev_slider_4_1").show().revolution({
                sliderType: "standard",
                jsFileLocation: "js/",
                sliderLayout: "fullscreen",
                dottedOverlay: "none",
                delay: 9000,
                navigation: {
                    keyboardNavigation: "off",
                    keyboard_direction: "horizontal",
                    mouseScrollNavigation: "off",
                    onHoverStop: "off",
                    arrows: {
                        style: "",
                        enable: true,
                        hide_onmobile: false,
                        hide_onleave: false,
                        tmp: '',
                        left: {
                            h_align: "left",
                            v_align: "center",
                            h_offset: 210,
                            v_offset: 0
                        },
                        right: {
                            h_align: "right",
                            v_align: "center",
                            h_offset: 210,
                            v_offset: 0
                        }
                    }
                },
                visibilityLevels: [1240, 1024, 778, 480],
                gridwidth: 1170,
                gridheight: 574,
                lazyType: "none",
                shadow: 0,
                spinner: "spinner0",
                stopLoop: "off",
                stopAfterLoops: -1,
                stopAtSlide: -1,
                shuffle: "off",
                autoHeight: "off",
                fullScreenAutoWidth: "off",
                fullScreenAlignForce: "off",
                fullScreenOffsetContainer: "",
                fullScreenOffset: "",
                disableProgressBar: "off",
                hideThumbsOnMobile: "off",
                hideSliderAtLimit: 0,
                hideCaptionAtLimit: 0,
                hideAllCaptionAtLilmit: 0,
                debugMode: false,
                fallbacks: {
                    simplifyAll: "off",
                    nextSlideOnWindowFocus: "off",
                    disableFocusListener: false,
                }
            });
        }
    }); /*ready*/

});

//angular.module('finaqa-app', ['ngAnimate', 'ui.bootstrap']);
//angular.module('finaqa-app').controller('TooltipDemoCtrl', function ($scope, $sce) {    
//    $scope.dynamicTooltip = null;
//  $scope.dynamicTooltip = $sce.trustAsHtml('<div class="tooltip-box">' +
//                                           '<div class="tooltip-header"><h6>Chetan Shelake</h6></div>'+
//                                           '<div class="tooltip-body"><p>Why can Admins no longer pin more than one post in the question page</p></div>'+
//                                           '<div class="tooltip-body"><p>Why can Admins no longer pin more than one post in the question page</p></div>'+
//                                           '</div>');
//  $scope.placement = {
//    options: [
//      'top',
//      'top-left',
//      'top-right',
//      'bottom',
//      'bottom-left',
//      'bottom-right',
//      'left',
//      'left-top',
//      'left-bottom',
//      'right',
//      'right-top',
//      'right-bottom'
//    ],
//    selected: 'right'
//  };
//  
//  angular.element(function(){
//      $scope.dynamicTooltip = '<div class="tooltip-box">' +
//                                           '<div class="tooltip-header"><h6>'+ $scope.custInfo +'</h6></div>'+
//                                           '<div class="tooltip-body"><p>Why can Admins no longer pin more than one post in the question page</p></div>'+
//                                           '<div class="tooltip-body"><p>Why can Admins no longer pin more than one post in the question page</p></div>'+
//                                           '</div>';
//  });
//});




