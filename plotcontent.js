Plot.addEvent({
	code: "init",
	prereqs: [],
	triggers: [function() { return true }],
	execute: function() {
		friendMessage("Handler", "Hello, agent. Prepare to be briefed on your new assignment.", 100);
		friendMessage("Handler", "We have [2]{inserted} you into a group of six suspected [1]{cyberterrorists}.");
		friendMessage("Handler", "Our sources have reason to believe that one of them has stolen a [3]{very sensitive document} from our servers.", 5000);
		friendMessage("Handler", "We want you to identify which one is responsible, and either neutralize them or find evidence that we can move on.");
		friendMessage("Handler", "Welcome to the seedy underbelly beneath the surface of the Internet.");
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
	}
});
Plot.addEvent({
	code: "handler_cyberterror",
	prereqs: ["init"],
	triggers: [],
	execute: function() {
		friendMessage("Handler", "They're all various petty hackers and script kiddies. None should be a threat. Check out their (http://sneakyweb.com/profiles)[case profiles].");
		friendMessage("Handler", "Once you're done reading up, start interacting with them and get this done, ASAP.");
	},
});
Plot.addEvent({
	code: "handler_cover",
	prereqs: ["init"],
	triggers: [],
	execute: function() {
		friendMessage("Handler", "Yes. Take a look at your (http://sneakyweb.com/cover)[cover identity].");
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