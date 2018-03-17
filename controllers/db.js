var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://Admin:test123@cluster0-ulu7j.mongodb.net/test";

function createUserTable(){
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      dbo.createCollection("users", function(err, res) {
        if (err) throw err;
        console.log("User Table created!");
        db.close();
      });
    });
};

// createNewUser({ username: "username11", passwordHashed: "Timothy",  firstName: "Bob", lastName: "Marley"});
 // getUers();

function createNewUser(user){
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("users").insertOne(user, function(err, res) {
      if (err) throw err;
      console.log(res);
      db.close();
    });
  });
};

function getUsers(){
    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("users").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
  });
};

function getUser(query){
    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("users").find(query).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
  });
};

function getUserID(query, index, callback){
    var userID;
    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("users").findOne(query[index], (function(err, result) {
      if (err) throw err;
      userID = {userID: result._id};
      console.log(userID);
      db.close();
      query[index] = (userID);
      callback(query, index + 1);
    }));
  });
};

function deleteUser(query){
    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("users").deleteOne(query, function(err, obj) {
      if (err) throw err;
      console.log("1 user deleted");
      db.close();
    });
  });
};

function updateUser(query, newvalues){
    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("users").updateOne(query, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 user updated");
      db.close();
    });
  });
}

/*****************************************************************************
Conversation

id			serial
player_one		int		references(user.id)
player_two		int		references(user.id)
text			text

*****************************************************************************/

function createConversationTable(){
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      dbo.createCollection("conversation", function(err, res) {
        if (err) throw err;
        console.log("Conversation Table created!");
        db.close();
      });
    });
};

 // createNewConversation({ username: "username11"}, { username: "Company Inc"});
// getConversations();

function insertIntoConversation(userOne, userTwo){
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Hello Third");
    var dbo = db.db("mydb");
    // console.log("hello" + userOne + " & " + userTwo);
        dbo.collection("conversation").insertOne({
            playerOne: userOne.userID,
            playerTwo: userTwo.userID,
            text: "Welcome to a new conversation!"
          }, function(err, res) {
          if (err) throw err;
          console.log("Hello Forth");
          console.log(res);
          db.close();
          });
        });
  };

  function createConversation(users, index = 0){
    if(index < 2){
      console.log("Hello 1." + index);
      getUserID(users, index, createConversation);
    }
    else {
      console.log("Hello Second");
      insertIntoConversation(users[0], users[1])
    }
  };

  var users = [{ username: "username11"}, { username: "Company Inc"}];
  createConversation(users);

function getConversations(){
    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("conversation").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
  });
};

function getConversation(query){
    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("conversation").find(query).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
  });
};

function deleteConversation(query){
    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("conversation").deleteOne(query, function(err, obj) {
      if (err) throw err;
      console.log("1 conversation deleted");
      db.close();
    });
  });
};

function updateConversation(query, newvalues){
    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("conversation").updateOne(query, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 conversation updated");
      db.close();
    });
  });
}

module.exports = {
  createUserTable: createUserTable,
  createNewUser: createNewUser,
  getUsers: getUsers,
  getUser: getUser,
  deleteUser: deleteUser,
  updateUser: updateUser,
  createConversationTable: createConversationTable,
  createConversation: createConversation,
  getConversations: getConversations,
  getConversation: getConversation,
  deleteConversation: deleteConversation,
  deleteConversation: deleteConversation
};
