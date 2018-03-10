const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
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

function gifSearch(req, res, query, callback){
  client.search('gifs', {"q": query})
    .then((response) => {
      response.data.forEach((gifObject) => {
        var url = gifObject.images.fixed_height.gif_url;
        console.log(url);
        callback(req, res, url);
      })
      res.end();
    })
    .catch((err) => {
      console.log(err);
    })
}
