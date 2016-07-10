var hideModal;
$(function () {

  function resetModal() {
    $('#incoming-modal .user-avatar').attr('src', 'http://placehold.it/380x500'); // 2
    var noInfo = 'Chưa có dữ liệu';
    //gio simple tui reset ve chua co du lieu nhe

    // tat ca nhung tag co userdata deu dc reset ve chua co du lieu
    $('#incoming-modal [userdata]').each(function (index, element) {
      $(element).text(noInfo);
    })

  }

  socket.on('incoming', function (data) {
    resetModal();

    var hideAfter = 500; //secs
    clearTimeout(hideModal);
    hideModal = setTimeout(function () {
      $('#incoming-modal').modal('hide');
    }, hideAfter * 1000);
    console.log("got event with data", data);

    // check user existed in db - show db info
    if (typeof data.users != 'undefined') {
      var users = data.users;
      console.log('users', users);
      //loop all user key and set text
      for (userKey in users) {
        $('#incoming-modal [userdata=' + userKey + ']').text(users[userKey]);
      }
      $('#incoming-modal .user-avatar').attr('src', users.avatar); // 1
      $('#incoming-modal .go_profile_btn').attr('href', '/profile/' + users.phone); // 1
      
      //phone se bo~
      // vl troll vai me lag nhin cuc lam

    } else {
      // show data by params
      $('#incoming-modal .phone-number').text(data.sdtkh)
    }
    var modalOpt = {};
    $('#incoming-modal').modal(modalOpt);
  });

  $('.save-call-history').click(function(event){
    console.log('save call click');
    var parent = $(this).parents('#incoming-modal');
    //Show note div, tu lam tiep dc k? dc e :D , khuc nay de ma thay ong tim kiem met vl -_-
    //lag wa de do cai nay tui xu cho
    // xu di tui nhin` , uh de ti moi xu duoc :D , ong nhin tui xu ko duoc T_T
    // console.log(parent);
    $(this).toggleClass('disabled');
    parent.find('form.call-history').toggle();
    parent.find('form.call-history textarea').focus();
  })
})

