$(document).ready(function() {
    jQuery("#step-button").on("tap", function(){
        jQuery(this).addClass("tapped");
        jQuery(this).bind('webkitAnimationEnd', function() {
            jQuery(this).removeClass("tapped");
        });
    });
    
});