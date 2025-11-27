function numRoll(n){$.fn.countTo=function(options){options=options||{};return $(this).each(function(){var settings=$.extend({},$.fn.countTo.defaults,{from:$(this).data('from'),to:$(this).data('to'),speed:$(this).data('speed'),refreshInterval:$(this).data('refresh-interval'),decimals:$(this).data('decimals')},options);var loops=Math.ceil(settings.speed/settings.refreshInterval),increment=(settings.to-settings.from)/loops;var self=this,$self=$(this),loopCount=0,value=settings.from,data=$self.data('countTo')||{};$self.data('countTo',data);if(data.interval){clearInterval(data.interval)}data.interval=setInterval(updateTimer,settings.refreshInterval);render(value);function updateTimer(){value+=increment;loopCount++;render(value);if(typeof(settings.onUpdate)=='function'){settings.onUpdate.call(self,value)}if(loopCount>=loops){$self.removeData('countTo');clearInterval(data.interval);value=settings.to;if(typeof(settings.onComplete)=='function'){settings.onComplete.call(self,value)}}}function render(value){var formattedValue=settings.formatter.call(self,value,settings);$self.html(formattedValue)}})};$.fn.countTo.defaults={from:0,to:0,speed:3000,refreshInterval:100,decimals:0,formatter:formatter,onUpdate:null,onComplete:null};function formatter(value,settings){var defVal = value.toFixed(settings.decimals);if(defVal < 10 && zeroHas){defVal = defVal.toString().padStart(2,'0')};if(commaHas){defVal = defVal.replace(/\B(?=(?:\d{3})+(?!\d))/g, ',')};return defVal}$(".number").eq(n).find(".timer").each(count);function count(options){var $this=$(this);options=$.extend({},options||{},$this.data('countToOptions')||{});$this.countTo(options)}}
var numFlag=[], numArr=[], loopArr=[], delayArr=[],notimeArr=[],commaHas=false,zeroHas=false;
if($('.number').length>0){
    $(".number").each(function(t){
        // commaHas = true; // 开启，千分位加逗号
        // zeroHas = true; // 开启，个位数前面加0
        speed = $(this).attr("speed") || 3000;
        delay = Number($(this).attr("delay")) || 0;if(delay < 0){delay=0};
        $(this).find(".timer").each(function(){
            if($(this).html().indexOf(".")!=-1){var deNum = $(this).html().split(".");$(this).attr("data-decimals",deNum[1].length)}
            $(this).attr({'data-speed': speed,'data-to': $(this).text()})
        });
        if(typeof($(this).attr("loop"))=="undefined"){loopIs = 0}else{loopIs = 1}loopArr.push(loopIs);delayArr.push(delay);
        if(typeof($(this).attr("notime"))=="undefined"){notime = 0}else{notime = 1}notimeArr.push(notime);
    });
    for(var n=0;n<notimeArr.length;n++){
        if(notimeArr[n]){
            $(".number").eq(n).find(".timer").each(function(){
                var numText = Number($(this).text()), numTime = Number($(this).attr("data-speed"));
                if(numText<10){$(this).attr({'data-speed': Math.round(numTime/3)})}
                if(numText>=10 && numText < 50){$(this).attr({'data-speed': Math.round(numTime/2.8)})}
                if(numText>=50 && numText < 100){$(this).attr({'data-speed': Math.round(numTime/2.7)})}
                if(numText>=100 && numText < 200){$(this).attr({'data-speed': Math.round(numTime/2.6)})}
                if(numText>=200 && numText < 500){$(this).attr({'data-speed': Math.round(numTime/2.4)})}
                if(numText>=500 && numText < 800){$(this).attr({'data-speed': Math.round(numTime/2.2)})}
                if(numText>=800 && numText < 1200){$(this).attr({'data-speed': Math.round(numTime/2)})}
                if(numText>=1200 && numText < 1600){$(this).attr({'data-speed': Math.round(numTime/1.8)})}
                if(numText>=1600 && numText < 2000){$(this).attr({'data-speed': Math.round(numTime/1.6)})}
                if(numText>=2000 && numText < 2500){$(this).attr({'data-speed': Math.round(numTime/1.4)})}
                if(numText>=2500 && numText < 3000){$(this).attr({'data-speed': Math.round(numTime/1.2)})}
                if(numText>=3000){$(this).attr({'data-speed': numTime})}
            });
        }
    }
    setTimeout(function(){$('.number').each(function(){numArr.push($(this).offset().top - window.innerHeight);numFlag.push(1);toRun()})},666)
}
function toRun(){
    var scrollRun = $(window).scrollTop();
    for (var i = 0; i < numArr.length; i++) {
        if($('.number').eq(i).hasClass("stop")){state=0;numFlag[i]=1}else{state=1}
        if (scrollRun >= numArr[i] && numFlag[i] && state){numFlag[i] = 0;toRunNum(i)}
        if(Number(loopArr[i])){if (scrollRun < numArr[i]){numFlag[i] = 1}}
    }
}
function toRunNum(n){setTimeout(function(){numRoll(n)},delayArr[n])}
$(window).scroll(function () {toRun()});