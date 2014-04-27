MAXIMIZE_MINIMIZE_ANIMATION = {
	effect: "scale",
	complete: function(event) { if(this.dataset.menuname.indexOf("Chat") != -1) windows[this.dataset.menuname].refreshLog()},
	origin: [600, 0]
}

STARTMENU_ANIMATION = {
	effect: "slide",
	direction: "down"
}

SPLASH_ANIMATION = {
	effect: "fade",
	easing: "easeInExpo",
	duration: 800
}
