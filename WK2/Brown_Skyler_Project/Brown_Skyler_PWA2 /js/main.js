/*  
	JS for project management site
	Author: Skyler Brown
*/

(function($){




	$(".masterTooltip").hover(function(){
		//Hover code

		var title = $(this).attr("title");
		$(this).data("tipText", title).removeAttr('title');
		$(this).addClass('<p class="tooltip"></p>')
	.text(title)
			.appendTo('body')
			.fadeIn("slow");

	}, function(){
		//Hover Out
		$(this).attr("title", $("this").data("tipText"));
		$(".tooltip").remove();


	}) .mousemove(function(e){

		var mousex = e.pageX + 20; //Grabs x coordinates
		var mousey = e.pageY + 10; //grabs y coordinates
		$('.tooltip')
			.css({ top: mousey, left: mousex})
	});




	$("#tabs p").hide().eq(0).show();
	$("#tabs p:not(:first)").hide();


	$("#nav li").click(function(e){
		e.preventDefault();
		$("#tabs p").hide();

		$("#nav .current").removeClass("current");
		$(this).addClass("current");
		var clicked = $(this).find("a:first").attr("href");


		$("#tabs " + clicked).fadeIn('fast');
	}).eq(0).addClass("current");







$(".modalClick").on('click',function(event){
	event.preventDefault();
	$("#overlay")
		.fadeIn()
		.find("#modal")
		.fadeIn();
});

$(".close").on("click",function(event){
	event.preventDefault();
	$("#overlay")
		.fadeOut()
		.find("#modal")
		.fadeOut();







	
})(jQuery);});
 // end private scope









