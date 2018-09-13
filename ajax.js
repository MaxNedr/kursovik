function sendRequest(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send();

  xhr.onreadystatechange = function() {
    if(xhr.readyState === XMLHttpRequest.DONE) {
      var response = JSON.parse(xhr.responseText);
      callback(response);
    }
  }
}

function sendRequestWithJQuery(url, callback) {
  $.ajax({
    url: url,
    success: function(data) {
      callback(data);
    }
  })
}

(function($) {
  $(function() {
    var $body = $('#content');
    sendRequest('http://localhost:3000/users', function(users) {
      users.forEach(function(user) {
        $body.append($('<li/>').text(user.name));
      })
    });
  });
})(jQuery);