$(document).ready(function() {
  // Chatterbox Initialization
  window.init = function init() {
    $('#chats .username').on('click', app.handleUsernameClick);
    $('#send .submit').on('click', app.handleSubmit);
    $('#send .clear-btn').on('click', app.clearMessages);
    $('.dropdown-menu').on('click', app.renderRoom);
  };
  init();
});
