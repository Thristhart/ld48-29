Plot.addEvent({
	code: "splash",
	triggers: [function() { return true }],
	execute: function() {
		var splash = buildSplashScreen();
		document.body.appendChild(splash);
		$(splash).submit(function(event) {
			var name = $(splash).find("input")[0].value;
			if(name != "")
				playername = name;
			
			var anim = SPLASH_ANIMATION;
			anim.complete = function() {
				setTimeout(function() {
					Plot.finishEvent(Plot.getEventWithCode("splash"));
				}, 1500); // give some time to take in the desktop
			}
			$(".splash").hide(anim);
			return false;
		});
	},
	after: function() {
	},
	choices: {} // make it pause
});
Plot.addEvent({
	code: "init",
	prereqs: ["splash"],
	triggers: [function() { return true }],
	execute: function() {
		friendMessage("Handler", "Hello, agent (name). Prepare to be briefed on your new assignment.", 100);
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
	code: "wherez_hello",
	prereqs: [Plot.not_run("group_wherez_totally_legit")],
	triggers: [],
	execute: function() {
	},
	target: "Wherez",
	self_choices: [{
		name: "Hello",
		me: "Hello there.",
		after: "wherez_greeting"
	}],
	autorun: true
});
Plot.addEvent({
	code: "barcelona_hello",
	prereqs: [function() {return !friends["Barcelona"].angry}],
	triggers: [],
	execute: function() {
	},
	target: "Barcelona",
	self_choices: [{
		name: "Hi",
		me: "Hi.",
		after: "barcelona_greeting"
	}],
	autorun: true
});
Plot.addEvent({
	code: "barcelona_greeting",
	prereqs: [],
	triggers: [],
	execute: function() {
		friendMessage("Barcelona", "Hello, (name). [1]{How are you?}");
	},
	target: "Barcelona",
	choices: {
		1 : {
			me: "I'm fine, thanks.",
			after: "barcelona_smalltalk"
		}
	},
	self_choices: [{
		name: "I heard you had quite an accomplishment.",
		me: "I heard you had quite an accomplishment recently.",
		after: "barcelona_accomplishment"
	}]
});
Plot.addEvent({
	code: "barcelona_smalltalk",
	prereqs: [],
	triggers: [],
	execute: function() {
		friendMessage("Barcelona", "That's good. What have you been [1]{up to} recently?");
	},
	target: "Barcelona",
	choices: {
		1 : {
			me: "Not much. I heard you had quite an accomplishment recently.",
			after: "barcelona_accomplishment"
		}
	},
});
Plot.addEvent({
	code: "barcelona_accomplishment",
	prereqs: [],
	triggers: [],
	execute: function() {
		friendMessage("Barcelona", "Oh? And [1]{what accomplishment} would that be?");
	},
	target: "Barcelona",
	choices: {
		1 : {
			me: "I was hoping you could tell me.",
			after: "barcelona_tellme"
		}
	},
});
Plot.addEvent({
	code: "barcelona_tellme",
	prereqs: [],
	triggers: [],
	execute: function() {
		friendMessage("Barcelona", "And where would the [1]{fun} in that be? More fun to keep you [2]{guessing}.");
	},
	target: "Barcelona",
	choices: {
		1 : {
			me: "If you want fun, we could play a game for it.",
			after: "barcelona_fun"
		},
		2 : {
			me: "Cut the crap. What'd you steal?",
			after: "barcelona_shock"
		},
	},
});
Plot.addEvent({
	code: "barcelona_shock",
	prereqs: [],
	triggers: [],
	execute: function() {
		friendMessage("Barcelona", "Excuse me?"); // urg bad endings are boring but wtf do I do with this
		friendMessage("Barcelona", "Steal? I'm no thief!");
		friendMessage("Barcelona", "Who do you take me for?");
		friendMessage("Barcelona", "That pisses me off!");
		friendMessage("Barcelona", "Don't bother messaging me anymore, jerk.");
	},
	target: "Barcelona",
});
Plot.addEvent({
	code: "barcelona_fun",
	prereqs: [],
	triggers: [],
	execute: function() {
		potential_trivia = [
			["What is the capital of Brazil?", "Brasilia", "Rio de Janeiro", "Sao Paulo"],
			["What does sushi mean?", "Sour rice", "Raw fish", "Japanese food"],
			["Who invented the lightbulb?", "Humphry Davy", "Thomas Edison", "Nikola Tesla"],
		];
		var trivia = potential_trivia[Math.floor(Math.random()*potential_trivia.length)];
		console.log(trivia);
		var question = trivia[0];
		var answer = trivia[1];
		var wrong = trivia.slice(2, 4);
		
		var indexes = [1, 2, 3].sort(function(){return Math.random()*10 > 5 ? 1 : -1;})
		
		console.log(trivia, question, answer, wrong, indexes);
		
		var opts = [];
		opts[indexes[0]] = "[" + indexes[0] + "]{" + answer + "}";
		opts[indexes[1]] = "[" + indexes[1] + "]{" + wrong[0] + "}";
		opts[indexes[2]] = "[" + indexes[2] + "]{" + wrong[1] + "}";
		
		var event = Plot.getEventWithCode("barcelona_fun");
		event.choices[indexes[0]] = {
			me: answer,
			after: "barcelona_correct"
		}
		event.choices[indexes[1]] = {
			me: wrong[1],
			after: "barcelona_incorrect"
		}
		event.choices[indexes[2]] = {
			me: wrong[2],
			after: "barcelona_incorrect"
		}
		friendMessage("Barcelona", "Alright, I'm game! If you can answer this simple trivia right, I'll answer your simple trivia.");
		friendMessage("Barcelona", trivia[0] + " " + opts[1] + ", " + opts[2] + ", or " + opts[3], 6000);
	},
	choices: {
		1 : {
			me: "Answer",
			after: "barcelona_incorrect"
		},
		2 : {
			me: "Answer",
			after: "barcelona_incorrect"
		},
		3 : {
			me: "Answer",
			after: "barcelona_incorrect"
		},
	},
	target: "Barcelona",
});
Plot.addEvent({
	code: "barcelona_incorrect",
	prereqs: [],
	triggers: [],
	execute: function() {
		friendMessage("Barcelona", "Nope! Too bad.");
		friendMessage("Barcelona", "Guess you'll never know!");
	},
	target: "Barcelona",
});
Plot.addEvent({
	code: "barcelona_correct",
	prereqs: [],
	triggers: [],
	execute: function() {
		friendMessage("Barcelona", "You're right!");
		friendMessage("Barcelona", "Alright, fair is fair.");
		friendMessage("Barcelona", "I got [1]{married!}");
	},
	choices: {
		1 : {
			me: "You got married? That's your big secret accomplishment?",
			after: "barcelona_yup"
		}
	},
	target: "Barcelona",
});
Plot.addEvent({
	code: "barcelona_yup",
	prereqs: [],
	triggers: [],
	execute: function() {
		friendMessage("Barcelona", "Marriage is a big deal!");
		friendMessage("Barcelona", "It's hard to find someone who's as perfect as my husband.");
		friendMessage("Barcelona", "Anyway, I'm tired of these games. Nice chatting with you.");
	},
	target: "Barcelona",
});
Plot.addEvent({
	code: "hatsama_hello",
	prereqs: [],
	triggers: [],
	execute: function() {
	},
	target: "HatSama",
	self_choices: [{
		name: "Hey there.",
		me: "Hey there.",
		after: "hatsama_greeting"
	}],
	autorun: true
});
Plot.addEvent({
	code: "hatsama_greeting",
	prereqs: [],
	triggers: [],
	execute: function() {
		friendMessage("HatSama", "howdy! ^-^");
		friendMessage("HatSama", "[1]{how are you}...?");
	},
	target: "HatSama",
	choices: {
		1 : {
			me: "I'm alright. How are you?",
			after: "hatsama_smalltalk"
		}
	},
});
Plot.addEvent({
	code: "hatsama_smalltalk",
	prereqs: [],
	triggers: [],
	execute: function() {
		friendMessage("HatSama", "I'm great! I just finished watching yesterday's [1]{Assault on Giant} episode :D");
		friendMessage("HatSama", "as usual, [2]{barc and lassy} didn't care, though...");
	},
	target: "HatSama",
	choices: {
		1 : {
			me: "What's Assault on Giant?",
			after: "hatsama_aog"
		},
		2 : {
			me: "\"barc and lassy\"? Barcelona and lassyfair?",
			after: "hatsama_bac"
		}
	},
});
Plot.addEvent({
	code: "hatsama_bac",
	prereqs: [],
	triggers: [],
	execute: function() {
		friendMessage("HatSama", "yeah...");
		friendMessage("HatSama", "they really love to fight each other");
		friendMessage("HatSama", "and sometimes I think they spend so much time fighting that they don't even notice me...");
		friendMessage("HatSama", "They never [1]{listen to me} or [2]{take me seriously} anymore...");
	},
	target: "HatSama",
	choices: {
		1 : {
			me: "I'm sure they listen to you more than you think.",
			after: "hatsama_listen"
		},
		2 : {
			me: "Why wouldn't they take you seriously?",
			after: "hatsama_seriously"
		},
	},
});
Plot.addEvent({
	code: "hatsama_aog",
	prereqs: [],
	triggers: [],
	execute: function() {
		friendMessage("HatSama", "omg it's the best!");
		friendMessage("HatSama", "the plot is so tragic and everyone is so sad");
		friendMessage("HatSama", "but there's so much action, too!");
		friendMessage("HatSama", "I wish I had [1]{someone to talk about it with}...");
	},
	target: "HatSama",
	choices: {
		1 : {
			me: "I don't know much about it, but you can chat with me about it if you like.",
			after: "hatsama_aog2"
		},
	},
});
Plot.addEvent({
	code: "hatsama_aog2",
	prereqs: [],
	triggers: [],
	execute: function() {
		friendMessage("HatSama", "...really...? awesome... ^_^;");
		friendMessage("HatSama", "I wish the others would [1]{take me seriously} like you do...");
	},
	target: "HatSama",
	choices: {
		1 : {
			me: "Why do you think they don't take you seriously?",
			after: "hatsama_seriously"
		},
	},
});
Plot.addEvent({
	code: "hatsama_seriously",
	prereqs: [],
	triggers: [],
	execute: function() {
		friendMessage("HatSama", "Because they think I'm not as good with computers as them... :<");
		friendMessage("HatSama", "just because I don't blab about it all the time doesn't mean I don't have skills...");
		friendMessage("HatSama", "even when I pwned that [1]{government server}, they just zoned me out. [2]{they just don't listen} anymore :(");
	},
	target: "HatSama",
	choices: {
		1 : {
			me: "Wait, what server?",
			after: "hatsama_server"
		},
		2: {
			me: "I'm sure they listen more than you think.",
			after: "hatsama_listen"
		},
	},
});
Plot.addEvent({
	code: "hatsama_server",
	prereqs: [],
	triggers: [],
	execute: function() {
		friendMessage("HatSama", "I completely owned a .gov server recently! ^_^");
		friendMessage("HatSama", "I had root for two straight hours and got almost everything off it...");
		friendMessage("HatSama", "I sent lassy the data but she's completely ignored me.");
		friendMessage("HatSama", "it made me so mad that I deleted it... but I regret that now... V_V");
	},
	target: "HatSama",
});
Plot.addEvent({
	code: "hatsama_listen",
	prereqs: [],
	triggers: [],
	execute: function() {
		friendMessage("HatSama", "I wish...");
		friendMessage("HatSama", "Anyway, thanks for listening...");
		friendMessage("HatSama", "you're cool.");
	},
	target: "HatSama",
});
Plot.addEvent({
	code: "lassyfair_hello",
	prereqs: [],
	triggers: [],
	execute: function() {
		friendMessage("lassyfair", "you [1]{with the man}?");
	},
	target: "lassyfair",
	choices: {
		1 : {
			me: "What?",
			after: "lassyfair_withtheman"
		},
	},
	autorun: true
});
Plot.addEvent({
	code: "lassyfair_withtheman",
	prereqs: [],
	triggers: [],
	execute: function() {
		friendMessage("lassyfair", "you're either with the man or against the man");
		friendMessage("lassyfair", "so are you gonna [1]{fight for what's right}");
		friendMessage("lassyfair", "or are you gonna [2]{stand by} and let them trample all over us");
	},
	target: "lassyfair",
	choices: {
		1 : {
			me: "I'm here to help.",
			after: "lassyfair_help"
		},
		2 : {
			me: "I'm not going to get involved.",
			after: "lassyfair_nohelp"
		},
	},
});
Plot.addEvent({
	code: "lassyfair_nohelp",
	prereqs: [],
	triggers: [],
	execute: function() {
		friendMessage("lassyfair", "then stop talking to me."); // this is stupid and I hate it
	},
	target: "lassyfair",
});
Plot.addEvent({
	code: "lassyfair_help",
	prereqs: [],
	triggers: [],
	execute: function() {
		friendMessage("lassyfair", "alright then. what are you [1]{useful} for? what about [2]{that kit} I heard you were working on?");
	},
	choices: {
		1 : {
			me: "I'm an alright programmer. And devilishly charming!",
			after: "lassyfair_goaway"
		},
		2 : {
			me: "That kit's almost ready. You could beta test, if you like?",
			after: "lassyfair_kit"
		},
	},
	target: "lassyfair",
});
Plot.addEvent({
	code: "lassyfair_goaway",
	prereqs: [],
	triggers: [],
	execute: function() {
		friendMessage("lassyfair", "ugh. go away");
	},
	target: "lassyfair",
});
Plot.addEvent({
	code: "lassyfair_kit",
	prereqs: [],
	triggers: [],
	execute: function() {
		friendMessage("lassyfair", "shit, I'm down. send it my way.");
		friendMessage("lassyfair", "/me received toolkit.exe");
		friendMessage("lassyfair", "alright sweet imma run this right now");
		friendMessage("lassyfair", "/me is now offline");
	},
	self_choices: [{
		name: "Alright, sending.",
		me: "Alright, sending.",
		after: "lassyfair_dc"
	},
	{
		name: "Never mind.",
		me: "Never mind.",
		after: "lassyfair_goaway"
	}],
	target: "lassyfair",
});
Plot.addEvent({
	code: "lassyfair_dc",
	prereqs: [],
	triggers: [],
	execute: function() {
		friendMessage("lassyfair", "/me received toolkit.exe");
		friendMessage("lassyfair", "alright, this better be good");
		friendMessage("lassyfair", "/me is now offline");
	},
	after: function() {
		friends["lassyfair"].offline = true;
	},
	target: "lassyfair",
});
Plot.addEvent({
	code: "lassyfair_files",
	prereqs: ["hatsama_server", function() {return friends["lassyfair"].online}],
	triggers: [],
	execute: function() {
	},
	target: "lassyfair",
	self_choices: [{
		name: "HatSama said she sent you some files.",
		me: "HatSama said she sent you some files.",
		after: "lassyfair_hatfiles"
	}],
});
Plot.addEvent({
	code: "lassyfair_hatfiles",
	prereqs: [],
	triggers: [],
	execute: function() {
		friendMessage("lassyfair", "yeah, she did");
		friendMessage("lassyfair", "probably some anime shit [1]{I didn't look}");
	},
	target: "lassyfair",
	choices: {
		1 : {
			me: "You should take a look. I think they're important.",
			after: "lassyfair_filecontents"
		},
	},
});
Plot.addEvent({
	code: "lassyfair_filecontents",
	prereqs: [],
	triggers: [],
	execute: function() {
		friendMessage("lassyfair", "alright alright gimme a sec");
		friendMessage("lassyfair", "woah", 6000);
		friendMessage("lassyfair", "these files...");
		friendMessage("lassyfair", "they're an apology from the developer for the fact that he ran out of time");
		friendMessage("lassyfair", "and there's no real ending to this game!");
	},
	target: "lassyfair",
});
Plot.addEvent({
	code: "plood_hello",
	prereqs: [],
	triggers: [],
	execute: function() {
	},
	target: "plood",
	self_choices: [{
		name: "Hello!",
		me: "Hello!",
		after: "plood_greeting"
	}],
	autorun: true
});
Plot.addEvent({
	code: "plood_greeting",
	prereqs: [],
	triggers: [],
	execute: function() {
		friendMessage("plood", "Hello, friend.");
		friendMessage("plood", "Are you interesting in [1]{money}?");
	},
	target: "plood",
	choices: {
		1 : {
			me: "What money?",
			after: "plood_offer"
		}
	},
});
Plot.addEvent({
	code: "plood_offer",
	prereqs: [],
	triggers: [],
	execute: function() {
		friendMessage("plood", "Money from trade. You help [1]{sell}, you get [2]{cut}, yes?");
	},
	target: "plood",
	choices: {
		1 : {
			me: "What are we selling?",
			after: "plood_selling"
		},
		2 : {
			me: "How much of a cut?",
			after: "plood_negotiate",
		},
	},
});
Plot.addEvent({
	code: "plood_selling",
	prereqs: [],
	triggers: [],
	execute: function() {
		friendMessage("plood", "We sell [1]{papers}! Hard to get, secret papers. [2]{Not supposed to have}, see?");
	},
	target: "plood",
	choices: {
		1 : {
			me: "What kind of papers are these?",
			after: "plood_papers"
		},
		2 : {
			me: "How did you get them?",
			after: "plood_notsupposed",
		},
	},
});
Plot.addEvent({
	code: "plood_negotiate",
	prereqs: [],
	triggers: [],
	execute: function() {
		friendMessage("plood", "You get many more than pizza boy!");
		friendMessage("plood", "This is once in lifetime chance. [1]{Papers} can be hard to acquire.");
		friendMessage("plood", "Work with me, we get papers we [2]{not supposed to get}.");
	},
	target: "plood",
	choices: {
		1 : {
			me: "What kind of papers are these?",
			after: "plood_papers"
		},
		2 : {
			me: "How did you get them?",
			after: "plood_notsupposed",
		},
	},
});
Plot.addEvent({
	code: "plood_papers",
	prereqs: [],
	triggers: [],
	execute: function() {
		friendMessage("plood", "Many! Snowman, halloween, my favorite, popcorn.");
		friendMessage("plood", "They very rare!");
		friendMessage("plood", "They worth many bells. It is best game from Japan.");
	},
	target: "plood",
	self_choices: [{
		name: "You were talking about a game...",
		self: "You were talking about a game...",
		after: "plood_yup"
	}]
});
Plot.addEvent({
	code: "plood_notsupposed",
	prereqs: [],
	triggers: [],
	execute: function() {
		friendMessage("plood", "Yes! Some show up only with, how you say, force?");
		friendMessage("plood", "Easiest, I only have to change time.");
		friendMessage("plood", "But hardest, I have to Gameshark, yes?");
	},
	target: "plood",
	self_choices: [{
		name: "You were talking about a game...",
		self: "You were talking about a game...",
		after: "plood_yup"
	}]
});
Plot.addEvent({
	code: "plood_notsupposed",
	prereqs: [],
	triggers: [],
	execute: function() {
		friendMessage("plood", "Of course!");
	},
	target: "plood",
});
Plot.addEvent({
	code: "wherez_greeting",
	prereqs: [],
	triggers: [],
	execute: function() {
		friendMessage("Wherez", "Hello, [1]{agent} (name).");
	},
	target: "Wherez",
	choices: {
		1 : {
			me: "How did you know I'm an agent?",
			after: "wherez_told"
		}
	},
});
Plot.addEvent({
	code: "wherez_told",
	prereqs: ["wherez_greeting"],
	triggers: [],
	execute: function() {
		friendMessage("Wherez", "[1]{My people} told me you'd be coming weeks ago.");
		friendMessage("Wherez", "Didn't your people [2]{tell you} about me?");
	},
	target: "Wherez",
	choices: {
		1: {
			me: "Who are your people?",
			after: "wherez_my_people",
		},
		2: {
			me: "I'm beginning to think there's a lot of things I wasn't told.",
			after: "wherez_details"
		},
	}
});
Plot.addEvent({
	code: "wherez_my_cover",
	prereqs: ["group_wherez_totally_legit"],
	triggers: [],
	execute: function() {
		friendMessage("Wherez", "Yes, my [3]{cover}!.");
		friendMessage("Wherez", "I've been gaining their trust for months now.");
		friendMessage("Wherez", "[1]{My people} told me you'd be coming weeks ago.");
		friendMessage("Wherez", "Didn't your people [2]{tell you?}");
	},
	choices: {
		1: {
			me: "Who are your people?",
			after: "wherez_my_people",
		},
		2: {
			me: "I'm beginning to think there's a lot of things I wasn't told.",
			after: "wherez_details"
		},
		3: {
			me: "Your cover is flimsy and obvious. How have they not figured you out?",
			after: "wherez_obvious"
		}
	}
});
Plot.addEvent({
	code: "wherez_obvious",
	prereqs: ["wherez_my_cover"],
	triggers: [],
	execute: function() {
		friendMessage("Wherez", "Then explain to me how [1]{they haven't figured out for months now}?");
		friendMessage("Wherez", "My cover is rock-solid. They all love me!");
		friendMessage("Wherez", "Haven't you been [2]{reading my status reports?}");
	},
	choices: {
		1: {
			me: "What makes you so sure they haven't figured it out?",
			after: "wherez_they're_criminals"
		},
		2: {
			me: "Apparently not. What do they say?",
			after: "wherez_details",
		},
	}
});
Plot.addEvent({
	code: "wherez_they're_criminals",
	prereqs: ["wherez_obvious"],
	triggers: [],
	execute: function() {
		friendMessage("Wherez", "Because I'm still alive!");
		friendMessage("Wherez", "These are hardened criminals. You know what they do to moles like me?");
		friendMessage("Wherez", "Actually, that's a good point. We should avoid direct contact if we can.");
		friendMessage("Wherez", "Don't respond to this message.");
	},
});
Plot.addEvent({
	code: "wherez_my_people",
	prereqs: ["wherez_my_cover"],
	triggers: [],
	execute: function() {
		friendMessage("Wherez", "The Department of Digital Infiltration?");
		friendMessage("Wherez", "We've been sending your department status updates for years.");
		friendMessage("Wherez", "Don't you guys [1]{read those}?");
	},
	choices: {
		1: {
			me: "Apparently not. What do they say?",
			after: "wherez_details",
		},
	}
});
Plot.addEvent({
	code: "wherez_details",
	prereqs: ["wherez_my_cover"],
	triggers: [],
	execute: function() {
		friendMessage("Wherez", "We've been sending you guys details about this group for a while.");
		friendMessage("Wherez", "lassyfair and Barcelona have a long-standing feud, but I think they secretly respect each other.", 5000);
		friendMessage("Wherez", "I'm a hundred percent confident HatSama is a guy, by the way.", 5000);
		friendMessage("Wherez", "This one we're less sure about, but my pet theory is that plood is perfectly fluent - he just chooses to speak like that.", 5000);
		friendMessage("Wherez", "And I think RiceBeans2001 is just plood's alt. Makes sense, doesn't it?", 5000);
		friendMessage("Wherez", "Anyway, I'm cutting off contact. We don't know eachother. Do not respond.");
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
		name: "[Say nothing]",
		me: "[Say nothing]",
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
		groupMessage("HatSama", "^_^;", 2000);
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
			me: "I'm made of time. Let's hear it.",
			after: "skiddy_story"
		}
	}
});
Plot.addEvent({
	code: "skiddy_story",
	prereqs: [""],
	triggers: [],
	execute: function() {
		friendMessage("RiceBeans2001", "alright so i'm playing videogames as usual");
		friendMessage("RiceBeans2001", "nothing in particular just screwing around yknow");
		friendMessage("RiceBeans2001", "and this dude messages me and his name is all censored");
		friendMessage("RiceBeans2001", "i work my charm on him and he sent me this program");
		friendMessage("RiceBeans2001", "he claims it can show me a whole new world of hacking");
		friendMessage("RiceBeans2001", "long story short [1]{i've leveled up}, yknow?");
		friendMessage("RiceBeans2001", "i can get into [2]{any server} i want");
	},
	choices: {
		1: {
			me: "Wait, are you still talking about a game?",
			after: "skiddy_game"
		},
		2: {
			me: "Any server? Have you used that recently?",
			after: "skiddy_recently"
		}
	}
});
Plot.addEvent({
	code: "skiddy_game",
	prereqs: ["skiddy_story"],
	triggers: [],
	execute: function() {
		friendMessage("RiceBeans2001", "isn't life a game, man");
		friendMessage("RiceBeans2001", "j/k i'm talking about servers");
		friendMessage("RiceBeans2001", "this program shows me this list of targets, see");
		friendMessage("RiceBeans2001", "and they're all overlaid on this map of the world");
		friendMessage("RiceBeans2001", "they're all at my fingertips");
		friendMessage("RiceBeans2001", "watch, ill prove it to you");
		friendMessage("RiceBeans2001", "/me is now offline");
	},
	after: function() {
		friends["RiceBeans2001"].online = false;
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
	prereqs: [],
	triggers: [],
	execute: function() {
		friendMessage("RiceBeans2001", "/me received toolkit.exe");
		friendMessage("RiceBeans2001", "alright sweet imma run this right now");
		friendMessage("RiceBeans2001", "/me is now offline");
	},
	after: function() {
		friends["RiceBeans2001"].online = false;
	},
});
Plot.addEvent({
	code: "skiddy_taunt",
	prereqs: [""],
	triggers: [],
	execute: function() {
		friendMessage("RiceBeans2001", "what the fuck did you just fucking say about me");
		friendMessage("RiceBeans2001", "[2]{you little bitch}", 1000);
		friendMessage("RiceBeans2001", "i'll have you know i graduated top of my class in the navy seals, and i've been involved in numerous secret raids on al-quaeda, and i have over 300 confirmed kills. i am trained in gorilla warfare and i'm the top sniper in the entire us armed forces. you are nothing to me but just another target. i will wipe you the fuck out with precision the likes of which has never been seen before on this earth, mark my fucking words. you think you can get away with saying that shit to me over the internet? think again, fucker. as we speak i am contacting my secret network of spies across the usa and your ip is being traced right now so you better prepare for the storm, maggot. the storm that wipes out the pathetic little thing you call your life. you're fucking dead, kid. i can be anywhere, anytime, and i can kill you in over seven hundred ways, and that's just with my bare hands. not only am i extensively trained in unarmed combat, but i have access to the entire arsenal of the united states marine corps and i will use it to its full extent to wipe your miserable ass off the face of the continent, you little shit. if only you could have known what unholy retribution your little \"clever\" comment was about to bring down upon you, maybe you would have held your fucking tongue. but you couldn't, you didn't, and now you're paying the price, you goddamn idiot. i will shit fury all over you and you will drown in it. you're fucking dead, kiddo.", 5000);
		friendMessage("RiceBeans2001", "lol j/k i aint mad");
		friendMessage("RiceBeans2001", "but really tho don't be [1]{a dick}");
	},
	choices: {
		1: {
			me: "Alright, sorry. As a way of apology, you want to try the kit I'm working on?",
			after: "skiddy_dc"
		},
		2: {
			me: "If you want to be a little shit, I can stop bothering you.",
			after: "skiddy_ragequit"
		}
	}
});
Plot.addEvent({
	code: "skiddy_ragequit",
	prereqs: [],
	triggers: [],
	execute: function() {
		friendMessage("RiceBeans2001", "fine");
		friendMessage("RiceBeans2001", "/me is now offline");
	},
	after: function() {
		friends["RiceBeans2001"].online = false;
	},
});
