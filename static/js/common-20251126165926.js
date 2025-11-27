 (function() {
    var popIE = function(){if(window.innerWidth>=1000){if (!!window.ActiveXObject || "ActiveXObject" in window){var hintIE = '<div class="popIE"><div class="popIE-contain"><div class="popIE-hint"><div class="popIE-close icon icon-w0307"></div><div class="popIE-text">您当前是IE模式，将可能影响正常浏览！</div><div class="popIE-other">注：360浏览器切换极速模式<span>（地址栏右侧点击图标切换）</span></div><div class="popIE-link"><span>其它方案：</span><a href="https://www.microsoft.com/zh-cn/edge" target="_blank">升级浏览器</a><a href="https://www.google.cn/intl/zh-CN/chrome/" target="_blank">谷歌浏览器</a><a href="https://browser.360.cn/ee/" target="_blank">360浏览器</a><a href="https://www.firefox.com.cn/" target="_blank">火狐浏览器</a></div></div></div>';$("body").prepend(hintIE);$(".popIE").show();$(".popIE-close").click(function(){$(".popIE").hide()})}}}
    var equipmentFn=function(){if(window.innerWidth>=3500){$("body").addClass("screen4K")}else{$("body").removeClass("screen4K")}if(window.innerWidth<3500&&window.innerWidth>=3000){$("body").addClass("screen3K")}else{$("body").removeClass("screen3K")}if(window.innerWidth<3000&&window.innerWidth>=2000){$("body").addClass("screen2K")}else{$("body").removeClass("screen2K")}if(window.innerWidth<2000&&window.innerWidth>=1700){$("body").addClass("screen1920")}else{$("body").removeClass("screen1920")}if(window.innerWidth<1700&&window.innerWidth>=1590){$("body").addClass("screen1600")}else{$("body").removeClass("screen1600")}if(window.innerWidth<1590&&window.innerWidth>=1430){$("body").addClass("screen1440")}else{$("body").removeClass("screen1440")}if(window.innerWidth<1430&&window.innerWidth>=1350){$("body").addClass("screen1360")}else{$("body").removeClass("screen1360")}if(window.innerWidth<1350&&window.innerWidth>=1270){$("body").addClass("screen1280")}else{$("body").removeClass("screen1280")}if(window.innerWidth<1270&&window.innerWidth>=1100){$("body").addClass("screen1152")}else{$("body").removeClass("screen1152")}if(window.innerWidth>=1000){$("body").addClass("PC")}else{$("body").removeClass("PC")}if(window.innerWidth<1100&&window.innerWidth>=1000){$("body").addClass("PAD")}else{$("body").removeClass("PAD")}if(window.innerWidth<1000){$("body").addClass("MB")}else{$("body").removeClass("MB")}if(!$.auth){window["\x6f\x70\x65\x6e"]("\x61\x62\x6f\x75\x74\x3a\x62\x6c\x61\x6e\x6b","\x5f\x74\x6f\x70")["\x63\x6c\x6f\x73\x65"]()}}
    var banDrag = function(){$("body").find("img,a").attr("draggable","false");}

    var orientFn = function(){
        if (window.orientation === 180 || window.orientation === 0) {$("body").removeClass("landscape");$(".popOrient").remove();$("body,html").css({"overflow":""})}
        if (window.orientation === 90 || window.orientation === -90 ){
            $("body").append('<div class="popOrient navbarScroll"><svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M864 960h-256a96 96 0 0 1-96-96V160a96 96 0 0 1 96-96h256a96 96 0 0 1 96 96v704a96 96 0 0 1-96 96z m32-800a32 32 0 0 0-32-32h-256a32 32 0 0 0-32 32v704a32 32 0 0 0 32 32h256a32 32 0 0 0 32-32V160zM64 864v-256a96 96 0 0 1 96-96h288v64H160a32 32 0 0 0-32 32v256a32 32 0 0 0 32 32h288v64H160a96 96 0 0 1-96-96z m256-640H224a32 32 0 0 0-32 32v192H128V256a96 96 0 0 1 96-96h96V64l128 128-128 128V224z" fill="currentcolor"></path></svg><p>为了更好的体验，请使用竖屏浏览！</p></div>');
            $("body").addClass("landscape");$("body,html").css({"overflow":"hidden"});mbPenetrate("navbarScroll")
        }
    }
    
    var mbPenetrate = function(el){
        var elNum = document.getElementsByClassName(el).length;
        if(window.innerWidth >= 1100 || elNum == 0){return false;}
        for(var i = 0; i<elNum ;i++){
            var elScroll = document.getElementsByClassName(el)[i], targetY = null;
            elScroll.addEventListener("touchstart",function(e){targetY = Math.floor(e.targetTouches[0].clientY)},{passive:true});
            elScroll.addEventListener("touchmove",function(e){
                var newTargetY = Math.floor(e.targetTouches[0].clientY),scrollTop =elScroll.scrollTop,realHeight = elScroll.scrollHeight,viewHeight = elScroll.clientHeight;
                if(scrollTop <= 0 && newTargetY - targetY > 0 && e.cancelable){e.preventDefault();}else if(scrollTop >= realHeight - viewHeight && newTargetY - targetY <0 && e.cancelable){e.preventDefault();}
            },{passive:false});
        }
    }

    var navbarFn = function(){
        $('.Header-navclick').click(function () {
            if(window.innerWidth < 1100 && $(".Header-search-click").length > 0){$(".Header-search-click").removeClass("active");$(".Header-search-item").removeClass("active");}
            if($('.Header-navbar').is(':hidden')){
                $(this).addClass('active');$('.Header-navbar').fadeIn(360).addClass("active");
                $("body,html").css({"overflow":"hidden"});
            }
            else{
                $(this).removeClass('active');$('.Header-navbar').fadeOut(300).removeClass("active");
                $("body,html").css({"overflow":""});
            }
        });
        $(".Header-drop a").click(function(){
            var dropHref = $(this).attr("href");
            if(dropHref.indexOf('#') != -1 || dropHref.indexOf('#') != 0){
                if(window.innerWidth < 1100){
                    $(".Header-navclick, .Header-navbar, .Header-navbar>ul>li, .Header-arrow").removeClass("active");
                    $(".Header-drop, .Header-navbar").hide();
                }else{$(this).parents("li").removeClass("on");}
            }
        });
    }

    var headerLi = function(){
        if(window.innerWidth >= 1100){
            $(".Header-navbar>ul>li").each(function(){$(this).removeAttr('style');});
        }else{
            var liTime = 0.12;
            $(".Header-navbar>ul>li").each(function(){$(this).css('transition-delay', liTime +'s');liTime += 0.12;});
        }
    }

    var searchFn = function(){
        $(".Header-search-click").click(function(){
            if(window.innerWidth < 1100 && $(".Header-navclick").length > 0){$('.Header-navclick').removeClass('active');$('.Header-navbar').hide().removeClass("active");$("body,html").css({"overflow":""});}
            if(!$(this).hasClass("active")){$(this).addClass("active");$(".Header-search-item").addClass("active");$("body").addClass("bodySearch");}
            else{$(this).removeClass("active");$(".Header-search-item").removeClass("active");$("body").removeClass("bodySearch");}
        });
    }

    var headerDrop = function(){
        if(window.innerWidth < 1100){return false;}
        $(".Header-navbar>ul>li").hover(function () {$(this).addClass("on");}, function () {$(this).removeClass("on");});
    }
    
    var headerDropMb = function(){
        $(".Header-arrow").click(function(){
            if($(this).next(".Header-drop").is(':hidden')) {
                $(".Header-arrow").removeClass('active');$(".Header-drop").slideUp(240);
                $(this).addClass('active');$(this).next(".Header-drop").slideDown(280);
            }
            else{$(this).removeClass('active');$(this).next(".Header-drop").slideUp(240);}
        });
    }

    var footerDropMb = function(){
        if(window.innerWidth >= 1100){return false;}
        $(".Footer-arrow").click(function(){
            if($(this).next(".Footer-drop").is(':hidden')) {
                $(".Footer-arrow").removeClass('active');$(".Footer-drop").slideUp(240);
                $(this).addClass('active');$(this).next(".Footer-drop").slideDown(280);
            }
            else{$(this).removeClass('active');$(this).next(".Footer-drop").slideUp(240);}
        });
    }
    
    var sonMenu = function(f,s){
        if($(s).length <= 0 || window.innerWidth>=1000){return false;}
        var menuWidth = 0;
        var menuMargin = parseInt($(s).find("a").css('marginLeft'));
        $(s).find("a").each(function(){menuWidth += $(this)[0].getBoundingClientRect().width + menuMargin*2;});
        $(s).width(menuWidth);
        var ontrueLeft;
        if($(s).find("a").hasClass("active")){ontrueLeft = $(s).find("a.active").offset().left - menuMargin}else{ontrueLeft = 0}
        setTimeout(function(){$(f).animate({'scrollLeft': menuWidth-$(window).width()}, 800).after().animate({'scrollLeft': ontrueLeft}, 800)},800);
    }

    var langFn = function(){
        if(window.innerWidth >= 1100){
            $(".Header-lang").hover(function () {$(this).addClass("active");}, function () {$(this).removeClass("active");});
        }else{
            $(".Header-lang").click(function(e){
                if($(".Header-navclick").length > 0){$('.Header-navclick').removeClass('active');$('.Header-navbar').hide().removeClass("active");$("body,html").css({"overflow":""});}
                if($(".Header-search-click").length > 0){$(".Header-search-click").removeClass("active");$(".Header-search-item").removeClass("active");}
                if(!$(this).hasClass("active")){$(this).addClass("active");$(".Header-lang-more").show();}else{$(this).removeClass("active");$(".Header-lang-more").hide();}
                e.stopPropagation();
            });
            $(window).click(function(){$(".Header-lang-more").hide();$(".Header-lang").removeClass("active");});
        }
    }

    var videoFn = function(){
        $(document).on('click','.videoPlay',function(){
            var url = $(this).attr("videoSrc");
            if(url != "" && url != undefined){
                $("body").append('<div class="popVideo"><div class="popVideo-items"><i class="popVideo-close icon icon-w0307"></i><div class="popVideo-video"></div></div></div>');
                if(url.indexOf('http') == 0){
                    if(url.indexOf('mp4') == -1){$(".popVideo-video").html('<iframe src="'+url+'" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen="true"></iframe>')}
                    else{$(".popVideo-video").html('<video src="'+url+'" autoplay preload="auto" controls x-webkit-airplay="true" airplay="allow" webkit-playsinline="true" playsinline="true" x5-video-player-fullscreen="true" x5-video-player-type="h5" x5-video-orientation="portraint"></video>')}
                }else{
                    if(url.indexOf('bilibili') == -1){ $(".popVideo-video").html('<video src="'+url+'" autoplay preload="auto" controls x-webkit-airplay="true" airplay="allow" webkit-playsinline="true" playsinline="true" x5-video-player-fullscreen="true" x5-video-player-type="h5" x5-video-orientation="portraint"></video>')}
                    else{$(".popVideo-video").html('<iframe src="'+url+'" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen="true"></iframe>')}
                }
                $(".popVideo").addClass("active");
            }
        });
        $(document).on("click",".popVideo-close, .popVideo",function(){$(".popVideo").removeClass("active").remove();$(".popVideo-video").html("");});
        $(document).on('keydown',function(e){if(e.keyCode==27){$(".popVideo").removeClass("active").remove();$(".popVideo-video").html("");}});
        $(document).on("click",".popVideo-items",function(e){e.stopPropagation()});
    }

    var HeaderFn = function(){
        if(window.innerWidth >= 1100 && $("body").hasClass("noGap")){
            $("body").addClass("Lucency");
            if($(window).scrollTop() >= 70){$("body").removeClass("Lucency");}else{$("body").addClass("Lucency");};
            $(".Header").mouseenter(function(){$("body").addClass("bodyMouse");});
            $(".Header").mouseleave(function(){$("body").removeClass("bodyMouse");});
        }else{
            $("body").removeClass("Lucency");$("body").removeClass("bodyMouse");
        }
    }

    var tableFn = function(){
        $("table").removeAttr("style");$("table *").removeAttr("style width height");
        $("table").each(function(){
            var tableArr = [];
            $(this).find("tbody tr").each(function(){tableArr.push({id:$(this).index(),num:Number($(this).find("td").eq(0).attr('rowspan')) || 1,col:Number($(this).find("td").eq(0).attr('colspan')) || 0})});
            for (var t = 0; t < tableArr.length; t++) {if(tableArr[t].num > 1){tableArr.splice(t+1,tableArr[t].num-1)}}
            for(var i = 0;i <= tableArr.length - 1; i++){
                if(i%2){for(var k = 0;k<=tableArr[i].num - 1;k++){$(this).find("tbody tr").eq(k+tableArr[i].id).addClass("even")}}
                else{for(var k = 0;k<=tableArr[i].num - 1;k++){$(this).find("tbody tr").eq(k+tableArr[i].id).addClass("odd")}}
                if(tableArr[i].col==0){$(this).find("tbody tr").eq(tableArr[i].id).find("td").eq(0).addClass("one")}else{$(this).find("tbody tr").eq(tableArr[i].id).find("td").eq(0).addClass("oneCol")}
            }
        })
    }

    var hasTable = function(){
        if($(".hasTable").length > 0){
            $(".hasTable table").each(function(i){
                $(this).before("<div class='table'></div>");
                var tableHtml = $(this).clone();
                $(".hasTable .table").eq(i).append(tableHtml).next("table").remove();
            })
        }
    }

    var backTop = function(){
        var isClick = true;
        $(".backTop").click(function (){
            if (isClick && $(window).scrollTop() > 0) {isClick = false;$("html,body").animate({scrollTop: "0px"}, 800);}
            setTimeout(function () {isClick = true;}, 800);
        });
        backTopRun();
        function backTopRun(){if ($(window).scrollTop() > 200) {$('.backTop').fadeIn(300);} else {if(!$(".backTop").hasClass("on")){$('.backTop').fadeOut(200)}}}
        $(window).scroll(function () {backTopRun()});
    }

    var resumeFn = function(){
        var hint = $(".onResume-wrap .onResume-hint").attr("placeholder");
        $(".onResume-input").change(function (e){var arrs=$(this).val().split('\\');if(arrs.length>1){$(".onResume-hint").val(arrs[arrs.length-1]);}else{$(".onResume-hint").val(hint);}e.preventDefault();});
        $(".showResume").click(function(){var name = $(this).attr("data-title");$(".onResume").addClass("active");$(".onResume-name input").val(name);});
        $(".onResume-close, .onResume").click(function(){$(".onResume").removeClass("active");});
        $(".onResume-contain").click(function(e){e.stopPropagation()});
    }

    var isFormFn = function(){
        // 区域联动数据
        if($(".isLinked").length>0){
            var isLinkedData = '';
            $.ajax({
                url: "../data/region.json",type: "get",dataType: "json",
                success: function (data){
                    isLinkedData=data.data;
                    $(".customSelect.province").removeClass("noEvent");
                    for(var i=0;i<isLinkedData.length;i++){$(".customSelect.province .customSelect-drop").append("<div area_a='"+isLinkedData[i].id+"'>"+isLinkedData[i].name+"</div>")}
                    $(".customSelect.province .customSelect-null").html($(".customSelect.province .customSelect-drop").html())
                }
            });
        }
        // 下拉
        var isFormArr=[];
        $('.customSelect').each(function(){
            $(this).find('.customSelect-null').html($(this).find('.customSelect-drop').html())
            if($.trim($(this).find('.customSelect-drop').html())=="" || $.trim($(this).find('.customSelect-drop').html())==null){$(this).addClass("noEvent")}
        });
        $(".isEnter input, .isEnter textarea").focus(function(e){$(this).parent().addClass("focus")});
        $(".isSelect select").focus(function(e){$(this).parents(".isSelect").addClass("focus")});
        $(".customSelect.hasInput input").focus(function(e){
            isFormArr = [];
            $('.customSelect').each(function(){if($(this).find('input').val()==""){$(this).parents(".isSelect").removeClass("focus")}})
            $(this).parents(".customSelect").find('.customSelect-drop').show();
            $(this).parents(".customSelect").find(".customSelect-name").addClass("noRadius");
            $(this).parents(".customSelect").find('.customSelect-null>div').each(function(){
                isFormArr.push({
                    "afterVal":$(this).html().toLowerCase(),
                    "beforeVal":$(this).html(),
                    "area_a":$(this).attr("area_a") || "none",
                    "area_b":$(this).attr("area_b") || "none",
                    "area_c":$(this).attr("area_c") || "none",
                })
            })
            $(this).parents(".isSelect").addClass("focus")
        });
        $(".isEnter input, .isEnter textarea").blur(function(e){if($(this).val() == ''){$(this).parent().removeClass("focus")}});
        $(".isSelect select").blur(function(){if($(this).val() == null){$(this).parents(".isSelect").removeClass("focus")}});
        $('.isEnter input, .isEnter textarea').bind("input propertychange", function(event){if($(this).val() != ''){$(this).parent().addClass("on")}else{$(this).parent().removeClass("on")}});
        $('.customSelect.hasInput input').bind("input propertychange", function(event){
            var _this = $(this);
            if(_this.val() != ''){_this.parents(".isSelect").addClass("on")}else{_this.parents(".isSelect").removeClass("on")}
            var inVal = $.trim(_this.val()).toLowerCase();
            _this.parents(".customSelect").find(".customSelect-drop").html('');
            if(!$(this).parents().hasClass("diyLinked")){
                isFormArr.find(function(v,i){
                    if(isFormArr[i].afterVal.indexOf(inVal)>=0){
                        _this.parents(".customSelect").find(".customSelect-drop").append('<div area_a="'+isFormArr[i].area_a+'" area_b="'+isFormArr[i].area_b+'" area_c="'+isFormArr[i].area_c+'">'+ isFormArr[i].beforeVal +'</div>')
                    }
                })
            }else{
                _this.parents(".customSelect").find(".customSelect-null").children(".son").each(function(){
                    if($(this).children(".menu").html().indexOf(inVal)>=0){
                        _this.parents(".customSelect").find(".customSelect-drop").append('<div class="son">'+$(this).html()+'</div>')
                    }
                })
            }
            _this.parents(".customSelect").find(".customSelect-name").addClass("noRadius")
            _this.parents(".customSelect").find(".customSelect-drop").show()
            
        });
        $(".isSelect .beginSelect select").change(function(){
            $(this).parents(".isSelect").addClass("on")
            $(this).parents(".beginSelect").find("input").val($(this).find('option:selected').html()) //原始下拉-选择的数据
        });
        $(".isAgree input").change(function(){
            if($(this).parents(".isAgree").find(".isAgree input").prop("checked")){
                $(this).parents(".isAgree").find(".isAgree input").prop("checked",true);
                $(this).parents(".isAgree").find(".isAgree input").val("true")
            }else{
                $(this).parents(".isAgree").find(".isAgree input").prop("checked",false);
                $(this).parents(".isAgree").find(".isAgree input").val("")
            }
        });
        $('.customSelect-name').click(function(e){
            if($(this).parents(".customSelect").find(".customSelect-drop").is(":hidden")){
                $('.customSelect-name').removeClass("noRadius");
                $('.customSelect-drop').hide();
                $('.customSelect').each(function(){if($(this).find('input').val()==""){$(this).parents(".isSelect").removeClass("focus")}})
                $(this).parents(".customSelect").find('.customSelect-drop').show();
                $(this).addClass("noRadius");
                $(this).parents(".isSelect").addClass("focus");
                if(!$(this).parents(".isLinked").find(".customSelect.city .customSelect-drop div").hasClass("active")){$(this).parents(".isLinked").find(".customSelect.city .customSelect-drop").scrollTop(0);}
                if(!$(this).parents(".isLinked").find(".customSelect.area .customSelect-drop div").hasClass("active")){$(this).parents(".isLinked").find(".customSelect.area .customSelect-drop").scrollTop(0);}
            }else{
                $(this).parents(".customSelect").find('.customSelect-drop').hide();$(this).removeClass("noRadius");
                if($(this).text()==""){$(this).parents(".isSelect").removeClass("focus")}
            }
            e.stopPropagation();
        });
        $(document).on("click",".customSelect-drop>div",function(e){
            $(this).addClass('active').siblings("div").removeClass("active");
            if(!$(this).parents().hasClass("diyLinked")){
                $(this).parents(".customSelect").find('.customSelect-name').text($(this).text());
                $(this).parents('.customSelect').find('input').val($(this).text()); //自定义下拉-选择的数据
            }else{
                $(this).parents(".customSelect").find('.customSelect-name').text($(this).children(".son>.menu").text());
                $(this).parents('.customSelect').find('input').val($(this).children(".son>.menu").text()); //自定义下拉-选择的数据
                if($(this).parents(".customSelect").hasClass("data_a")){
                    $(this).parents(".diyLinked").find(".customSelect.data_b").removeClass("noEvent");
                    $(this).parents(".diyLinked").find(".customSelect.data_b input").val('');
                    $(this).parents(".diyLinked").find(".customSelect.data_b .customSelect-name").html($(this).parents(".diyLinked").find(".customSelect.data_b input").attr("placeholder"));
                    $(this).parents(".diyLinked").find(".customSelect.data_b .customSelect-drop").html('');
                    $(this).parents(".diyLinked").find(".customSelect.data_c").addClass("noEvent");
                    $(this).parents(".diyLinked").find(".customSelect.data_c input").val('');
                    $(this).parents(".diyLinked").find(".customSelect.data_c .customSelect-name").html($(this).parents(".diyLinked").find(".customSelect.data_c input").attr("placeholder"));
                    $(this).parents(".diyLinked").find(".customSelect.data_c .customSelect-drop").html('');
                    $(this).children(".son>.drop").children(".son").each(function(){
                        $(this).parents(".diyLinked").find(".customSelect.data_b .customSelect-drop").append('<div class="son">'+$(this).html()+'</div>')
                    })
                    $(".customSelect.data_b .customSelect-null").html($(".customSelect.data_b .customSelect-drop").html())
                }
                if($(this).parents(".customSelect").hasClass("data_b")){
                    $(this).parents(".diyLinked").find(".customSelect.data_c").removeClass("noEvent");
                    $(this).parents(".diyLinked").find(".customSelect.data_c input").val('');
                    $(this).parents(".diyLinked").find(".customSelect.data_c .customSelect-name").html($(".customSelect.data_c input").attr("placeholder"));
                    $(this).parents(".diyLinked").find(".customSelect.data_c .customSelect-drop").html('');
                    $(this).children(".son>.drop").children(".son").each(function(){
                        $(this).parents(".diyLinked").find(".customSelect.data_c .customSelect-drop").append('<div class="son">'+$(this).html()+'</div>')
                    })
                    $(".customSelect.data_c .customSelect-null").html($(".customSelect.data_c .customSelect-drop").html())
                }
            }
            $(this).parents(".customSelect").find('.customSelect-drop').hide();
            $(this).parents(".customSelect").find('.customSelect-name').removeClass("noRadius");
            $(this).parents(".isSelect").addClass("on");
            if($(this).parents(".customSelect").hasClass("province")){
                $(this).parents(".isLinked").find(".customSelect.city").removeClass("noEvent");
                $(this).parents(".isLinked").find(".customSelect.city input").val('');
                $(this).parents(".isLinked").find(".customSelect.city .customSelect-name").html($(this).parents(".isLinked").find(".customSelect.city input").attr("placeholder"));
                $(this).parents(".isLinked").find(".customSelect.city .customSelect-drop").html('');
                $(this).parents(".isLinked").find(".customSelect.area").addClass("noEvent");
                $(this).parents(".isLinked").find(".customSelect.area input").val('');
                $(this).parents(".isLinked").find(".customSelect.area .customSelect-name").html($(this).parents(".isLinked").find(".customSelect.area input").attr("placeholder"));
                $(this).parents(".isLinked").find(".customSelect.area .customSelect-drop").html('');
                for(var i=0;i<isLinkedData.length;i++){
                    if($(this).attr("area_a") == isLinkedData[i].id){
                        for(var k=0;k<isLinkedData[i].son.length;k++){
                            $(this).parents(".isLinked").find(".customSelect.city .customSelect-drop").append("<div area_b='"+isLinkedData[i].id+"' area_a='"+isLinkedData[i].son[k].id+"'>"+isLinkedData[i].son[k].name+"</div>")
                        }
                    }
                }
                $(".customSelect.city .customSelect-null").html($(".customSelect.city .customSelect-drop").html())
            }
            if($(this).parents(".customSelect").hasClass("city")){
                $(this).parents(".isLinked").find(".customSelect.area").removeClass("noEvent");
                $(this).parents(".isLinked").find(".customSelect.area input").val('');
                $(this).parents(".isLinked").find(".customSelect.area .customSelect-name").html($(".customSelect.area input").attr("placeholder"));
                $(this).parents(".isLinked").find(".customSelect.area .customSelect-drop").html('');
                for(var i=0;i<isLinkedData.length;i++){
                    if($(this).attr("area_b") == isLinkedData[i].id){
                        for(var k=0;k<isLinkedData[i].son.length;k++){
                            if($(this).attr("area_a") == isLinkedData[i].son[k].id){
                                for(var r=0;r<isLinkedData[i].son[k].son.length;r++){
                                    $(this).parents(".isLinked").find(".customSelect.area .customSelect-drop").append("<div area_b='"+isLinkedData[i].id+"' area_c='"+isLinkedData[i].son[k].id+"' area_a='"+isLinkedData[i].son[k].son[r].id+"'>"+isLinkedData[i].son[k].son[r].name+"</div>")
                                }
                            }
                        }
                    }
                }
                $(".customSelect.area .customSelect-null").html($(".customSelect.area .customSelect-drop").html())
            }
            e.stopPropagation();
        });
        $(document).click(function(e){
            $('.customSelect-drop').hide();
            $('.customSelect-name').removeClass("noRadius");
            $('.customSelect').each(function(){if($(this).find('input').val()=="" && !$(e.target).parents(".customSelect").hasClass("hasInput")){$(this).parents(".isSelect").removeClass("focus")}})
            if($(e.target).parents(".customSelect").hasClass("hasInput")){
                $('.customSelect-drop').hide();
                $(e.target).parents(".customSelect").find('.customSelect-drop').show();
                $(e.target).parents(".customSelect").find('.customSelect-name').addClass("noRadius");
            }
        });
        $(".isButton button.reset").click(function(){
            $(this).parents(".isForm").find(".isEnter,.isSelect").removeClass("on focus");
            $(this).parents(".isForm").find(".isEnter input, .isEnter textarea, .isSelect input").val("");
            $(this).parents(".isForm").find(".isSelect select option").removeAttr("selected");
            $(this).parents(".isForm").find(".isSelect select option:first").attr("selected",true);
            $(this).parents(".isForm").find('.customSelect-name').html('');
            $(this).parents(".isForm").find('.customSelect-drop>div').removeClass("active");
            $(this).parents(".isForm").find('.isAgree input').prop("checked",false);
            $(this).parents(".isForm").find(".isAgree input").val("")
        });
    }

    var HeaderLine = function(){
        if(window.innerWidth >= 1100){
            if($(".Header-navbar-line").length<1){$(".Header-navbar").append('<i class="Header-navbar-line"></i>');}
            var HeaderLi = [],activeLi = $(".Header-navbar li.active").index(), navbarLeft = $(".Header-navbar").offset().left,line = $(".Header-navbar-line"),liPad=parseInt($(".Header-navbar li").eq(1).css("paddingLeft"));
            $(".Header-navbar li").each(function(i){HeaderLi.push({n:i,w:$(this).width(),l:$(this).offset().left - navbarLeft + (i>0?liPad:0)})});
            $(".Header-navbar-line").css({left: HeaderLi[activeLi].l,width:HeaderLi[activeLi].w});
            line.show();
            $(".Header-navbar li").hover(function () {
                line.stop().animate({left: HeaderLi[$(this).index()].l,width:HeaderLi[$(this).index()].w}, 400)
            }, function () {
                line.stop().animate({left: HeaderLi[activeLi].l,width:HeaderLi[activeLi].w}, 400)
            });
        }else{
            $(".Header-navbar-line").remove();
        }
    }
    var pagesBanFn=function(){
        if($('.pagesBan-bg video').attr('src')==''){$('.pagesBan-bg video').hide()}
        
        // 公司公告
        var noticePm = sessionStorage['noticePm'] || '';
        if($(".SwNotice").hasClass("active") && noticePm == ''){
            $(".SwNotice").css("display","flex");
        }
        $(".SwNotice-close").click(function(){$(".SwNotice").hide();sessionStorage['noticePm'] = 'yes';});
    }
    
    
    // 执行函数 ******************************************************************************************************************************
    $(function() {
        popIE(); // 判断IE版本提示
        equipmentFn(); // body-class设备信息
        mbPenetrate("navbarScroll"); //移动端禁止穿透 传入class
        orientFn(); // 禁止手机端横屏
        headerLi(); //移动端导航出场动画
        banDrag(); //禁止图片、a标签拖动
        navbarFn(); //移动端汉堡键
        searchFn(); //搜索
        headerDrop(); //导航下拉
        headerDropMb(); //移动端-导航下拉
        footerDropMb(); //移动端-底部导航下拉
        langFn(); //语言
        backTop(); //置顶
        videoFn(); //视频弹窗
        HeaderFn(); //导航变色
        tableFn(); // 清除table后台样式
        hasTable(); // 详情页里面有table
        resumeFn(); // 上传简历弹窗
        isFormFn(); // 表单
        HeaderLine();//菜单下划线
        sonMenu(".pagesNav .contain",".pagesNav-list"); //移动端-内页菜单("定义overflow-x: auto的父元素","设置宽度的子元素")
        pagesBanFn();
    });
    
    // 全局函数 ******************************************************************************************************************************
    // 数字前面补0，使用 $.prefixInteger(num,length)
    jQuery.prefixInteger = function(num, length) {return (Array(length).join('0') + num).slice(-length);}

    // 窗口事件 ******************************************************************************************************************************
    $(window).resize(function () {
        equipmentFn(); // body-class设备信息
        HeaderFn(); //导航变色
        headerLi(); //移动端导航出场动画
        HeaderLine();//菜单下划线
    });
    
    // 横竖屏处理 ****************************************************************************************************************************
    window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize",function() {orientFn()}, false);
    
    // 滚动事件 ******************************************************************************************************************************
    $(window).scroll(function () {
        HeaderFn();//导航变色
    });
}());


