$(function() {
    guideLoad();
    slideSwitch();
    userGain();
    var icon = $('.yol-top dt a');
    icon.hover(function() {
        $(this).css({
            left: 0,
            top: 0,
            margin: 0,
            width: 151,
            height: 151,
            background: 'url(' + Util.config.imgfile + 'home/0' + (icon.index(this) + 1) + '.gif) no-repeat 0 0'
        })
    },
    function() {
        $(this).attr('style', '')
    });
    var oApp = $('#yWebapp');
    var oClose = oApp.find('.close');
    oClose.click(function() {
        oApp.fadeOut('slow')
    })
});
function userGain() {
    var gain = $('#userGain');
    gain.wrap('<div class="gain-items"></div>').css('z-index', 9);
    setTimeout(function() {
        gain.animate({
            top: -310,
            right: 0
        },
        800).animate({
            top: -320,
            right: 0
        },
        800)
    },
    800)
};
function showPer() {
    var tar = $('.progre');
    tar.each(function() {
        var self = $(this);
        var per = self.find('.per');
        var div = per.find('div');
        var num = parseInt(per.attr('data-rel'));
        var interval;
        var count = 0;
        if (num == 100) {
            count = 100
        };
        var plus = function() {
            div.css({
                width: count + '%'
            });
            if (count == num || count == 100) {
                clearInterval(interval)
            };
            count++
        };
        interval = setInterval(plus, 5)
    })
};
function slideSwitch() {
    var stay = 6;
    var fade = 0.7;
    var msec = 1000;
    var timer = 400;
    var timeout;
    var prev = next = 0;
    var slider = $('#slider');
    var slideindex = true;
    var controls = false;
    var html = '';
    var term = slider.children('li');
    var len = term.length;
    slider.wrap('<div class="slider-items"></div>');
    if (slideindex) {
        if (len > 1) {
            html += '<div class="slider-index">';
            html += '<ol class="items">';
            for (var i = 1; i <= len; i++) {
                html += '<li ' + (i == 1 ? 'class="current"': '') + '>' + '</li>'
            };
            html += '</ol>';
            html += '</div>'
        }
    };
    if (controls) {
        html += '<div class="slider-updown">';
        html += '<a href="#" class="button prev" data-rel="prev">prev</a>';
        html += '<a href="#" class="button next" data-rel="next">next</a>';
        html += '</div>'
    };
    slider.parent('.slider-items').wrap('<div class="slider-wrap"></div>').css({
        'position': 'relative',
        'overflow': 'hidden'
    }).after(html);
    var thumbCont = slider.parent().siblings('.slider-index');
    var thumb = thumbCont.find('li');
    var button = slider.parent().siblings('.slider-updown');
    slider.fadeIn();
    if (len == 1) {
        term.first().fadeIn()
    };
    button.find('.button').bind('click',
    function() {
        var self = $(this).attr('data-rel');
        if (self == 'prev') {
            if (prev == 0) {
                next = len - 1
            } else {
                next = prev - 1
            }
        } else if (self == 'next') {
            if (prev == len - 1) {
                next = 0
            } else {
                next = prev + 1
            }
        };
        autoPlay();
        return false
    });
    thumb.bind('click',
    function() {
        next = thumb.index($(this));
        clearTimeout(timeout);
        changePlay(next);
        if (next == len - 1) {
            next = 0
        } else {
            next++
        }
    });
    slider.hover(function() {
        clearTimeout(timeout)
    },
    function() {
        if (len > 1) {
            timeout = setTimeout(autoPlay, stay * msec)
        }
    });
    var changePlay = function(next) {
        term.eq(prev).fadeOut(fade * msec);
        term.eq(next).fadeIn(fade * msec);
        thumb.removeClass('current');
        thumb.eq(next).addClass('current');
        if (typeof($('#userGain')[0]) != '') {
            $('#userGain').find('.opacity').css({
                opacity: term.eq(next).attr('data-opacity')
            })
        };
        prev = next
    };
    var autoPlay = function() {
        clearTimeout(timeout);
        changePlay(next);
        next = prev + 1;
        if (next >= len) {
            next = 0
        };
        timeout = setTimeout(autoPlay, stay * msec)
    };
    if (len > 1) {
        autoPlay()
    }
};
function guideLoad() {
    var b = true;
    var n = $.cookie('NoviceGuide');
    $.cookie('NoviceGuide', b, {
        expires: 30,
        path: '/'
    });
    if (!n) {
       //Util.loadJS(environment.globalPath + 'js/guide.js') //调用guide 
    }
};
function investLoan(loanId) {
    var investUrl = environment.globalPath + "yuexitong/detail/" + loanId + ".html";
    window.location.href = investUrl
}
function investCredit(loanInvestorId) {
    var investUrl = environment.globalPath + "yuexitong/zhuan/" + loanInvestorId + ".html";
    window.location.href = investUrl
}