var db = require('../database/db.js');
const bcrypt = require('bcrypt');

// { username: "username11", passwordHashed: "Timothy",  firstName: "Bob", lastName: "Marley"}
function createUser(request, response){
	let passwordHashed = bcrypt.hashSync(request.body.password, 10);
	console.log("Creating a new user with username: " + request.body.username);
	db.getUser({username: request.body.username}, function(error, result) {
		if(result == null){
			db.createNewUser({
				username: request.body.username,
				passwordHashed: passwordHashed,
				firstName: request.body.firstName,
				lastName: request.body.lastName
			},
				function(error, result) {
					if (error) throw error;
					request.session.username = result.username;
					request.session.id = result._id;
					response.json({success: true, username: result.username, id: result._id});

			});
		};
	});
}

function passwordVerify (request, response)
{
	var password = request.query.password;
	var query = {username: request.query.username};

	function bcrptVfy(error, result) {
				console.log("hello from passwordVerify bcrypt ");
				if (result)
				bcrypt.compare(password, result.passwordHashed, function(err, res) {
			  if(res) {
			   // Passwords match
				 request.session.username = result.username;
				 request.session.id = result._id;
				 response.json({success: true, username: result.username, id:result._id});
			  } else {
			   // Passwords don't match
				 response.json({success: false});
			  }
			})
			else {
				response.json({success: false});
			}
	};

	db.getUser(query, bcrptVfy);
}

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

function deleteUser(request, response) {
	var id = request.body.id;
	var query = {_id:id};
	db.deleteUser(query, function(error, result) {
		response.json(result);
	});
}


module.exports = {
	handleUserList: handleUserList,
  handleUser: handleUser,
	createUser: createUser,
	passwordVerify: passwordVerify,
	deleteUser: deleteUser
};
