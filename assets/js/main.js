// minh mo 1 socket connect voi gia tri la socket roi`

var socket = io.sails.connect();
socket.on('incoming', (data) => {
  console.log("got event with data", data);
});

socket.on('user/created', (data) => {
  console.log("got event user created with data", data);
});

// concept cua jquery la write less do more
// may cai javascript muon doc duoc 1 cai DOM thi no fai load sau cung kieu vay ne
// nhung voi Jquery
// 1. minh co de de o dau cung dc nho` callback function cua no
// 2. javascript thuan` muon get 1 dom thi rat kho khan, no chia ra ID, Name, TAG ...
var callback_fn = function(){
  var path = window.location.pathname;
  path = path.replace(/\/$/, "");
  path = decodeURIComponent(path);

  $(".nav li a").each(function () {
    var href = $(this).attr('href');
    if(path.substring((path.lastIndexOf('/')+1),path.lenght) === href) {
      $(this).closest('li').addClass('active');
    } else {
      $(this).closest('li').removeClass();
    }
  });

  $('#login').submit(function(e) {
    e.preventDefault();
    console.log('submit called');
    socket.get('/account'); // chỗ này phải là /login mới đúng chứ nhễ ?// account moi co model de lam chu pa
  })
}

// tuc la khi nay jQuery co 1 ham` de~ doc DOM ready

$(callback_fn); // syntax nay` la` viet gon cua cai document ready do



