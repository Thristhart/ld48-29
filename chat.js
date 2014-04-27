
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
	
	this.typingMessage = document.createElement("span");
	this.typingMessage.className = "typing";
	this.typingMessage.innerHTML = this.friend.username + " is typing...";
	
	this.friendProfile = buildFriendItem(this.friend.username);
	
	this.inputbox = document.createElement("input");
	this.inputbox.className = "fakeinput";
	this.inputbox.disabled = true;
	this.sendButton = document.createElement("input");
	this.sendButton.type = "submit";
	this.sendButton.className = "sendMessage";
	this.sendButton.value = "Send";
	this.options = document.createElement("span");
	this.options.className = "options";
	
	var chatWindow = this;
	$(this.sendButton).click(function() {
		if(!chatWindow.currResult)
			return;
		meMessage(chatWindow.friend, chatWindow.currResult.me);
		if(chatWindow.currResult.event && chatWindow.currResult.event.remove_choices) {
			for(var i = 0; i < chatWindow.currResult.event.remove_choices.length; i++) {
				var select = "a.choice[href='" + chatWindow.currResult.event.remove_choices[i] + "']";
				var c = $(container).find(select);
				c[0].removeAttribute("href");
				if(c[0].parentElement.className == "options") // horrible hack to identify out-of-text choices
					c[0].parentElement.removeChild(c[0]);
				c.off("click");
			}
			// save our changes
			chatWindow.friend.log = chatWindow.log.innerHTML;
		}
		chatWindow.currResult.event.finished = true;
		chatWindow.currResult.event.option_selected = true;
		Plot.handleAfter(chatWindow.currResult);
		chatWindow.inputbox.value = "";
		chatWindow.currResult = null;
	});
	
	container.appendChild(this.friendProfile);
	container.appendChild(this.log);
	container.appendChild(this.typingMessage);
	container.appendChild(this.options);
	container.appendChild(this.inputbox);
	container.appendChild(this.sendButton);
	this.refreshLog();
	
	return container;
}

ChatFakeWindow.prototype.refreshLog = function() {
	this.log.innerHTML = this.friend.log || "";
	var chat = this;
	chat.log.scrollTop = chat.log.scrollHeight;
	if(chat.friend.typing) {
		$(chat.typingMessage).show();
		$(chat.options).hide();
	}
	else {
		$(chat.typingMessage).hide();
		$(chat.options).show();
	}
	
	var chatWindow = chat;
	$(".window:contains('Chat - " + chat.friend.username + "') .chatlog a.choice").click(function(event) {
		var choice = event.target.dataset.choice;
		var event = Plot.getEventWithCode(event.target.dataset.code);
		var result = event.choices[choice];
		chatWindow.inputbox.value = result.me;
		chatWindow.currResult = result;
		chatWindow.currResult.event = event;
		return false;
	});
	chatWindow.options.innerHTML = ""; // make sure we don't manage to re-add options
	var opts = Plot.getSelfOptions(this.friend);
	for(var i = 0; i < opts.length; i++) {
		var link = document.createElement("a");
		link.href = opts[i].name;
		link.innerHTML = opts[i].name;
		link.className = "choice";
		var text = opts[i].me;
		var result = opts[i];
		$(link).click(function() {
			chatWindow.inputbox.value = text;
			chatWindow.currResult = result;
			return false;
		});
		chatWindow.options.appendChild(link);
		Plot.triggerEvent(opts[i].event);
	}
	register_ingame_links();
}

function openChatWindow(friend) {
	return openWindow("Chat - " + friend.username);
}

function meMessage(friend, message, delay) {
	if(!delay) delay = 4000;
	if(!friend.log)
		friend.log = "";
	friend.log += "<b>Me</b>: " + message + "<br />";
	openChatWindow(friend).refreshLog();
}

var messageQueue = [];
var currentMessageInterval = null;
function friendMessage(friendName, message, delay) {
	if(!delay) delay = 1000;
	if(friendName == "FINISHEVENT") // terrible hack to finish events after the last message
	{
		messageQueue.push([friendName, message, delay]);
	}
	else {
		var sourceEvent = arguments.callee.caller.parent; // THIS IS BY FAR THE WORST THING I'VE EVER DONE
		messageQueue.push([friendName, processMessageMarkup(sourceEvent, message), delay]);
		friends[friendName].typing = true;
		openChatWindow(friends[friendName]).refreshLog();
	}
	if(!currentMessageInterval) {
		currentMessageInterval = setTimeout(processMessageQueue, delay);
	}
	return;
}

function processMessageMarkup(event, message) {
	var option_reg = /\[([0-9]+)\]\{(.*?)\}/g;
	var option_links;
	while(option_links = option_reg.exec(message)) {
		var num = option_links[1];
		var word = option_links[2];
		var total = "[" + num + "]" + "{" + word + "}";
		var url = "<a class='choice' data-choice=" + num + " data-code='" + event.code + "' href='" + num + "'>" + word + "</a>"
			
		message = message.replace(total, url);
	}
	var browser_reg = /\((.*?)\)\[(.*?)\]/g;
	var browser_links;
	while(browser_links = browser_reg.exec(message)) {
		var href = browser_links[1];
		var word = browser_links[2];
		var total = "(" + href + ")" + "[" + word + "]";
		var url = "<a class='ingame_link' href='" + href + "'>" + word + "</a>"
		message = message.replace(total, url);
	}
	return message;
}

function processMessageQueue() {
	currentMessageInterval = null;
	if(messageQueue.length == 0) return;
	var msg = messageQueue.shift();
	var friendName = msg[0];
	var message = msg[1];
	var delay = msg[2];
	if(friendName == "FINISHEVENT") {
		message.finished = true;
		if(message.target)
			openChatWindow(friends[message.target]).refreshLog();
	}
	else {
		var friend = friends[friendName];
		if(!friend.log)
			friend.log = "";
		friend.log += buildChatFriendName(friend) + message + "<br />";
		
		
		var anyLeft = false;
		for(var i = 0; i < messageQueue.length; i++) {
			if(messageQueue[i][0] == friendName)
				anyLeft = true;
		}
		if(!anyLeft) friends[friendName].typing = false;
		openChatWindow(friend).refreshLog();
	}
	if(messageQueue.length > 0)
		currentMessageInterval = setTimeout(processMessageQueue, messageQueue[0][2]);
}

function buildChatFriendName(friend) {
	return "<b>" + friend.username + "</b>: ";
}