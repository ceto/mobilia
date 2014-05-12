// Browser detection. Yes, really. Guess for which browser? Nope! Chrome.
var b = document.documentElement;
b.setAttribute('data-useragent',  navigator.userAgent);
b.setAttribute('data-platform', navigator.platform);

// Modified http://paulirish.com/2009/markup-based-unobtrusive-comprehensive-dom-ready-execution/
// Only fires on body class (working off strictly WordPress body_class)

var ExampleSite = {
  // All pages
  common: {
    init: function() {
      // JS here
    },
    finalize: function() { }
  },
  // Home page
  home: {
    init: function() {
      // JS here
    }
  },
  // About page
  about: {
    init: function() {
      // JS here
    }
  }
};

var UTIL = {
  fire: function(func, funcname, args) {
    var namespace = ExampleSite;
    funcname = (funcname === undefined) ? 'init' : funcname;
    if (func !== '' && namespace[func] && typeof namespace[func][funcname] === 'function') {
      namespace[func][funcname](args);
    }
  },
  loadEvents: function() {

    UTIL.fire('common');

    $.each(document.body.className.replace(/-/g, '_').split(/\s+/),function(i,classnm) {
      UTIL.fire(classnm);
    });

    UTIL.fire('common', 'finalize');
  }
};

$(document).ready(UTIL.loadEvents);

//*********** Smooth scroll *************
$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - 120
        }, 1000);
        return false;
      }
    }
  });
});


var showMenu = function() {
  $('body').toggleClass("active-subnav");
  $('.submenu-button, .submenu-button2').toggleClass("active-button");
};
var showMainMenu = function() {
  $('.banner').toggleClass('active');
  $('.navbar-toggle').toggleClass('active');
};


// add/remove classes everytime the window resize event fires
jQuery(window).resize(function(){
  var off_canvas_subnav_display = $('.off-canvas-subnavigation').css('display');
  var submenu_button_display = $('.submenu-button').css('display');
  if (off_canvas_subnav_display === 'block') {
    $("body").removeClass("three-column").addClass("small-screen");
  }
  if (off_canvas_subnav_display === 'none') {
    $("body").removeClass("active-subnav small-screen").addClass("three-column");
  }

  //Main navigation toggle
  var header_height = $('.banner').css('height');
  if (header_height === '320px') {
    $('.banner').removeClass('active');
    $('.navbar-toggle').removeClass('active');
  }

});

jQuery(document).ready(function($) {
  // Toggle for nav menu
  $('.submenu-button, .submenu-button2').click(function(e) {
    e.preventDefault();
    showMenu();
  });
  $('.navbar-toggle').click(function(e) {
    e.preventDefault();
    showMainMenu();
  });
});



// var showSidebar = function() {
//   $('body').removeClass("active-nav").toggleClass("active-sidebar");
//   $('.menu-button').removeClass("active-button");
//   $('.sidebar-button').toggleClass("active-button");
// };
// var showMenu = function() {
//   $('body').removeClass("active-sidebar").toggleClass("active-nav");
//   $('.sidebar-button').removeClass("active-button");
//   $('.menu-button').toggleClass("active-button");
// };

// // add/remove classes everytime the window resize event fires
// jQuery(window).resize(function(){
//   var off_canvas_nav_display = $('.off-canvas-navigation').css('display');
//   var menu_button_display = $('.menu-button').css('display');
//   if (off_canvas_nav_display === 'block') {
//     $("body").removeClass("three-column").addClass("small-screen");
//   }
//   if (off_canvas_nav_display === 'none') {
//     $("body").removeClass("active-sidebar active-nav small-screen").addClass("three-column");
//   }
// });

// jQuery(document).ready(function($) {
//   // Toggle for nav menu
//   $('.menu-button').click(function(e) {
//     e.preventDefault();
//     showMenu();
//   });
//   // Toggle for sidebar
//   $('.sidebar-button').click(function(e) {
//     e.preventDefault();
//     showSidebar();
//   });
// });


var resizeHero = function() {
  $('.hero').height($(window).height()-($('.banner').offset().top + $('.banner').height()));
  $('.contact-row.open').height($(window).height()-($('.banner').offset().top + $('.banner').height()));
  //$('.contact-row.open').css('min-height',($(window).height()-($('.banner').offset().top + $('.banner').height())));
};

$(window).resize(function(){
  resizeHero();
});

jQuery(document).ready(function($) {
  resizeHero();
  $('.copener').click(function(e){
    e.preventDefault();
    $('.contact-row').toggleClass('open');
    if ( $('.contact-row').innerHeight()>0 ) {
      $('.contact-row').height(0);
      //$('.contact-row').css('min-height',0);

    } else {
      $('.contact-row').height($(window).height()-($('.banner').offset().top + $('.banner').height()));
      //$('.contact-row.open').css('min-height',($(window).height()-($('.banner').offset().top + $('.banner').height())));

    }
  });

  /************* Man navigation Fixing ***********/
  var top = $('.banner').offset().top - parseFloat($('.banner').css('marginTop').replace(/auto/, 0)) + 30;
  //var top=200; 
  $(window).scroll(function (event) {
    var y = $(this).scrollTop();
    //console.log(y+'-puna');
    if (y >= top) {
      $('.banner').addClass('fixed');
      $('body').addClass('fixednav');
    } else {
      $('.banner').removeClass('fixed');
      $('body').removeClass('fixednav');
    }
  });

  /****** Magnific Zoom Gallery *********/
  $('.gallery').magnificPopup({
    delegate: 'a',
    type: 'image',
    closeOnContentClick: false,
    closeBtnInside: false,
    mainClass: 'mfp-with-zoom mfp-img-mobile',
    image: {
      verticalFit: true,
      titleSrc: function(item) {
        return item.el.find('img').attr('alt') + ' &middot; <a class="image-source-link" href="'+item.el.attr('href')+'" target="_blank">Teljes méret</a>';
      }
    },
    gallery: {
      enabled: true
    },
    zoom: {
      enabled: true,
      duration: 300, // don't foget to change the duration also in CSS
      opener: function(element) {
        return element.find('img');
      }
    }
    
  });
});


