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
    success: app.processResults,
    error: function() { throw new Error('Error Fetching Data From Server'); }
  });
};

app.clearMessages = function() {
  let messages = $('#chats');
  messages.empty();
};

app.renderMessage = function(message, roomname = '#chats') {
  let newMessage = $(`<div class='message panel panel-default'>
      <div class='panel-heading'>
        <div class='username'><a href='#' class='username'>${message.username}</a></div>
      </div>
      <div class='panel-body'>
        <span class='text'>${message.text}</span>
      </div>
    </div>`);
  $(`.${roomname}`).append(newMessage);
  window.init();
};

app.renderRoom = function(event) {
  // debugger;
  app.clearMessages();
  let newRoom = $(`<div class='chatroom ${event.target.id}'></div>`);
  $('#chats').append(newRoom);
  for (let i = 0; i < currentResults.results.length; i++) {
    let currentRoom = currentResults.results[i].roomname;
    if (currentRoom === event.target.id) {
      console.log('stuff is happening here');
      app.renderMessage(currentResults.results[i], event.target.id);
    }
  }
  console.log('rendered room with name: ', event.target.id);
};

app.handleUsernameClick = function(event) {
  console.log(event);
};

app.handleSubmit = function(event) {
  console.log($('.text-field').val());

};

app.processResults = function(data) {
  // Update the current response
  currentResults = data;
  // Clear Previous Data
  app.clearMessages();

  console.log('Data Recieved:\n', data);
  // Populate Channel Dropdown
  let channelList = {};
  for (let i = 0; i < data.results.length; i++) {
    if (data.results[i].roomname) {
      if (!channelList.hasOwnProperty(data.results[i].roomname)) {
        channelList[data.results[i].roomname] = 1;
        let $dropDownItem = $('<li></li>');
        $dropDownItem.appendTo($('.dropdown-menu'));
        let $channelName = $('<a href="#"></a>');
        $channelName.appendTo($dropDownItem);
        // app.renderMessage(data.results[i]);
        $channelName.text(data.results[i].roomname);
        $channelName.attr('id', data.results[i].roomname);
        $($dropDownItem).append($channelName);
      } else {
        console.log('channel already created, skipping!');
      }

    }
  }
};

app.fetch();
