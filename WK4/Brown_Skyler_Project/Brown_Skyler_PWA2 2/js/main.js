/*  
	JS for project management site
	Author: Skyler Brown
*/







(function($){




	/*Login functionality*/



	$('#signinButton').click(function() {

		var user = $('#user').val();
		var pass = $('#pass').val();

		console.log('password is working');


		$.ajax({
			url: 'xhr/login.php',
			type: 'post',
			dataType: 'json',
			data: {

				username: user,
				password: pass
			},
			success: function (response) {

				console.log('test user');
				if (response.error) {

					alert('Invalid information try again');


				} else {

					window.location.assign('dashboard.html')
				}
			}


		});

	});


/*Log out function*/



	$('#logOut').click(function(e){


		e.preventDefault;
		$.get('xhr/logout.php',function(){
			window.location.assign('index.html')
		})


	});




	/*Registration functionality*/



	$('#register').on('click',function(){

		var firstname = $('#firstname').val(),
			lastname = $('#lastname').val(),
			username = $('#username').val(),
			email = $('#email').val(),
			password= $('#password').val();




		$.ajax({

			url:'xhr/register.php',
			type: 'post',
			dataType: 'json',

			data:{
				firstname: firstname,
				lastname: lastname,
				username: username,
				email: email,
				password: password
			},

			success: function(response){
				if(response.error){
					alert(response.error)
				}else{
					window.location.assign('dashboard.html');
				}


			}



		});





	});






/*Tabs functionality*/

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




/*Modal functionality*/


$(".modalClick").on('click',function(event){
	event.preventDefault();
	$("#overlay")
		.fadeIn()
		.find("#modal")
		.fadeIn();
});


	/*Modal fade out*/

$(".close").on("click",function(event) {
	event.preventDefault();
	$("#overlay")
		.fadeOut()
		.find("#modal")
		.fadeOut();

});


	/*Modal images animation code*/

$(".mystatus").mouseover(function(){

	$(this).fadeTo(100, .3);

});


	$(".mystatus").mouseout(function(){

		$(this).fadeTo(100,1);

	});



	/*Tool tips code *currently will not preform task more than once**/


	$(".masterTooltip").hover(function(){
		//Hover code

		var title = $(this).attr("title");
		$(this).data("tipText", title).removeAttr('title');
		$('<p class="tooltip"></p>')
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





	/*Display user name in project page*/



	$.getJSON("xhr/check_login.php", function(data){

		console.log(data);

		$.each(data, function(key, val){

			console.log(val.first_name);

			$(".userid").html("Welcome User: " + val.first_name);
		});

	});




	/*projects button*/



	$('.projectsbtn').on('click',function(e){
		e.preventDefault();
		window.location.assign('projects.html');

	});



     /*users button*/



	$('.usersbtn').on('click',function(e){
		e.preventDefault();
		window.location.assign('');

	});



	/*tasks button*/



	$('.tasksbtn').on('click',function(e){
		e.preventDefault();
		window.location.assign('');

	});


	/*Dashboard button*/
	$('.dashBtn').on('click',function(e){
	  e.preventDefault();
	  window.location.assign('dashboard.html');
	});



	/*Custom jQuery feature for assignment*/

	$( "#newUser" ).submit(function( event ) {
		if( !confirm('Welcome new user! Thanks for signing up') )
		event.preventDefault();
	});





	/*add project*/


	$('#addButton').on('click' , function(){

		var projName = $('#projectName').val(),
			projDesc = $('#projectDescription').val(),
			projDue = $('#projectDueDate').val(),
			status = $('input[name="status"]:checked').prop('id');



		$.ajax({
			url:'xhr/new_project.php',
			type: 'post',
			dataType: 'json',
			data:{
				projectName: projName,
				projectDescription: projDesc,
				dueDate: projDue,
				status: status
			},
			success: function(response){
				console.log('test for success');

				if(response.error){
					alert(response.error);

				}else{
					window.location.assign('projects.html')
				}

			}
		});

	});


/*display current projects on projects page */



	var projects = function(){


		$.ajax({
			url: 'xhr/get_projects.php' ,
			type: 'get',
			dataType: 'json',


			success: function(response){

				if(response.error){
					console.log(response.error);


				}else{
					for(var i= 0, j=response.projects.length; i < j; i++){

						var result= response.projects[i];

						$('.projects').append(

							'<div id="sortable" class="ui-state-default">' +
							"<input class='projectid' type='hidden' value='" + result.id + "'>"+

								"Project Name: " + result.projectName + "<br>" +

								"Project Description: " + result.projectDescription + "<br>" +

								"Project Status: " + result.status + "<br>" +

								'<button class = "deletebtn">Delete</button>' +

								'<button  class="editbtn">Edit</button>' + '</div> <br>'




						);

					}

					$('.deletebtn').on('click', function(e){

						console.log('test delete');



					  var resultId = $(this).parent().find('.projectid').val();

						$.ajax({

							url: 'xhr/delete_project.php',
							data: {

								projectID: resultId
							},


							type: 'POST',
							dataType: 'json',
							success: function (response) {


								console.log('test for success');


								if (response.error) {


									alert(response.error);


								} else {

									window.location.assign("projects.html")
								}
							}

						});
					});

				}


			}
		})

	};

	projects();

/*Date picker code*/

	$( ".datepicker" ).datepicker();


/*sortable code with placeholder for "added plugin" */

	$(function() {
		$( "#sortable" ).sortable({
			placeholder: "ui-state-highlight"
		});
		$( "#sortable" ).disableSelection();
	});



	/*Extra ui plugin*/

	$( "button" ).button();








})(jQuery);
 // end private scope









