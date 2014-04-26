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

function register_ingame_links() {
	$("a.ingame_link").click(function(event) {
		goToURL(event.target.href);
		return false;
	});
}

document.onready = setup;