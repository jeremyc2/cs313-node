var db = require('../database/db.js');

function handleUserList(request, response) {
	console.log("Returning the user list");

	db.getUsers(function(error, result) {
		response.json(result);
	});
}

function handleUser(request, response) {
	var id = request.params.id;

	console.log("Returning details for user: " + id);
	db.getUser({_id:id}, function(error, result) {
		response.json(result);
	});
}


module.exports = {
	handleUserList: handleUserList,
  handleUser: handleUser
};

// getConversationListFromUser(user)
// 	-returns a list of conversations from the database

//
// verifyLogin(username, password)
// -return bool of whether or not the credentials were correct. Verifies with the database
//

//
// addUser(user)
// 	-adds the user to the database. Returns bool of success or failure
//
// removeUser(user)
// 	- removes the user from the database. Returns bool of success or failure
//
