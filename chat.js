
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
	
	if(name != "Group")
		item.appendChild(profile_pic);
	
	if(name != "Group") {
		if(friends[name].online) {
			item.className += " online";
		}
		else
			item.className += " offline";
	}
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
			if(target.dataset.name == "Group")
				openWindow("GroupChat")
			else
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
	$(this.element).addClass("chat");
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
		meMessage(chatWindow, chatWindow.currResult.me);
		if(chatWindow.currResult.event && chatWindow.currResult.event.choices || chatWindow.currResult.event.self_choices) {
			if(!chatWindow.currResult.event.remove_choices) {
				var e = chatWindow.currResult.event;
				e.remove_choices = [];
				if(e.choices) {
					for(var k in e.choices) {
						e.remove_choices.push(k);
					}
				}
				if(e.self_choices) {
					for(var k in e.self_choices) {
						e.remove_choices.push(e.self_choices[k].name);
					}
				}
			}
			for(var i = 0; i < chatWindow.currResult.event.remove_choices.length; i++) {
				var select = "a.choice[href='" + chatWindow.currResult.event.remove_choices[i] + "']";
				var c = $(container).find(select);
				c[0].removeAttribute("href");
				if(c[0].parentElement.className == "options") // horrible hack to identify out-of-text choices
					c[0].parentElement.removeChild(c[0]);
				c[0].className = "deadlink";
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
ChatFakeWindow.prototype.reRender = function() {this.friendProfile.innerHTML = buildFriendItem(this.friend.username).innerHTML; this.refreshLog()}

ChatFakeWindow.prototype.refreshLog = function() {
	this.log.innerHTML = this.friend.log || "";
	var chat = this;
	if(!(chat.log.scrollTop = chat.log.scrollHeight)) {
		var retry = setInterval( function() {
			if(chat.log.scrollTop = chat.log.scrollHeight) {
				clearInterval(retry);
			}
		}, 100);
	}
	if(chat.friend.typing) {
		$(chat.typingMessage).show();
		$(chat.options).hide();
	}
	else {
		$(chat.typingMessage).hide();
		$(chat.options).show();
	}
	
	var chatWindow = chat;
	$(this.element).find(".chatlog a.choice").click(function(event) {
		var choice = event.target.dataset.choice;
		var event = Plot.getEventWithCode(event.target.dataset.code);
		console.log(choice, event);
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
		link.dataset.text = opts[i].me;
		link.dataset.eventcode = opts[i].event.code;
		$(link).click(function(clickEvent) {
			chatWindow.inputbox.value = clickEvent.target.dataset.text;
			var event = Plot.getEventWithCode(clickEvent.target.dataset.eventcode);
			for(var j = 0; j < event.self_choices.length; j++) {
				if(event.self_choices[j].name == clickEvent.target.innerHTML) {
					chatWindow.currResult = event.self_choices[j];
				}
			}
			chatWindow.currResult.event = event;
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

function meMessage(window, message, delay) {
	if(!delay) delay = 4000;
	if(!window.friend.log)
		window.friend.log = "";
	if(message != "[Say nothing]")
		window.friend.log += "<b>" + playername + "</b>: " + message + "<br />";
	window.refreshLog();
}

var DEFAULT_DELAY = 3000;
var messageQueue = [];
var currentMessageInterval = null;
function friendMessage(friendName, message, delay) {
	if(!delay) delay = DEFAULT_DELAY;
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

function groupMessage(friendName, message, delay) {
	if(!delay) delay = DEFAULT_DELAY;

	var sourceEvent = arguments.callee.caller.parent; // THIS IS BY FAR THE WORST THING I'VE EVER DONE
	messageQueue.push([friendName, processMessageMarkup(sourceEvent, message), delay, true]);
	friends["Group"].typing = true;
	if(!currentMessageInterval) {
		currentMessageInterval = setTimeout(processMessageQueue, delay * 1 + (.25 * Math.random()) - .125);
	}
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
	
	message = message.replace("(name)", playername);
	return message;
}

function processMessageQueue() {
	currentMessageInterval = null;
	if(messageQueue.length == 0) return;
	var msg = messageQueue.shift();
	var friendName = msg[0];
	var message = msg[1];
	var delay = msg[2];
	var is_group = msg[3];
	if(friendName == "FINISHEVENT") {
		message.finished = true;
		if(message.target && message.target != "Group")
			openChatWindow(friends[message.target]).refreshLog();
	}
	else {
		var friend = friends[friendName];
		if(is_group) {
			var group = openWindow("GroupChat");
			var connector = " ";
			if(message.match(/^\/me/)) {
				message = message.replace("/me", "");
				message += "</i>";
				group.friend.log += "<i>";
			}
			else {
				connector = ": ";
			}
			group.friend.log += buildChatFriendName(friend) + connector + message + "<br />";
			
			var anyLeft = false;
			for(var i = 0; i < messageQueue.length; i++) {
				if(messageQueue[i][3])
					anyLeft = true;
			}
			if(!anyLeft) friends["Group"].typing = false;
			group.refreshLog();
		}
		else {	
			if(!friend.log)
				friend.log = "";
			
			var connector = " ";
			if(message.match(/^\/me/)) {
				message = message.replace("/me", "");
				message += "</i>";
				friend.log += "<i>";
			}
			else {
				connector = ": ";
			}
			friend.log += buildChatFriendName(friend) + connector + message + "<br />";
			
			var anyLeft = false;
			for(var i = 0; i < messageQueue.length; i++) {
				if(messageQueue[i][0] == friendName && !messageQueue[i][3])
					anyLeft = true;
			}
			if(!anyLeft) friends[friendName].typing = false;
			
			openChatWindow(friend).refreshLog();
		}
	}
	if(messageQueue.length > 0)
		currentMessageInterval = setTimeout(processMessageQueue, messageQueue[0][2] * 1 + (.25 * Math.random()) - .125);
}

function buildChatFriendName(friend) {
	return "<b>" + friend.username + "</b>";
}

function GroupChatFakeWindow(menuname) {
	ChatFakeWindow.call(this, menuname, "Group");
}
$.extend(true, GroupChatFakeWindow.prototype, ChatFakeWindow.prototype);

GroupChatFakeWindow.prototype.oldBuildBody = GroupChatFakeWindow.prototype.buildBody;
GroupChatFakeWindow.prototype.buildBody = function() {
	var elem = this.oldBuildBody.call(this, arguments);
	this.typingMessage.parentElement.removeChild(this.typingMessage);
	$(this.friendProfile).removeClass("offline");
	$(this.friendProfile).removeClass("online");
	return elem;
}