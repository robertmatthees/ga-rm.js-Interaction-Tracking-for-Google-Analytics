# ga-rm.js Easy to implement Form Analysis plus Click- & Scrolltracking for Google Analytics

<h2>Implementation</h2>

Simply add ga-rm.js to your Source Code and it automatically starts tracking <b>User Interaction Time with Forms Fields</b> plus <b>Scroll Depth Tracking</b> in Google Analytics on all pages of your domain:

<code>&lt;script src="ga-rm.js"&gt;&lt;/script&gt;&lt;script&gt;$.ga_rm();&lt;/script&gt;</code>

No further Setup / Configuration needed. (Dependencies: Google Analytics & jQuery)

--------

In addition, you can easily implement <b>Click- and Scrolltracking for Custom Elements in Google Analytics</b> like DIVs, Links or Call-to-Action-Buttons by adding the according HTML-Classes as outlined below.

--------

<h2>Default Tracking Options</h2>

Per default, ga-rm.js tracks the <b>User Interaction Time for Form Analysis</b> of the following Elements (in seconds):
- Select Dropdowns, Range Slider, Checkboxes, Radio Buttons, Input Labels <i>(start: mouseenter | stop: mouseleave change)</i>
- Textareas, Inpout Text Fields, Input Password Fields, Date Pickers and all other HTML5 Input Types <i>(start: focusin keypress | stop: blur)</i>

The default <b>Scroll Tracking</b> area is the document's body height (tracked from 1-100%).

--------

<h2>Custom Initialisation</h2>

You can <b>Switch off/on the Default Tracking</b> Options and <b>Set the Minimum Interaction Time</b> from when an Element gets tracked:

<code>form:0</code> - Default Form Analysis <i>(bool: 0 off / 1 on | default: 1)</i>

<code>scroll:0</code> - Default Scroll Tracking <i>(bool: 0 off / 1 on | default: 1)</i>

<code>min_itime:10</code> - Min. Interaction Time from when Element gets tracked <i>(integer: in Seconds &gt; 0 | default: 0.1)</i>

<b>example:</b> <code>&lt;script src="ga-rm.js"&gt;&lt;/script&gt;&lt;script&gt;$.ga_rm({form:0, scroll:0, min_itime:10});&lt;/script&gt;</code>

--------

<h2>Tracking Reference in Google Analytics</h2>

In Form Analysis / User Interaction Time Tracking, the <b>Element's ID</b> is used as Tracking Reference in Google Analytics (Event Label). If there is no ID, the <b>Name-Attribute</b> is used as Tracking Reference instead. If there is no Name-Attribute either, no tracking will take place. 

The time a user is hovering an Input Label will be counted at the Field with the according ID. For example:

<code>&lt;label for="pwd"&gt;Password:&lt;/label&gt; &lt;input type="password" id="pwd"&gt;</code> (label tracked as "pwd" in Google Analytics)

In <b>Custom Tracking with HTML-Classes</b> (below), please <b>always use a unique ID</b> for each Element (just Custom User Interaction Time Tracking works with Name-Attributes as Tracking References too).

--------

<h2>Custom User Interaction Time Tracking (seconds)</h2>

Activate <b>User Interaction Time Tacking to a Custom Element/DOM</b> simply by adding <code><b>class="ga-rm-hover"</b></code> <i>(start: mouseenter | stop: mouseleave change)</i> <b>OR</b> <code><b>class="ga-rm-focus"</b></code> <i>(start: focusin keypress | stop: blur)</i> to the Element/DOM like Adspace- or Teaser-DIVs on your website. For example:

<code>&lt;div id="mydiv" class="ga-rm-hover"&gt;&lt;/div&gt;</code>

<b>not:</b> <code>&lt;div id="mydiv" class="ga-rm-hover ga-rm-focus"&gt;&lt;/div&gt;</code>

--------

<h2>Custom Click Tracking / Time on Page until Click (seconds)</h2>

Activate <b>Click Tracking (Time on Page until Click) in Google Analytics</b> by adding <code><b>class="ga-rm-click"</b></code> to the Element/DOM like a Call-to-Action-Button or Download-Links. For example:

<code>&lt;div id="mydiv" class="ga-rm-click"&gt;&lt;/div&gt;</code>

--------

<h2>Custom Scroll Tracking / Scroll Depth (percentage)</h2>

Activate Custom <b>Scroll Depth Tracking in Google Analytics</b> by adding <code><b>class="ga-rm-scroll"</b></code> to the Element/DOM like your Content-Container. For example:

<code>&lt;div id="mydiv" class="ga-rm-scroll"&gt;&lt;/div&gt;</code>

Note: The value returned by <code><b>class="ga-rm-scroll"</b></code> can be negative if the element wasn't in the user's viewport at all. This helps in optimisation. Because looking at an average scroll depth of -12% (for example), will tell you immediately that you may want to place the element (at least) 12% higher on the page, if it is important for your project or business. If you want to receive just values from Scrolling inside an Element (1-100%), use <code><b>class="ga-rm-scroll-in"</b></code> to get the <b>In-Element Scroll Depth Percentage in Google Analytics</b>.

--------

<h2>Custom Scroll Tracking / Time until Scroll Depth (seconds)</h2>

Activate Custom <b>Time until Scroll Depth Tracking in Google Analytics</b> by adding <code><b>class="ga-rm-scroll-top"</b></code> <b>OR/AND</b> <code><b>class="ga-rm-scroll-bottom"</b></code> to the Element/DOM like your Content-Container or Call-to-Action to find out how long it takes that a user scrolls until its top or bottom position. For example:

<code>&lt;div id="mydiv" class="ga-rm-scroll-top"&gt;&lt;/div&gt;</code>

<b>or:</b> <code>&lt;div id="mydiv" class="ga-rm-scroll-top ga-rm-scroll-bottom"&gt;&lt;/div&gt;</code>

--------

<h2>Combine Tracking Methods</h2>

You can easily <b>Combine Custom Tracking Methods</b> by adding all the according classes to the Element/DOM:

<code>&lt;div id="mydiv" class="ga-rm-hover ga-rm-scroll-top ga-rm-scroll-bottom ga-rm-click"&gt;&lt;/div&gt;</code>

-------

<h2>Test your Tracking</h2>

The best way to test your new tracking is via the <b>Event-Section of the Real Time Report</b> in your Google Analytics Account.

-------

<h2>Google Analytics Hit Limits</h2>

The design of ga-rm.js reduces the number of event hits to a minimum. Even though, in <b>Large Scale Enterprise Tracking</b> and being aware of <a href="https://developers.google.com/analytics/devguides/collection/analyticsjs/limits-quotas">Google's Data collection limit</a>, you may use this script just within your most important funnels / switch off default tracking / set a minimum interaction time unless you are on Google Analytics 360.

--------

<h2>TO DO: Custom Scroll Tracking / Visible Time (coming soon)</h2>

Track for how long an Element/DOM was visible in a user's browser simply by adding <code><b>class="ga-rm-scroll-visible"</b></code> to the Element/DOM like a Content-Container with an important Call-to-Action. For example:

<code>&lt;div id="mydiv" class="ga-rm-scroll-visible"&gt;&lt;/div&gt;</code>

Further:
- Add "no interaction" init option (until min_time_on_page)
- Add generic "time on page" tracker (init option) for a more accurate tracking in Google Analytics
- Add class="ga-rm-form" to re-activate form analysis comfortably for all fields of an entire form element in case the default tracking has been switched off
--------

Copyright (C) 2017 <a href="https://www.robert-matthees.de">Robert Matthees</a> 

GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007
