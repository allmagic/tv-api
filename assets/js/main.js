var socket;

$(function () {

  socket = io.sails.connect();
  // test auth
  socket.get('/socket');

  socket.on('user/authenticated', (data) => {
    console.log("got event user/authenticated", data);
  });

  socket.on('user/login-success', (data) => {
    window.location = '/home';
    console.log("got event user login with data", data);
  });
  //
  // socket.on('user/created', (data) => {
  //   console.log("got event user created with data", data);
  // });
  //
  // socket.on('home/loaded', (data) => {
  //   console.log("got event home/loaded with data", data);
  // });

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
});

