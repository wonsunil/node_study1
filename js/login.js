Object.prototype.siblings = function (target) {
	let childFilterArr = [...target.parentNode.children].filter(v => v != target);
	return childFilterArr;
};
window.onload = () => {
	let loginInput = document.querySelectorAll(".loginBox > input");
	loginInput.forEach(item => {
		item.addEventListener("keyup", function(e) {
			if(e.keyCode == 13) {
				loginFetch(loginInput);
			};
		});
	});

	let popupBox = document.querySelector("#popup");
	let popMenu2 = document.querySelector("div[name='search-id']");
	let popMenu3 = document.querySelector("div[name='search-pw']");

	let resBtn = document.querySelector("#register");
	let si = document.querySelector("#search-id")
	let sp = document.querySelector("#search-pw");

	resBtn.onclick = () => {
		location.href = "/register";
	};
	si.onclick = () => {
		popMenu2.siblings(popMenu2).forEach(item => {
			item.classList.add("dis-none");
		});
		popupBox.classList.remove("dis-none");
		popupBox.childNodes[1].classList.remove("dis-none");
	};
	sp.onclick = () => {
		popMenu3.siblings(popMenu3).forEach(item => {
			item.classList.add("dis-none");
		});
		popupBox.classList.remove("dis-none");
		popupBox.childNodes[3].classList.remove("dis-none");
	};

	let closeBtn = document.querySelectorAll(".close-btn");
	closeBtn.forEach(item => {
		item.addEventListener("click", function(e) {
			this.parentNode.parentNode.classList.add("dis-none");
			this.parentNode.classList.add("dis-none");
		});
	});

	let loginBtn = document.querySelector('#login');
	loginBtn.addEventListener("click", () => { loginFetch(loginInput); });

	let searchID = document.querySelectorAll("div[name='search-id'] input");
	searchID[1].addEventListener("keyup", function(e) {
		this.value = phoneFrom(this.value);
	});

	let searchIdBtn = document.querySelector("button[name='search-id']");
	searchIdBtn.addEventListener("click", function(e) {
		fetch("http://localhost:3000/user/searchId", {
			mode: "cors",
			method: "POST",
			body: JSON.stringify({
				"email" : searchID[0].value,
				"phone" : searchID[1].value
			})
		})
		.then(() => {
			this.parentNode.parentNode.childNodes[5].value = "";
			this.parentNode.parentNode.childNodes[7].value = "";
		})
		.catch(err => console.log(err));
	});

	let searchPassword = document.querySelectorAll("div[name='search-pw'] input");
	searchPassword[2].addEventListener("keyup", function(e) {
		this.value = phoneFrom(this.value);
	});

	let searchPasswordBtn = document.querySelector("button[name='search-pw']");
	searchPasswordBtn.addEventListener("click", function(e) {
		fetch("http://localhost:3000/user/searchPassword", {
			mode: "cors",
			method: "POST",
			body: JSON.stringify({
				"id" : searchPassword[0].value,
				"email" : searchPassword[1].value,
				"phone" : searchPassword[2].value
			})
		})
		.then(() => {
			this.parentNode.parentNode.childNodes[1].value = "";
			this.parentNode.parentNode.childNodes[5].value = "";
			this.parentNode.parentNode.childNodes[7].value = "";
		})
		.catch(err => console.log(err));
	});

	function emailForm(email) {
		let reg = /\S+@\S+\.\S+/;
		return reg.test(email);
	};
	function popup(code) {
		let box = document.createElement("div");
		let input = document.createElement("input");
		let button = document.createElement("button");

		box.setAttribute("id", "security-box");
		input.setAttribute("id", "security-input");
		button.innerHTML = "인증하기";
		button.addEventListener("click", function(e) {
			if(input.value == code) registerFetch(this);
			else alert("보안문자가 일치하지 않습니다");
		});

		box.append(input, button);
		document.body.append(box);
	};
	function loginFetch(target) {
		fetch("http://localhost:3000/user/login", {
			mode: "cors",
			method: "POST",
			body: JSON.stringify({
				"id" : target[0].value,
				"pw" : target[1].value
			})
		})
		.then( req => {return req.json()})
		.then( res => {
			if(res.message == "success") location.href = "/user";
			else console.log(res);
		});
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
};