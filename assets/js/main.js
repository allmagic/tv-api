var socket;
var path = window.location.pathname;
var callTable;
var homeTable;
var contactTable;
var user_phone;
var call_query_action = 'add-call';

function format (d) {
  return  '<div class="container-fluid row-detail">'+
            '<div class="row">'+
              '<div class="col-sm-2 sidenav text-center">'+
                '<img src="'+d.avatar+'" class="img-rounded img-thumbnail" width="120" height="120"><br />'+
                '<div class="btn-group btn-group-justified"><a href="../profile/'+d.phone+'" class="btn btn-primary">Sửa Thông Tin</a></div>'+
              '</div>'+
              '<div class="col-sm-10">'+
                '<div class="alert alert-success">Bạn đang xem thông tin chi tiết của khách hàng : <strong>'+d.name+'</strong></div>'+
              '<div class="row">'+
              '<div class="col-sm-6">'+
                '<ul class="list-group">'+
                  '<li class="list-group-item"><span class="badge">Email</span>'+ d.email+'</li>'+
                  '<li class="list-group-item"><span class="badge">Facebook</span>'+ d.facebook+'</li>'+
                '</ul>' +
              '</div>'+
              '<div class="col-sm-6">'+
                '<ul class="list-group">'+
                  '<li class="list-group-item"><span class="badge">Viber</span>'+ d.viber+'</li>'+
                  '<li class="list-group-item"><span class="badge">Zalo</span>'+ d.zalo+'</li>'+
                '</ul>' +
              '</div></div>'+

    '<div class="row col-sm-12">'+
    '<div class="alert alert-warning">'+
    '<strong>Ghi Chú : </strong>' +d.notes+
  '</div></div>'+
            '</div>' +
          '</div>' +
    '</div>';
};

$(function() {
  moment.locale('vi');


  $.fn.dataTable.Buttons.defaults.dom.button.className = 'btn btn-success';

  function updateCallTimeByMoment(){
    $('#call-time').text(moment().format('DD/MM/YY, h:mm:ss a'));
  }
  updateCallTimeByMoment()
  setInterval(function(){
    updateCallTimeByMoment()
  }, 1000);


  user_phone = $(".user-info [static-userdata=phone]").text();
  contactTable = $('#user-contact-table').DataTable({
    "language": datatablesLang,
    "ajax": "/user/datatable",
    "processing": true,
    stateSave: true,
    "serverSide": true,
    "columnDefs": [
      { "width": "10px", "targets": 0 },
      { "width": "200px", "targets": 1 },
      { "width": "200px", "targets": 5 },
      { "width": "100px", "targets": [2,3,4,6] },



    ],
    "columns": [
      {
        "className": 'details-control',
        "orderable": false,
        "data": null,
        "defaultContent": ''
      },
      {"name": "name", "data": "name", "searchable": false},
      {"name": "customer_group", "data": "customer_group", "searchable": true},
      {"name": "company", "data": "company", "searchable": true},
      {"name": "phone", "data": "phone", "searchable": true},
      {"name": "address", "data": "address", "searchable": false},
      {"name": "birthday", "data": "birthday", "searchable": true},
      {"name": "createdAt", "data": "createdAt", "searchable": true},
    ],
    // order:  [[ 0, 'desc' ]] , //desc ID
    "searchCols": [{}, {}, {}, {}, {}, {}, {}, {}], // phu hop voi so collums tren html
    lengthMenu: [
      [ 10, 25, 50],
      [ '10 rows', '25 rows', '50 rows' ]
    ],
    dom: 'Bfrtip',
    buttons: ['pageLength', 'csv', 'excel', 'pdf', 'print' ]
  });
  //Call Table Show
  callTable = $('#user-call-table').DataTable({
    "language": datatablesLang,
    "ajax": "/calls/datatable",
    "processing": true,
    stateSave: true,
    "serverSide": true,
    "columns": [
      {"name": "id", "data": "id", "searchable": false},
      {"name": "content", "data": "content", "searchable": true},
      {"name": "staffNo", "data": "staffNo", "searchable": true},
      {"name": "callID", "data": "callID", "searchable": true},
      {"name": "createdAt", "data": "createdAt", "searchable": false},
      {"name": "owner", "data": "owner", "searchable": true, "visible": false},
      {"name": "name", "data": "name", "searchable": true, "visible": false},
    ],
    order:  [[ 0, 'desc' ]] , //desc ID
    "searchCols": [{}, {}, {}, {}, {}, {"search": user_phone},], // phu hop voi so collums tren html
    lengthMenu: [
      [ 10, 25, 50],
      [ '10 rows', '25 rows', '50 rows' ]
    ],
    dom: 'Bfrtip',
    buttons: ['pageLength', 'csv', 'excel', 'pdf', 'print' ]
  });
  //End Profile Call Table

  //Home Table Show
  homeTable = $('#user-home-table').DataTable({
    "language": datatablesLang,
    "ajax": "/calls/datatable",
    "processing": true,
    stateSave: true,
    "serverSide": true,
    "columns": [
      {"name": "id", "data": "id", "searchable": false , "visible": false},
      {"name": "name", "data": "name", "searchable": true, "visible": true},
      {"name": "owner", "data": "owner", "searchable": true, "visible": true,
        "render": function ( data, type, full, meta ) {
          return '<a href="/profile/'+data+'">'+data+'</a>';
        }
      },
      {"name": "staffNo", "data": "staffNo", "searchable": true},
      {"name": "content", "data": "content", "searchable": true},
      {"name": "callID", "data": "callID", "searchable": true},
      {"name": "createdAt", "data": "createdAt", "searchable": false},


    ],
    order:  [[ 0, 'desc' ]] , //desc ID
    "searchCols": [{}, {}, {}, {}, {}, {"search": user_phone},], // phu hop voi so collums tren html
    lengthMenu: [
      [ 10, 25, 50],
      [ '10 rows', '25 rows', '50 rows' ]
    ],
    dom: 'Bfrtip',
    buttons: ['pageLength', 'csv', 'excel', 'pdf', 'print' ],

  });
  // End Home Table
  $('#user-contact-table tbody').on('click', 'td.details-control', function() {

    var tr = $(this).closest('tr');
    var row = contactTable.row(tr);

    if ( row.child.isShown() ) {
      // This row is already open - close it
      row.child.hide("slow");
      tr.removeClass('shown');

    }
    else {
      // Open this row
      row.child( format(row.data()) ).show("slow");
      tr.addClass('shown');
    }
  } );

  // x-editable
  $('.user-info [userdata]').each(function(i,element){
    var keyToUpdate = $(element).attr('userdata');
    var title = ($(element).attr('title')) ? $(element).attr('title') : 'Vui lòng nhập để sửa thông tin';

    $(element).editable({
      mode: 'popup', //'popup'
      type: 'text', url: '/user/' + user_phone, pk: '',
      params: function(params) {
        var updateText = params['value'];
        delete params['pk'];
        delete params['name'];
        delete params['value'];

        params[keyToUpdate] = updateText;

        return params;
      }, title: title, ajaxOptions: {
        type: 'put'
      }
    });

  })



  showAddNoteModel = function(){
    $('#call-content').val('');//reset call content
    $('#user-call-modal').modal().show();
    $('#user-call-modal').find('textarea').focus();
  };
  if(taovang.query_action == call_query_action){
    showAddNoteModel();
  }

  $('.add-call').click(function () {
    showAddNoteModel();
  });

  $('#save-call').click(function(){
    //AJAX to add call history here
    console.log('Call saved via AJAX');
    var postData = {
      "content": $('#call-content').val(),
        "staffNo": taovang.user_id || 9999, //9999 is null
        "callID": taovang.query_call_id || 9999, //9999 is null for required
        "SIPNo": taovang.query_sodtnv || '', //9999 is null for required
        "timestamp": moment().format('YYYY-MM-DD HH:mm:ss'),
        "owner": user_phone
    }

    $.post( "/calls",postData, function( data ) {
      console.log('call saved done data', data);
      callTable.draw(); // Render lai history
      $('#user-call-modal').modal('hide');
    });


  })

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

