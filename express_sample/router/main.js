module.exports = function(app, fs, mysql, dbconn)
{
	app.get('/', function(req, res){
		var sess = req.session;

		console.log(req.result);
		res.render('index', {
			title: "myhome",
			length: 5,
			name: sess.name,
			username: sess.username,
			result: req.result
		})
	});
	app.get('/about', function(req, res){
		res.render('about.html');
	});

	app.get('/list', function(req,res){
		fs.readFile(__dirname + "/../data/"+"user.json", 'utf8', function(err,data){
			console.log(data);
			res.end(data);
		});
	});
	app.get('/getUser/:username', function(req,res){
		fs.readFile(__dirname + "/../data/"+"user.json", 'utf8', function(err,data){
			var users = JSON.parse(data);
			res.json(users[req.params.username]);
		});
	});

	app.get('/login/:username/:password', function(req,res){
		var sess;
		sess = req.session;
		
		fs.readFile(__dirname+"/../data/user.json", "utf8", function(err,data){
			var users = JSON.parse(data);
			var username = req.params.username;
			var password = req.params.password;
			var result = {};
			if(!users[username]){
				result["success"]=0;
				result["error"]="user not found";
//				res.json(result);
				return;
			}
			if(users[username]["password"]==password){
				result["success"] = 1;
				sess.username = username;
				sess.name = users[username]["name"];
//				res.json(result);
			}else{
				result["success"]=0;
				result["error"]="incorrect password";
//				res.json(result);
			}
			res.redirect('/');
		})
	});

	app.post('/login', function(req,res){
		var sess;
		sess = req.session;
		
		var loginInfo = {
			'id': req.body.username,
			'pass': req.body.password
		};
		var result = {};
		var query = dbconn.query(
			"select * from users where userid = '"+loginInfo.id+"' and authentication_string=password('"+loginInfo.pass+"')", function(err, data){
				if(err){
					console.log(err);
					throw err;
				}
				var user = JSON.parse(JSON.stringify(data));
				if(user != undefined && user.length > 0){
					result["success"] = 1;
					sess.username = user[0].userid;
					sess.name = user[0].name;
				}else{
					result["success"] = 0;
					result["error"] = "user not found or incorrect password";
				}
				res.redirect('/');
			}
		);
	});

        app.get('/logout', function(req, res){
        	sess = req.session;
        	if(sess.username){
            	req.session.destroy(function(err){
                	if(err){
                    		console.log(err);
                	}else{
                    		res.redirect('/');
                	}
            	})
        	}else{
            		res.redirect('/');
        	}
    	});

	app.get('/lists/new', function(req, res){
		var sess = req.session;

		res.render('createList', {
			title: "Create List",
			length: 5,
			name: sess.name,
			username: sess.username
		})
	});
	app.post('/lists', function(req, res){
		var myList = {
			'name': req.body.listName,
			'description': req.body.listDescription
		};
		var query = dbconn.query(
			'insert into mylists set ?', myList, function(err, result){
				if(err){
					console.log(err);
					throw err;
				}
//				console.log(query);
//				res.send(200,'success');
				res.redirect('/lists');
			}
		);
	});
	app.get('/lists', function(req, res){
		var query = dbconn.query('select * from mylists', function(err, result, fields){
			console.log(result);
//			res.json(rows);
			res.render('viewList',{
				title: "View List",
				myList: result
			});
		});
//		console.log(query);
	});
	app.get('/lists/:idxno/edit', function(req,res){
		var query = dbconn.query('select * from mylists where idxno='+mysql.escape(req.params.idxno), function(err, result){
			console.log(result);
			res.render('updateList',{
				title: "Update List",
				myList: result
			});
		});
	});
	app.put('/lists/:idxno', function(req, res){
		var myList = {
			'name': req.body.listName,
			'description': req.body.listDescription
		};
		var query = dbconn.query(
			'update mylists set ? where idxno = ?', [myList, req.params.idxno], function(err, result){
				if(err){
					console.log(err);
					throw err;
				}
//				console.log(query);
//				res.send(200,'success');
				res.redirect('/lists');
			}
		);
	});
	app.delete('/lists/:idxno', function(req, res){
		console.log('req.params.idxno=',req.params.idxno);
		var query = dbconn.query(
			'delete from mylists where idxno = ?', req.params.idxno, function(err, result){
				if(err){
					console.log(err);
					throw err;
				}
				console.log(query);
				res.redirect('/lists');
		});	
	});
}
