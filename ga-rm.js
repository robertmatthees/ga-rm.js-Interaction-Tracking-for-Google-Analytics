/*  ga-rm.js (version: 0.1)
    Interaction Tracking for Google Analytics
    Copyright (C) 2017 Robert Matthees (contact: www.robert-matthees.de)

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation Version 3.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program. If not, see <http://www.gnu.org/licenses/>.
*/

(function($) {
 $.ga_rm = function(options) {
     //init counter
     var ga_rm_counter = 0, ga_rm_time_on_page = 0;

    //count time on page
     var ga_rm_globalcounter=setInterval(function() {
         ga_rm_time_on_page = ga_rm_time_on_page + 0.1;
     }, 100);

     //scroll tracking
     var ga_rm_scrollcheck = setInterval(function() {
         //update window position
         var wh = (typeof(window.innerHeight) != 'undefined') ? Math.max(window.innerHeight, $(window).height()) : $(window).height();
         var stop = $(window).scrollTop();

         //run through elements with no tracking hit
         $('[id].ga-rm-scroll:not(.ga-rm-scroll-tracked), [id].ga-rm-scroll-top:not(.ga-rm-scroll-top-tracked), [id].ga-rm-scroll-bottom:not(.ga-rm-scroll-bottom-tracked)').each(function(){
             //get element position
             $el_s = $(this);
             var eh = $el_s.outerHeight();
             var etop = $el_s.offset().top;
             var spercentage = ((stop-etop+wh) / eh) * 100;

             //scroll depth tracking
             if (($el_s.hasClass('ga-rm-scroll')) && (!$el_s.hasClass('ga-rm-scroll-tracked'))) {
                 if(spercentage<99) {
                     $el_s.data('ga_rm_scroll', spercentage);
                 } else {
                    ga('send', 'event', 'user interaction', 'scroll depth', $el_s.prop('id'), 100);
                    $el_s.addClass('ga-rm-scroll-tracked');
                 }
             }

             //scroll time on page until top
             if (($el_s.hasClass('ga-rm-scroll-top')) && (!$el_s.hasClass('ga-rm-scroll-top-tracked')) && (spercentage>=1)) {
                 ga('send', 'event', 'user interaction', 'scroll top', $el_s.prop('id'), parseInt(ga_rm_time_on_page.toFixed(1)));
                 $el_s.addClass('ga-rm-scroll-top-tracked');
             }

             //scroll time on page until bottom
             if (($el_s.hasClass('ga-rm-scroll-bottom')) && (!$el_s.hasClass('ga-rm-scroll-bottom-tracked')) && (spercentage>=99)) {
                 ga('send', 'event', 'user interaction', 'scroll bottom', $el_s.prop('id'), parseInt(ga_rm_time_on_page.toFixed(1)));
                 $el_s.addClass('ga-rm-scroll-bottom-tracked');
             }
         });
     }, 100);

     //function startcount (for hover & focus)
     var ga_rm_startcount = function() {
         //clear interval, get element
         ga_rm_stopcount();
         $el = $(this);

         //check if element is a <label>
         if($el.is('label')) {
             //switch to corresponding input element
             if($('#'+$el.attr('for')).length) {
                 $el = $('#'+$el.attr('for'));
             } else {
                 //if ID doesn't exist, return 0
                 return 0;
             }
         }

         //check if element has id/name, or return 0
         if(($el.prop('id') == "") && ($el.prop('name') == "")) {
             return 0;
         }

         //if no time data, create it
         if(typeof($el.data('ga_rm_time')) == "undefined") {
             $el.data('ga_rm_time', 0);
         }

         //start counter
         ga_rm_counter=setInterval(function() {
             $el.data('ga_rm_time', $el.data('ga_rm_time') + 0.1);
         }, 100);
     }

     //function stopcount (for hover & focus)
     var ga_rm_stopcount = function() {
         clearInterval(ga_rm_counter);
     }

      //function trackcount
     var ga_rm_trackcount = function() {
         //create array (scroll)
         var tracked = [];
         $('[id].ga-rm-scroll:not(.ga-rm-scroll-tracked)').each(function() {
             var this_row = {}; $el = $(this);
             this_row[0] = $el.prop('id');
             this_row[1] = $el.data('ga_rm_scroll');
             tracked.push(this_row);
         });

         //sort array desc
         tracked.sort(function(a, b) {
             return b[1] - a[1];
         });

         //send events to google analytics
         for(i in tracked) {
             ga('send', 'event', 'user interaction', 'scroll depth', tracked[i][0], parseInt(tracked[i][1].toFixed(1)));
         }

         //create array (form)
         var tracked = [];
         $(ga_rm_elements).each(function() {
             var this_row = {}; $el = $(this);
             if($el.data('ga_rm_time') > min_itime) {
                 if($el.prop('id') != "") {
                     this_row[0] = $el.prop('id');
                 } else {
                     this_row[0] = $el.attr('name');
                 }
                 this_row[1] = $el.data('ga_rm_time');
                 tracked.push(this_row);
             }
         });

         //sort array desc
         tracked.sort(function(a, b) {
             return b[1] - a[1];
         });

         //send events to google analytics
         for(i in tracked) {
             ga('send', 'event', 'user interaction', 'interaction time', tracked[i][0], parseInt(tracked[i][1].toFixed(1)));
         }
     }

     //function tracksingle (click)
     var ga_rm_tracksingle = function(event) {
         ga('send', 'event', 'user interaction', event.type, $(this).prop('id'), parseInt(ga_rm_time_on_page.toFixed(1)));
     }

     //default options
     var defaults = {
         form: 1,
         scroll: 1,
         min_itime: 0
     }

     //init plugin
     var plugin = this;
     var ga_rm_elements = 0, ga_rm_hover_elements = 0, min_itime = 0.1;
     plugin.settings = {};
     plugin.init = function() {

         //get options
         plugin.settings = $.extend({}, defaults, options);
         ga_rm_elements = "ga-rm-focus:not(.ga-rm-hover)";
         ga_rm_hover_elements = ".ga-rm-hover:not(.ga-rm-focus)";

         //default form tracking (element list)
         if(plugin.settings.form) {
             //default elements triggered on: focusin keypress (start) & blur (stop)
             //tracked input types -> input[type="LIST_THIS_BELOW"]
             var ga_rm_input_types = "text, password, color, date, datetime-local, email, file, month, number, search, tel, time, url, week";
             //edit just till: input[type=", entries afterwards are generated automatically using the input type list above
             ga_rm_elements = ga_rm_elements + ', textarea, input[type="'+ga_rm_input_types.replace(/ /g, "").split(",").join('"], input[type="')+'"]';
             //default elements triggered on: mouseenter (start) & mouseleave change (stop)
             ga_rm_hover_elements = ga_rm_hover_elements + ', label, select, input[type="checkbox"], input[type="radio"], input[type="range"]';
         }
         
         if(plugin.settings.min_itime > 0) {
             min_itime = plugin.settings.min_itime;
         }
         
         //default scroll tracking (add class to body)
         if(plugin.settings.scroll) {
             $el = $('body');
             $el.addClass('ga-rm-scroll');
             //if no id, set it to 'body'
             if($el.prop('id') == "") { $el.attr('id', 'body'); }
         }

         //bind triggers
         $(ga_rm_elements).on('focusin keypress', ga_rm_startcount).blur(ga_rm_stopcount);
         $(ga_rm_hover_elements).mouseenter(ga_rm_startcount).on('mouseleave change', ga_rm_stopcount);
         $('[id].ga-rm-click').on('click',ga_rm_tracksingle);
         $(window).on('beforeunload', ga_rm_trackcount);
     }

     plugin.init();
 }
}(jQuery));
