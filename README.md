# ga-rm.js Easy to implement Form Analysis plus Click- & Scrolltracking for Google Analytics

Version: Development Alpha Test (working well, no errors | Scroll Tracking still to be implemented)

--------

<strong>Implementation</strong>

Simply add ga-rm.js to your Source Code and it automatically starts tracking <b>User Interaction Time with Forms Fields</b> plus <b>Scroll Depth Tracking</b> in Google Analytics on all pages of your domain:

<code>&lt;script src="ga-rm.js"&gt;&lt;/script&gt;</code>

No further Setup / Configuration needed. (Dependencies: Google Analytics & jQuery)

--------

In addition, you can easily implement <b>Click- and Scrolltracking for Custom Elements in Google Analytics</b> like DIVs, Links or Call-to-Action-Buttons by adding the according HTML-Classes as outlined below.

--------

<strong>Default Tracking Options</strong>

Per default, ga-rm.js tracks the <b>User Interaction Time for Form Analysis</b> of the following Elements:
- Select Dropdowns, Range Slider, Checkboxes, Radio Buttons, Input Labels <i>(start: mouseenter | stop: mouseleave change)</i>
- Textareas, Inpout Text Fields, Input Password Fields, Date Pickers and all other HTML5 Input Types <i>(start: focusin keypress | stop: blur)</i>

The default <b>Scroll Tracking</b> area is the user's browser window height. (TO DO)

--------

<strong>Tracking Reference</strong>

In Form Analysis / User Interaction Time Tracking, the Element's ID is used as Tracking Reference in Google Analytics (Event Label). If there is no ID, the Name-Attribute is used as Tracking Reference instead. If there is no Name-Attribute either, no tracking will take place. 

The time a user is hovering an Input Label will be counted at the Field with the according ID. For example:

<code>&lt;label for="pwd"&gt;Password:&lt;/label&gt; &lt;input type="password" id="pwd"&gt;</code> (label tracked as "pwd" in Google Analytics)

In Custom Tracking with HTML-Classes (below), please always use a unique ID for each Element (just Custom User Interaction Time Tracking works with Name-Attributes as Tracking References too).

--------

<strong>Custom User Interaction Time Tracking</strong>

Activate User Interaction Time Tacking to a Custom Element/DOM, simply add <code><b>class="ga-rm-hover"</b></code> (start: mouseenter | stop: mouseleave change) <b>OR</b> <code><b>class="ga-rm-focus"</b></code> (start: focusin keypress | stop: blur). For example:

<code>&lt;div id="mydiv" class="ga-rm-hover"&gt;&lt;/div&gt;</code>

<b>not:</b> <code>&lt;div id="mydiv" class="ga-rm-hover ga-rm-focus"&gt;&lt;/div&gt;</code>

--------

<strong>Custom Click Tracking / Time on Page until Click</strong>

Activate Click Tracking (Time on Page until Click) in Google Analytics by adding <code><b>class="ga-rm-click"</b></code> to the Element/DOM like Call-to-Action-Buttons. For example:

<code>&lt;div id="mydiv" class="ga-rm-click"&gt;&lt;/div&gt;</code>

--------

<strong>Custom Scroll Tracking / Scroll Depth - TO DO</strong>

Activate Custom Scroll Depth Tracking in Google Analytics by adding <code><b>class="ga-rm-scroll"</b></code> to the Element/DOM like your Content-Container. For example:

<code>&lt;div id="mydiv" class="ga-rm-scroll"&gt;&lt;/div&gt;</code>

--------

<strong>Custom Scroll Tracking / Visible Time - TO DO</strong>

Track for how long an Element/DOM was visible in a user's browser simply by adding <code><b>class="ga-rm-scroll-visible"</b></code> to the Element/DOM like a Content-Container with an important Call-to-Action. For example:

<code>&lt;div id="mydiv" class="ga-rm-scroll-visible"&gt;&lt;/div&gt;</code>

--------

<strong>Custom Scroll Tracking / Time until Scroll Depth - TO DO</strong>

Activate Custom Time until Scroll Depth Tracking in Google Analytics by adding <code><b>class="ga-rm-scroll-top"</b></code> <b>OR/AND</b> <code><b>class="ga-rm-scroll-bottom"</b></code> to the Element/DOM like your Content-Container or Call-to-Action to find out how long it takes that a user scrolls until its top or bottom. For example:

<code>&lt;div id="mydiv" class="ga-rm-scroll-top"&gt;&lt;/div&gt;</code>

<b>or:</b> <code>&lt;div id="mydiv" class="ga-rm-scroll-top ga-rm-scroll-bottom"&gt;&lt;/div&gt;</code>

--------

<strong>Combine Tracking Methods</strong>

You can easily combine several Custom Tracking Methods by adding all the according classes:

<code>&lt;div id="mydiv" class="ga-rm-hover ga-rm-scroll-top ga-rm-scroll-bottom ga-rm-visible"&gt;&lt;/div&gt;</code>

-------

<strong>Test your Tracking</strong>

The best way to test your new tracking is via the Event-Section of the Real Time Report in your Google Analytics Account.

-------

<strong>Google Analytics Hit Limits</strong>

In Large Scale Enterprise Tracking and being aware of <a href="https://developers.google.com/analytics/devguides/collection/analyticsjs/limits-quotas">Google's Data collection limit</a>, you may use this script just within your most important funnels or empty the default tracking element lists in the script unless you are on Google Analytics 360.

--------

Copyright (C) 2017 <a href="https://www.robert-matthees.de">Robert Matthees</a> 

GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007
