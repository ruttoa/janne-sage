/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 * ======================================================================== */

(function($) {

  // Use this variable to set up the common and page specific functions. If you
  // rename this variable, you will also need to rename the namespace below.
  var Sage = {
    // All pages
    'common': {
      init: function() {
        // JavaScript to be fired on all pages
        
        // Add Bootstrap styling to tables
        $('.main table').addClass('table');
        
        // Add Bootstrap functionality to tooltip and popovers
        $('.bs-component [data-toggle="popover"]').popover();
        $('.bs-component [data-toggle="tooltip"]').tooltip();
        
        // Prevent default in links with no href
        $("a[href='#']").click(function(e) {
          e.preventDefault();
        });
        
        
        $(".navbar-toggle").click(function(e) {
            e.preventDefault();
            $("body").toggleClass("toggled");
        });
        
        // Add special class to full-size content images of large widths.
        function belowEntryMetaClass( param ) {
          
          $( '.entry-content' ).find( param ).each( function() {
            var element              = $( this ),
              caption              = element.closest( 'figure' ),
              newImg;

            // Check if full-size images and captions are larger than or equal to 1000px.
            if ( 'img.size-full' === param ) {

              // Create an image to find native image width of resized images (i.e. max-width: 100%).
              newImg = new Image();
              newImg.src = element.attr( 'src' );

              $( newImg ).load( function() {
                if ( newImg.width >= 1000  ) {
                  element.addClass( 'img-overflow' );

                  if ( caption.hasClass( 'wp-caption' ) ) {
                    caption.addClass( 'img-overflow' );
                    caption.removeAttr( 'style' );
                  }
                }
              } );
            } else {
              element.addClass( 'img-overflow' );
            }

          } );
        }
        
        belowEntryMetaClass( 'img.size-full' );
        
      },
      finalize: function() {
        // JavaScript to be fired on all pages, after page specific JS is fired
        
        
        
      }
    },
    // Home page
    'home': {
      init: function() {
        // JavaScript to be fired on the home page
      },
      finalize: function() {
        // JavaScript to be fired on the home page, after the init JS
      }
    },
    // About us page, note the change from about-us to about_us.
    'about_us': {
      init: function() {
        // JavaScript to be fired on the about us page
      }
    }
  };

  // The routing fires all common scripts, followed by the page specific scripts.
  // Add additional events for more control over timing e.g. a finalize event
  var UTIL = {
    fire: function(func, funcname, args) {
      var fire;
      var namespace = Sage;
      funcname = (funcname === undefined) ? 'init' : funcname;
      fire = func !== '';
      fire = fire && namespace[func];
      fire = fire && typeof namespace[func][funcname] === 'function';

      if (fire) {
        namespace[func][funcname](args);
      }
    },
    loadEvents: function() {
      // Fire common init JS
      UTIL.fire('common');

      // Fire page-specific init JS, and then finalize JS
      $.each(document.body.className.replace(/-/g, '_').split(/\s+/), function(i, classnm) {
        UTIL.fire(classnm);
        UTIL.fire(classnm, 'finalize');
      });

      // Fire common finalize JS
      UTIL.fire('common', 'finalize');
    }
  };

  // Load Events
  $(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.
