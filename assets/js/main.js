var socket;
var path = window.location.pathname;

$(function () {


  $('#notes').editable({
    mode: 'popup', //'popup'
    type: 'textarea',
    url: '/user/0989333900',
    pk: '',//sao de xoa cai pk khoi param day ta T_T , pk de lam gi zay, no la cai qq gi za
    // no dung de goi qua backend update ma gio minh co api san roi, nen eo xai PK param dc
    params: function(params) {
      params.notes = params['value'];

      delete params['pk'];
      delete params['name'];
      delete params['value'];

      return params;
    },
    title: 'Vui long dien ghi chu',
    ajaxOptions: {
      type: 'put'
    }
  });

//sua thanh inline o cho mô de coi docs



  socket = io.sails.connect();
  // test auth
  socket.get('/socket');

  socket.on('user/authenticated', function (data) {
    console.log("got event user/authenticated", data);
  });

  socket.on('user/login-success', function(data) {
    window.location = '/home';
    console.log("got event user login with data", data);
  });

  // Get socket to join defined rooms after reconnect done
  socket.on('reconnect', function() {
    socket.get('/socket');
  });
  //
  // socket.on('user/created', (data) => {
  //   console.log("got event user created with data", data);
  // });
  //
  // socket.on('home/loaded', (data) => {
  //   console.log("got event home/loaded with data", data);
  // });


  path = path.replace(/\/$/, "");
  path = decodeURIComponent(path);

  // Script to add active class on menu
  $(".nav li a").each(function () {
    var href = $(this).attr('href').trim();
    var currentURI = path.substring((path.lastIndexOf('/') + 1), path.length);
    currentURI = currentURI.replace(/^\//, "");
    href = href.replace(/^\//, "");
    // console.log('currentURI', currentURI);
    // console.log('href', href);
    if (currentURI === href) {
      $(this).closest('li').addClass('active');
    } else {
      $(this).closest('li').removeClass();
    }
  });


  $('#login').submit(function (e) {
    console.log('form submit called');
    e.preventDefault();
    var data = $('#login').serialize();
    socket.get('/account/login?' + data);
  })

});

