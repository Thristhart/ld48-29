var taskbar;
function setup() {
	console.log("Hello, inquisitive mind!");
	$("#startbutton").click(function(event) {
		$("#menu").toggle();
	});
	$("#menu li").click(function(event) {
		openWindow(event.target.innerHTML);
		$("#startbutton").click();
	});
	
	taskbar = new Taskbar();
}


document.onready = setup;