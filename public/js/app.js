var socket = io();
var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');

socket.on('connect', function() {
	console.log('Connected to socket.io server.');
});

socket.on('message', function(message) {
	var momentTimestamp= moment.utc(message.timestamp);
	var $message = jQuery('.messages');
/*	console.log('New message:');
	console.log(message.text);*/

	$message.append('<p><string>' + message.name + ' ' + momentTimestamp.local().format("h:mm a") + '</strong></p>')
	$message.append('<p>' + message.text + '</p>');
});

//Handles submittin of new message
var $form = jQuery('#message-form');

$form.on('submit', function(event) {
	event.preventDefault();

	var $message = $form.find('input[name=message]');
	socket.emit('message', {
		name: name,
		text: $message.val()
	});

	//erase the content
	$message.val('');
});