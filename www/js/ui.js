var tabActive = false;
var achievementsActive = false;
var autowalkActive = false;
var powerwalkActive = false;
var statsActive = false;

$(document).ready(function() {

    //Tap outside of modals to slide them back down.
    jQuery("#content").on("tap", function(e) {
        var achievementsList = jQuery("#achievements-list");
        var autowalkList = jQuery("#passives-list");
        var powerwalkList = jQuery("#upgrades-list");
        var stats = jQuery("#stats-panel");

        console.log(e.target);
        if (tabActive) {
            if ((!powerwalkList.is(e.target) 
                && powerwalkList.has(e.target).length === 0) && 
                (!autowalkList.is(e.target) 
                && autowalkList.has(e.target).length === 0) && 
                (!achievementsList.is(e.target) 
                && achievementsList.has(e.target).length === 0) && 
                (!stats.is(e.target) 
                && stats.has(e.target).length === 0))
            {
                heroAnimateIn();
                jQuery("#passives-list").addClass("movedown");
                jQuery("#achievements-list").addClass("movedown");
                jQuery("#upgrades-list").addClass("movedown");
                jQuery("#stats-panel").addClass("movedown");


                jQuery("#auto-walk").attr("src", "css/images/AutoWalk.png");
                jQuery("#power-walk").attr("src","css/images/PowerWalk.png");
                jQuery("#achievements").attr("src", "css/images/Achievements.png")
                jQuery("#stats").attr("src", "css/images/Stats.png");


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
            jQuery("#upgrades-list").addClass("movedown");

            //reset image


            tabActive = false;
            powerwalkActive= false;

        } else if (tabActive === true && powerwalkActive === false) {
            jQuery("#achievements-list").addClass("movedown");
            jQuery("#passives-list").addClass("movedown");
            jQuery("#stats-panel").addClass("movedown");
            jQuery("#upgrades-list").removeClass("movedown");
            jQuery("#upgrades-list").addClass("moveup");

            tabActive = true;
            powerwalkActive = true;
            achievementsActive = false;
            autowalkActive = false;
            statsActive = false;
        }

        else {

            heroAnimateOut();
            jQuery("#upgrades-list").removeClass("movedown");
            jQuery("#upgrades-list").addClass("moveup");

            tabActive = true;
            powerwalkActive = true;
            achievementsActive = false;
            autowalkActive = false;
            statsActive = false;
        }
    });


    //Bring Up the AutoWalk Upgrade List
    jQuery("#auto-walk").on("tap", function(e){
        e.stopPropagation();
        //jQuery("#step-button").hasClass("fadeOut")

        if (tabActive === true && autowalkActive === true) {

            heroAnimateIn();
            jQuery("#passives-list").addClass("movedown");

            tabActive = false;
            autowalkActive = false;

        } else if (tabActive === true && autowalkActive === false) {
            jQuery("#achievements-list").addClass("movedown");
            jQuery("#upgrades-list").addClass("movedown");
            jQuery("#stats-panel").addClass("movedown");
            jQuery("#passives-list").removeClass("movedown");
            jQuery("#passives-list").addClass("moveup");

            tabActive = true;
            autowalkActive = true;
            achievementsActive = false;
            powerwalkActive = false;
            statsActive = false;
        }

        else {

            heroAnimateOut();
            jQuery("#passives-list").removeClass("movedown");
            jQuery("#passives-list").addClass("moveup");

            tabActive = true;
            autowalkActive = true;
            achievementsActive = false;
            powerwalkActive = false;
            statsActive = false;
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
            jQuery("#passives-list").addClass("movedown");
            jQuery("#upgrades-list").addClass("movedown");
            jQuery("#stats-panel").addClass("movedown");
            jQuery("#achievements-list").removeClass("movedown");
            jQuery("#achievements-list").addClass("moveup");

            tabActive = true;
            achievementsActive = true;
            autowalkActive = false;
            powerwalkActive = false;
            statsActive = false;
        } else {

            heroAnimateOut();
            jQuery("#achievements-list").removeClass("movedown");
            jQuery("#achievements-list").addClass("moveup");

            tabActive = true;
            achievementsActive = true;
            autowalkActive = false;
            powerwalkActive = false;
            statsActive = false;
        }
    });

    jQuery("#stats").on("tap", function(e){
        e.stopPropagation();

        if (tabActive === true && statsActive === true) {

            heroAnimateIn();
            jQuery("#stats-panel").addClass("movedown");

            tabActive = false;
            statsActive = false;

        } else if (tabActive === true && statsActive === false) {
            jQuery("#passives-list").addClass("movedown");
            jQuery("#upgrades-list").addClass("movedown");
            jQuery("#achievements-list").addClass("movedown");
            jQuery("#stats-panel").removeClass("movedown");
            jQuery("#stats-panel").addClass("moveup");

            tabActive = true;
            statsActive = true;
            autowalkActive = false;
            powerwalkActive = false;
            achievementsActive = false;
        } else {

            heroAnimateOut();
            jQuery("#stats-panel").removeClass("movedown");
            jQuery("#stats-panel").addClass("moveup");

            tabActive = true;
            statsActive = true;
            autowalkActive = false;
            powerwalkActive = false;
            achievementsActive = false;
        }
    });






    /*Tapping the tabs
    */
    jQuery("#auto-walk").on("tap", function() {

        if (jQuery(this).attr("src") === "css/images/AutoWalk.png") {
            jQuery("#auto-walk").attr("src", "css/images/AutoWalk.png");
            jQuery("#power-walk").attr("src","css/images/PowerWalk.png");
            jQuery("#achievements").attr("src", "css/images/Achievements.png")
            jQuery("#stats").attr("src", "css/images/Stats.png");
            jQuery(this).attr("src", "css/images/AutoWalk-filled.png")
        } else {
            jQuery(this).attr("src", "css/images/AutoWalk.png")
        }
    });

    jQuery("#power-walk").on("tap", function() {

        if (jQuery(this).attr("src") === "css/images/PowerWalk.png") {
            jQuery("#auto-walk").attr("src", "css/images/AutoWalk.png");
            jQuery("#power-walk").attr("src","css/images/PowerWalk.png");
            jQuery("#achievements").attr("src", "css/images/Achievements.png")
            jQuery("#stats").attr("src", "css/images/Stats.png");
            jQuery(this).attr("src", "css/images/PowerWalk-filled.png")
        } else {
            jQuery(this).attr("src", "css/images/PowerWalk.png")
        }
    });

    jQuery("#achievements").on("tap", function() {

        if (jQuery(this).attr("src") === "css/images/Achievements.png") {
            jQuery("#auto-walk").attr("src", "css/images/AutoWalk.png");
            jQuery("#power-walk").attr("src","css/images/PowerWalk.png");
            jQuery("#achievements").attr("src", "css/images/Achievements.png")
            jQuery("#stats").attr("src", "css/images/Stats.png");
            jQuery(this).attr("src", "css/images/Achievements-filled.png")
        } else {
            jQuery(this).attr("src", "css/images/Achievements.png")
        }
    });

    jQuery("#stats").on("tap", function() {


        if (jQuery(this).attr("src") === "css/images/Stats.png") {
            jQuery("#auto-walk").attr("src", "css/images/AutoWalk.png");
            jQuery("#power-walk").attr("src","css/images/PowerWalk.png");
            jQuery("#achievements").attr("src", "css/images/Achievements.png")
            jQuery("#stats").attr("src", "css/images/Stats.png");
            jQuery(this).attr("src", "css/images/Stats-filled.png")
        } else {
            jQuery(this).attr("src", "css/images/Stats.png")
        }
    });


    jQuery(".congratulations").hide();

    jQuery(".close").on("tap", function() {
        jQuery(".congratulations").removeClass("fadein2");
        jQuery(".congratulations").addClass("fadeout2");
        /*jQuery(".congratulations").bind('webkitAnimationEnd', function() {
            jQuery(".congratulations").hide();
        });*/
        jQuery(".congratulations").fadeOut();

        console.log("tapped");

    });


    app.on("achievement-unlocked", function(a) {
        var name = a.name;
        var description = a.description;
        var multiplier = a.multiplier;

        jQuery("#congrats-name").html(name);
        jQuery("#congrats-description").html(description);
        jQuery("#congrats-mult").html(Math.round(((multiplier-1)*100)));

        jQuery(".congratulations").removeClass("fadeout2");
        jQuery(".congratulations").show().addClass("fadein2");


    });

    jQuery("#upgrade-tpl", function(e) {
        e.stopPropagation();
    });


});