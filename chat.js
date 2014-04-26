
function FriendsFakeWindow(menuname) {
	FakeWindow.call(this, menuname);
}
$.extend(true, FriendsFakeWindow.prototype, FakeWindow.prototype);

function buildFriendItem(name) {
	var item = friends[name].friendlist_elem = document.createElement("li");
	item.className = "friend"
	item.dataset.name = name;
	
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
	
	return item;
}
FriendsFakeWindow.prototype.buildBody = function() {
	var container = document.createElement("div");
	this.friendslist = document.createElement("ul");
	this.friendslist.className = "friendslist";
	
	for(var name in friends) {
		var item = buildFriendItem(name);
		$(item).click(function(event) {
			var target = event.target;
			if(target.tagName == "SPAN")
				target = target.parentElement;
			console.log(target);
			openChatWindow(friends[target.dataset.name]);
		});
		this.friendslist.appendChild(item);
	}
	
	container.appendChild(this.friendslist);
	return container;
}

function ChatFakeWindow(menuname, friendName) {
	this.friend = friends[friendName];
	FakeWindow.call(this, menuname);
}
$.extend(true, ChatFakeWindow.prototype, FakeWindow.prototype);

ChatFakeWindow.prototype.buildBody = function() {
	var container = document.createElement("div");
	
	this.log = document.createElement("div");
	this.log.className = "chatlog";
	this.log.innerHTML = this.friend.log;
	
	this.friendProfile = buildFriendItem(this.friend.username);
	
	this.inputbox = document.createElement("input");
	this.inputbox.className = "fakeinput";
	this.sendButton = document.createElement("input");
	this.sendButton.type = "submit";
	this.sendButton.className = "sendMessage";
	this.sendButton.value = "Send";
	
	container.appendChild(this.friendProfile);
	container.appendChild(this.log);
	container.appendChild(this.inputbox);
	container.appendChild(this.sendButton);
	return container;
}

function openChatWindow(friend) {
	openWindow("Chat - " + friend.username);
}