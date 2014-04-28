var Plot = {
	events: [],
	finishedEvents: [],
	runningEvents: []
}

Plot.addEvent = function(event) {
	this.events.push(event);
	event.execute.parent = event;
}

Plot.checkEvents = function() {
	for(var i = 0; i < this.runningEvents.length; i++) {
		if(this.runningEvents[i].finished) {
			if(this.runningEvents[i].choices || this.runningEvents[i].self_choices) {
				if(this.runningEvents[i].option_selected) {
					Plot.finishEvent(this.runningEvents[i]);
					i--;
				}
			}
			else {
				Plot.finishEvent(this.runningEvents[i]);
				i--;
			}
		}
	}
	for(var i = 0; i < this.events.length; i++) {
		if(!Plot.checkPrereqs(this.events[i]))
			continue;
		var triggers = this.events[i].triggers;
		for(var j = 0; j < triggers.length; j++) {
			if(this.checkTrigger(triggers[j])) {
				this.triggerEvent(this.events[i]);
				i--;
				break;
			}
		}
	}
}

Plot.checkTrigger = function(trigger) {
	return trigger();
}

Plot.runEvent = function(event) {
	this.runningEvents.push(event);
	event.execute();
	friendMessage("FINISHEVENT", event, 200);
}

Plot.triggerEvent = function(event) {
	if(!event || this.runningEvents.indexOf(event) != -1)
		return; // don't re-run events
	this.runEvent(event);
	var evIndex = this.events.indexOf(event);
	if(evIndex != -1)
		this.events.splice(evIndex, 1); // remove from event list while running
	console.log(event.code);
}
Plot.finishEvent = function(event) {
	console.log("Finished ", event);
	reRender = true;
	if(event.after) {
		event.after();
	}
	var evIndex = this.events.indexOf(event);
	if(evIndex != -1)
		this.events.splice(evIndex, 1); // in case it's still there somehow
	var runningIndex = this.runningEvents.indexOf(event);
	if(runningIndex != -1)
		this.runningEvents.splice(runningIndex, 1);
	this.finishedEvents.push(event);
}

Plot.getEventWithCode = function(code) {
	for(var i = 0; i < this.events.length; i++) {
		if(this.events[i].code == code)
			return this.events[i];
	}
	for(var i = 0; i < this.runningEvents.length; i++) {
		if(this.runningEvents[i].code == code)
			return this.runningEvents[i];
	}
	for(var i = 0; i < this.finishedEvents.length; i++) {
		if(this.finishedEvents[i].code == code)
			return this.finishedEvents[i];
	}
}

Plot.selfOpts = {}
Plot.getSelfOptions = function(friend) {
	var opts = [];
	var events = this.events.concat(this.runningEvents);
	for(var i = 0; i < events.length; i++) {
		if(!Plot.checkPrereqs(events[i]))
			continue;
		if(!events[i].autorun && !events[i].triggeredByEvent)
			continue;
		if(events[i].target == friend.username && events[i].self_choices)
		{
			for(var j = 0; j < events[i].self_choices.length; j++) {
				var option = events[i].self_choices[j];
				option.event = events[i];
				opts.push(option);
			}
		}
	}
	return opts;
}

Plot.handleAfter = function(event) {
	var after = event.after;
	if((typeof after) == "string") {
		after = this.getEventWithCode(after);
	}
	after.triggeredByEvent = true;
	this.triggerEvent(after);
}

Plot.not_run = function(eventCode) {
	return function() {
		for(var i = 0; i < Plot.events.length; i++) {
			if(Plot.events[i].code == eventCode)
				return true;
		}
		return false;
	};
}

Plot.checkPrereqs = function(event) {
	if(!event.prereqs)
		return true;
	for(var i = 0; i < event.prereqs.length; i++) {
		if((typeof event.prereqs[i]) == "string") {
			var foundIt = false;
			for(var j = 0; j < this.finishedEvents.length; j++) {
				if(this.finishedEvents[j].code == event.prereqs[i]) {
					foundIt = true;
				}
			}
			if(!foundIt)
				return false;
		}
		else {
			var result = event.prereqs[i]();
			if(!result)
				return false;
		}
	}
	return true;
}