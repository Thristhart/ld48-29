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
	prereqs: [],
	triggers: [],
	execute: function() {
		friendMessage("Handler", "They're all various petty hackers and script kiddies. None should be a threat. Check out their (http://sneaky.link/profiles)[case profiles].");
		friendMessage("Handler", "Once you're done reading up, start interacting with them and get this done, ASAP.");
	},
});
Plot.addEvent({
	code: "handler_cover",
	prereqs: [],
	triggers: [],
	execute: function() {
		friendMessage("Handler", "Yes. Take a look at your (http://sneaky.link/cover)[cover identity].");
	},
});
Plot.addEvent({
	code: "handler_document",
	prereqs: [],
	triggers: [],
	execute: function() {
		friendMessage("Handler", "That information is very highly classified. Unfortunately, we are unable to give you more than that.");
		friendMessage("Handler", "Just work with the fact that the document was stolen from a major installation. It should not be hard to encourage these script kiddies to brag about their score.");
	},
});
Plot.addEvent({
	code: "group_hello",
	prereqs: [],
	triggers: [],
	execute: function() {},
	target: "Group",
	self_choices: [{
		name: "Anyone here?",
		me: "Hey, anyone around?",
		after: "group_greetings"
	}],
	autorun: true
});
Plot.addEvent({
	code: "group_greetings",
	prereqs: ["group_hello"],
	triggers: [],
	execute: function() {
		groupMessage("Barcelona", "Hello.", 1000);
		groupMessage("lassyfair", "heyyy", 1000);
		groupMessage("plood", "here.", 1000);
		groupMessage("HatSama", "Hey... ^_^", 1000);
	},
	target: "Group",
	self_choices: [{
		name: "How you guys doing?",
		me: "How are you guys doing? What're you up to?",
		after: "group_what_you_doing"
	}, {
		name: "Any news?",
		me: "You guys got any news for me?",
		after: "group_news"
	}]
});
Plot.addEvent({
	code: "group_what_you_doing",
	prereqs: ["group_greetings"],
	triggers: [],
	execute: function() {
		groupMessage("plood", "I making [1]{business}.");
		groupMessage("HatSama", "Nm... just chillin.");
		groupMessage("Wherez", "I'm just [2]{Surfing the Web}!");
	},
	choices: {
		1: {
			me: "What kind of business, plood?",
			after: "group_plood_business"
		},
		2: {
			me: "Wherez, you sound like a bad impersonation of the nineties.",
			after: "group_wherez_totally_legit",
		}
	},
	target: "Group",
});
Plot.addEvent({
	code: "group_plood_business",
	prereqs: ["group_what_you_doing"],
	triggers: [],
	execute: function() {
		groupMessage("plood", "I selling very secret paper.");
		groupMessage("plood", "Many clients interesting in it");
		groupMessage("plood", "you maybe interesting? give bid?");
		groupMessage("Wherez", "I would like to place a bid on this private document!");
		groupMessage("plood", "pm plz");
	},
});
Plot.addEvent({
	code: "group_wherez_totally_legit",
	prereqs: ["group_what_you_doing"],
	triggers: [],
	execute: function() {
		friendMessage("Wherez", "Dude, shut up. You're [1]{blowing my cover}.");
		groupMessage("Wherez", "Don't be silly! I am speaking just like the rest of us.");
		groupMessage("Wherez", "Changing the subject, how about that big score last month?");
		groupMessage("Barcelona", "Do you mean a sports score?");
		groupMessage("Wherez", "No! I heard someone managed to steal an important document from the government!");
		groupMessage("lassyfair", "whoever it is sounds awesome to me");
	},
	choices: {
		1: {
			me: "What? Your cover?",
			after: "wherez_my_cover",
		}
	}
});
Plot.addEvent({
	code: "group_news",
	prereqs: ["group_greetings"],
	triggers: [],
	execute: function() {
		groupMessage("lassyfair", "nothing but the continuing trampling of our rights by the man");
		groupMessage("Barcelona", "Oh good, more of this.");
		groupMessage("lassyfair", "you got a problem?");
		groupMessage("HatSama", "oooo! catfight!");
		groupMessage("lassyfair", "shut up.", 1000);
		groupMessage("Barcelona", "Shut up.", 500);
		groupMessage("Barcelona", "I'm just saying, can't you get a new conversation topic? This is all you ever talk about.");
	},
	target: "Group",
	self_choices: [{
		name: "Say nothing",
		me: "...",
		after: "group_lassyfair_rant"
	}, {
		name: "Leave her alone",
		me: "Come on Barcelona, lighten up! Leave her alone.",
		after: "group_barcelona_rant"
	}]
});
Plot.addEvent({
	code: "group_lassyfair_rant",
	prereqs: ["group_news"],
	triggers: [],
	execute: function() {
		groupMessage("lassyfair", "fuck off");
		groupMessage("lassyfair", "you wanna talk about today's weather?");
		groupMessage("lassyfair", "or you could be like hatty over there and we can gossip about boys while we do our nails?");
		groupMessage("HatSama", "^_^;", 1000);
		groupMessage("lassyfair", "sure I talk about THE SYSTEMATIC OPPRESSION OF OUR RIGHTS a lot, oh no");
		groupMessage("lassyfair", "sorry for caring, damn");
	},
	target: "Group",
});
Plot.addEvent({
	code: "group_barcelona_rant",
	prereqs: ["group_news"],
	triggers: [],
	execute: function() {
		groupMessage("Barcelona", "Excuse me?", 1000);
		groupMessage("Barcelona", "Lighten up? How long have you been here, new guy? Two weeks? At best?");
		groupMessage("Barcelona", "I have been running this show for more years than you've been using a computer.");
		groupMessage("Barcelona", "You want to come in here and tell me to lighten up?");
		groupMessage("Barcelona", "The nerve!");
	},
	target: "Group",
});
Plot.addEvent({
	code: "hi_to_skiddy",
	prereqs: [],
	triggers: [],
	execute: function() {},
	target: "RiceBeans2001",
	self_choices: [{
		name: "Hello",
		me: "Sup.",
		after: "skiddy_hi1"
	}],
	autorun: true
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
	prereqs: ["skiddy_kit"],
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
Plot.addEvent({
	code: "skiddy_taunt",
	prereqs: [""],
	triggers: [],
	execute: function() {
		friendMessage("RiceBeans2001", "what the fuck did you just fucking say about me");
		friendMessage("RiceBeans2001", "you little bitch", 1000);
		friendMessage("RiceBeans2001", "i'll have you know i graduated top of my class in the navy seals, and i've been involved in numerous secret raids on al-quaeda, and i have over 300 confirmed kills. i am trained in gorilla warfare and i'm the top sniper in the entire us armed forces. you are nothing to me but just another target. i will wipe you the fuck out with precision the likes of which has never been seen before on this earth, mark my fucking words. you think you can get away with saying that shit to me over the internet? think again, fucker. as we speak i am contacting my secret network of spies across the usa and your ip is being traced right now so you better prepare for the storm, maggot. the storm that wipes out the pathetic little thing you call your life. you're fucking dead, kid. i can be anywhere, anytime, and i can kill you in over seven hundred ways, and that's just with my bare hands. not only am i extensively trained in unarmed combat, but i have access to the entire arsenal of the united states marine corps and i will use it to its full extent to wipe your miserable ass off the face of the continent, you little shit. if only you could have known what unholy retribution your little \"clever\" comment was about to bring down upon you, maybe you would have held your fucking tongue. but you couldn't, you didn't, and now you're paying the price, you goddamn idiot. i will shit fury all over you and you will drown in it. you're fucking dead, kiddo.", 5000);
		friendMessage("RiceBeans2001", "lol j/k i aint mad");
		friendMessage("RiceBeans2001", "but really tho don't be [1]{a dick}");
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