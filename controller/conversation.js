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
