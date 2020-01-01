$(document).ready(function(){
	
	addLoginForm();
	addRegisterForm();

});

function addLoginForm()
{
	$('body').append(
		"<form class='form-signin' id='logForm'>" + 
      	"<div class='text-center mb-4'>" + 
        "<img class='mb-4' src='picture.png' alt='' width='72' height='72'>" +
        
        "<h1 class='h3 mb-3 font-weight-normal'>Floating labels</h1>" + 
        "<p>Save all your notes in a safe place. </p>" + 
      	"</div>" + 

      	"<div class='form-label-group'>" + 
        "<input type='text' id='logUsername' class='form-control' required autofocus>" + 
        "<label for='logUsername'>Your username</label>" + 
      	"</div>" + 

      	"<div class='form-label-group'>" +
        "<input type='password' id='logPassword' class='form-control' required>" + 
        "<label for='logPassword'>Password</label>" + 
      	"</div>" + 

      	"<button class='btn btn-lg btn-primary btn-block' id='logInButton'>Log in</button>" +
      	"<span id='toggleLogin'>Don't you have an account yet?</span>" +  
      	"</form>"
		)
	
	$('#toggleLogin').hover(function(){
		$(this).css('cursor','pointer');
		$(this).css('color','blue');

	});
	$('#toggleLogin').on('click',toggleLogin);
	$('#logInButton').on('click', logUser);
}

function logUser(){
	// take values from fields
	var logUsername = $('#logUsername').val();
	var logPassword = $('#logPassword').val();

}

// function for updating range input
function updateRangeInput(val)
{
          document.getElementById('textInput').value=val; 
}

function addRegisterForm()
{	

	$('body').append(
		"<form class='form-signin' id='registerForm' style='display: none;'>" + 
      	"<div class='text-center mb-4'>" + 
        "<img class='mb-4' src='picture.png' alt='' width='72' height='72'>" +
        
        "<h1 class='h3 mb-3 font-weight-normal'>Floating labels</h1>" + 
        "<p>Save all your notes in a safe place. </p>" + 
      	"</div>" + 

      	// text
      	"<div class='form-label-group'>" + 
        "<input type='text' id='registerUsername' class='form-control'>" + 
        "<label for='registerUsername'>Username</label>" + 
      	"</div>" + 

      	// email
      	"<div class='form-label-group'>" + 
        "<input type='email' id='registerEmail' class='form-control'>" + 
        "<label for='registerEmail'>Email</label>" + 
      	"</div>" + 

      	// password
      	"<div class='form-label-group'>" +
        "<input type='password' id='registerPassword' class='form-control'>" + 
        "<label for='registerPassword'>Password</label>" + 
      	"</div>" +

      	// select
      	"<div class='form-group'>" +
      	"<label for='registerAge'>Age</label>" +
        "<select id='registerAge' class='form-control'>" + 
        "<option>< 18</option>" + 
      	"<option>18-24</option>" +
      	"<option>24-40</option>" +
      	"<option>41-60</option>" +
      	"<option>> 60</option>" + 
      	"</select>" + 
      	"</div>" +

		// radio 
      	"<div class='form-check form-check-inline'>" +
        "<input class='form-check-input' type='radio' id='registerMale'  name='gender' checked>" + 
        "<label class='form-check-label' for='registerMale'>Male</label>" + 
        "</div>" +

        "<div class='form-check form-check-inline'>" +
        "<input class='form-check-input' type='radio' id='registerFemale'  name='gender'>" + 
        "<label class='form-check-label' for='registerFemale'>Female</label>" + 
        "</div>" +

        "<div class='form-check form-check-inline'>" +
        "<input class='form-check-input' type='radio' id='registerOther'  name='gender'>" + 
        "<label class='form-check-label' for='registerOther'>Other</label>" + 
        "</div>" +
     
      	// range
      	"<div class='form-group'>" +
      	"<label for='registerRange'>Number of hours online per day</label>" + 
        "<input type='range' id='registerRange' class='form-control-range' min='0' max='24' step='1' value='0' onchange='updateRangeInput(this.value)'>" + 
      	"<input type='text' id='textInput' value='0'>" + 
      	"</div>" +

      	// check box
      	"<div class='form-group form-check'>" +
        "<input type='checkbox' id='registerCheckBox' class='form-check-input'>" + 
        "<label class='form-check-label' for='registerCheckBox'>Check me out</label>" + 
      	"</div>" +

      	// button
      	"<button class='btn btn-lg btn-primary btn-block' id='registerButton'>Register now!</button>" +
      	"<span id='toggleRegister'>Already have an account?</span>" +  
      	"</form>"
		)

	$('#toggleRegister').hover(function(){
		$(this).css('cursor','pointer');
		$(this).css('color','blue');

	});

	$('#toggleRegister').on('click',toggleRegister);
	$('#registerButton').on('click', addUser);

	// PREVENT DEFAULT on form submit
	$('#registerForm').submit(function(e){
		e.preventDefault();
	})
}

function addUser() {
	//take values from fields
	var registerUsername = $('#registerUsername').val();
	var registerPassword = $('#registerPassword').val();
	var registerEmail = $('#registerEmail').val();
	var registerRange = $('#registerRange').val();
	var boxChecked = $('#registerCheckBox').is(':checked');

	// check email & password
	var registerEmailChecked = validateEmail('registerEmail');
	var registerPasswordChecked = validateEmail('registerPassword');


	// sweetalert for empty fields
	if(registerUsername === '' || registerEmailChecked == false || registerPasswordChecked == false || registerRange ==='' || boxChecked == false) {
		Swal.fire({
			icon: 'error',
			text:'Fields empty or incorrect! Email should be name@domain.something and password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and a special character '
		});
		return;
	}

	//empty values from fields
	$('#registerUsername').val('');
	$('#registerPassword').val('');
	$('#registerEmail').val('');
	$('#registerRange').val('');
	$('#textInput').val('');
	$('#registerCheckBox').prop('checked', false);

	// POST request to create a new user
	$.ajax({
		type: 'POST',
		url: "/register",
		data: {
			username: registerUsername,
			password: registerPassword,
			email: registerEmail
		},
		success: function(data) {
			console.log(data);
			Swal.fire({
				icon: 'success',
				title: 'Nice!',
				text: 'User added!'
			});
		},
		error: function(request) {
			console.log(request);
		},
		async: false
	});
}

function toggleRegister() {
	$('#logForm').show();
	$('#registerForm').hide();
}

function toggleLogin() {
	$('#registerForm').show();
	$('#logForm').hide();
}

function validateEmail(name) {
	var email = $('#' + name).val();

 	if (/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email)) {
	    return true;
	}
	return false;
}

function validatePassword(name) {
	var password = $('#' + name).val();
	// check if password has min 8 characters, one uppercase letter, one lowercase letter,
	// one number and one special character
 	if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
	    return true;
	}
	return false;
}
