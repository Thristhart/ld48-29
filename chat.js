
function ChatFakeWindow(menuname) {
	FakeWindow.call(this, menuname);
}
$.extend(true, ChatFakeWindow.prototype, FakeWindow.prototype);

ChatFakeWindow.prototype.buildBody = function() {
	var container = document.createElement("div");
	this.friendslist = document.createElement("ul");
	this.friendslist.className = "friendslist";
	
	for(var name in friends) {
		var item = friends[name].friendlist_elem = document.createElement("li");
		item.className = "friend"
		
		var name_bar = document.createElement("span");
		name_bar.className = "name";
		name_bar.innerHTML = name;
		
		var profile_pic = document.createElement("img");
		profile_pic.src = "images/" + friends[name].profile_picture;
		profile_pic.className = "profile";
		item.appendChild(profile_pic);
		
		if(friends[name].online) {
			item.className += " online";
		}
		else
			item.className += " offline";
		
		item.appendChild(name_bar);
		this.friendslist.appendChild(item);
	}
	
	container.appendChild(this.friendslist);
	return container;
}
