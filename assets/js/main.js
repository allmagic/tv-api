var socket = io.sails.connect();

socket.on('incoming', (data) => {
  console.log("got event with data", data);
});


// alert('day la js')
