function Taskbar() {
	this.element = $("#taskbar")[0];
}
Taskbar.prototype.buttonClicked = function(button) {
	openfakeWindow(button.innerHTML);
}
Taskbar.prototype.addButton = function(fakeWindow) {
	var button = document.createElement("a");
	var tbar = this;
	
	button.innerHTML = fakeWindow.menuname;
	button.className = fakeWindow.menuname;
	
	this.element.appendChild(button);
	
	$(button).click(function() {
		tbar.buttonClicked(button);
	});
}

Taskbar.prototype.removeButton = function(fakeWindow) {
	var selector = "#taskbar :contains('" + fakeWindow.menuname + "')";
	var butt = $(selector)[0]
	taskbar.element.removeChild(butt);
	delete(butt);
}

Taskbar.prototype.highlight = function(fakeWindow) {
	var selector = "#taskbar :contains('" + fakeWindow.dataset.menuname + "')";
	var butt = $(selector);
	butt.addClass("focused");
}
Taskbar.prototype.unhighlight = function(fakeWindow) {
	var selector = "#taskbar :contains('" + fakeWindow.dataset.menuname + "')";
	var butt = $(selector);
	butt.removeClass("focused");
}