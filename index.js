const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


    var GphApiClient = require('giphy-js-sdk-core')
    client = GphApiClient("")

  var WebSocketServer = require('ws').Server,
      wss = new WebSocketServer({
          port: 8080
      });

  wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
          client.send(data);
          console.log('broadcasting... ');
      });
  };

  wss.on('connection', function(ws) {
      ws.on('message', function(msg) {
          console.log('message ' + msg);
          data = JSON.parse(msg);
          if (data.message) wss.broadcast(data.message);
      });
  });

//   /// Gif Search
// client.search('gifs', {"q": "cats"})
//   .then((response) => {
//     response.data.forEach((gifObject) => {
//       console.log(gifObject)
//     })
//   })
//   .catch((err) => {
//
//   })
