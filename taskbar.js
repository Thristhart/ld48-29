function Taskbar() {
	this.element = $("#taskbar")[0];
}
Taskbar.prototype.buttonClicked = function(button) {
	$(windows[button.className].element).show();
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
	var butt = $("#taskbar ." + window.menuname)[0]
	taskbar.element.removeChild(butt);
	delete(butt);
}