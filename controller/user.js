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
