var minimized = {};
var windows = {};
function openWindow(menuname) {
	var matches = menuname.match(/([a-zA-Z]+) - (.*)+/)
	var parameters = null;
	var classname = menuname;
	
	var madeNew = false;
	if(matches) {
		classname = matches[1];
		parameters = matches[2];
	}
	if(minimized[menuname]) {
		$(minimized[menuname].element).show(MAXIMIZE_MINIMIZE_ANIMATION);
		minimized[menuname] = null;
	}
	else if(!windows[menuname]) {
		var obj = window[classname + "FakeWindow"];
		if(parameters)
			windows[menuname] = new obj(menuname, parameters);
		else
			windows[menuname] = new obj(menuname);
		taskbar.addButton(windows[menuname]);
		madeNew = true;
	}
	var jq_win = $(windows[menuname].element);
	
	if(madeNew) {
		jq_win.hide();
		$(windows[menuname].element).show(MAXIMIZE_MINIMIZE_ANIMATION);
	}
	jq_win.click();
	if(jq_win.offset().top > window.innerHeight * .8 || jq_win.offset().left > window.innerWidth * .8 ||
	   jq_win.offset().top < 0 || jq_win.offset().left < 0)
		jq_win.offset({top: 10, left: 10});
	return windows[menuname];
}
var FakeWindow = function(menuname) {
	this.menuname = menuname;
	this.element = this.buildElement();
	document.body.appendChild(this.element);
}
FakeWindow.prototype.buildElement = function() {
	var window = this;
	var base = document.createElement("div");
	$(base).draggable({handle: ".titlebar", scroll: false, containment: "document"});
	$(base).resizable();
	
	base.className = "window " + this.menuname;
	
	base.titlebar = document.createElement("div");
	base.titlebar.className = "titlebar";
	base.titlebar.innerHTML = this.menuname;
	
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
	base.appendChild(this.buildBody());
	
	$(base).click(function() {
		if(focusTarget) {
			focusTarget.style.zIndex = 0;
		}
		base.style.zIndex = 100; // above everything
		focusTarget = base;
	});
	$(base).on('drag', function() {
		$(base).click();
	});
	
	return base;
}
var focusTarget;

FakeWindow.prototype.closed = function() {
	this.element.parentElement.removeChild(this.element);
	delete(this.element);
	delete(windows[this.menuname]);
	taskbar.removeButton(this);
}

FakeWindow.prototype.minimized = function() {
	$(this.element).hide(MAXIMIZE_MINIMIZE_ANIMATION);
	minimized[this.menuname] = this;
}

FakeWindow.prototype.maximized = function() {
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
		this.element.style.left = "0px";
		this.element.style.top = "0px";
		this.element.style.width = "100%";
		this.element.style.height = "100%";
	}
}

FakeWindow.prototype.buildBody = function() {
	return document.createElement("div");
}
