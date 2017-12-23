// Define variables for the game

var startGame;
var gameHTML;
var counter = 30;
var questionArray = ["Which of the following vegetables is not one of the ingredients of V-8 juice?", "What country produces the most potatoes?", "What soft-drink company introduced the brand Slice?", "According to a 1980s Beverage Media poll of four hundred bartenders, what is the average male customers favorite drink?", "According to a 1980s Beverage Media poll of four hundred bartenders, what was the female customers favorite drink?", "Which grade of olive oil is considered the best?", "In the drink called a zombie, what is the main alcoholic ingredient?", "Of the following dishes, which are not typically made with some kind of seafood?", "Which of the following compounds have not been approved for use in the U.S. as an artificial sweetener?", "Marzipan is made with what kind of nut?"];
var answerArray = [["Beet", "Carrot", "Spinach", "Cabbage"], ["China", "United States", "Ireland", "Russia"], ["Dr. Pepper", "Coca Cola", "Seven Up", "Pepsico"], ["Beer", "Bourbon", "Scotch", "Vodka"], ["Beer", "Margarita", "Peach Schnapps and Orange Juice", "White Wine"], ["Extra Virgin", "Pure Virgin", "Superfine Virgin"], ["Beer", "Brandy", "Rum", "Whiskey"], ["Bouillabaisse", "Osso Buco", "Fritto Misto", "Tempura"], ["Acesulfame K", "Acetaminophen", "Aspartame", "Saccharine"], ["Almond", "Cashew", "Pecan", "Walnut"]];
var imageArray = ["<img class='center-block img-right' src='../images/Cabbage.gif'>", "<img class='center-block img-right' src='../images/China.gif'>", "<img class='center-block img-right' src='../images/Coca_Cola.gif'>", "<img class='center-block img-right' src='../images/Beer.gif'>", "<img class='center-block img-right' src='../images/White_Wine.gif'>", "<img class='center-block img-right' src='../images/Extra_Virgin.gif'>", "<img class='center-block img-right' src='../images/Rum.gif'>", "<img class='center-block img-right' src='../images/Osso_Buco.gif'>", "<img class='center-block img-right' src='../images/Acetaminophen.gif'>","<img class='center-block img-right' src='../images/Almond.gif'>"];
var correctAnswers = ["D: Cabbage", "A: China", "B. Coca Cola", "A. Beer", "D: White Wine", "A: Extra Virgin", "C: Rum", "B: Osso Buco", "B: Acetaminophen", "A: Almond"];
var questionCounter = 0;
var selecterAnswer;
var theClock;
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var clickSound = new Audio("sound/button-click.mp3");

// Create a function that creates the start button and the initial screen

$(document).ready(function() {
	// Create a function that creates the start button and initial screen
	
	function initialScreen() {
		startGame = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
		$(".mainArea").html(startGame);
	}
	
	initialScreen();
	
	//Create a function, generateHTML(), that is triggered by the start button, and generates the HTML seen on the project video...
	
	$("body").on("click", ".start-button", function(event){
		event.preventDefault();
		clickSound.play();
		generateHTML();
	
		timerWrapper();
	
	}); // End Start
	
	$("body").on("click", ".answer", function(event){
		// If the correct answer is selected alert "Correct" else alert "Wrong Answer!"
		clickSound.play();
		selectedAnswer = $(this).text();
		if(selectedAnswer === correctAnswers[questionCounter]) {
			clearInterval(theClock);
			generateWin();
		}
		else {
			clearInterval(theClock);
			generateLoss();
		}
	});
	
	$("body").on("click", ".reset-button", function(event){
		clickSound.play();
		resetGame();
	});
	
	});
	
	function generateLossDueToTimeOut() {
		unanswered++;
		gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
		$(".mainArea").html(gameHTML);
		setTimeout(wait, 2000);
	}
	
	function generateWin() {
		correct++;
		gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
		$(".mainArea").html(gameHTML);
		setTimeout(wait, 2000);
	}
	
	function generateLoss() {
		incorrect++;
		gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
		$(".mainArea").html(gameHTML);
		setTimeout(wait, 2000); 
	}
	
	function generateHTML() {
		gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
		$(".mainArea").html(gameHTML);
	}
	
	function wait() {
		if (questionCounter < 10) {
		questionCounter++;
		generateHTML();
		counter = 30;
		timerWrapper();
		}
		else {
			finalScreen();
		}
	}
	
	function timerWrapper() {
		theClock = setInterval(thirtySeconds, 1000);
		function thirtySeconds() {
			if (counter === 0) {
				clearInterval(theClock);
				generateLossDueToTimeOut();
			}
			if (counter > 0) {
				counter--;
			}
			$(".timer").html(counter);
		}
	}
	
	function finalScreen() {
		gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
		$(".mainArea").html(gameHTML);
	}
	
	function resetGame() {
		questionCounter = 0;
		correct = 0;
		incorrect = 0;
		unanswered = 0;
		counter = 30;
		generateHTML();
		timerWrapper();
	}	