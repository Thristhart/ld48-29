var minimized = {};
var windows = {};
function openWindow(menuname) {
	if(minimized[menuname]) {
		$(minimized[menuname].element).show();
	}
	else {
		var obj = window[menuname + "Window"];
		windows[menuname] = new obj(menuname);
		taskbar.addButton(windows[menuname]);
	}
}

var Window = function(menuname) {
	this.element = this.buildElement();
	document.body.appendChild(this.element);
	this.menuname = menuname;
}
Window.prototype.buildElement = function() {
	var window = this;
	var base = document.createElement("div");
	$(base).draggable({handle: ".titlebar", scroll: false, containment: "document"});
	$(base).resizable();
	
	base.className = "window";
	
	base.titlebar = document.createElement("div");
	base.titlebar.className = "titlebar";
	
	base.closeButton = document.createElement("a");
	base.closeButton.className = "button close";
	$(base.closeButton).click(function() { 
		window.closed();
	});
	
	base.minimizeButton = document.createElement("a");
	base.minimizeButton.className = "button minimize";
	$(base.minimizeButton).click(function() { 
		window.minimized();
	});
	
	base.maximizeButton = document.createElement("a");
	base.maximizeButton.className = "button maximize";
	$(base.maximizeButton).click(function() { 
		window.maximized();
	});
	
	base.titlebar.appendChild(base.closeButton);
	base.titlebar.appendChild(base.minimizeButton);
	base.titlebar.appendChild(base.maximizeButton);
	
	base.appendChild(base.titlebar);
	return base;
}

Window.prototype.closed = function() {
	this.element.parentElement.removeChild(this.element);
	delete(this.element);
	delete(windows[this.menuname]);
	taskbar.removeButton(this);
}

Window.prototype.minimized = function() {
	$(this.element).hide();
	minimized[this.menuname] = this;
}

Window.prototype.maximized = function() {
	if(this.maxed) {
		this.element.style.width = this.oldwidth;
		this.element.style.height = this.oldheight;
		this.element.style.left = this.oldleft;
		this.element.style.top = this.oldtop;
		this.maxed = false;
	}
	else {
		this.maxed = true;
		this.oldwidth = this.element.style.width;
		this.oldheight = this.element.style.height;
		this.oldleft = this.element.style.left;
		this.oldtop = this.element.style.top;
		this.element.style.width = "100%";
		this.element.style.height = "100%";
		this.element.style.left = "0px";
		this.element.style.top = "0px";
	}
}

function BrowserWindow(menuname) {
	Window.call(this, menuname);
}
$.extend(true, BrowserWindow.prototype, Window.prototype);

