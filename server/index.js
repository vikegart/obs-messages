const express = require('express');
const app = express();
const http = require("http").Server(app);
const cors = require('cors');

const io = require("socket.io")(http);
const port = process.env.PORT || 3000;

const SECURE_URL = '/chto';
const SHARED_URL = '/shared';
const MODERATOR_URL = '/moder'

app.use(cors());


app.use('/', express.static('client/pages/playerPage'));
app.use(SECURE_URL, express.static('client/pages/hostPage'));
app.use(SHARED_URL, express.static('client/shared'));
app.use(MODERATOR_URL, express.static('client/pages//moderatorPage'));

io.on("connection", function(socket) {
  // console.log("user is connected");
  socket.on("disconnect", function() {
    // console.log("user disconnected");
  });

  socket.on("send", function(message) {
    io.emit("to_approve", message);
  });

  socket.on("approved", function(message) {
    io.emit("broadcast", message);
  });


});

http.listen(port, function() {
  console.log("listening to port:" + port);
});