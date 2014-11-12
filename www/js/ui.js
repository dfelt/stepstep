var tabActive = false;
var achievementsActive = false;
var autowalkActive = false;
var powerwalkActive = false;

$(document).ready(function() {

    jQuery("#content").on("tap", function(e) {
        var achievementsList = jQuery("#achievements-list");
        var autowalkList = jQuery("#upgrades-list");

        if (tabActive) {
            if ((!achievementsList.is(e.target) && achievementsList.has(e.target)) ||
                (!autowalkList.is(e.target) && autowalkList.has(e.target))) {
                heroAnimateIn();
                jQuery("#upgrades-list").addClass("movedown");
                jQuery("#achievements-list").addClass("movedown");


                tabActive = false;
                achievementsActive = false;
                autowalkActive = false;
                powerwalkActive = false;
            }
        }
    });

    function heroAnimateIn() {
        jQuery("#step-button").removeClass("fadeOut");
        jQuery("#step-button").addClass("fadeIn");
        jQuery("#step-button").bind('webkitAnimationEnd', function() {
            jQuery("#step-button").removeClass("fadeIn");
        });

        jQuery("#stepstepstep").removeClass("fadeOut");
        jQuery("#stepstepstep").addClass("fadeIn");
        jQuery("#stepstepstep").bind('webkitAnimationEnd', function() {
            jQuery("#stepstepstep").removeClass("fadeIn");
        })

        jQuery("#stepstepsecond").removeClass("fadeOut");
        jQuery("#stepstepsecond").addClass("fadeIn");
        jQuery("#stepstepsecond").bind('webkitAnimationEnd', function() {
            jQuery("#stepstepsecond").removeClass("fadeIn");
        });
    }

    function heroAnimateOut() {
        jQuery("#step-button").removeClass("fadeIn");
        jQuery("#step-button").addClass("fadeOut");

        jQuery("#stepstepstep").removeClass("fadeIn");
        jQuery("#stepstepstep").addClass("fadeOut");

        jQuery("#stepstepsecond").removeClass("fadeIn");
        jQuery("#stepstepsecond").addClass("fadeOut");
    }


    //Pulsate step button
    jQuery("#step-button").on("tap", function(e){
        jQuery(this).addClass("tapped");
        jQuery(this).bind('webkitAnimationEnd', function() {
            jQuery(this).removeClass("tapped");
        });
    });
    
    //Bring Up the PowerWalk Upgrade List
    jQuery("#power-walk").on("tap", function(e){
        e.stopPropagation();
        //jQuery("#step-button").hasClass("fadeOut")

        if (tabActive === true && powerwalkActive === true) {

            heroAnimateIn();
            jQuery("#power-upgrades-list").addClass("movedown");

            tabActive = false;
            powerwalkActive= false;

        } else if (tabActive === true && powerwalkActive === false) {
            jQuery("#achievements-list").addClass("movedown");
            jQuery("#upgrades-list").removeClass("movedown");
            jQuery("#power-upgrades-list").removeClass("movedown");
            jQuery("#power-upgrades-list").addClass("moveup");

            tabActive = true;
            powerwalkActive = true;
            achievementsActive = false;
            autowalkActive = false;
        }

        else {

            heroAnimateOut();
            jQuery("#power-upgrades-list").removeClass("movedown");
            jQuery("#power-upgrades-list").addClass("moveup");

            tabActive = true;
            powerwalkActive = true;
            achievementsActive = false;
            autowalkActive = false;
        }
    });
    

    //Bring Up the AutoWalk Upgrade List
    jQuery("#auto-walk").on("tap", function(e){
        e.stopPropagation();
        //jQuery("#step-button").hasClass("fadeOut")

        if (tabActive === true && autowalkActive === true) {

            heroAnimateIn();
            jQuery("#upgrades-list").addClass("movedown");

            tabActive = false;
            autowalkActive = false;

        } else if (tabActive === true && autowalkActive === false) {
            jQuery("#achievements-list").addClass("movedown");
            jQuery("#power-upgrades-list").addClass("movedown");
            jQuery("#upgrades-list").removeClass("movedown");
            jQuery("#upgrades-list").addClass("moveup");

            tabActive = true;
            autowalkActive = true;
            achievementsActive = false;
        }

        else {

            heroAnimateOut();
            jQuery("#upgrades-list").removeClass("movedown");
            jQuery("#upgrades-list").addClass("moveup");

            tabActive = true;
            autowalkActive = true;
            achievementsActive = false;
        }
    });


    jQuery("#achievements").on("tap", function(e){
        e.stopPropagation();

        if (tabActive === true && achievementsActive === true) {

            heroAnimateIn();
            jQuery("#achievements-list").addClass("movedown");

            tabActive = false;
            achievementsActive = false;

        } else if (tabActive === true && achievementsActive === false) {
            jQuery("#upgrades-list").addClass("movedown");
            jQuery("#achievements-list").removeClass("movedown");
            jQuery("#achievements-list").addClass("moveup");

            tabActive = true;
            achievementsActive = true;
            autowalkActive = false;
        } else {

            heroAnimateOut();
            jQuery("#achievements-list").removeClass("movedown");
            jQuery("#achievements-list").addClass("moveup");

            tabActive = true;
            achievementsActive = true;
            autowalkActive = false;
        }
    });





    /*Tapping the tabs
    */
    jQuery("#auto-walk").on("tap", function() {
        jQuery("#auto-walk").attr("src", "css/images/AutoWalk.png");
        jQuery("#power-walk").attr("src","css/images/PowerWalk.png");
        jQuery("#achievements").attr("src", "css/images/Achievements.png")
        jQuery("#stats").attr("src", "css/images/Stats.png");

        if (jQuery(this).attr("src") === "css/images/AutoWalk.png") {
            jQuery(this).attr("src", "css/images/AutoWalk-filled.png")
        } else {
            jQuery(this).attr("src", "css/images/AutoWalk.png")
        }
    });

    jQuery("#power-walk").on("tap", function() {
        jQuery("#auto-walk").attr("src", "css/images/AutoWalk.png");
        jQuery("#power-walk").attr("src","css/images/PowerWalk.png");
        jQuery("#achievements").attr("src", "css/images/Achievements.png")
        jQuery("#stats").attr("src", "css/images/Stats.png");

        if (jQuery(this).attr("src") === "css/images/PowerWalk.png") {
            jQuery(this).attr("src", "css/images/PowerWalk-filled.png")
        } else {
            jQuery(this).attr("src", "css/images/PowerWalk.png")
        }
    });

    jQuery("#achievements").on("tap", function() {
        jQuery("#auto-walk").attr("src", "css/images/AutoWalk.png");
        jQuery("#power-walk").attr("src","css/images/PowerWalk.png");
        jQuery("#achievements").attr("src", "css/images/Achievements.png")
        jQuery("#stats").attr("src", "css/images/Stats.png");

        if (jQuery(this).attr("src") === "css/images/Achievements.png") {
            jQuery(this).attr("src", "css/images/Achievements-filled.png")
        } else {
            jQuery(this).attr("src", "css/images/Achievements.png")
        }
    });

    jQuery("#stats").on("tap", function() {
        jQuery("#auto-walk").attr("src", "css/images/AutoWalk.png");
        jQuery("#power-walk").attr("src","css/images/PowerWalk.png");
        jQuery("#achievements").attr("src", "css/images/Achievements.png")
        jQuery("#stats").attr("src", "css/images/Stats.png");

        if (jQuery(this).attr("src") === "css/images/Stats.png") {
            jQuery(this).attr("src", "css/images/Stats-filled.png")
        } else {
            jQuery(this).attr("src", "css/images/Stats.png")
        }
    });

});