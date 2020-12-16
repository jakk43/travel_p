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
router.get('/usercontact', function (req, res, next) {
	res.render('usercontact', {
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
router.get('/search', function (req, res, next) {
	res.render('search', {
		title: 'Express'
	});
});
router.get('/index_login', function (req, res, next) {
	res.render('index_login', {
		title: 'Express'
	});
});
router.get('/content_login', function (req, res, next) {
	res.render('content_login', {
		title: 'Express'
	});
});
router.get('/usercontact_login', function (req, res, next) {
	res.render('usercontact_login', {
		title: 'Express'
	});
});
router.get('/search_login', function (req, res, next) {
	res.render('search_login', {
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

	if (pw === cpw) {
		con.query(sql, function (err, result) {
			if (err) {
				res.send("user name is already in use ");
			} else {
				console.log(result)
				res.send("Successful")
			}
		})
	} else {
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
					
				} else {
					res.send("User and password does not match");
				}
			} else {
				res.json("User does not exits");
			}
		}
	});
});


var d = new Date();

var datestring = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
d.getHours() + ":" + d.getMinutes();

router.post('/contact', function (req, res) {
	var email = req.body.email
	var details = req.body.details
	var sql = "insert into contact(date,email,details)" //care number
	sql += " values('" + datestring + "','" + email + "','" + details + "')";
	// console.log(email)

if((email && details )!= ''){
	con.query(sql, function (err, result) {
		if (err) {
			res.send("ส่งไม่สำเร็จ");
		} else {
			//   console.log(result)
			res.send("ส่งแล้ว")
		}
	})
}else{
	res.send("กรอกข้อมูลก่อน อส")
}

	

});

// ดึงข้อมูล Contact ออกมา
router.get('/usercontact1', function (req, res, next) {
	con.query('SELECT * FROM contact', function (err, rows) {
		// res.send(rows[2].email);
		var datadetails = '';
		for (let i = 0; i < rows.length; i++) {
			datadetails += String("No."+rows[i].no) + " | "+rows[i].date +" | " + rows[i].email + " | " + rows[i].details + "<br>"
		}
		res.send(datadetails)
	})
})
module.exports = router;

