var BreakException = {};

// create div with id images
$(document).ready(function(){
	addForm();
	prepareDOM();	
});



function addForm()
{
	$('body').append(
		"<form>" +
			"<p><input id='titleField' type='text' name='title' placeholder='Note title'></p>" +
			"<p><input id='contentField' type='text' name='content' placeholder='Note content'></p>" +
		"</form>" +
		"<p><button id='addNote'>Add note</button></p>"
		)
	$('#addNote').on('click', addNote);
}

function addNote()
{
	var title = $('#titleField').val();
	var content = $('#contentField').val();

	if(title === '' || content === '') {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Fields empty!'
		});
		return;
	}

	$('#titleField').val('');
	$('#contentField').val('');

	$.ajax({
		type: 'POST',
		url:  'http://localhost:3000/notes',
		dataType: 'json',
		data: {"title": title, "content": content},
		success: function(data){
			getTitles();
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

	$.ajax({
		type: 'GET',
		url:  'http://localhost:3000/notes',

		success: function(data){
			data.forEach(function(element, idx){
				try {
					var noteId = data[idx]['_id'];
					$("#notes").append("<div id='" + noteId + "'></div>");

					var note = {title: data[idx]['title'], content: data[idx]['content']};
					
					$("#" + noteId).append("<strong><p>" + note.title + "</strong></p>");
					$("#" + noteId).append("<p>" + note.content + "</p>");
					$("#" + noteId).append("<p><button class='deleteButton'>Delete this</button></p>")
					
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
	$('body').append("<p><button id='deleteAllButton'>Delete all your notes</button></p>");
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

