const API_URL = 'https://api.parse.com/1/classes/messages';
let app = {};
let currentResults;
let currentUser = window.location.search.slice(10);

app.send = function(message, successCB) {
  message = JSON.stringify(message);
  $.ajax({
    type: 'POST',
    url: API_URL,
    data: message,
    dataType: JSON
  });
};

app.fetch = function() {
  currentUser = window.location.search.slice(10);
  $.ajax({
    type: 'GET',
    url: API_URL,
    success: app.processResults
  });
};

app.clearMessages = function() {
  let messages = $('#chats');
  messages.empty();
};

app.renderMessage = function(message) {
  let newMessage = $(`<div class='message panel panel-default'>
      <div class='panel-heading'>
        <div class='username'><a href='#' class='username'>${message.username}</a></div>
      </div>
      <div class='panel-body'>
        <span class='text'>${message.text}</span>
      </div>
    </div>`);
  $('#chats').append(newMessage);
  window.init();
};

app.renderRoom = function(roomName) {
  let newRoom = $('<div></div>');
  $('#roomSelect').append(newRoom);
};

app.handleUsernameClick = function(event) {
  console.log(event);
};

app.handleSubmit = function(event) {
  console.log($('.text-field').val());

};

app.processResults = function(data) {
  currentResults = data;
  app.clearMessages();
  for (let i = 0; i < data.results.length; i++) {
    app.renderMessage(data.results[i]);
  }
};
