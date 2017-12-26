/*
Title       : Exercise 15 - Hangman Hacktiv8 Games
Author      : Fadhil Mochammad
 */

 //Global variable declaration

 //List of word to guess
var wordList = ['declaration','bootcamp','programming','development','deployment','algorithm','statement','arithmatic','argument','assembly','backend','binary','bitwise','boolean','compile','conditional','constructor','dataflow', 'debugging','declaration','decrement','database','encapsulation','exception','floating','framework','inheritance','invalid','syntax','operator','polymorphism','procedure','pseudocode','recursion','recursive','software','buffer','character','command','compilation','computer','concurrency','compiler','developer','programmer','dynamic','static','element','increment','instance','integer','iteration','private','programmable','pseudolanguage','sequence'];

var gamePlay = 0;
var playerLive = 6;
var liveArray = [];
var answerOutput = [];
var alphabetInput;
var inputTry=0;
var letterCheck = /[a-z]/;
var matchflag = false;
var showAnswer;
var showDump;
var dumpLetter = "";
var checkFlag = false;
var win = false;
var showTitle = "================================================\n\n\t\t\tWelcome to Hangman Hacktiv8 Games!\n\n================================================\n\n";

//Main Menu of the Hangman Game
while(gamePlay == 0){
    //Ask player to input the menu
    var menuChosen = prompt("==================================================\n\t\t\t\tWelcome to Hangman Hacktiv8 Games!\n==================================================\n\n\t\t\t\t\t\t\tMain Menu\n\n\n1. Start the game\n2. How to play\n3. Exit\n\nEnter the number: ");

    //Check whether player input the right digit
    if(!menuChosen.match(/\d/)||Number(menuChosen)<1||Number(menuChosen)>3){
        //alert if player give input other than digit
        alert("Wrong Input! Please give the right input.");
    }

    //Switch between menu
    switch(menuChosen){
        //Play Game
        case '1':
            gamePlay = 1;
            break;
        //How to Play
        case '2':
            alert("==================================================\n\t\t\t\tWelcome to Hangman Hacktiv8 Games!\n==================================================\n\n\t\t\t\t\t\t\tHow to Play\n\n\n1. You only have 6 lives.\n2. Your lives will decrease when you guess the wrong letter.\n3. You will win if you can guess the right word.\n4. We will give you 1 or 2 letter(s) to help you guessing.\n5. Good Luck!");
                break;
            //Exit
            case '3':
                gamePlay = 2;
                break;

    }
}

//Menu to Play Game
while(gamePlay == 1){
    //Randomize word for game from word list
    var wordGuess = wordList[Math.floor(Math.random()*wordList.length)]
    var wordLength = wordGuess.length;
    //Store underscore as much as letters on word to be showed later
    for(var i = 0; i<wordLength; i++){
        answerOutput[i] = "_";
    }
    //Give helping letter for player depends on word length
    if(wordLength<7){
        var randomIndex = Math.floor(Math.random()*wordLength);
        answerOutput[randomIndex] = wordGuess[randomIndex];
    }
    else{
        var randomIndex = Math.floor(Math.random()*(wordLength-5)+5);
        var randomIndex2 = Math.floor(Math.random()*5);
        answerOutput[randomIndex]=wordGuess[randomIndex];
        answerOutput[randomIndex2]=wordGuess[randomIndex2];
    }

    //Start the game
    while (playerLive != 0){
        matchflag = false;
        checkFlag = false;
        inputCorrect = false;
        //Update the word progress
        showAnswer = "\nWord:\t"+answerOutput.join("    ") + "\n";
        //Update letter that player already guessed
        showDump = "\nWrong Letter: "+dumpLetter+"\n";
        //First try or Player not giving the right input, input must be letter from a to z
        while(inputCorrect===false){
                match = 0;
                //First try giving input
                if(inputTry == 0){
                        //Show and update title, hangman draw, player live, player progress, and guessed letter
                        alphabetInput = prompt(showTitle + showHangman(playerLive) +  showLive(playerLive) + showAnswer + showDump + "\nClue: Term in programming\n\nInput a letter: ");
                        //Make sure all letter in lower case
                        alphabetInput = alphabetInput.toLowerCase();
                        inputTry = 1;
                }
                //Check whether player give the right input, which is one letter, not number, not whitespace, not letters
                if(!alphabetInput.match(letterCheck)||alphabetInput.length!=1){
                        //Ask another input from player if give input more than one letter
                        if(alphabetInput.length>1){
                           alphabetInput = prompt(showTitle + showHangman(playerLive) +  showLive(playerLive) + showAnswer + showDump + "\n\nWrong Input! It is more than a character. Input a letter: ");
                         }
                         //Ask another input from player if the input is empty/null
                        else if(alphabetInput.length==0){
                           alphabetInput = prompt(showTitle + showHangman(playerLive) +  showLive(playerLive) + showAnswer + showDump +"\n\nWrong Input! It is empty. Input a letter: ");
                         }
                         //Ask another input if the input is not a letter
                        else{
                           alphabetInput = prompt(showTitle + showHangman(playerLive) +  showLive(playerLive) + showAnswer + showDump +"\n\nWrong Input! It is not a letter. Input a letter: ");
                         }
                         //Make sure the input in lower case
                        alphabetInput = alphabetInput.toLowerCase();
                }
                //Player give the right input
                else{
                        inputCorrect=true;
                        inputTry = 0;
                }
        }
        //Player give the right input (a letter)
        if(inputCorrect){
                //creat new regular expression based on player input to check the player input later
                var dumpCheck = new RegExp(alphabetInput);
                //Check if the letter exist on the word
                for(var i=0; i<wordLength; i++){
                        if(wordGuess[i] == alphabetInput){
                                matchflag = true;
                                //Give flag if not all the particular letter on the word is guessed
                                if(answerOutput[i]=="_"){
                                        checkFlag = true;
                                }
                        }
                }
                //If the all of the particular letter already guessed
                if(checkFlag==false){
                        //Alert player that letter already guessed
                        if(answerOutput.join("").match(dumpCheck)){
                                alert("Letter already guessed! Input another letter!");
                        }
                }
                //Letter not exist on the word
                if(matchflag == false){
                        //Check whether player has input the letter before
                        if(!dumpLetter.match(dumpCheck)){
                                //Player input the new wrong letter, store the new wrong letter
                                dumpLetter+=(alphabetInput)+" ";
                                //Substract player live and give alert
                                playerLive -= 1;
                                if(playerLive>0){
                                        alert('\n\nOoops! Wrong answer! You only have '+playerLive+ ' tries left. :(');
                                }

                        }
                        //Player input the same wrong letter with the previous input
                        else{
                                alert("\n\nYou already input that letter and it was the wrong letter! Input another letter!");
                        }

                }
                //Letter exist in the word
                else{
                        //Open all the same letter in the word
                        for(var counter=0;counter<=wordLength;counter++){
                                if(wordGuess[counter]==alphabetInput){
                                                answerOutput[counter]=alphabetInput;
                                        }
                                }
                }
        }
        //Player succeed to guess the word
        if (answerOutput.join("")===wordGuess){
                playerLive =0;
                win = true;
        }
    }

    //Player out of live
    if(playerLive==0){
        //Player Lose
        if(win == false){
                alert("\n==================================\n\n\t\t\tGAME OVER!\n\n==================================\n\n"+showHangman(playerLive)+"\n\n The word is \""+wordGuess.toUpperCase()+"\". Better luck next time!");
        }
        //Player Win
        else{
                alert("\n===================================\n\n\t\t\tCONGRATULATION!\n\n==================================\n\n\n You can solve the word!")
        }
        gamePlay = 2;
    }
}

//Funtion to show lives bar
function showLive(livesCount){
    liveArray = [];
    for(var liveCounter = 0; liveCounter < livesCount; liveCounter++){
        liveArray[liveCounter] = '\u2665';
    }
    return "Lives left: "+liveArray.join(" ")+"\n";
}



//Function to return string of hangman drawing
function showHangman(lives){
  var returnString;
  switch(lives){
    case 0:
      returnString =  "\t\t    ()==========o\n\t\t    ||\t\t\t       |\n\t\t    ||\t\t\t       0\n\t\t    ||\t\t\t      /|\\ \n\t\t    ||\t\t\t       | \n\t\t    ||\t\t\t      / \\ \n\t\t    ||\n\t       ============\n";
      break;

    case 1:
      returnString =  "\t\t    ()==========o\n\t\t    ||\t\t\t       |\n\t\t    ||\t\t\t       0\n\t\t    ||\t\t\t      /|\\ \n\t\t    ||\t\t\t       | \n\t\t    ||\n\t\t    ||\n\t       ============\n\n";
      break;

    case 2:
      returnString =  "\t\t    ()==========o\n\t\t    ||\t\t\t       |\n\t\t    ||\t\t\t       0\n\t\t    ||\t\t\t      /|\\ \n\t\t    ||\n\t\t    ||\n\t\t    ||\n\t       ============\n\n";
      break;

    case 3:
      returnString =  "\t\t    ()==========o\n\t\t    ||\t\t\t       |\n\t\t    ||\t\t\t       0\n\t\t    ||\t\t\t       |\ \n\t\t    ||\n\t\t    ||\n\t\t    ||\n\t       ============\n\n";
      break;

    case 4:
      returnString =  "\t\t    ()==========o\n\t\t    ||\t\t\t       |\n\t\t    ||\t\t\t       0\n\t\t    || \n\t\t    ||\n\t\t    ||\n\t\t    ||\n\t       ============\n\n";
      break;

    case 5:
      returnString =  "\t\t    ()==========o\n\t\t    ||\t\t\t       |\n\t\t    ||\n\t\t    ||\n\t\t    ||\n\t\t    ||\n\t\t    ||\n\t       ============\n\n";
      break;

    case 6:
      returnString =  "\t\t    ()==========o\n\t\t    ||\n\t\t    ||\n\t\t    ||\n\t\t    ||\n\t\t    ||\n\t\t    ||\n\t       ============\n\n";
      break;
  }
  return returnString;
}
