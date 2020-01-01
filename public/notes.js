var BreakException = {};
var clockInterval = null;
var isClockRunning = true;

var beawareof = [];

// a list of 'be aware of'

beawareof.push({"title":"Be careful", 
	"message":"Never write your full personal data in these notes"},
	{"title":"Please", 
	"message":"Be careful, this site may be hacked and your personal info could be compromised!"
	});


$(document).ready(function(){
	addForm();
	prepareDOM();	
	$('#colorPickerForm').submit(setColor);

	loadFavColor();

	setTimeout(remindFavColor,10000);

	startClock();

	while(beawareof.length) {
		var currentItem = beawareof.pop();
		$("main").append("<p><b>" + currentItem.title + "</b></p>");
		$("main").append("<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + currentItem.message + "</p>");
	}
});


function addForm()
{

	$('body').append(
		"<form>" +
		
		"<div class='form-group'>" +
		"<p><input id='titleField' class='form-control' type='text' name='title' placeholder='Note title'></p>" +
		"<small class='form-text text-muted'>We'll never share your notes with anyone else.</small>" +
		"</div>" +
		
		"<div class='form-group'>" +
		"<p><input id='contentField' class='form-control'type='text' name='content' placeholder='Note content'></p>" +
		"</div>" +
		
		"</form>" +
		
		"<p><button id='addNote' class='btn btn-info'>Add note</button></p>");

	$('#addNote').on('click', addNote);
}

function addNote()
{
	//take values from fields	
	var title = $('#titleField').val();
	var content = $('#contentField').val();

	// sweetalert for empty note
	if(title === '' || content === '') {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Fields empty!'
		});
		return;
	}

	// else, note added

	// empty values for title and content
	$('#titleField').val('');
	$('#contentField').val('');


	//POST request in order to create a new note
	$.ajax({
		type: 'POST',
		url:  'http://localhost:3000/notes',
		dataType: 'json',
		data: {"title": title, "content": content},
		success: function(data){
			console.log(data);
			
			getTitles();

			Swal.fire({
				icon: 'success',
				title: 'Nice!',
				text: 'Note added!'
			});
		},
		error: function(request) {
			console.log(request);
		},
		async:false
	});

}

function getTitles()
{
	$("#notes").empty();

	// GET request in order to get all the notes
	$.ajax({
		type: 'GET',
		url:  'http://localhost:3000/notes',

		success: function(data){
			data = data.reverse();
			data.forEach(function(element, idx){
				try {

					// object
					var noteId = data[idx]['_id'];
					$("#notes").append("<div id='" + noteId + "'></div>");

					var note = {title: data[idx]['title'], content: data[idx]['content']};
					$("#" + noteId).append('<div class="card text-white bg-warning mb-3" style="max-width: 18rem;">' +
						'<div class="card-header">Nota ' + idx + '</div>' +
						'<div class="card-body">' +
						'<h5 class="card-title">' + note.title + '</h5>' +
						'<p class="card-text">' + note.content + '</p>'+
						'</div>' +
						'</div>' +
						'<p><button class="deleteButton btn btn-info">Delete this</button></p>');
					
					$('.deleteButton').on('click', deleteNote);

				} catch (e) {
					throw e;
				}	
			});
		},
		error: function(request) {
			console.log(request);
		},
		async:false
	});
}

function prepareDOM() 
{
	$('body').append("<div id='notes'></div>");
	getTitles();
	$('body').append("<p><button id='deleteAllButton' class='btn btn-info'>Delete all your notes</button></p>");
	$('#deleteAllButton').on('click', deleteAll);
}

function deleteAll() {
	$.ajax({
		type: 'DELETE',
		url:  'http://localhost:3000/notes',
		dataType: 'json',
		success: function(data){
			getTitles();
		},
		error: function(request) {
			console.log(request);
		},
		async:false
	});

}

function deleteNote(e){
	var note = $(e.target).parent().parent();
	var noteId = $(note[0]).attr('id');

	$.ajax({
		type: 'DELETE',
		url:  'http://localhost:3000/notes/' + noteId,
		dataType: 'json',
		success: function(data){
			getTitles();
		},
		error: function(request) {
			console.log(request);
		},
		async:false
	});
}

// color picker
function setColor(e){

	e.preventDefault();
	var color = $('#favcolor').val();
	$('body').css('background-color',color);

	// save color in local localStorage
	localStorage.setItem('favcolor', color);
}


function loadFavColor() {
	var favcolor = localStorage.getItem('favcolor');
	$('body').css('background-color', favcolor);
}

function remindFavColor() {
	var color = localStorage.getItem('favcolor');
	if(color === '') {
		// alert('Don\'t forget to set your favourite color');
		Swal.fire('Don\'t forget to set your favourite color');
	}
}

function currentLocalTime() {
    var dte = new Date();
    var tme = dte.toLocaleTimeString();
    document.getElementById("timerdiv").innerHTML = tme;
}

function useClock()
{
	if(isClockRunning === true) {
		stopClock();
	} else {
		startClock();
	}
}

function stopClock() {
	clearInterval(clockInterval);
	isClockRunning = false;
}

function startClock() {
	clockInterval = window.setInterval(function(){
		currentLocalTime() }, 1000);	
	isClockRunning = true;
}