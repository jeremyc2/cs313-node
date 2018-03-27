
module.exports = function(server) {

    var GphApiClient = require('giphy-js-sdk-core')
    client = GphApiClient("0AeM29IB0MkPlZDlBXgCKQlvZWGpm01J")

    const io = require('socket.io')(server);
    var connectCounter = 0;

    io.on('connection', (socket) => {
      connectCounter++;
      console.log('Client connected');
      console.log('Total connected: ' + connectCounter);
      sendConnectCounter();
      socket.on('create', function (room) {
        var rooms = socket.rooms;
        for (var chatroom in rooms) {
          console.log("leaving chatroom: " + chatroom);
          socket.leave(chatroom);
        }
        console.log("created room: " + room);
        socket.join(room);
      });
      function postQuestion(msg) {
            var rooms = socket.rooms;
            for (var room in rooms) {
            console.log("chat response...");
            msg = {message: msg.message, type: "question"};
            console.log("posting to room: " + room);
            socket.broadcast.to(room).emit('updateConversation', msg);
          };
      };
      function postGif(msg) {
          var rooms = socket.rooms;
          for (var room in rooms) {
          console.log("posting a gif with url: " + msg.link);
          msg = {link: msg.link, type: "gif"};
          console.log("posting to room: " + room);
          socket.broadcast.to(room).emit('updateConversation', msg);
        };
      };
      socket.on ('question', postQuestion);
      socket.on ('gif', postGif);
      socket.on('disconnect', () => {console.log('Client disconnected');
      connectCounter--;
      sendConnectCounter();});
    });

    function sendConnectCounter(){
        io.emit('connectCounter', connectCounter);
    }


var gifSearch = function (req, res, query){
  data = [];
  client.search('gifs', {"q": query})
    .then((response) => {
      response.data.forEach((gifObject) => {
        var url = gifObject.images.fixed_height.gif_url;
        data.push({url:url});
      })
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    })
}

return {
    gifSearch: gifSearch
};

};



// // sending to sender-client only
// socket.emit('message', "this is a test");
//
// // sending to all clients, include sender
// io.emit('message', "this is a test");
//
// // sending to all clients except sender
// socket.broadcast.emit('message', "this is a test");
//
// // sending to all clients in 'game' room(channel) except sender
// socket.broadcast.to('game').emit('message', 'nice game');
//
// // sending to all clients in 'game' room(channel), include sender
// io.in('game').emit('message', 'cool game');
//
// // sending to sender client, only if they are in 'game' room(channel)
// socket.to('game').emit('message', 'enjoy the game');
//
// // sending to all clients in namespace 'myNamespace', include sender
// io.of('myNamespace').emit('message', 'gg');
//
// // sending to individual socketid
// socket.broadcast.to(socketid).emit('message', 'for your eyes only');
