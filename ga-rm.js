/*  ga-rm.js (version: alpha dev test)
    Interaction Tracking for Google Analytics
    Copyright (C) 2017 Robert Matthees (contact: www.robert-matthees.de)

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation Version 3.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

$(function() {
 //default settings
 //elements triggered on: focusin keypress (start) & blur (stop)
 //*tracked input types -> input[type="LIST_THIS_BELOW"]
 var ga_rm_input_types="text, password, color, date, datetime-local, email, file, month, number, search, tel, time, url, week";
 //*edit just till: input[type=", entries afterwards are generated automatically using the input type list above
 var ga_rm_elements='textarea, input[type="'+ga_rm_input_types.replace(/ /g, "").split(",").join('"], input[type="')+', .ga-rm-focus:not(.ga-rm-hover)"]';

 //elements triggered on: mouseenter (start) & mouseleave change (stop)
 var ga_rm_hover_elements='label, select, input[type="checkbox"], input[type="radio"], input[type="range"], .ga-rm-hover:not(.ga-rm-focus)';

 //init counter
 var ga_rm_counter=0;

 //function startcount
 var ga_rm_startcount=function() {

  //clear interval, get element
  ga_rm_stopcount();
  $el=$(this);

  //check if element is a <label>
  if($el.is('label')) {
   //switch to corresponding input element
   if($('#'+$el.attr('for')).length) {
    $el=$('#'+$el.attr('for'));
   } else {
    //if ID doesn't exist, return 0
    return 0;
   }
  }

  //check if element has id/name, or return 0
  if(($el.prop('id')=="")&&($el.prop('name')=="")) { return 0; }

  //if no time data, create it
  if(typeof($el.data('ga_rm_time'))=="undefined") { $el.data('ga_rm_time', 0); }

  //start counter
  ga_rm_counter=setInterval(function() {
   $el.data('ga_rm_time', $el.data('ga_rm_time')+0.1);
  }, 100);
 }

 //function stopcount
 var ga_rm_stopcount=function() {
  clearInterval(ga_rm_counter);
 }

 //function trackcount
 var ga_rm_trackcount=function() {

  //create array
  var tracked=[];
  $(ga_rm_elements).each(function() {
   var this_row={}; $el=$(this);
   if($el.data('ga_rm_time')>0.1) {
    if($el.prop('id')!="") { this_row[0]=$el.prop('id'); }
    else { this_row[0]=$el.attr('name'); }
    this_row[1]=$el.data('ga_rm_time');
    tracked.push(this_row);
   }
  });

  //sort array desc
  tracked.sort(function(a, b) { return b[1]-a[1]; });

  //send events to google analytics
  for(i in tracked) {
   ga('send', 'event', 'user interaction', 'interaction time', tracked[i][0], parseInt(tracked[i][1].toFixed(1)));
  }
 }

 //function tracksingle (time on page)
 var ga_rm_tracksingle=function(event) {
  ga('send', 'event', 'user interaction', event.type, $(this).prop('id'), parseInt((event.timeStamp/1000).toFixed(1)));
 }

 //bind trigger
 $(ga_rm_elements).on('focusin keypress', ga_rm_startcount).blur(ga_rm_stopcount);
 $(ga_rm_hover_elements).mouseenter(ga_rm_startcount).on('mouseleave change', ga_rm_stopcount);
 $('[id].ga-rm-click').on('click',ga_rm_tracksingle);
 $(window).on('beforeunload', ga_rm_trackcount);
});
