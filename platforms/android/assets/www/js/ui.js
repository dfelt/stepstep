
var tabActive = false;
var achievementsActive = false;
var autowalkActive = false;
var powerwalkActive = false;
var statsActive = false;

$(document).ready(function() {

    //Tap outside of modals to slide them back down.
    jQuery("#content").on("tap", function(e) {
        var achievementsList = jQuery("#achievements-panel");
        var autowalkList = jQuery("#autowalk-panel");
        var powerwalkList = jQuery("#powerwalk-panel");
        var stats = jQuery("#stats-panel");

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
                jQuery("#autowalk-panel").addClass("movedown");
                jQuery("#achievements-panel").addClass("movedown");
                jQuery("#powerwalk-panel").addClass("movedown");
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

    app.on("step", function() {
        jQuery("#step-button").addClass("tapped");
        jQuery("#step-button").bind('webkitAnimationEnd', function() {
            jQuery("#step-button").removeClass("tapped");
        })
    });

    //Pulsate step button
    jQuery("#step-button").on("tap", function(e){
        jQuery(this).addClass("tapped");
        jQuery(this).bind('webkitAnimationEnd', function() {
            jQuery(this).removeClass("tapped");
        });
    });



    //Bring Up the PowerWalk Upgrade List
    jQuery("#power-walk-tab").on("tap", function(e){
        e.stopPropagation();
        //jQuery("#step-button").hasClass("fadeOut")

        if (tabActive === true && powerwalkActive === true) {

            heroAnimateIn();
            jQuery("#powerwalk-panel").addClass("movedown");

            //reset image


            tabActive = false;
            powerwalkActive= false;

        } else if (tabActive === true && powerwalkActive === false) {
            jQuery("#achievements-panel").addClass("movedown");
            jQuery("#autowalk-panel").addClass("movedown");
            jQuery("#stats-panel").addClass("movedown");
            jQuery("#powerwalk-panel").removeClass("movedown");
            jQuery("#powerwalk-panel").addClass("moveup");

            tabActive = true;
            powerwalkActive = true;
            achievementsActive = false;
            autowalkActive = false;
            statsActive = false;
        }

        else {

            heroAnimateOut();
            jQuery("#powerwalk-panel").removeClass("movedown");
            jQuery("#powerwalk-panel").addClass("moveup");

            tabActive = true;
            powerwalkActive = true;
            achievementsActive = false;
            autowalkActive = false;
            statsActive = false;
        }
    });


    //Bring Up the AutoWalk Upgrade List
    jQuery("#auto-walk-tab").on("tap", function(e){
        e.stopPropagation();
        //jQuery("#step-button").hasClass("fadeOut")

        if (tabActive === true && autowalkActive === true) {

            heroAnimateIn();
            jQuery("#autowalk-panel").addClass("movedown");

            tabActive = false;
            autowalkActive = false;

        } else if (tabActive === true && autowalkActive === false) {
            jQuery("#achievements-panel").addClass("movedown");
            jQuery("#powerwalk-panel").addClass("movedown");
            jQuery("#stats-panel").addClass("movedown");
            jQuery("#autowalk-panel").removeClass("movedown");
            jQuery("#autowalk-panel").addClass("moveup");

            tabActive = true;
            autowalkActive = true;
            achievementsActive = false;
            powerwalkActive = false;
            statsActive = false;
        }

        else {

            heroAnimateOut();
            jQuery("#autowalk-panel").removeClass("movedown");
            jQuery("#autowalk-panel").addClass("moveup");

            tabActive = true;
            autowalkActive = true;
            achievementsActive = false;
            powerwalkActive = false;
            statsActive = false;
        }
    });


    jQuery("#achievements-tab").on("tap", function(e){
        e.stopPropagation();

        if (tabActive === true && achievementsActive === true) {

            heroAnimateIn();
            jQuery("#achievements-panel").addClass("movedown");

            tabActive = false;
            achievementsActive = false;

        } else if (tabActive === true && achievementsActive === false) {
            jQuery("#autowalk-panel").addClass("movedown");
            jQuery("#powerwalk-panel").addClass("movedown");
            jQuery("#stats-panel").addClass("movedown");
            jQuery("#achievements-panel").removeClass("movedown");
            jQuery("#achievements-panel").addClass("moveup");

            tabActive = true;
            achievementsActive = true;
            autowalkActive = false;
            powerwalkActive = false;
            statsActive = false;
        } else {

            heroAnimateOut();
            jQuery("#achievements-panel").removeClass("movedown");
            jQuery("#achievements-panel").addClass("moveup");

            tabActive = true;
            achievementsActive = true;
            autowalkActive = false;
            powerwalkActive = false;
            statsActive = false;
        }
    });

    jQuery("#stats-tab").on("tap", function(e){
        e.stopPropagation();

        app.trigger('update-stats');

        if (tabActive === true && statsActive === true) {

            heroAnimateIn();
            jQuery("#stats-panel").addClass("movedown");

            tabActive = false;
            statsActive = false;

        } else if (tabActive === true && statsActive === false) {
            jQuery("#autowalk-panel").addClass("movedown");
            jQuery("#powerwalk-panel").addClass("movedown");
            jQuery("#achievements-panel").addClass("movedown");
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
    jQuery("#auto-walk-tab").on("tap", function(e) {
        //remove blinking if there is any
        jQuery("#auto-walk-filled").hide();

        if (jQuery("#auto-walk").attr("src") === "css/images/AutoWalk.png") {
            jQuery("#auto-walk").attr("src", "css/images/AutoWalk.png");
            jQuery("#power-walk").attr("src","css/images/PowerWalk.png");
            jQuery("#achievements").attr("src", "css/images/Achievements.png")
            jQuery("#stats").attr("src", "css/images/Stats.png");
            jQuery("#auto-walk").attr("src", "css/images/AutoWalk-filled.png")
        } else {
            jQuery("#auto-walk").attr("src", "css/images/AutoWalk.png")
        }
    })

    jQuery("#power-walk-tab").on("tap", function(e) {
        //remove blinking if there is any
        jQuery("#power-walk-filled").hide();

        if (jQuery("#power-walk").attr("src") === "css/images/PowerWalk.png") {
            jQuery("#auto-walk").attr("src", "css/images/AutoWalk.png");
            jQuery("#power-walk").attr("src","css/images/PowerWalk.png");
            jQuery("#achievements").attr("src", "css/images/Achievements.png")
            jQuery("#stats").attr("src", "css/images/Stats.png");
            jQuery("#power-walk").attr("src", "css/images/PowerWalk-filled.png")
        } else {
            jQuery("#power-walk").attr("src", "css/images/PowerWalk.png")
        }
    });

    jQuery("#achievements-tab").on("tap", function() {

        if (jQuery("#achievements").attr("src") === "css/images/Achievements.png") {
            jQuery("#auto-walk").attr("src", "css/images/AutoWalk.png");
            jQuery("#power-walk").attr("src","css/images/PowerWalk.png");
            jQuery("#achievements").attr("src", "css/images/Achievements.png")
            jQuery("#stats").attr("src", "css/images/Stats.png");
            jQuery("#achievements").attr("src", "css/images/Achievements-filled.png")
        } else {
            jQuery("#achievements").attr("src", "css/images/Achievements.png")
        }
    });

    jQuery("#stats-tab").on("tap", function() {


        if (jQuery("#stats").attr("src") === "css/images/Stats.png") {
            jQuery("#auto-walk").attr("src", "css/images/AutoWalk.png");
            jQuery("#power-walk").attr("src","css/images/PowerWalk.png");
            jQuery("#achievements").attr("src", "css/images/Achievements.png")
            jQuery("#stats").attr("src", "css/images/Stats.png");
            jQuery("#stats").attr("src", "css/images/Stats-filled.png")
        } else {
            jQuery("#stats").attr("src", "css/images/Stats.png")
        }
    });


    //ACHIEVEMENT CONGRATS PANEL INTERACTION
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


    jQuery("#welcome-back").on("tap", function() {
        jQuery(this).popup("close");
    });


    //Creating the blinking alerts
    var positionAuto = jQuery("#auto-walk").position();
    var positionPower = jQuery("#power-walk").position();

    jQuery("#power-walk").parent().append("<img src='css/images/PowerWalk-filled.png' id='power-walk-filled' alt='power-walk-filled'>");

    jQuery("#auto-walk").parent().append("<img src='css/images/AutoWalk-filled.png' id='auto-walk-filled' alt='auto-walk-filled'>");

    jQuery("#auto-walk-filled").css({
        'top': positionAuto.top,
        'left': positionAuto.left
    });

    jQuery("#power-walk-filled").css({
        'top': positionPower.top,
        'left': positionPower.left
    });

    jQuery("#power-walk-filled").hide();
    jQuery("#auto-walk-filled").hide();

    //**DEFINING HEIGHT OF ACHIEVEMENT LIST PANELS IN ORDER TO
    //ALLOW FOR SCROLLING.
    var achievementHeaderHeight = jQuery("#achievements-header").height();
    var achievementPanelHeight = jQuery("#achievements-panel").height();
    var achievementListHeight = achievementPanelHeight - achievementHeaderHeight;

    jQuery("#achievements-list").css("height", achievementListHeight);

    //**DEFINING HEIGHT OF AUTOWALK LIST PANELS IN ORDER TO
    //ALLOW FOR SCROLLING.
    var autowalkHeaderHeight = jQuery("#upgrade-header").height();
    var autowalkPanelHeight = jQuery("#autowalk-panel").height();
    var autowalkListHeight = autowalkPanelHeight - autowalkHeaderHeight;

    jQuery("#passives-list").css("height", autowalkListHeight);

    //**DEFINING HEIGHT OF POWERWALK LIST PANELS IN ORDER TO
    //ALLOW FOR SCROLLING.
    var powerwalkHeaderHeight = jQuery("#power-upgrade-header").height();
    var powerwalkPanelHeight = jQuery("#powerwalk-panel").height();
    var powerwalkListHeight = powerwalkPanelHeight - powerwalkHeaderHeight;

    jQuery("#upgrades-list").css("height", powerwalkListHeight);


    //SHAKE UPGRADE IF NOT ENOUGH SS
    jQuery(".upgrade").on("tap", function(e){
        if (!jQuery(this).hasClass("affordable")) {
            jQuery(this).children().children().addClass("shake");
            jQuery(this).children().find('.cost-moniker').css('color', 'red');
            jQuery(this).bind('webkitAnimationEnd', function() {
                jQuery(this).children().children().removeClass("shake");
                jQuery(this).children().find('.cost-moniker').css('color', 'black');
            });
        }
    });

    //TAPPING AN UPGRADE RESPONSE
    /*jQuery(".upgrade").on('touchstart', function(e) {
        if (jQuery(this).hasClass("affordable")) {
            jQuery(this).css("background-color", "rgb(27, 129, 216)");
            jQuery(this).css("transition", "none");
            jQuery(this).children().children().css("color", "white");

        }
    });

    jQuery(".upgrade").on('touchend', function(e) {
        if (jQuery(this).hasClass("affordable")) {
            jQuery(this).css("background-color", "rgb(255,255,255)");
            jQuery(this).css("transition", "background-color 0.4s");
            jQuery(this).children().children().css("color", "black");
        }
    });*/


    //UPGRADE INTERACTION
    jQuery(".upgrade-success").hide();

    jQuery(".upgrade").on("tap", function() {
        
        if (jQuery(this).hasClass("affordable")) {

            jQuery(".upgrade-success").show().addClass("upgradefadein");
            jQuery("#upgrade-success-header").addClass("textinout");

            setTimeout(function() {
                jQuery(".upgrade-success").addClass("upgradefadeout").removeClass("upgradefadein");

                setTimeout(function() {
                    jQuery(".upgrade-success").removeClass("upgradefadeout").hide();
                }, 100);

            }, 1700);

        }


    });



    app.on("upgrade-unlocked", function() {
        jQuery("#power-walk-filled").show();

    });

    app.on("passive-unlocked", function() {
        jQuery("#auto-walk-filled").show();

    });

    $('#powerwalk-panel').on('touchstart', function(event){});

});