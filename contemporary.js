$(function() {
    var smoothstate = $('#smoothstate').smoothState({
        onStart: {
            duration: 250,
            render: function($container) {
                $container.addClass('transitionOut');
            }
        },
        onReady: {
            duration: 0,
            render: function($container, $newContent) {
                $container.removeClass('transitionOut');
                
                $('html').css({
                    overflow: 'auto'
                });
                
                $container.html($newContent);
            }
        },
        prefetch: true
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
