//	$(document).ready(function(){
//		jQuery(".pull_feedback").toggle(function(){
//				jQuery("#feedback").animate({left:"0px"});
//				return false;
//			},
//			function(){
//				jQuery("#feedback").animate({left:"-362px"});	
//				return false;
//			}
//		); //toggle
//	}); //document.ready

jQuery(document).ready(function(){
    jQuery(".pull_feedback").click(function(){
        jQuery("#feedback").css('right','0px');
        jQuery(".push_feedback").css('display','block');
        jQuery(".pull_feedback").css('display','none');
    });
    jQuery(".push_feedback").click(function(){
        jQuery("#feedback").css('right','-273px');	
         jQuery(".push_feedback").css('display','none');
        jQuery(".pull_feedback").css('display','block');
    });
	}); //document.ready


