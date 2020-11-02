fetch("http://localhost:3000/userData", {
	mode: "cors",
	method: "GET"
})
.then( req => {return req.json()})
.then(res => {
	id = res.id;
	document.querySelector("#content-head > li").innerHTML = "&nbsp;" + id;
})
.catch(err => console.log(err));

window.onload = () => {
	let btn = document.querySelector('#send-content');
	btn.addEventListener('click', v => {
		fetch("http://localhost:3000/write/write", {
			mode: "cors",
			method: "POST",
			body: JSON.stringify({
				"id" : id,
				"title" : document.querySelector("#title").value,
				"content" : document.querySelector("#content-data").value
			})
		})
		.then(req => {return req.json()})
		.then(res => {
			document.querySelector("#content-head > input").value = "";
			document.querySelector("#content-data").value = "";
			if(res["add data"] == "success") {
				location.href = "http://localhost:3000/write/list";
			}
		})
		.catch(err => console.log(crr));
	});
};