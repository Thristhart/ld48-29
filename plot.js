var Plot = {
	events: [],
	finishedEvents: []
}

Plot.addEvent = function(event) {
	this.events.push(event);
	event.execute.parent = event;
}

Plot.checkEvents = function() {
	for(var i = 0; i < this.events.length; i++) {
		var triggers = this.events[i].triggers;
		for(var j = 0; j < triggers.length; j++) {
			if(this.checkTrigger(triggers[j])) {
				console.log("triggered");
				this.triggerEvent(this.events[i]);
				i--;
				break;
			}
		}
	}
}

Plot.checkTrigger = function(trigger) {
	console.log(trigger, trigger());
	return trigger();
}

Plot.runEvent = function(event) {
	event.execute();
}

Plot.triggerEvent = function(event) {	
	this.runEvent(event);
	this.events.splice(this.events.indexOf(event), 1);
	this.finishedEvents.push(event);
}

Plot.getEventWithCode = function(code) {
	for(var i = 0; i < this.events.length; i++) {
		if(this.events[i].code == code)
			return this.events[i];
	}
	for(var i = 0; i < this.finishedEvents.length; i++) {
		if(this.finishedEvents[i].code == code)
			return this.finishedEvents[i];
	}
}

Plot.handleAfter = function(after) {
	var event = after;
	if((typeof after) == "string") {
		event = this.getEventWithCode(after);
	}
	this.triggerEvent(event);
}

Plot.checkPrereqs = function(event) {
	for(var i = 0; i < event.prereqs.length; i++) {
		for(var j = 0; j < this.finishedEvents.length; j++) {
			var foundIt = false;
			if(this.finishedEvents[j].code == event.prereqs[i]) {
				foundIt = true;
			}
			if(!foundIt)
				return false;
		}
	}
	return true;
}