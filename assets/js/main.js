var socket;
var path = window.location.pathname;
var callTable;
var user_phone;

$(function() {
  user_phone = $('#user-phone').text();

  callTable = $('#user-call-table').DataTable({
    "ajax": "/calls/action",
    "processing": true,
    "serverSide": true,
    "columns": [{"name": "id", "data": "id", "searchable": false}, {
      "name": "content", "data": "content", "searchable": true
    }, {"name": "staffNo", "data": "staffNo", "searchable": false}, {
      "name": "callID", "data": "callID", "searchable": false
    }, {"name": "createdAt", "data": "createdAt", "searchable": false}, {
      "name": "owner", "data": "owner", "searchable": true, "visible": false
    },],
    "searchCols": [{}, {}, {}, {}, {}, {"search": user_phone},] // phu hop voi so collums tren html
  });

  $('#notes').editable({
    mode: 'popup', //'popup'
    type: 'textarea', url: '/user/' + user_phone, pk: '',
    params: function(params) {
      params.notes = params['value'];

      delete params['pk'];
      delete params['name'];
      delete params['value'];

      return params;
    }, title: 'Nhập ghi chú', ajaxOptions: {
      type: 'put'
    }
  });

//sua thanh inline o cho mô de coi docs


  socket = io.sails.connect();
  // test auth
  socket.get('/socket');

  socket.on('user/authenticated', function(data) {
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
  $(".nav li a").each(function() {
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


  $('#login').submit(function(e) {
    console.log('form submit called');
    e.preventDefault();
    var data = $('#login').serialize();
    socket.get('/account/login?' + data);
  })

  // Enable bootstrap tooltips
  $('[data-toggle="tooltip"]').tooltip();
});

