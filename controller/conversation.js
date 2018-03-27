var db = require('../database/db.js');


// var users = [{ username: "username11"}, { username: "Company Inc"}];
// createConversation(users, "hi");
function createConversation(request, response){
	db.createConversation(([{username: request.session.username}, {username: request.body.username}]),
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
	console.log("Returning the conversation list " + request.params.userID);

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

function deleteConversation(request, response) {
	var id = request.body.id;
	var query = {_id:id};
	db.deleteConversation(query, function(error, result) {
		response.json(result);
	});
}

function updateConversationThread(request, response){
	var id = request.body.id;
	var line = request.body.line;
	var query = {_id:id};
	db.getConversation({_id:id}, function(error, result) {
		if (result !== null){
			var text = result.text + "/n" + line;
			var newvalues = { $set: {text: text} };
			db.updateConversation(query, newvalues, function(error, result) {
				response.json(result);
			});
		};
	})
}


module.exports = {
	handleConversationList: handleConversationList,
  handleConversation: handleConversation,
	createConversation: createConversation,
	handleUsersConversationList: handleUsersConversationList,
	deleteConversation: deleteConversation,
	updateConversationThread: updateConversationThread
};

// removeConversation(conversation)
// - removes the conversation from the database. Returns bool of success or failure
