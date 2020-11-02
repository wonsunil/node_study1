fetch("http://localhost:3000/userData", {
	mode: "cors",
	method: "GET"
})
.then( req => {return req.json()})
.then(res => {
	console.log(res);
	if(res.id == "" && res.email == "" && res.phone == "") {
		alert("로그인 후 이용가능한 서비스입니다.");
		location.href = "/login";
	}else {
		document.querySelector("#name").innerHTML += res.id;
		document.querySelector("#email").innerHTML += res.email;
		phone = res.phone.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,"$1-$2-$3");
		document.querySelector("#phone").innerHTML += phone;
		document.querySelector("#rank").innerHTML += res.rank;
	};
})
.catch(err => console.log(err));
window.onload = () => {
	let changeData = document.querySelector("#change-data");
	changeData.addEventListener("click", () => {
		location.href = "localhost:3000/user/changeInfo";
	});

	let logout = document.querySelector("#logout");
	logout.addEventListener("click", v => {
		fetch("http://localhost:3000/user/logout", {
			mode: "cors",
			method: "POST"
		});
		location.href = "/main";
	});
};