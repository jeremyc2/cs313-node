
var user = require('./controller/user.js');
var conversation = require('./controller/conversation.js');


const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var bodyParser = require('body-parser')

var server = express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
  }))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/gif', function (req, res){
    var gif = require('./controller/message.js')(server);
    console.log('Searching for a gif...');
    var query = req.query.query;
    console.log('The query is ' + query);
    gif.gifSearch(req, res, query);
  })
  .get('/user/:id', user.handleUser)
  // .get('/userList', user.handleUserList)
  .get('/conversation/:id', conversation.handleConversation)
  // .get('/conversationList', conversation.handleConversationList)
  .get('/conversationList/:userID', conversation.handleUsersConversationList)
  .get('/verifyPassword', user.passwordVerify)
  .post('/user', user.createUser)
  .post('/conversation', conversation.createConversation)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


  //TODO: DELETE ME
  // if (count > 2)
  //   count = 0;
  // if (count == 0)
  //   res.write("<div class=\"row\">");
  // res.write("<div class=\"col-sm-4\"><img src=\"" + url + "\" class=\"gif\"></div>");
  // if (count == 2)
  //   res.write("</div>");
  // count++;
