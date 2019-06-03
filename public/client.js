// Navbar height
const nav_height = $('nav').outerHeight();

// Animation Arrays
const downArray = ['.down', 'nav'];
const leftArray = [
  '.left',
  '.header p',
  '.header h1',
  'header a',
  '.section-title',
  '.info h3',
  '.promise-container p',
  '.card-header',
  '.form-group',
  ,
  '.svs-col',
  '.team-col',
  'iframe',
  'footer .container-fluid'
];
const rightArray = ['.right', '.info li'];

// Testing for viewport
function isElementInViewport(elem) {
  let $elem = $(elem);
  let $window = $(window);
  // Get the scroll position of the page.
  let viewportTop = $window.scrollTop();
  let viewportBottom = viewportTop + $(window).height();

  // Get the position of the element on the page.
  let elemTop = Math.round($elem.offset().top);
  let elemBottom = elemTop + $elem.height();

  return elemTop < viewportBottom && elemBottom > viewportTop;
}

// NAVIGATION active links on scroll
function navActive() {
  $('section').each(function() {
    let top = $(this).offset().top - nav_height,
      bottom = top + $(this).outerHeight() - nav_height * 3;

    if ($(window).scrollTop() >= top && $(window).scrollTop() <= bottom) {
      $('nav')
        .find('a')
        .removeClass('current');
      $('nav')
        .find('a[href="#' + $(this).attr('id') + '"]')
        .addClass('current');
    }
  });
}

// Default animatins that won't repeat
function defaultAnimations() {
  $('.nav-brand, .nav-list, .nav-button-wrapper').addClass(
    'animated fadeInDown'
  );
}

function makeInvis() {
  // Down
  for (let i = 0; i < downArray.length; i++) {
    $(downArray[i]).each(function() {
      $(this).addClass('invisible d');
    });
  }
  // Left
  for (let i = 0; i < leftArray.length; i++) {
    $(leftArray[i]).each(function() {
      $(this).addClass('invisible l');
    });
  }
  // Right
  for (let i = 0; i < rightArray.length; i++) {
    $(rightArray[i]).each(function() {
      $(this).addClass('invisible r');
    });
  }
}
// Animates when in viewport
function checkAnimations() {
  // Down
  $('.invisible.d').each(function() {
    if (isElementInViewport(this)) {
      $(this).removeClass('invisible');
      $(this).addClass('animated fadeInDown fast');
    }
  });
  // Left
  $('.invisible.l').each(function() {
    if (isElementInViewport(this)) {
      $(this).removeClass('invisible');
      $(this).addClass('animated fadeInLeft fast');
    }
  });
  // Right
  $('.invisible.r').each(function() {
    if (isElementInViewport(this)) {
      $(this).removeClass('invisible');
      $(this).addClass('animated fadeInRight fast');
    }
  });
}

//Removes icons text if they are no longer in viewport
function checkIcons() {
  let iconsArray = ['.flip.active', '.team-member.active'];

  for (let i = 0; i < iconsArray.length; i++) {
    $(iconsArray[i]).each(function() {
      if (!isElementInViewport(this)) {
        $(this).removeClass('active');
      }
    });
  }
}

$(document).ready(function() {
  // Apply active links on nav
  navActive();

  // Run default animations that won't run again
  defaultAnimations();
  // Make animation elements invisible
  makeInvis();
  // Check animations in view
  checkAnimations();

  // Add spans to test buttons
  $('.nav-button, .button1, .button2').prepend(
    '<span></span><span></span><span></span><span></span>'
  );

  // Toggle nav button
  $('.nav-button-wrapper, .nav-list a').click(function() {
    $('.nav-button-wrapper').attr(
      'aria-expanded',
      $('.nav-button-wrapper').attr('aria-expanded') == 'false'
        ? 'true'
        : 'false'
    );
    $('.nav-button, .nav-list').toggleClass('active');
  });

  // Add smooth scrolling to all nav links
  $('.nav-list a').on('click', function(event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== '') {
      // Prevent default anchor click behavior
      event.preventDefault();
      // Store hash
      let hash = this.hash;
      // Using jQuery's animate() method to add smooth page scroll
      $('html, body').animate(
        {
          scrollTop: $(hash).offset().top
        },
        900
      );
    }
  });

  // Button click scrolling, add delay to mobile
  $('.button1').on('click', function(event) {
    if ($(this).attr('type') !== 'submit') {
      let delay = 0;
      if ($(window).width() < 800) {
        delay = 700;
      }
      $(this)
        .addClass('active')
        .delay(delay)
        .queue(function(next) {
          $(this).removeClass('active');
          next();
        });
      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== '') {
        // Prevent default anchor click behavior
        event.preventDefault();
        // Store hash
        let hash = this.hash;
        // Add delay to mobile for link animation
        setTimeout(function() {
          $('html, body').animate(
            {
              scrollTop: $(hash).offset().top
            },
            900
          );
        }, delay - 150);
      }
    }
  });

  // Accordion button handler
  $('.button2').click(function() {
    let active = false;
    if ($(this).hasClass('active')) {
      active = true;
    }
    $('.button2.active').removeClass('active');
    if (!active) {
      $(this).addClass('active');
    }
  });

  // Flip card handler
  $('.flip').click(function() {
    let active = false;
    if ($(this).hasClass('active')) {
      active = true;
    }
    $('.flip.active')
      .removeClass('active')
      .find('.flip-side-front')
      .attr('aria-expanded', 'false');
    if (!active) {
      $(this)
        .addClass('active')
        .find('.flip-side-front')
        .attr('aria-expanded', 'true');
    }
  });

  // Team member handler
  $('.team-member').click(function() {
    let active = false;
    if ($(this).hasClass('active')) {
      active = true;
    }
    $('.team-member.active')
      .removeClass('active')
      .attr('aria-expanded', 'false');
    if (!active) {
      $(this)
        .addClass('active')
        .attr('aria-expanded', 'true');
    }
  });

  //Set previous scroll position (needs to be outside)
  let prevScrollpos = $(window).scrollTop();

  //Scroll events
  $(window).on('scroll', function() {
    let currentScrollPos = $(window).scrollTop();

    // NAVIGATION retraction on scroll
    if (currentScrollPos < 150 || prevScrollpos > currentScrollPos) {
      $('nav').css('top', '0');
    } else {
      $('nav').css('top', -nav_height);
    }
    prevScrollpos = currentScrollPos;

    // Apply active state on nav links
    navActive();

    // Check animations on scroll
    checkAnimations();

    // Check Icons on scroll
    checkIcons();
  });
});
