Plot.addEvent({
	code: "init",
	prereqs: [],
	triggers: [function() { return true }],
	execute: function() {
		friendMessage("Handler", "Hello, agent. Prepare to be briefed on your new assignment.", 100);
		friendMessage("Handler", "We have [2]{inserted} you into a group of six suspected [1]{cyberterrorists}.");
		friendMessage("Handler", "Our sources have reason to believe that one of them has stolen a [3]{very sensitive document} from our servers.", 5000);
		friendMessage("Handler", "We want you to identify which one is responsible, and either neutralize them or find evidence that we can move on.");
		friendMessage("Handler", "Welcome to the seedy underbelly beneath the surface of the Internet. Good luck.");
	},
	after: function() {
		friends["RiceBeans2001"].online = true;
		friends["Barcelona"].online = true;
		friends["plood"].online = true;
		friends["lassyfair"].online = true;
		friends["Wherez"].online = true;
		friends["HatSama"].online = true;
	},
	choices: {
		1 : { 
			me: "Cyberterrorists? How dangerous are they?",
			after: "handler_cyberterror"
		},
		2 : { 
			me: "Inserted? Have you already set up my relationship?",
			after: "handler_cover"
		},
		3 : { 
			me: "What's this very sensitive document?",
			after: "handler_document"
		}
	},
	remove_choices: []
});
Plot.addEvent({
	code: "handler_cyberterror",
	prereqs: ["init"],
	triggers: [],
	execute: function() {
		friendMessage("Handler", "They're all various petty hackers and script kiddies. None should be a threat. Check out their (http://sneaky.link/profiles)[case profiles].");
		friendMessage("Handler", "Once you're done reading up, start interacting with them and get this done, ASAP.");
	},
});
Plot.addEvent({
	code: "handler_cover",
	prereqs: ["init"],
	triggers: [],
	execute: function() {
		friendMessage("Handler", "Yes. Take a look at your (http://sneaky.link/cover)[cover identity].");
	},
});
Plot.addEvent({
	code: "handler_document",
	prereqs: ["init"],
	triggers: [],
	execute: function() {
		friendMessage("Handler", "That information is very highly classified. Unfortunately, we are unable to give you more than that.");
		friendMessage("Handler", "Just work with the fact that the document was stolen from a major installation. It should not be hard to encourage these script kiddies to brag about their score.");
	},
});
Plot.addEvent({
	code: "hi_to_skiddy",
	prereqs: ["init"],
	triggers: [],
	execute: function() {},
	target: "RiceBeans2001",
	self_choices: [{
		name: "Hello",
		me: "Sup.",
		after: "skiddy_hi1"
	}]
});
Plot.addEvent({
	code: "skiddy_hi1",
	prereqs: ["hi_to_skiddy"],
	triggers: [],
	target: "RiceBeans2001",
	execute: function() {
		friendMessage("RiceBeans2001", "yo");
		friendMessage("RiceBeans2001", "how's [1]{that kit} you were working on going");
	},
	self_choices: [{
		name: "How about you?",
		me: "Forget about that. You manage anything great recently?",
		after: "skiddy_manage"
	}],
	choices: {
		1 : { 
			me: "That kit is going great. Works like a charm.",
			after: "skiddy_kit"
		},
	},
});
Plot.addEvent({
	code: "skiddy_manage",
	prereqs: ["skiddy_hi1"],
	triggers: [],
	execute: function() {
		friendMessage("RiceBeans2001", "dude i've got so much goin on right now");
		friendMessage("RiceBeans2001", "you don't wanna hear about it it's a [1]{friggin novel}");
		friendMessage("RiceBeans2001", "unless you got a [2]{lot of time on your hands}");
	},
	choices: {
		1: {
			me: "And just like a novel, mostly fiction.",
			after: "skiddy_taunt"
		},
		2: {
			me: "For you, I'm made of time. Let's hear it.",
			after: "skiddy_story"
		}
	}
});
Plot.addEvent({
	code: "skiddy_kit",
	prereqs: ["skiddy_hi1"],
	triggers: [],
	execute: function() {
		friendMessage("RiceBeans2001", "yo [1]{hook me up}");
		friendMessage("RiceBeans2001", "i'm always down for [2]{beta testing}");
	},
	choices: {
		1: {
			me: "Alright. Make sure to run this soon - I want feedback.",
			after: "skiddy_dc"
		},
		2: {
			me: "What makes you qualified for a beta test? What have you accomplished recently?",
			after: "skiddy_manage"
		}
	}
});
Plot.addEvent({
	code: "skiddy_dc",
	prereqs: ["skiddy_hi1"],
	triggers: [],
	execute: function() {
		friendMessage("RiceBeans2001", "/me received toolkit.exe");
		friendMessage("RiceBeans2001", "alright sweet imma run this right now");
		friendMessage("RiceBeans2001", "/me is now offline");
	},
	after: function() {
		friends["RiceBeans2001"].online = false;
	},
	choices: {
		1: {
			me: "Alright. Make sure to run this soon - I want feedback.",
			after: "skiddy_dc"
		},
		2: {
			me: "What makes you qualified for a beta test? What have you accomplished recently?",
			after: "skiddy_manage"
		}
	}
});