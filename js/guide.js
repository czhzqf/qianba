(function() {
    var a = {
        domain: environment.globalPath,
        whost: window.location.host,
        isIE: navigator.userAgent.indexOf("MSIE") > 0,
        Step: 20,
        Time: 15,
        Auto: false,
        Pause: 4000,
        Index: 0,
        timer: null,
        target: 0,
        direc: 'left',
        init: function() {
            a.addStyle();
            a.guide()
        },
        guide: function() {
            var ove = document.createElement('div');
            a.Mask(ove);
            var gui = document.createElement('div');
            a.isIE ? gui.id = 'guideMain': gui.setAttribute('id', 'guideMain');
            document.body.appendChild(gui);
            var ghtml = '<a href="javascript:;" id="idClose">close</a>';
            ghtml += '<div id="idTitle"><ul id="guideTitle"><li class="title-1">1</li><li class="title-2">2</li><li class="title-3">3</li><li class="title-4">4</li></ul></div>';
            ghtml += '<div id="idTransformView">';
            ghtml += '<ul id="idSlider"><li><img src="' + a.domain + 'images/guide/guide_1.jpg"></li><li><img src="' + a.domain + 'images/guide/guide_2.jpg"></li><li><img src="' + a.domain + 'images/guide/guide_3.jpg"><a href="javascript:;" id="idEnterPage">进入新版</a></li></ul>';
            ghtml += '</div>';
            ghtml += '<div id="anIndex"><ul id="idNum"><li>1</li><li>2</li><li>3</li></ul></div>';
            ghtml += '<a href="javascript:;" id="idPrev">prev</a> <a href="javascript:;" id="idNext">next</a>';
            gui.innerHTML = ghtml;
            a.slide();
            Util.getID('idClose').onclick = function() {
                clearTimeout(a.timer);
                a.Delete(ove);
                a.Delete(gui)
            };
            Util.getID('idEnterPage').onclick = function() {
                clearTimeout(a.timer);
                a.Delete(ove);
                a.Delete(gui)
            }
        },
        slide: function() {
            var oContainer = Util.getID('idTransformView');
            var onPrev = Util.getID('idPrev');
            var onNext = Util.getID('idNext');
            var oSlider = Util.getID('idSlider');
            var oNumber = Util.getID('idNum');
            var onIndex = oNumber.getElementsByTagName('li');
            var oTitle = Util.getID('guideTitle');
            var osCount = 3;
            var osWidth = 765;
            oTitle.style.width = osCount * osWidth + 'px';
            oTitle.style.position = 'absolute';
            oTitle.style.top = oTitle.style.left = 0;
            oContainer.style.overflow = 'hidden';
            oContainer.style.position = 'relative';
            oSlider.style.width = osCount * osWidth + 'px';
            oSlider.style.position = 'absolute';
            oSlider.style.top = oSlider.style.left = 0;
            var Move = function() {
                clearTimeout(a.timer);
                var iNow = parseInt(oSlider.style[a.direc]);
                var iStep = GetStep(a.target, iNow);
                if (iStep != 0) {
                    oSlider.style[a.direc] = (iNow + iStep) + 'px';
                    oTitle.style[a.direc] = (iNow + iStep) + 'px';
                    a.timer = setTimeout(function() {
                        Move()
                    },
                    a.Time)
                } else {
                    oSlider.style[a.direc] = a.target + 'px';
                    oTitle.style[a.direc] = a.target + 'px';
                    if (a.Auto) {
                        a.timer = setTimeout(function() {
                            a.Index++;
                            Start()
                        },
                        a.Pause)
                    }
                }
            };
            var GetStep = function(iTarget, iNow) {
                var iStep = (iTarget - iNow) / a.Step;
                if (iStep == 0) {
                    return 0
                };
                if (Math.abs(iStep) < 1) {
                    return (iStep > 0 ? 1 : -1)
                };
                return iStep
            };
            var Stop = function(iTarget, iNow) {
                clearTimeout(a.timer);
                oSlider.style[a.direc] = a.target + 'px';
                oTitle.style[a.direc] = a.target + 'px'
            };
            var Each = function(list, fun) {
                for (var i = 0,
                len = list.length; i < len; i++) {
                    fun(list[i], i)
                }
            };
            onPrev.onclick = function() {
                clearTimeout(a.timer);
                a.Index--;
                Start()
            };
            onNext.onclick = function() {
                clearTimeout(a.timer);
                a.Index++;
                Start()
            };
            var Start = function() {
                if (a.Index < 0) {
                    a.Index = osCount - 1
                } else if (a.Index >= osCount) {
                    a.Index = 0
                };
                a.target = -1 * osWidth * a.Index;
                Each(onIndex,
                function(o, i) {
                    o.className = a.Index == i ? 'on': ''
                });
                Each(onIndex,
                function(o, i) {
                    o.onclick = function() {
                        o.className = 'on';
                        a.Auto = false;
                        a.Index = i;
                        Start()
                    }
                });
                Move()
            };
            Start()
        },
        Mask: function(div) {
            var ehtml = document.getElementsByTagName('html')[0];
            a.isIE ? div.id = 'maskMain': div.setAttribute('id', 'maskMain');
            document.body.appendChild(div);
            var tmpWidth = document.body.clientWidth;
            if (Util.Browser.isios || Util.Browser.isAndroid) {
                tmpWidth = tmpWidth + 20
            };
            div.style.position = 'absolute';
            div.style.top = 0;
            div.style.left = 0;
            div.style.background = '#000';
            div.style.zIndex = 9997;
            div.style.opacity = 0.65;
            div.style.filter = 'alpha(opacity=65)';
            div.style.width = tmpWidth + 'px';
            div.style.height = document.body.clientHeight + 'px'
        },
        addStyle: function() {
            Util.addStyle('#guideMain{width:765px;height:490px;margin:0 auto;position:absolute;left:50%;top:50%;z-index:9999;margin:-245px 0 0 -383px;background:url(' + a.domain + 'images/guide/guide_top.png) no-repeat 0 0;padding-top:12px}#idTitle{width:765px;height:64px;overflow:hidden;position:absolute;left:0;top:-64px}#idTitle ul{height:64px;width:100%;overflow:hidden;position:absolute;left:0;top:0}#idTitle li{width:765px;height:64px;float:left;display:inline;overflow:hidden;text-indent:-9999em;background:url(' + a.domain + 'images/guide/guide_title.png) no-repeat 50% 0}#idTitle li.title-1{background-position:50% 0}#idTitle li.title-2{background-position:50% -64px}#idTitle li.title-3{background-position:50% -128px}#idTitle li.title-4{background-position:50% -192px}#idTransformView{width:765px;height:490px;overflow:hidden;position:relative}#idSlider{width:765px;height:490px;position:absolute;left:0;top:0;overflow:hidden}#idSlider li{float:left;display:inline;width:765px;height:490px;position:relative}#idSlider img{display:block}#anIndex{height:12px;line-height:normal;font-size:0;background:url(' + a.domain + 'images/guide/guide_btm.png) no-repeat 0 0}#idNum{position:relative;left:50%;top:-20px;float:left;height:12px}#idNum li{position:relative;left:-50%;width:12px;height:12px;cursor:pointer;margin-left:3px;font-size:0;float:left;display:inline;background:url(' + a.domain + 'images/guide/guide.png) no-repeat -138px -21px}#idNum li.on{background-position:-118px -21px}#idPrev,#idNext{position:absolute;top:50%;width:32px;height:64px;text-indent:-9999em;overflow:hidden;margin-top:-32px;background:url(' + a.domain + 'images/guide/guide.png) no-repeat 0 -52px}#idPrev{background-position:-6px -52px;left:-32px}#idNext{background-position:-39px -52px;right:-32px}#idPrev:hover{background-position:-85px -52px}#idNext:hover{background-position:-118px -52px}#idClose{width:45px;height:45px;overflow:hidden;text-indent:-9999em;position:absolute;right:10px;top:4px;z-index:9;background:url(' + a.domain + 'images/guide/guide.png) no-repeat -52px 0}#idClose:hover{background-position:0 0}#idEnterPage{width:110px;height:110px;text-indent:-9999em;position:absolute;left:216px;top:228px}')
        },
        alink: function(name) {
            return $(name).bind("focus",
            function() {
                if (this.blur) {
                    this.blur()
                }
            })
        },
        Delete: function(tar) {
            document.body.removeChild(tar)
        }
    };
    a.init()
})();