$(function () {
  socket.on('incoming', (data) => {
    console.log("got event with data", data);

    // check user existed in db - show db info
    if (typeof data.users != 'undefined') {
      var users = data.users;
      //loop all user key and set text
      for (userKey in users) {
        $('#incoming-modal [userdata=' + userKey + ']').text(users[userKey]);
      }
    }else{
      // show data by params
      $('#incoming-modal .phone-number').text(data.sdtkh)
    }

    var modalOpt = {};
    $('#incoming-modal').modal(modalOpt);
  });
})

//git lên đi , để tối về còn lấy về
