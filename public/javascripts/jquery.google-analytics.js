require([
  'INST' /* INST */,
  'jquery' /* $ */
], function(INST, $) {

 // requires INST global

  var _gaq = window._gaq = window._gaq || [];

  // insert ga.js async
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);

  /**
   * Enables Google Analytics tracking on the page from which it's called.
   *
   * Usage:
   *  $.trackPage('UA-xxx-xxx', options);
   *
   * Parameters:
   *   account_id - Your Google Analytics account ID.
   *   options - An object containing one or more optional parameters:
   *     - status_code - The HTTP status code of the current server response.
   *       If this is set to something other than 200 then the page is tracked
   *       as an error page. For more details: http://antezeta.com/news/404-errors-google-analytics
   *
   */
  $.trackPage = function(account_id, options) {

    if (!asyncScriptInserted) {
      asyncScriptInserted = true;

      // insert ga.js async
      var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
      ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    }

    options = $.extend({status_code: 200}, options);
    _gaq.push(['_setAccount', account_id]);
    if (options.domain) {
      _gaq.push(['_setDomainName', options.domain]);
    }
    _gaq.push(['_trackPageview']);
    _gaq.push(['_trackPageLoadTime']);
    if (options.status_code != 200) {
      _gaq.push(['_trackEvent', 'Errors', options.status_code, 'page: ' + document.location.pathname + document.location.search + ' ref: ' + document.referrer, options.error_id ]);
    }
  };

  // see: http://code.google.com//apis/analytics/docs/gaJS/gaJSApiBasicConfiguration.html#_gat.GA_Tracker_._setCustomVar
  $.setTrackingVar = function() {
    var args = Array.prototype.slice.call( arguments, 0 );
    args.unshift('_setCustomVar');
    _gaq.push.apply(_gaq, args);
  };

  /**
   * Tracks an event using the given parameters.
   *
   * The trackEvent method takes four arguments:
   *
   *  category - required string used to group events
   *  action - required string used to define event type, eg. click, download
   *  label - optional label to attach to event, eg. buy
   *  value - optional numerical value to attach to event, eg. price
   *
   * see: http://code.google.com/apis/analytics/docs/tracking/eventTrackerGuide.html
   */
  $.trackEvent = function(category, action, label, value) {
    _gaq.push(['_trackEvent', category, action, label, value]);
  };

  /**
   * simultates tracking a page view. Usage:
   *
   * $.trackPageView("/path/to/url/to/track")
   *
   * see: http://code.google.com//apis/analytics/docs/gaJS/gaJSApiBasicConfiguration.html#_gat.GA_Tracker_._trackPageview
   */
  $.trackPageview = function(url) {
    _gaq.push(['_trackPageview', url]);
  };

  // this next part is the only part that is Instructure specific
  if (INST && INST.googleAnalyticsAccount) {
    $.trackPage(INST.googleAnalyticsAccount, {
      status_code: INST.http_status,
      error_id: INST.error_id,
      domainName: document.location.hostname
    });
  }

  return {
    trackPage: $.trackPage,
    setTrackingVar: $.setTrackingVar,
    trackEvent: $.trackEvent,
    trackPageView: $.trackPageView
  };

});
