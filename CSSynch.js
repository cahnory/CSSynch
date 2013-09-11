/*jslint browser: true, indent: 2 */
/*global jQuery */
(function ($) {
  'use strict';

  // Refresh delay in milliseconds
  var delay, refreshed, parameter;

  delay     = 2000;
  refreshed = new Date().getTime();
  parameter = 'CSSynch';

  $('link[rel="stylesheet"]').each(function () {
    var uri, last, update;

    // Original css is the last version
    last = $(this);

    // Uri, prepared to inject uniqid query parameter
    uri = last.attr('href').replace(/\?|$/, '?&');

    // Refresh only url of type: (//, http://, https://, no sheme)
    if (uri.match(/^(?:https?:)?\/\/|^(?:.(?!\:\/\/))+$/)) {
      update = function () {
        refreshed++;

        // Create new version
        $('<link rel="stylesheet"/>')
          .insertAfter(last)
          .on('load', function () {
            // Remove previous version
            last.remove();
            last = $(this);

            // program next refresh
            setTimeout(update, delay);
          })
          .attr('href', uri.replace(/\?/, '?' + parameter + '=' + refreshed));
      };

      setTimeout(update, delay);
    }

  });

}(jQuery));