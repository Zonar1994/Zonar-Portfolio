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

function openPopup() {
    // Specify the URL of the PDF file
    var pdfUrl = "/Web ";
  
    // Create a new window with the PDF embedded
    var popupWindow = window.open("", "popupWindow", "width=600,height=600");
    popupWindow.document.write("<embed src='" + pdfUrl + "' width='100%' height='100%' type='application/pdf'>");
  }
  
  var text = "Welcome to my reading guide for semester six! I'm excited to work on a range of creative projects
  that will challenge my skills and creativity. This reading guide covers the approach and results of projects that
  I will be working on this semester.
  
  The semester is divided into three main projects: <b>start-up project</b>, <b>client project</b>, and <b>individual project</b>. During the
  first six weeks, I'll work on a start-up project to come up with innovative ideas. Next, I'll spend seven weeks working
  on a client project, gaining experience working with external clients. Finally, I'll have the opportunity to explore a
  topic that interests me during the last five weeks.

  I'll document my approach and results for each project to reflect on my progress, identify areas for improvement, and
  track my learning outcomes.";
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
  