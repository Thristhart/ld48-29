function BrowserFakeWindow(menuname) {
	this.url = "sneakyweb.com";
	this.history = [];
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
	
	this.backButton = document.createElement("a");
	this.backButton.innerHTML = "&#9664;";
	this.backButton.className = "backButton"
	$(this.backButton).click(function() {
		browser.back();
	});
	
	
	this.body = document.createElement("div");
	this.body.innerHTML = this.getBody();
	
	container.appendChild(urlbar_form);
	container.appendChild(this.backButton);
	container.appendChild(this.body);
	
	return container;
}

BrowserFakeWindow.prototype.back = function() {
	if(this.history.length == 0)
		return;
	goToURL(this.history.pop(), true);
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

function goToURL(url, ignoreHistory) {
	var browser = openWindow("Browser");
	if(!ignoreHistory && browser.url != url) {
		browser.history.push(browser.url);
	}
	browser.url = url;
	browser.body.innerHTML = browser.getBody();
	register_ingame_links();
}
