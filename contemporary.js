$(function() {
    var smoothstate = $('#smoothstate').smoothState({
        onStart: {
            duration: 500,
            render: function($container) {
                $container.addClass('transitionOut');
            }
        },
        onReady: {
            duration: 250,
            render: function($container, $newContent) {
                $container.removeClass('transitionOut');
                
                $('html').css({
                    overflow: 'auto'
                });
                
                $container.html($newContent);
            }
        },
        onProgress: {
            duration: 1000,
            render: function($container) {
                
            }
        },
        prefetch: true,
        loadingClass: 'smoothstateLoading'
    });
});

function toggleMenu(menu) {
    $(menu).toggleClass('open');
    if ($('html').css('overflow') == 'hidden') {
        $('html').css({
            overflow: 'auto'
        });
    } else {
        $('html').css({
            overflow: 'hidden'
        });
    }
}

var isLight = false;
function toggleTheme() {
    if (isLight) {
        $("html").removeClass("light");
        isLight = false;
        document.cookie = "theme=dark; path=/";
    } else {
        $("html").addClass("light");
        isLight = true;
        document.cookie = "theme=light; path=/";
    }
}

if (document.cookie.includes("theme")) {
    if (document.cookie.includes("theme=light")) {
        toggleTheme();
    }
}

var scrollTop = 0;
$(window).scroll(function() { 
    var delta = $(window).scrollTop() - scrollTop;
    var top = $("#mainHeader").position().top - delta;
    
    if (top < -48) {
        top = -48;
    } else if (top > 0) {
        top = 0;
    }
    
    $("#mainHeader").css("top", top + "px");
    scrollTop = $(window).scrollTop();
})
