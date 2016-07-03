var socket = io.sails.connect();

socket.on('incoming', (msg) => {
  console.log("msg", msg);
});