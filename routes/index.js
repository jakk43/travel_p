var express = require('express');
var router = express.Router();
var mysql = require('mysql');
/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', {
		title: 'Express'
	});
});
router.get('/content', function (req, res, next) {
	res.render('content', {
		title: 'Express'
	});
});
router.get('/footer', function (req, res, next) {
	res.render('footer', {
		title: 'Express'
	});
});
router.get('/nav', function (req, res, next) {
	res.render('nav', {
		title: 'Express'
	});
});
router.get('/sign', function (req, res, next) {
	res.render('sign', {
		title: 'Express'
	});
});
router.get('/contact', function (req, res, next) {
	res.render('contact', {
		title: 'Express'
	});
});
var con = mysql.createConnection({
	host: "localhost", //or name (dns)
	user: "root",
	password: "",
	database: "myweb"
});
con.connect((err) => {
	if (err) {
		console.log("database connect failed...");
	}
});
router.post('/user_sign_up', function (req, res) {
	var name = req.body.user_name
	var email = req.body.email
	var pw = req.body.password
	var cpw = req.body.confirm_password
	var sql = "insert into users(user_name,email,password,confirm_password)" //care number
	sql += " values('" + name + "','" + email + "','" + pw + "','" + cpw + "')";

		if(pw===cpw){
      con.query(sql, function (err, result) {
        if (err) {
          res.send("user name is already in use ");
        } else {
          console.log(result)
          res.send("Successful")
        }
      })
    }else{
      res.send("passowrd not match")
    }

});


router.post("/user_sign_in", function (req, res) {
	var user_name = req.body.user_name;
	var password = req.body.password;
	con.query("SELECT * FROM users WHERE user_name = ?", [user_name], function (error, results, fields) {
		if (error) {
			// console.log("error ocurred",error);
			res.send("err");
		} else {
			// console.log('The solution is: ', results);
			if (results.length > 0) {
				if (results[0].password == password) {
					res.send("Successful");
					// res.send("Successful");
				} else {
					res.send("User and password does not match");
				}
			} else {
				res.json("User does not exits");
			}
		}
	});
});



router.post('/contact', function (req, res) {
	var email = req.body.email
	var details = req.body.details
	var sql = "insert into contact(email,details)" //care number
	sql += " values('" + email + "','" + details + "')";
	// console.log(email)
	con.query(sql, function (err, result) {
        if (err) {
          res.send("ส่งไม่สำเร็จ");
        } else {
        //   console.log(result)
          res.send("ส่งแล้ว")
        }
      })

});

module.exports = router;