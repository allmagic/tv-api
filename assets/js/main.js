// minh mo 1 socket connect voi gia tri la socket roi`


var socket;

var callback_fn = function () {

  socket = io.sails.connect();
  // test auth
  socket.get('/socket');


  socket.on('incoming', (data) => {
    console.log("got event with data", data);
  });

  socket.on('user/created', (data) => {
    console.log("got event user created with data", data);
  });

  socket.on('home/loaded', (data) => {
    console.log("got event home/loaded with data", data);
  });

  socket.on('user/logged', (data) => {
    console.log("got event user login with data", data);
  });
  socket.on('user/authenticated', (data) => {
    console.log("got event user/authenticated", data);
  });

  // gio lam gi nua , tam ngung duoc ko , tui tre gio ve roi pa , gang ngoi coi ong lam de hieu :D
  // gio security done de tui check env

  // hieu gi ko ? hieu cai zu join room cua ong roi :)) vl tui cung~ eo hieu :D, no chi cho join bang ws nen fai goi ws
  // thang l` viet cai fw sida
  // ong lam tui boi roi vl :D
  // noi chung gio secure roi :D

// gio muon lam gi ta
// troll vai quen me // noi sao ta // ...gui

// goi thoi co API roi blast all la xong rui vi co authen roi


  var path = window.location.pathname;
  path = path.replace(/\/$/, "");
  path = decodeURIComponent(path);


  // Script to add active class on menu
  $(".nav li a").each(function () {
    var href = $(this).attr('href');
    if (path.substring((path.lastIndexOf('/') + 1), path.lenght) === href) {
      $(this).closest('li').addClass('active');
    } else {
      $(this).closest('li').removeClass();
    }
  });


  $('#login').submit(function (e) {
    e.preventDefault();
    var data = $('#login').serialize();
    socket.get('/account/login?' + data);
  })
}

$(callback_fn);



