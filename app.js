
var socket = io();

socket.on('connect', function() {
	console.log("Connected to socket.io server!");
});

socket.on('message', function(message) {
	console.log("New Message!");
	console.log(message.text);
});

// Handles submitting a new message
var $form = jQuery('#message-form');

$form.on('submit', function(event) {
	event.preventDefault(); //prevent old-fashioned event handling
	socket.emit('message', {
		text: $form.find('input[name=message]').val(); //find any input tag which has 'message' in 'name' attribute
	});
});