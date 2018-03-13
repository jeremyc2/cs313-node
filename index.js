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




const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var server = express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/gif', function (req, res){
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    console.log('Searching for a gif...');
    var query = req.query.query;
    console.log('The query is ' + query);
    var count = 0;
    var url = gifSearch(req, res, query, function(req, res, url){
        if (count > 2)
          count = 0;
        if (count == 0)
          res.write("<div class=\"row\">");
        res.write("<div class=\"col-sm-4\"><img src=\"" + url + "\" class=\"gif\"></div>");
        if (count == 2)
          res.write("</div>");
        count++;
    });
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


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

function gifSearch(req, res, query, callback){
  client.search('gifs', {"q": query})
    .then((response) => {
      response.data.forEach((gifObject) => {
        var url = gifObject.images.fixed_height.gif_url;
        callback(req, res, url);
      })
      res.end();
    })
    .catch((err) => {
      console.log(err);
    })
}
