fetch("http://localhost:3000/userData")
.then(req => {return req.json()})
.then(res => {

})
.catch(err => console.log(err));

fetch("http://localhost:3000/write/ListData", {
	mode: "cors",
	method: "GET"
})
.then(req => {return req.json()})
.then(res => {
	let list = document.querySelector("#list");
	res.data.forEach(item => {
		makeWriteBox(list, item);
	});
});

function makeWriteBox(list, item) {
	let box = document.createElement("div");
	let writer = document.createElement("li");
	let title = document.createElement("li");
	let small_content = document.createElement("li");
	let date = document.createElement("li");

	box.setAttribute("class", "list-box");
	writer.setAttribute("class", "writer");
	title.setAttribute("class", "title");
	small_content.setAttribute("class", "small-content");
	date.setAttribute("class", "date");

	writer.innerHTML = item.ID;
	title.innerHTML = item.Title;
	small_content.innerHTML = "준비중입니다.";
	date.innerHTML = item.UpdatedTime.substring(0, 10);

	// let popup_box = document.createElement("div");
	// let popup_content = document.createElement("div");
	// let close_btn = document.createElement("button");

	// popup_box.setAttribute("class", "popup-box");

	// popup_content.setAttribute("class", "popup-content");

	// close_btn.setAttribute("class", "close-btn");
	// close_btn.innerHTML = "X";
	// close_btn.addEventListener("click", function(e) {
	// 	console.log(this.parentNode);
	// });

	// popup_content.append(writer, title, item.Content);
	// popup_box.append(popup_content, close_btn);
	box.append(writer, title, small_content, date);
	list.append(box);
};