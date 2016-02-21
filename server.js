var http = require('http');
var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, '/www')));

// A route for /say-hello 
app.get('/say-hello', function(req, res, next) {
	res.send('hello');
});

var testfunc = function(req, res) {
	res.send('this is a test');
}

app.get('/test', testfunc);

http.createServer(app).listen(8888, function() {
	console.log('Express App started');
});



var mysql = require('mysql') ;
var connection = mysql.createConnection({
	host : 'dev1.valiantica.com',
  	user : 'dev1',
  	password: 'valiantica0515',
	database: 'test'
});

connection.connect() ;

var list = function(req,res) {
	
	connection.query('select * from usera', function(err,result,fields) {
		if(!err) {
			res.json(result) ;
			
		}
		else
			console.log('Error while performing Query.') ;
	});

}

function createUser(user) {
	connection.query('select * from usera', function(err,result,fields) {
		if(!err) {
			
			query='insert into userlist(id,fName,lName,gender,age) values ("'+user.id+'", " '+user.fName+'","'+user.lName+'","'+user.gender+'","'+user.age+'")';
			
			connection.query(query, function(err,result,fields) {
				if(!err) {
					console.log('create success');
				}
				else
					console.log(err) ;
			})
			
		}
		else
			console.log('Error while performing Query.') ;
	});

}

function getIndex(id) {
	for(var i = 0 ; i < users.length ; i++) {
		if(users[i].id == id) return i ;
	}
	if(i == users.length) return -1 ;

}



function editUser(user) {
	users[getIndex(user.id)] = user ;
}




app.get('/userList',list);

app.delete('/deleteUser/:id',function(req,res){
	console.log(req.params.id) ;
	query='delete from usera where id = '+req.params.id;
	console.log(query);
	connection.query(query, function(err,result,fields) {
		if(!err) {
			console.log('delete success');
			connection.query('select * from usera', function(err,result,fields) {
				if(!err) {
					res.json(result) ;
					//console.log('The solution is:', result);
				}
				else
					console.log('Error while performing Query.') ;
			});
		}
		else
			console.log(err) ;
	}) ;
}) ;

app.post('/createUser/:new',function(req,res){
	var user = JSON.parse(req.params.new) ;
	connection.query('select * from usera', function(err,result) {
		if(!err) {
			var users = result ;
			var lastID = 0 ;
			for(var i = 0 ; i < users.length ; i++) {
				if(users[i].id > lastID) lastID = users[i].id ;
			}
			query='insert into usera(id,fName,lName,gender,age) values ("'+(lastID+1)+'", " '+user.fName+'","'+user.lName+'","'+user.gender+'","'+user.age+'")';
			
			connection.query(query, function(err,result,fields) {
				if(!err) {
					console.log('create success');
				}
				else
					console.log(err) ;
			})
			res.send("Your user id is "+ (lastID + 1) +" Your information has been added to the User List") ;
			
		}
		else
			console.log('Error while performing Query.') ;
	})
})

app.get('/findUser/:id',function(req,res){
	
	connection.query('select * from usera where id =' + req.params.id, function(err,result,fields) {
		if(!err) {
			res.json(result) ;
			
		}
		else
			console.log('Error while searching.') ;
	});
})

app.put('/editUser/:user',function(req,res){
	var editU = JSON.parse(req.params.user) ;
	console.log(editU) ;
	query='UPDATE usera SET fName ="' +editU.fName+'", lName="'+editU.lName+'" , age = "'+editU.age+'" WHERE id ="'+editU.id+'"; ';
	console.log(query);
	connection.query(query, function(err,result,fields) {
		if(!err) {
			connection.query('select * from usera', function(err,result,fields) {
				if(!err) {
					res.json(result) ;
				}
				else
					console.log('Err') ;
			});
		}
		else
			console.log('Error while performing Query.') ;
	});

});