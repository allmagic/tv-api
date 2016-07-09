var hideModal;
$(function () {

  function resetModal() {
    var noInfo = 'Chưa có dữ liệu';
    //gio simple tui reset ve chua co du lieu nhe

    // tat ca nhung tag co userdata deu dc reset ve chua co du lieu
    $('#incoming-modal [userdata]').each(function (index, element) {
      $(element).text(noInfo);
    })

    // moi lan co gi fai vo day reset
    //overwrite reset
    // var users = {
    //   phone: "",
    //   name: "",
    //
    // };

    // for (userKey in users) {
    //   var text = (users[userKey] == "") ? noInfo : users[userKey]; // cái chỗ này là sao zậy , giải thích tui zới :D
    //   $('#incoming-modal [userdata=' + userKey + ']').text(text);
    // }
  }

  socket.on('incoming', function (data) {
    resetModal();

    var hideAfter = 200; //10secs
    clearTimeout(hideModal);
    hideModal = setTimeout(function () {
      $('#incoming-modal').modal('hide');
    }, hideAfter * 1000);
    console.log("got event with data", data);

    // check user existed in db - show db info
    if (typeof data.users != 'undefined') {
      var users = data.users;
      //loop all user key and set text
      for (userKey in users) {
        $('#incoming-modal [userdata=' + userKey + ']').text(users[userKey]);
        $('#incoming-modal #user-avatar').attr('src', users.avatar);

      }
    } else {
      // show data by params
      $('#incoming-modal .phone-number').text(data.sdtkh)
    }

    var modalOpt = {};
    $('#incoming-modal').modal(modalOpt);
  });
})

//git lên đi , để tối về còn lấy về
