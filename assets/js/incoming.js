var hideModal;

$(function () {


  taovang.gcmKey = 'AIzaSyBCrUuU1aw4fV7KScJAFZTmRlaNVLshNz4';

  /*

   curl --header "Authorization: key=AIzaSyBCrUuU1aw4fV7KScJAFZTmRlaNVLshNz4" \
   --header Content-Type:"application/json" \
   https://gcm-http.googleapis.com/gcm/send \
   -d "{\"registration_ids\":[\"157343421511\"]}"

  * */

  // get permission to run notifications
  Notification.requestPermission().then(function(result) {
    console.log(result)
  });

  function resetModal() {
    $('#incoming-modal .user-avatar').attr('src', '/images/default-avatar.png'); // 2
    var noInfo = 'Chưa có dữ liệu';
    //gio simple tui reset ve chua co du lieu nhe

    // tat ca nhung tag co userdata deu dc reset ve chua co du lieu
    $('#incoming-modal [userdata]').each(function (index, element) {
      $(element).text(noInfo);
    })
  }

  socket.on('incoming', function (data) {

    resetModal();
    taovang.incoming_data = {};
    var hideAfter = 500; //secs
    clearTimeout(hideModal);
    hideModal = setTimeout(function () {
      $('#incoming-modal').modal('hide');
    }, hideAfter * 1000);
    console.log("got event with data", data);

    taovang.incoming_data = data;
    // check user existed in db - show db info
    if (typeof data.users != 'undefined') {
      var users = data.users;
      console.log('users', users);
      //loop all user key and set text
      for (userKey in users) {
        if(users[userKey])
          $('#incoming-modal [userdata=' + userKey + ']').text(users[userKey]);
      }
      if(users.avatar)
        $('#incoming-modal .user-avatar').attr('src', users.avatar); // 1

      delete taovang.incoming_data['users'];
      var actionParams = taovang.incoming_data;
      actionParams.action = call_query_action;
      // '?action='+call_query_action+ '&callid='+taovang.incoming_data;
      taovang.go_profile_url = '/profile/' + users.phone + '?' + $.param(actionParams) ;
      $('#incoming-modal .go_profile_btn').attr('href', taovang.go_profile_url); // 1

    } else {
      // show data by params
      $('#incoming-modal .phone-number').text(data.sdtkh)
    }
    var modalOpt = {};

    //update user_phone var no need
    // user_phone = $('[userdata=phone]').text();

    $('#incoming-modal').modal(modalOpt);
    $("#audio4")[0].play();

    // Let's check if the browser supports notifications
    var options = {
      body: users.phone,
      icon: users.avatar,
      sound: '/styles/img/notification.mp3'
    };
    var n = new Notification("Cuộc gọi đến! ( "+users.name+" )",options);
    n.onclick = function() {
      $("#audio4")[0].pause();
      if(taovang.go_profile_url)
        window.open(taovang.go_profile_url)
    };
    setTimeout(n.close.bind(n), 8000);
    });

    $('.close-modal').click(function() {
      $("#incoming-modal").modal("hide");
    });
    $("#incoming-modal").on("hide.bs.modal",function(){
      $("#audio4")[0].pause();
      $("#audio4")[0].currentTime = 0;
    });

  $('.save-call-history').click(function(event){
    console.log('save call click');
    var parent = $(this).parents('#incoming-modal');

    // console.log(parent);
    $(this).toggleClass('disabled');
    parent.find('form.call-history').toggle();
    parent.find('form.call-history textarea').focus();
  })
});
