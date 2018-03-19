var db = require('../database/db.js');


// var users = [{ username: "username11"}, { username: "Company Inc"}];
// createConversation(users, "hi");
function createConversation(request, response){
	db.createConversation(([{username: request.body.username1}, {username: request.body.username2}]),
		request.body.text,
		function (error, result) {
			if (error) throw error;

			response.json({success: true});

	});
}

function handleConversationList(request, response) {
	console.log("Returning the conversation list");

	db.getConversations(function(error, result) {
		response.json(result);
	});
}

function handleUsersConversationList(request, response) {
	console.log("Returning the conversation list");

	db.getUserConversations({user: request.params.userID}, function(error, result) {
		response.json(result);
	});
}

function handleConversation(request, response) {
	var id = request.params.id;

	console.log("Returning details for conversation: " + id);
	db.getConversation({_id:id}, function(error, result) {
		response.json(result);
	});
}


module.exports = {
	handleConversationList: handleConversationList,
  handleConversation: handleConversation,
	createConversation: createConversation,
	handleUsersConversationList: handleUsersConversationList
};

// getConversationText(conversation)
// 	-returns the text of the conversation from the database

// addLineToConversation(conversation, line)
// 	- return bool of whether or not it succeeded in updating the database

// removeConversation(conversation)
// - removes the conversation from the database. Returns bool of success or failure
