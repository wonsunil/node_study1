window.onload = () => {
	let registerBtn = document.querySelector("button[name='register']");
	let registerInput = document.querySelectorAll("div[name='register'] input")
	let emailCheck = document.querySelector(".email-check");
	let data = {};

	registerInput[3].addEventListener("keyup", function(e) {
		this.value = phoneFrom(this.value);
	});
	registerBtn.addEventListener("click", () => {
		let val0 = registerInput[0].value;
		let val1 = registerInput[1].value;
		let val2 = registerInput[2].value;
		let val3 = registerInput[3].value
		
		if(val0 != "" && val1 != "" && val2 != "" && val3 != "") {
			if(emailForm(val2)) {
				emailCheck.classList.add("dis-block");
				emailCheck.classList.remove("email-error");
				data = {
					"id" : val0,
					"pw" : val1,
					"email" : val2,
					"phone" : val3
				};
				DuplicateCheckFetch(data);
			}else{
				emailCheck.classList.remove("dis-none");
				emailCheck.classList.add("email-error");
			};
		}else alert("항목들을 전부 입력해주세요.");
	});

	function emailForm(email) {
		let reg = /\S+@\S+\.\S+/;
		return reg.test(email);
	};
	function phoneFrom(value) {
		let number = value.replace(/[^0-9]/g, "");
		let result = "";
		if(number.length < 4) {
			return number;
		} else if(number.length < 7) {
			result += number.substr(0, 3);
			result += "-";
			result += number.substr(3);
		} else if(number.length < 11) {
			result += number.substr(0, 3);
			result += "-";
			result += number.substr(3, 3);
			result += "-";
			result += number.substr(6);
		} else {
			result += number.substr(0, 3);
			result += "-";
			result += number.substr(3, 4);
			result += "-";
			result += number.substr(7);
		};
		return result;
	};
	function popup(code) {
		let box = document.createElement("div");
		let input = document.createElement("input");
		let button = document.createElement("button");

		box.setAttribute("id", "security-box");
		input.setAttribute("id", "security-input");
		button.innerHTML = "인증하기";
		button.addEventListener("click", function(e) {
			if(input.value == code) registerFetch();
			else alert("보안문자가 일치하지 않습니다");
		});

		box.append(input, button);
		document.body.append(box);
	};
	function registerFetch() {
		fetch("http://localhost:3000/user/register", {
			mode: "cors",
			method: "POST",
			headers: {
				"content-type": "application/json",
				"Access-Control-Allow-Origin" : "file:///F:/%ED%94%84%EB%B0%8D/ToDo/index.html"
			},
			body: JSON.stringify(data)
		})
		.then( req => {return req.json()})
		.then( res => {
			if(res.message == "register success") {
				location.href = "http://localhost:3000/user";
				registerInput.forEach(item => {
					item.innerHTML = "";
					item.value = "";
				})
			}else{
				console.log(res.message);
			};
		})
		.catch( err => console.log( err ));
	};
	function DuplicateCheckFetch(data) {
		fetch("http://localhost:3000/user/checkDuplicate", {
			mode: "cors",
			method: "POST",
			body: JSON.stringify(data)
		})
		.then(req => {return req.json()})
		.then(res => {
			if(res.message == "not overlap") {
				securityCodeFetch();
			}else if(res.message == "overlap!") {
				alert("아이디가 중복되었습니다.");
			};
		});
	};
	function securityCodeFetch() {
		fetch("http://localhost:3000/security/getCode", {
			mode: "cors",
			method: "POST",
			body: JSON.stringify(data)
		})
		.then(req => {return req.json()})
		.then(res => {
			popup(res.code);
		});
	};
};