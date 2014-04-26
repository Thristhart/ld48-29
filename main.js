function setup() {
	console.log("Hello, inquisitive mind!");
	$("#startbutton").click(function(event) {
		$("#menu").toggle();
	});
	$("#menu li").click(function(event) {
		console.log(event.target.innerText);
	});
}


document.onready = setup;