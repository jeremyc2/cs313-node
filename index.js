
// https://stormpath.com/blog/everything-you-ever-wanted-to-know-about-node-dot-js-sessions

var user = require('./controller/user.js');
var conversation = require('./controller/conversation.js');
var gif = null;

const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var bodyParser = require('body-parser')
var session = require('client-sessions')
var parseurl = require('parseurl')

var server = express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
  }))
  .use(session({
    cookieName: 'session',
    secret: 'eg[isfd-8yF9-7w2315df{}+Ijsli;;to8',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
    ephemeral: false
  }))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/logout', function(req, res) {
    req.session.reset();
  })
  .use(function (req, res, next) {
    if (!req.session.views) {
      req.session.views = {}
  }

  // get the url pathname
  var pathname = parseurl(req).pathname

  // count the views
  req.session.views[pathname] = (req.session.views[pathname] || 0) + 1;
  var id = "0";
  if (req.session.id)
    id = req.session.id;
  console.log("Pageviews: " + req.session.views[pathname] + " for user with id: " + id);
  next()
})
  .get('/', (req, res) => {
    if (req.session.id)
      res.render('pages/index', {id: req.session.id});
    else
      res.render('pages/index');
  })
  .get('/gif', function (req, res){
    console.log('Searching for a gif...');
    var query = req.query.query;
    console.log('The query is ' + query);
    gif.gifSearch(req, res, query);
  })
  .get('/user/:id', user.handleUser)
  .get('/userList', user.handleUserList)
  .get('/conversation/:id', conversation.handleConversation)
  .get('/conversationList', conversation.handleConversationList)
  .get('/conversationList/:userID', conversation.handleUsersConversationList)
  .get('/verifyPassword', user.passwordVerify)
  .post('/user', user.createUser)
  .post('/conversation', conversation.createConversation)
  .delete('/user', user.deleteUser)
  .delete('/conversation', conversation.deleteConversation)
  .put('/conversationThread', conversation.updateConversationThread)
  .listen(PORT, () => {console.log(`Listening on ${ PORT }`);})

  gif = require('./controller/message.js')(server);
