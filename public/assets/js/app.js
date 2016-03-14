// JavaScript Document

$(document).ready(function(e) {
	var currYear = (new Date()).getFullYear();
	$('#startDate,#endDate').mobiscroll().date({
		preset: 'date', //日期
		theme: 'ios',
		display: 'bottom',
		dateFormat: 'yy-mm-dd', // 日期格式
		dateOrder: 'yymmdd', //面板中日期排列格式
		startYear:currYear-10,
		endYear:currYear, //结束年份
		lang: 'zh',
		mode: 'scroller'
	});
    
});

//弹出窗函数
function popUp(tag,cntH,txText){
	var scrollTop=$(document).scrollTop()
	var pageH = $(document).height();
	var mobH=$(window).height();
	var mobW=$(window).width();
	var tagW = $(tag).children(".popUpCnt").width();
	console.log(tagW)
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
