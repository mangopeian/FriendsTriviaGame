var triviaQuestions = [{
	question: "WHICH CHARACTER MOUTHS THE WORDS TO THE SONG IN THE OPENING CREDITS?",
	answerList: ["Ross", "Phoebe", "Rachel", "Joey"],
	answer: 2
},{
	question: "WHAT NAME IS CHANDLER'S TV GUIDE ADDRESSED TO?",
	answerList: ["Miss Chanandler Bong", "Chandy Binger", "Chandler Bing", "Joey Tribiani"],
	answer: 0
},{
	question: "WHICH SOAP OPERA DOES JOEY ACT IN?",
	answerList: ["General Hospital", "Days of Our Lives", "Passions", "All My Children"],
	answer: 1
},{
	question: "WHAT DOES PHOEBE LEGALLY CHANGE HER NAME TO??",
	answerList: ["Crapbag.", "Princess Consuela Banana Hammock", "Countess Ursula Buffet", "Nestle Tollhouse"],
	answer: 1
},{
	question: "HOW MANY YEARS APART ARE MONICA AND RICHARD??",
	answerList: ["5", "18", "10", "21"],
	answer: 3
},{
	question: "WHY DID CHANDLER BREAK UP WITH HIS FIRST GIRLFRIEND?",
	answerList: ["He didn't love her anymore.", "She was a lesbian.", "She was fat.", "She had an obnoxious laugh."],
	answer: 3
},{
	question: "WHAT IS THE NAME OF PHOEBE'S MOST-PLAYED SONG?",
	answerList: ["Smelly Cat", "Ode to a Pubic Hair", "Two of Them Kissed Last Night", "I'll Be There for You"],
	answer: 0
},{
	question: "WHICH OF THE FOLLOWING IS NOT THE NAME OF AN EX-BOYFRIEND?",
	answerList: ["Barry", "Gunther", "Fun Bobby", "Daivd"],
	answer: 1
},{
	question: "WHAT COMIC BOOK DID ROSS CREATE AS A CHILD?",
	answerList: ["Science Boy", "Superman", "Dinosaur Troopers", "Flying Guy"],
	answer: 0
},{
	question: "WHERE WAS THE FIRST PLACE RACHEL AND ROSS HAD SEX?",
	answerList: ["Her apartment", "Central Perk", "His apartment", "The museum"],
	answer: 3
},{
	question: "WHO PEED ON MONICA'S JELLYFISH STING?",
	answerList: ["Chandler", "Monica", "Joey", "Chandler and Joey"],
	answer: 3
},{
	question: "WHAT DOES MONICA KEEP IN HER SECRET CLOSET?",
	answerList: ["Picture of and letters from Richard", "Junk food", "Messy junk", "Expensive China dishes"],
	answer: 2
},{
	question: "WHAT'S JOEY'S FAVORITE FOOD?",
	answerList: ["Sandwiches", "Pizza", "Turkey", "Cake"],
	answer: 0
},{
	question: "WHAT IS FRANK'S FAVORITE THING TO DO?",
	answerList: ["Ride his skateboard", "Spend time with Alice", "Melt things", "Eat sandwiches"],
	answer: 2
},{
	question: "WHO DID ROSS HOOK UP WITH WHEN HE AND RACHEL WERE ON A BREAK?",
	answerList: ["Charlie", "Copy girl", "Carol", "Coffee girl"],
	answer: 1
}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Correct!",
	incorrect: "You were not paying attention!",
	endTime: "Time is up!",
	finished: "YOUR RESULT:"
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}