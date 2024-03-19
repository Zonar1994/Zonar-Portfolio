$(window).load(function () {

    // preloader
    $('#status').fadeOut(); // will first fade out the loading animation
    $('#preloader').delay(550).fadeOut('slow'); // will fade out the white DIV that covers the website.
    $('body').delay(550).css({
        'overflow': 'visible'
    });

    var background = document.querySelector('.background');

    window.addEventListener('mousemove', function(event) {
      var mouseX = event.clientX;
      var mouseY = event.clientY;
      var windowWidth = window.innerWidth;
      var windowHeight = window.innerHeight;
      var moveX = (mouseX - windowWidth / 2) / 40;
      var moveY = (mouseY - windowHeight / 2) / 40;
      background.style.transform = 'translate(' + moveX + 'px,' + moveY + 'px)';
    });
    
    //  isotope
    var $container = $('.portfolio_container');
    $container.isotope({
        filter: '*',
    });

    $('.portfolio_filter a').click(function () {
        $('.portfolio_filter .active').removeClass('active');
        $(this).addClass('active');

        var selector = $(this).attr('data-filter');
        $container.isotope({
            filter: selector,
            animationOptions: {
                duration: 500,
                animationEngine: "jquery"
            }
        });
        return false;
    });

    // back to top
    var offset = 300,
        offset_opacity = 1200,
        scroll_top_duration = 700,
        $back_to_top = $('.cd-top');

    //hide or show the "back to top" link
    $(window).scroll(function () {
        ($(this).scrollTop() > offset) ? $back_to_top.addClass('cd-is-visible'): $back_to_top.removeClass('cd-is-visible cd-fade-out');
        if ($(this).scrollTop() > offset_opacity) {
            $back_to_top.addClass('cd-fade-out');
        }
    });

    //smooth scroll to top
    $back_to_top.on('click', function (event) {
        event.preventDefault();
        $('body,html').animate({
            scrollTop: 0,
        }, scroll_top_duration);
    });

 
    
      
      
    // input
    $(".input-contact input, .textarea-contact textarea").focus(function () {
        $(this).next("span").addClass("active");
    });
    $(".input-contact input, .textarea-contact textarea").blur(function () {
        if ($(this).val() === "") {
            $(this).next("span").removeClass("active");
        }
    });
});

  
  var text = "";
var delay = 100; // milliseconds between each character

function typeEffect() {
  var i = 0;
  var interval = setInterval(function() {
    document.getElementById('text').innerHTML += text.charAt(i);
    i++;
    if (i > text.length) {
      clearInterval(interval);
    }
  }, delay);
}

typeEffect();

  // Initialize the Intersection Observer API
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        typeEffect();
        observer.unobserve(entry.target);
      }
    });
  });
  
  // Target the text container element
  const textContainer = document.getElementById('text');
  
  // Observe the text container element
  observer.observe(textContainer);
  