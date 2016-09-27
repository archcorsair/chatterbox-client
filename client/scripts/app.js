
$(document).ready(function() {
  const API_URL = 'https://api.parse.com/1/classes/messages';
  let app = {};

  app.init = function() {
    $('.username').on('click', app.handleUsernameClick);
    $('#send .submit').on('click', app.handleSubmit);
  };

  app.send = function(message, successCB) {
    message = JSON.stringify(message);
    $.ajax({
      type: 'POST',
      url: API_URL,
      data: message,
      success: successCB,
      dataType: JSON
    });
  };

  app.fetch = function(successCB, objectID) {
    $.ajax({
      type: 'GET',
      url: objectID,
      data: message,
      success: successCB,
      dataType: JSON
    });
  };

  app.clearMessages = function() {
    let messages = $('#chats');
    messages.empty();
  };

  app.renderMessage = function(message) {
    let newMessage = $(`<div class='message'>
        <div class='username'><a href='#' class='username'>${message.username}</a></div>
        <div class='text'>${message.text}</div>
        <div class='roomname'>${message.roomname}</div>
      </div>`);
    $('#chats').append(newMessage);
  };

  app.renderRoom = function(roomName) {
    let myRoomName = $('<div></div>');
    $('#roomSelect').append(myRoomName);
  };

  app.handleUsernameClick = function(event) {
    var username = 'blah';
    console.log(username, ' was added as a friend!');
  };

  app.handleSubmit = function(event) {
    console.log('trying to submit!');
  };

  app.init();
  console.log('Chatterbox Init');
});
