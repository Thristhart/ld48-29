function Taskbar() {
	this.element = $("#taskbar")[0];
}
Taskbar.prototype.buttonClicked = function(button) {
	openWindow(button.innerHTML);
}
Taskbar.prototype.addButton = function(window) {
	var button = document.createElement("a");
	var tbar = this;
	
	button.innerHTML = window.menuname;
	button.className = window.menuname;
	
	this.element.appendChild(button);
	
	$(button).click(function() {
		tbar.buttonClicked(button);
	});
}

Taskbar.prototype.removeButton = function(window) {
	var selector = "#taskbar :contains('" + window.menuname + "')";
	var butt = $(selector)[0]
	taskbar.element.removeChild(butt);
	delete(butt);
}