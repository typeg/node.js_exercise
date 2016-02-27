module.exports = function(app, fs)
{
	app.get('/', function(req, res){
		var sess = req.session;

		res.render('index', {
			title: "myhome",
			length: 5,
			name: sess.name,
			username: sess.username
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
}
