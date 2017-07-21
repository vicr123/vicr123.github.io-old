---
---

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

var searchData = null;
function prepareSearch() {
    if (searchData == null) {
        $.ajax({
            url: searchFile,
            dataType: "json",
            success: function(data) {
                searchData = data;
            },
            error: function(xhr,status,error) {
                searchData = "Error";
            }
        });
    }
    $("#siteSearch").focus();
}

function performSearch(query) {
    var resultsContainer = $("#searchResults");
    resultsContainer.empty();
    
    if (query != "") {
        if (searchData == "Error") {
            
        } else {
            for (var i = 0; i < searchData.length - 1; i++) {
                var pageData = searchData[i];
                
                var addToQuery = false;
                if (pageData.title.toLowerCase().includes(query.toLowerCase())) {
                    addToQuery = true;
                }
                
                if (pageData.contents.toLowerCase().includes(query.toLowerCase())) {
                    addToQuery = true;
                }
                
                if (addToQuery) {
                    //Determine excerpt
                    var excerpt;
                    
                    if (pageData.contents.includes(query)) {
                        var index = pageData.contents.indexOf(query);
                        if (index < 50) {
                            excerpt = pageData.contents.substr(0, 100);
                        } else if (index > pageData.contents.length - 50) {
                            excerpt = pageData.contents.substr(pageData.contents.length - 100);
                        } else {
                            excerpt = pageData.contents.substr(index - 50, 100);
                        }
                    } else {
                        excerpt = pageData.contents.substr(0, 100);
                    }
                    
                    var htmlElement = '<a class="searchItem" onclick="toggleMenu(\'#projectsMenu\')" href="' + pageData.url + '">' +
                                            '<p class="title">' + pageData.title + '</p>' +
                                            '<div class="excerpt">' + excerpt + '</div>' +
                                        '</a>'
                    resultsContainer.append(htmlElement);
                }
            }
        }
    }
}
