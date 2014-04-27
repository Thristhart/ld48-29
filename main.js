var taskbar;
var playername = "Smith";
function setup() {
	console.log("Hello, inquisitive mind!");
	$("#startbutton").click(function(event) {
		$("#menu").toggle(STARTMENU_ANIMATION);
	});
	$("#menu li").click(function(event) {
		openWindow(event.target.innerHTML);
		$("#startbutton").click();
	});
	
	taskbar = new Taskbar();
	
	setInterval(function() {
		Plot.checkEvents();
		if(reRender) {
			reRender = false;
			for(var win in windows) {
				windows[win].reRender();
			}
		}
	}, 500);
}

function buildSplashScreen() {
	var splash = document.createElement("form");
	splash.className = "splash";
	var image = document.createElement("img");
	image.src = "images/startmenu.png";
	var input = document.createElement("input");
	input.setAttribute("placeholder", "username");
	splash.appendChild(image);
	splash.appendChild(input);
	return splash;
}

var reRender = false;

function register_ingame_links() {
	$("a.ingame_link").off("click"); // make sure all click handlers are gone
	$("a.ingame_link").click(function(event) {
		goToURL(event.target.href);
		return false;
	});
	$("a").click(function(event) {
		return false; // ensure no links ever take us out
	});
}

document.onready = setup;