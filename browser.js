function BrowserFakeWindow(menuname) {
	this.url = "sneakyweb.com";
	FakeWindow.call(this, menuname);
	register_ingame_links();
}
$.extend(true, BrowserFakeWindow.prototype, FakeWindow.prototype);

BrowserFakeWindow.prototype.buildBody = function() {
	var browser = this;
	
	var urlbar_form = document.createElement("form");
	
	this.urlbar = document.createElement("input");
	this.urlbar.className = "urlbar";
	
	urlbar_form.appendChild(this.urlbar);
	
	$(urlbar_form).submit(function(event) {
		goToURL(browser.urlbar.value);
		return false;
	});
	
	var container = document.createElement("div");
	
	this.body = document.createElement("div");
	this.body.innerHTML = this.getBody();
	
	container.appendChild(urlbar_form);
	container.appendChild(this.body);
	return container;
}

BrowserFakeWindow.prototype.getBody = function() {
	console.log(this.url);
	if(this.url.indexOf("http") != -1) {
		var parser = document.createElement('a');
		parser.href = this.url;
		this.url = parser.hostname + parser.pathname;
	}
	this.urlbar.value = this.url;
	return bodies[this.url] || bodies["blocked"];
}

function goToURL(url) {
	var browser = openWindow("Browser");
	browser.url = url;
	browser.body.innerHTML = browser.getBody();
	register_ingame_links();
}
