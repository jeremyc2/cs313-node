var db = require('../database/db.js');

function handleConversationList(request, response) {
	console.log("Returning the conversation list");

	db.getConversations(function(error, result) {
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
  handleConversation: handleConversation
};

// getConversationText(conversation)
// 	-returns the text of the conversation from the database

// addLineToConversation(conversation, line)
// 	- return bool of whether or not it succeeded in updating the database
//
// startNewConversation(user1, user2)
// -adds a new conversation to the database for both the users. Returns the success or failure in a bool

// removeConversation(conversation)
// - removes the conversation from the database. Returns bool of success or failure
