    $(function(){
        yincang();
        search();
        enterkey();
        //下拉赋值给文本框
        $('.xiala').click(function(){
            var value=$(this).html();
            $(this).parent().next().val(value);
        })

        //协议
        $('.agreement').click(function(){
            if($(this).hasClass('active')){
                value=1;
            }else{
                value=0;
            }
            var classname=$(this).data('field');
            $('.'+classname).val(value);
        })

        //省市区联动
        //省
        $(document).on('click','#province .item',function(){
            var pid=$(this).data('pid');
            Ajax('/ajax/region',{pid},function(data){
                $('#cityname').html('请选择');
                $('#city').html('');
                $('#areaname').html('请选择');
                $('#area').html('');
                $('#city').html(data.data)
            })
        })

        //市
        $(document).on('click','#city .item',function(){
            var pid=$(this).data('pid');
            Ajax('/ajax/region',{pid},function(data){
                $('#areaname').html('请选择');
                $('#area').html('');
                $('#area').html(data.data)
            })
        })

        //区
        $(document).on('click','#area .item',function(){
            var address=$('#provinname').html()+'-'+$('#cityname').html()+'-'+$('#areaname').html();
            $('.tsaddress').val()
        })
    })

   

    //Ajax组装
    var Ajax=function(url,param,fun){
        $.ajax({
            type: "POST",
            url: url,
            data:param,
            dataType: "json",
            success: function(data) { 
               fun(data);
            } 
        });
    }

  

    // Ajax参数拼接  object 参数对象组合
    var paramLink=function(object){
        var param='';
        $.each(arr,function(index,value){
            param+=index+'='+value+'|';
        })
        param=removeStringLast(param);  //移除最后一个字符‘|’
        return param;
    }


    //表单提交
    var fieldArr = {};
    var formSubmit = function (url,prefix,input ='') {
        inputArr = input.split('|');
        for(var i in inputArr){
            fieldArr[inputArr[i]] = $.trim($('.' +prefix+ inputArr[i]).val())
        }
        $.ajax({
            type: "POST",
            url: url,
            dataType: "json",
            data: fieldArr,
            success: function (data) {
                if (data.code) {
                    layer.msg(data.data, { icon: 6, time: 1200 });
                    setTimeout(function () { window.location.reload(); }, 1200);
                }
                if (data.code == 0) {layer.msg(data.data, { icon: 5, time: 1200 });}
            }
        });
    }

    //点击enter搜索
    function enterkey(){
        $(document).on('keydown',function(e){if(e.keyCode==13){
            var keyword=$('#enterKey').val();
            var url=$('#enterKey').attr('href');
            if(keyword){
                window.location.href=url+'?keyword='+keyword;
            }
        }});

    }



    //点击图标搜索
    function search(){
        $('#sousuo').click(function(){
            var keyword=$('#enterKey').val();
            var url=$('#sousuo').attr('href');
            window.location.href=url+'?keyword='+keyword;
        })
    }


    

    //获取密码
    var getPassword=function(fieldname,desc){
        var value=$.trim($('input[name="'+fieldname+'"]').val());
        if(!value){
            layer.msg(desc+'不能为空！');
            $.exit();
        }
        var regPassword= /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$/;//密码正则
        if (!regPassword.test(value)) {
            layer.msg('密码格式不正确！');
            $.exit();
        }
        return value;
    }

    //通过Ajax获取当前内容  url 获取单个内容接口{pb:siteindex}/ajax/content  id  单个内容ID
    var getContent=function(url,id){
        $.ajax({
            type: "POST",
            url: url,
            data: {'id':id},
            dataType: "json",
            success: function (data) {
                if(data.code==1){
                    $('#ajax').html('');
                    $('#ajax').html(data);
                }
            }
        }); 
    }


    //给所有a标签加_blank
    var addBlank=function(){
        $('a').each(function(i){
            var value=$(this).attr('href');
            if(value!='javascript:;' && value !="javascript:void(0);"){
                if(!$(this).hasClass('noblank')){
                     $(this).attr('target','_blank');
                }
            }
        })
    }



    //通过系统语言版本跳转对应版本
    var goLang=function(language,url){
        var type=navigator.appName;
        if (type=="Netscape"){  
            var lang = navigator.language  
        }  
        else{  
            var lang = navigator.userLanguage  
        } 
        if(lang==language){
            window.location.href=url;
        }
    }

    //通过接口跳转语言版本
    var apiLang=function(language,url){
        $.ajax({
            type: "get",
            url: "https://ipinfo.io/json",
            dataType: "json",
            success: function(data) { 
                var country=data.country;
                if(country==language){
                    window.location.href=url;
                }

            } 

        });
    }


    //api接口跳转版本
    var apiLang2=function(language,url){
        $.ajax({
            type: "get",
            url: "http://geoplugin.net/json.gp",
            dataType: "json",
            success: function(data) { 
              //  console.log(data.geoplugin_countryCode);
                var country=data.geoplugin_countryCode;
                if(country==language){
                    window.location.href=url;
                }

            } 

        });
    }

    
    

    //获取表单单文本值
    var input=function(fieldname,desc,required=1){
        var value=$.trim($('input[name="'+fieldname+'"]').val());
        if(required && !value){
            layer.msg(desc+'不能为空！');
            $.exit();
        }
        // var reg=/^[\u4e00-\u9fa5_a-zA-Z]+$/;
        // if(!reg.test(value)){
        //     layer.msg(desc+'格式不正确');
        //     $.exit();
        // }
        return value;
    }


    //获取表单文本域值
    var textarea=function(fieldname,desc,required=1){
        var value=$.trim($('textarea[name="'+fieldname+'"]').val());
        if(required && !value){
            layer.msg(desc+'不能为空！');
            $.exit();
        }
        // var reg=/^[\u4e00-\u9fa5_a-zA-Z]+$/;
        // if(!reg.test(value)){
        //     layer.msg(desc+'格式不正确');
        //     $.exit();
        // }
        return value;
    }

    //获取邮箱
    var getEmail=function(fieldname,desc,required=1){
        var value=$.trim($('input[name="'+fieldname+'"]').val());
        if(required && !value){
            layer.msg(desc+'不能为空！');
            $.exit();
        }
        var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        if(!reg.test(value)){
            layer.msg('邮箱格式不正确');
            $.exit();
        }
        return value;
    }

    //获取手机
    var getPhone=function(fieldname,desc,required=1){
        var value=$.trim($('input[name="'+fieldname+'"]').val());
        if(required && !value){
            layer.msg(desc+'不能为空！');
            $.exit();
        }
        var phoneReg = /(^1[3|4|5|7|8|9]\d{9}$)|(^09\d{8}$)/;
        if (!phoneReg.test(value)) {
            layer.msg('请输入有效的号码！');
            $.exit();
        }
        return value;
    }




    

    //获取下拉的值
    var getIdValue=function(fieldname,defaultValue){
        var idValue=$('#'+fieldname).html();
        if(idValue==defaultValue){
            idValue='';
        }
        return idValue;
    }

    

    //_this 点击对象  num  默认数量   liObj li对象
    var page=0;
    var jiazai=function(liObj,start,num,_this){
        var total=liObj.length;
        page=page+1;
        var count=start+page*num;
        
        for(i=0;i<count;i++){
            liObj.eq(i).show();
        }
        if(count>=total){
            _this.hide();
        }
    }
    
    var xianshi=function(liObj,start){
        for(i=0;i<start;i++){
            liObj.eq(i).show();
        }
    }


    var page=function(){
        $('.paging a').click(function(){
            $(this).attr('href',$(this).attr('href')+'#content');
        })
    }


    //发送短信   URL 短信接口路径 {pb:siteindex}/member/sms  phone  手机号码
    function sms(phone){
        var random=Math.floor(100000 + Math.random() * 900000);
        $.cookie('random',random);
        $.ajax({type: 'POST',url:'/member/sms',dataType: 'json',data: {phone,random},
            success: function (response, status) {
                if(response.code==1){
                    layer.msg('发送成功'); 
                }else{layer.msg(response.data, {icon: 5});}
            }
        }) 
    }


    //发送邮箱验证码
    function sendEmail(email){
        $.ajax({type: 'POST',url:'/member/sendEmail',dataType: 'json',data: {email},
            success: function (response, status) {
                if(response.code==1){
                    layer.msg('发送成功'); 
                }else{layer.msg(response.data, {icon: 5});}
            }
        }) 
    }

     //短信封装  _this 点击对象  phoneObj  手机对象  smsUrl 短信接口路径
    var codeFlagFoot = true;
    var getCode=function(_this,phoneObj){
        _this = $(_this)
        if(codeFlagFoot){
            codeFlagFoot = false;
            var phone = phoneObj.val();
            var count = 60;
            var InterValObj1;
            
            var phoneReg = /(^1[3|4|5|7|8|9]\d{9}$)|(^09\d{8}$)/;
            if (!phoneReg.test(phone)) {
                layer.msg('请输入有效的手机号码！');
                codeFlagFoot = true;
                return false;
            }
            sms(phone);
            _this.text( + count + "秒再获取");
            _this.addClass('disabled');
            InterValObj1 = window.setInterval(SetRemainTime, 1000);
            function SetRemainTime() {
                if (count == 1) {
                    window.clearInterval(InterValObj1);//停止计时器
                    _this.removeClass("disabled");
                    _this.text("重新发送");
                    codeFlagFoot = true;
                }
                else {
                    count--;
                    _this.text( + count + "秒再获取");
                }
            }
        }
    }


    


    

    
    //  $(document).on('keydown',function(e){
    //     if(e.keyCode==13){
    //         $('.form_5').click();
    //     }
    // });

    //js文档下载   url文件路径 name 文件名
    var down=function(url,name){
        if(!url){
            return false;
        }
        name=name.replaceAll('.','');
        var a = document.createElement("a");
        a.download = name;
        a.href = url;
        $("body").append(a); // 修复firefox中无法触发click
        a.click();
        $(a).remove();
    }

    //php下载文件
    var downphp=function(url,name){
        window.location.href="/download?filename="+url+'&filetitle='+name;
    }


    //url参数连接去掉第一个&
    var removeStringFirst=function(str){
        var newstr=str.substr(1,str.length);
        return newstr;
    }

    //url参数去掉最后一个
    var removeStringLast=function(str){
        var newStr=str.substr(0,str.length-1);
        return newStr;
    }


    //隐藏div
    var yincang=function(){
        var num=$(".hideDiv .hideLi").length
        if(num==0){
            $(".hideDiv").hide();
        }
    }
    // Div外层对象
    var yincang2=function(divId){
        var num=$("#"+divId+" .hideLi").length
        if(num==0){
            $("#"+divId).hide();
        }
    }




    //商城网站规格筛选数据
    //获取新价格数组
    var newPrice=function(priceArr){
        var price = priceArr;
        var newPrice=[];
        for(var i in price){
            if(price[i]['price']){
                newPrice.push(price[i]);
            }
        }
        return newPrice;
    }

    //规格点击   rowDiv 横排对象  colDiv 竖排对象 priceArr 价格数组  className变色类名
    var initShaixuan=function(rowDiv,colDiv,priceArr,className){
        $('.'+rowDiv).each(function(e){
            $(this).find(colDiv).addClass(className);
        });
        
        for(var i in priceArr){
            var newSub=priceArr[i]['sub'];
            $('.'+rowDiv).each(function(e){
                $(this).find(colDiv).eq(newSub.substr(e*2,1)).removeClass(className);
            });

        }
    }


    //获取价格最大值最小值
    var  getPriceMaxMin=function(priceArr){
        var priceOnly=[];
        var minMax=[];

        //获取值数组
        for(var i in priceArr){
            priceOnly[i]=priceArr[i].price;
        }
        
        minMax[0]=Math.min.apply(null, priceOnly);
        minMax[1]=Math.max.apply(null, priceOnly);
        
        return minMax;
    }

    //获取最终价格
    var getPrice=function(rowDiv,colDiv,priceArr,priceDiv){
        var sub = '';
        $('.'+rowDiv+' '+colDiv+'.active').each(function (i) {
            if (i + 1 < $('.'+rowDiv+' '+colDiv+'.active').length) {
                sub += $(this).index() + '-';
            } else {
                sub += $(this).index();
            }
        })
        for (let i = 0; i < priceArr.length; i++) {
            if (priceArr[i].sub == sub) {
                var text=priceArr[i].price==''? '':priceArr[i].price
                $('.'+priceDiv).text(text);
                return false;
            }
        }
    }


    //商品规格筛选   newPrice 价格数组   keyArr 下标筛选条件
    var shopShaixuan=function(newPrice,keyArr){
        var newPrice2=[];
        for(var ii in newPrice){
            var sub =newPrice[ii]['sub'];
            var tiaojian=1;
            for(var iii in keyArr){
                if(keyArr[iii]>-1){
                    if(sub.substr(iii*2,1)!=keyArr[iii]){
                        tiaojian=0;       
                    }
                }
                
            }
            
            if(tiaojian==1){
                newPrice2.push(newPrice[ii]);
            }
        }
        return newPrice2;
    }

    //规格点击   rowDiv 横排对象  colDiv 竖排对象 priceArr 价格数组  className变色类名
    var guigeClick=function(rowDiv,colDiv,priceArr,className){
        //获取下标参数
        var keyArr=[];
        $('.'+rowDiv).each(function(e){
            var index=$(this).find(colDiv+'.active').index();
            keyArr[e]=index;
            
        })


        //将所有的点变成都可以点击
        $('.'+rowDiv).each(function(e){
            $(this).find(colDiv).removeClass(className);
        });

        //通过每个规格按钮的删选条件，筛选价格，看是否存在，存在可以点击，不存在不能点击
        $('.'+rowDiv).each(function(i){
            var _this=$(this);
            _this.find(colDiv).each(function(ii){
                var tiaojian=$.extend(true,[],keyArr);
                for(var iii in keyArr){
                    if(i==iii){
                        tiaojian[i]=ii;
                    }
                }
              //  console.log(tiaojian);//给每个按钮生成筛选条件
                var shaixuanPrice=shopShaixuan(priceArr,tiaojian);
                var length=shaixuanPrice.length;
              //  console.log(length);
                if(length==0){
                    $(this).addClass(className);
                }

            })
            
        })
    }


    

