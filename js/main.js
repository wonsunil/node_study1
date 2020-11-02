fetch("http://localhost:3000/userData", {
	mode: "cors",
	method: "GET"
}).then( req => {return req.json()})
.then( res => {
	console.log(res);
})
.catch(err => console.log(err));
window.onload = () => {
	slide(3, "#slide", false);
	
};
function slide(length, parent, auto) {
	this.length = length;

	var box = document.createElement("div");
	box.setAttribute("id", "slide-box");

	var childArr = [];

	for(let i = 0; i < length; i++) {
		eval("var slide_Child" + i + "= document.createElement('div');");
		eval("slide_Child" + i).setAttribute("class", "slide-child");
		eval("slide_Child" + i).innerHTML = "준비중입니다";
		childArr.push(eval("slide_Child" + i));
		box.append(eval("slide_Child" + i));
	}

	var btnNameArr = ["left-btn", "right-btn"];
	var buttonBox = document.createElement("div");
	buttonBox.setAttribute("id", "button-box");

	for(let i = 0; i < 2; i++) {
		eval("var slide_btn" + i + "= document.createElement('button')");
		eval("slide_btn" + i).setAttribute("id", btnNameArr[i]);
		buttonBox.append(eval("slide_btn" + i));
	}

	var btnArr = [slide_btn0, slide_btn1];
	var ctn = 0;
	var max = this.length-1;

	btnArr[0].addEventListener("click", function() { //previous button event hanlder
		ctn--;
		if(ctn < 0) ctn = max;
		childArr[ctn].style.left = "0%";
		childArr[ctn].siblings(childArr[ctn]).forEach(item => {
			item.style.left = "100%";
		});
	});
	btnArr[1].addEventListener("click", function() { //next button event hanlder
		ctn++;
		if(ctn > max) ctn = 0;
		childArr[ctn].style.left = "0%";
		childArr[ctn].siblings(childArr[ctn]).forEach(item => {
			item.style.left = "100%";
		});
	});

	box.append(buttonBox);

	parent = document.querySelector(parent);
	parent.append(box);

	var style = document.createElement("style");
	style.append(`
		#slide-box{
			position: relative;
			margin: 0;
			overflow: hidden;
		}
		.slide-child{
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			left: 100%;
		}
		.slide-child:nth-of-type(1) { left: 0%; }
		#left-btn, #right-btn{ position: absolute; }
		#left-btn{ left: 0; }
		#right-btn{ right: 0; }
		`);
	document.head.append(style);

	if(auto) {
		setInterval(function() { //auto slide
			ctn++;
			if(ctn > max) ctn = 0;
			childArr[ctn].style.left = "0%";
			siblings(childArr[ctn]).forEach(item => {
				item.style.left = "100%";
			});
		}, 1500);	
	};
};
Object.prototype.siblings = function (target) {
	var childFilterArr = [...target.parentNode.children].filter(v => v != target);
	childFilterArr = childFilterArr.filter(v => {
		return v.outerHTML.match(new RegExp("slide-child"));
	});
	return childFilterArr;
};