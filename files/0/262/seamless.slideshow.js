/*!
* jQuery Seamless Slideshow v1.0
*
* Copyright 2011, Seamless Solutions
*
* Date: Fri Jan 06, 2012 10:50AM
*
* Updated August 2013 - Emma Newman CoGB
*/
(function ($) {
    $.fn.Slideshow = function (settings) {
        // jQuery slide show plugin default settings
        settings = jQuery.extend({
            //Seamless options         
            AnimDuration: 300,            // Image transition Duration
            ControlList: '',              // Control UL Selector. Renders
                                          // buttons as <li><a></a></li>
            SlideDuration: 2000,          // Duration for each slide
            PauseOnHover: false,          // Pause slideshow one hover over
                                          // the image and the controls
            PrevButton: '',               // Prev button selector class
            NextButton: '',               // Next button selector class
            PauseButton: '',              // Pause button selector class
            DotWidth: 20,                 // Width of each dot in pixels
            DotHeight: 20,                // Height of each dot in pixels
            BlankImg: 'blank.png',        //Path to blank image
            AutoPlay: true                // Automatically play on start
        }, settings);

        var thisArray = this.get();
        thisArray.currentIdx = 0;
        thisArray.AnimPaused = false;
        thisArray.Animating = false;
        thisArray.UserPaused = false;
        thisArray.AnimTimer = null;
        thisArray.jqueryObject = this;

        thisArray.moveSlideBy = function (by) {
            thisArray.moveToSlide((thisArray.currentIdx + by + thisArray.length) % thisArray.length);
        };

        thisArray.moveNextSlide = function () {
            thisArray.pause();
            thisArray.moveSlideBy(1);
        }

        thisArray.movePrevSlide = function () {
            thisArray.pause();
            thisArray.moveSlideBy(-1);
        }

        thisArray.moveToSlide = function (slidenumber) {
            thisArray.Animating = true;
            slidenumber = (slidenumber + thisArray.length) % thisArray.length;

            var currentItem = $(thisArray[thisArray.currentIdx]);
            var nextItem = $(thisArray[slidenumber]);
            currentItem.fadeOut(settings.AnimDuration, function () {
                thisArray.jqueryObject.hide();
                nextItem.fadeIn(settings.AnimDuration);
            });

            if (thisArray.controls) {
                $(thisArray.controls[thisArray.currentIdx]).removeClass('current');
                $(thisArray.controls[slidenumber]).addClass('current');
            }

            thisArray.currentIdx = slidenumber;
            thisArray.Animating = false;
        };

        thisArray.loop = function () {
            if (!thisArray.AnimPaused && !thisArray.UserPaused) {
                thisArray.AnimTimer = setTimeout(function () {
                    thisArray.moveSlideBy(1);
                    thisArray.loop();
                }, settings.SlideDuration);
            }
        };

        thisArray.play = function () {
            thisArray.AnimPaused = false;
            thisArray.UserPaused = false;
            thisArray.Animating = true;
            if (!thisArray.AnimTimer)
                thisArray.loop();
        }

        thisArray.pause = function () {
            thisArray.AnimPaused = true;
            thisArray.UserPaused = true;
            thisArray.Animating = false;
            clearTimeout(thisArray.AnimTimer);
            thisArray.AnimTimer = null;
        }

        var controlsList = $(settings.ControlList).get();
        if (controlsList.length > 0) {
            //Draw controls
            var controlHTML = '<li><div style="background-image: url(' + settings.BlankImg + '); overflow: hidden; width: ' + settings.DotWidth + 'px; height: ' + settings.DotHeight + 'px; opacity:0; filter: alpha(opacity = 0);"><a style="display: block" href="#" onclick="return false;">1</a></div></li>';
         
            for (g = 1; g < thisArray.length; g++) {
              controlHTML += '<li><div style="background-image: url(' + settings.BlankImg + '); overflow: hidden; width: ' + settings.DotWidth + 'px; height: ' + settings.DotHeight + 'px; opacity:0; filter: alpha(opacity = 0);"><a style="display: block" href="#" onclick="return false;">' + (g + 1) + '</a></div></li>';
            }
            $(controlsList[0]).html(controlHTML);
            thisArray.controls = $(settings.ControlList + ' li').get();
        }
          
       $(settings.ControlList + ' li a').click(function () {
            if(thisArray.Animating) return;
            var idx = $.inArray(this, $(settings.ControlList + ' li a'));
            thisArray.moveToSlide(idx);
            thisArray.pause();
        });
         
        if (settings.PauseOnHover) {
            this.add(settings.ControlList).hover(function () {
                // mouse enter
                thisArray.pause();
            },
            function () {
                // mouse leave
                thisArray.play();
            });
        }

        if (settings.PrevButton != '') {
            $(settings.PrevButton).click(function () {
                if(!thisArray.Animating)
                   thisArray.movePrevSlide();
            });
        }

        if (settings.NextButton != '') {
            $(settings.NextButton).click(function () {
                if(!thisArray.Animating)
                  thisArray.moveNextSlide();
                  thisArray.play();
            });
        }

        if (settings.PauseButton != '') {
            $(settings.PauseButton).click(function () {
                thisArray.UserPaused = true;
                $(this).addClass('paused');
                thisArray.pause();
                thisArray.UserPaused = true;
                $(this).addClass('paused');
                thisArray.pause();
            });
        }

        if(settings.AutoPlay == true)
        thisArray.play();

        return thisArray;
    }
})(jQuery);


/*
**This should go in file calling the script
**Pass in modified parameters to overwrite the defaults at top
*
var slideshowObj;

$(document).ready(function () {
   slideshowObj = $('.homepage .slideshow ul.images li').Slideshow();
});
*/
