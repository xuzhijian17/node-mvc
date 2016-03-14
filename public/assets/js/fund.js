var uid = 1;
var fundId = 81;
/**
* Login success callback function.
*/
function loginResult(result){
    if (result == 1) {
        /*var firstRefresh = true;
        if (firstRefresh == true && history.previous != history.current) {
            firstRefresh = false;
            window.location.reload();
            //window.location.href = window.location.href;
        }*/
        window.location.reload();
    }else{
        //noLogin = true;   //ios have problem
    }
}

if(!uid){
	window.location.href='haotougu://json?{"type":"1","target":"1"}'; 
}

$(document).ready(function(e) {
    $(".goGrab").click(function(){

		$.ajax({
            type: 'POST',
            url: '/Fund/drawFund',
            data: {"uid":uid,"fundId":fundId,"type":1},
            dataType: 'json',
            beforeSend: function(XMLHttpRequest){
                //$(".addmore").slideDown();
            },
            complete: function(XMLHttpRequest, textStatus){
                //$(".popUp_Yz,.popUp_Yd").hide();
            },
            success: function(rs){
            	if (rs.error == 0) {
            		$(".qjbCnt0"+rs.rs.statusNum).show().siblings(".qjbCnt").hide()
            		$(".getHb .qjbContent").text(rs.rs.bonus+'元红包');
					popUp(".popUp_Qjb",525);
            	}
            	
                console.log(rs); 
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){
                console.log(errorThrown);
            }
        });
	});

    $(".popUp").click(function(){
		$(this).hide()
	});
	//展示区禁止关闭
	$(".popUpCnt").click(function(evt){
		return false;
	});
});


//弹出窗函数
function popUp(tag,cntH,txText){
	var scrollTop=$(document).scrollTop()
	var pageH = $(document).height();
	var mobH=$(window).height();
	var mobW=$(window).width();
	var tagW = $(tag).children(".popUpCnt").width();
	//console.log(tagW)
	var tagH = cntH;//$(tag).children(".popUpCnt").height()
	var popLeft = (mobW-tagW)/2;
	if(mobH<tagH){
		var popTop=scrollTop;
	}else{
		var popTop =(mobH-tagH)/2+scrollTop;
	}
	$(tag).height(pageH);
	$(tag).children(".popUpCnt").html(txText).css({"top":popTop,"left":popLeft})
	$(tag).show();
	$(tag).children(".popUpCnt").addClass("animated zoomIn")
	//alert("屏幕高度是"+mobH+"标签高度是"+tagW+"滚动条高度"+scrollTop)
	//alert(popTop);
}