let express = require("express");
let mysql = require("mysql");
let cors = require("cors");
let fs = require("fs");
let path = require("path");
let crypto = require("crypto");
let concat = require("concat-stream");
let twilio = require("twilio")("ACa04b84d457ce0ec858957de2e7eae4b9", "577b20694c0ab5ecb15a26e694a24b30");
let dbconfig = require("./database.js");
let connection = mysql.createConnection( dbconfig );
let app = express();
let corsOptions = {
	origin: "*",
	optionsSuccessStatus: 200
};
let id = "";
let pw = "";
let email = "";
let phone = "";
let rank = "";
let dir = path.join(__dirname, "/");
let security = {
	"whether" : false,
	securityCode : 0
};


let key = process.env.ENCRYPTION_KEY || 'abcdefghijklmnop'.repeat(2);
function encrypt(text) {
	const iv = crypto.randomBytes(16);
	const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
	const encrypted = cipher.update(text);

	return iv.toString('hex') + ':' + Buffer.concat([encrypted, cipher.final()]).toString('hex');
};
function decrypt(text) {
	const textParts = text.split(':');
	const iv = Buffer.from(textParts.shift(), 'hex');
	const encryptedText = Buffer.from(textParts.join(':'), 'hex');
	const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
	const decrypted = decipher.update(encryptedText);

	return Buffer.concat([decrypted, decipher.final()]).toString();
};

function securityPassword() {
	security.securityCode = Math.round(Math.random()*100000+1);
	return security.securityCode;
};
// let getToken = () => "pco";
// let encryption = (password) => {
// 	let arr = [...password];
// 	let arr2 = [...getToken()];
// 	let arr3 = [];
// 	for(let i = 0; i < arr2.length; i++) {
// 		arr[i] += arr2[i];
// 	}
// 	for(let j = 0; j < arr.length; j++) {
// 		arr[0] += arr[j];
// 	}
// 	arr3.push(arr[0].slice(2, arr[0].length));
// 	let encryption_pw = arr3[0] + 1110;
// 	return encryption_pw;
// };

app.use(express.static(dir));
app.use(cors({
	origin: "*",
	optionsSuccessStatus: 200
}));

app.post("/user/checkDuplicate", function(req, res, next) {
	req.pipe(concat(function(data) {
		req.body = JSON.parse(data);
		next();
	}));
}, function(req, res) {
	connection.query(`select ID from people where ID='${req.body.id}';`, function(err, rows) {
		if(err) res.send({"message" : err});

		if(rows && rows == "" || null || undefined || 0) {
			res.send({"message" : "not overlap"})
		}else{
			res.send({"message" : "overlap!"});
		};
	})
});
app.post("/user/register", function(req, res, next) {
	req.pipe(concat(function(data){
		req.body = JSON.parse(data);
		next();
	}));
}, function(req, res) {
	pw = encrypt(req.body.pw);
	connection.query(`insert into people(ID,Password,Email,Phone,Update_Time)values('${req.body.id}','${pw}','${req.body.email}','${req.body.phone}',NOW());`, (err, rows) => {
		if(err) {
			res.send({"message" : "Duplicate error!"});
		}else {
			id = req.body.id;
			email = req.body.email;
			phone = req.body.phone;
			rank = "Nomal";
			res.send({"message" : "register success"});
		};
	});
});
app.post("/user/login", function(req, res, next) {
	req.pipe(concat(function(data){
		req.body = JSON.parse(data);
		next();
	}));
}, function(req, res) {
	connection.query(`select * from people where ID='${req.body.id}';`, function(err, rows) {
		if(err) res.send({"error message" : err});;

		if(rows) {
			if(decrypt(rows[0].Password) == req.body.pw) {
				id = rows[0].ID;
				email = rows[0].Email;
				phone = rows[0].Phone;
				rank = rows[0].Rank;
				res.send({"message" : "success"});
			}else {
				res.send({"message" : "fail"});
			};
		};
	});
});
app.post("/user/logout", function(req, res) {
	id = "";
	email = "";
	phone = "";
	rank = "";
});
app.post("/user/searchId", function(req, res, next) {
	req.pipe(concat(function(data){
		req.body = JSON.parse(data);
		next();
	}));
}, function(req, res) {
	connection.query(`select * from people where Email='${req.body.email}' and Phone='${req.body.phone}';`, (err, rows) => {
		if(err) res.send(err);

		if(rows) {
			try{
				if(rows[0].ID == undefined) throw "undefined";
				twilio.messages.create({
					to: `+82${req.body.phone}`,
					from: "+14698047083",
					body: `아이디는 ${rows[0].ID}입니다.`
				});
				res.end();
			}catch(err) {
				res.send({"message" : err});
			}
		};
	});
});
app.post("/user/searchPassword", function(req, res, next) {
	req.pipe(concat(function(data) {
		req.body = JSON.parse(data);
		next();
	}));
}, function(req, res) {
	connection.query(`select * from people where ID='${req.body.id}' and Email='${req.body.email}' and Phone='${req.body.phone}';`, (err, rows) => {
		if(err) res.send(err);

		if(rows) {
			try{
				if(rows[0].Password == undefined) throw "undefined";
				twilio.messages.create({
					to: `+82${req.body.phone}`,
					from: "+14698047083",
					body: `비밀번호는 ${decrypt(rows[0].Password)}입니다.`
				});
				res.end();
			}catch(err) {
				res.send({"message" : err});
			}
		};
	})
})
app.post("/write/write", function(req, res, next) {
	req.pipe(concat(function(data){
		req.body = JSON.parse(data);
		next();
	}));
}, function(req, res) {
	connection.query(`insert into contents values('${req.body.id}','${req.body.title}','${req.body.content}',NOW(), 1);`, function(err, rows) {
		if(rows) {
			res.send({"add data" : "success"});
		}else {
			res.send({"err" : err})
		};
	});
});
app.post("/security/getCode", function(req, res, next) {
	req.pipe(concat(function(data){
		req.body = JSON.parse(data);
		next();
	}));
}, function(req, res) {
	securityPassword();
	twilio.messages.create({
		to: `+82${req.body.phone}`,
		from: "+14698047083",
		body: `보안문자는 ${security.securityCode}입니다.`
	});
	res.send({"code" : security.securityCode});
});

app.get("/main", function(req, res) {
	res.sendFile(path.join(__dirname, "../main.html"));
});
app.get("/userData", function(req, res) {
	res.send({
		"status" : "200",
		"id" : id,
		"email" : email,
		"phone" : phone,
		"rank" : rank
	});
});
app.get("/login", function(req, res) {
	res.sendFile(path.join(__dirname, "../login.html"));
});
app.get("/register", function(req, res) {
	res.sendFile(path.join(__dirname, "../register.html"));
});
app.get("/user", function(req, res) {
	res.sendFile(path.join(__dirname, "../user.html"));
});
app.get("/write/write-content", function(req, res) {
	res.sendFile(path.join(__dirname, "../writeContent.html"));
});
app.get("/write/list", function(req, res) {
	res.sendFile(path.join(__dirname, "../writeList.html"));
});
app.get('/write/ListData', function(req, res) {
	connection.query(`select * from contents where Whether=1`, function(err, rows) {
		if(rows) {
			res.send({
				"success" : "success",
				"data" : rows
			});
		}else {
			res.send({"err" : err});
		};
	});
});
app.get("/user/searchId", function(req, res) {
	res.sendFile(path.join(__dirname, "../searchId.html"));
});
app.get("/user/changeInfo", function(req, res) {
	res.sendFile(path.join(__dirname, "../changeInfo.html"));
});

app.set("port", process.env.PORT || 3000 );
app.listen( app.get("port"), console.log("Express 서버를 시작했습니다. 포트 : " + app.get('port')));