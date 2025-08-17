// Grab answer and wordlist from ejs
let ans = parsed_ans.toUpperCase();
let wrdList = parsed_wrdList;

let curGuess = "";
const letButtons = document.getElementsByClassName("letButton");
const tileRows = document.getElementsByClassName("tile-row");
let curRow = tileRows[0];
let curTile = curRow.firstElementChild;

// Set functionality of letter buttons
for (let letter_button of letButtons) {
  letter_button.onclick = () => {
    if (!curTile.nextElementSibling) {
      return;
    } else {
      curTile.innerText = letter_button.innerText;
      curTile = curTile.nextElementSibling;
    }
  };
}
// Set functionality of delete button
const delButton = document.getElementById("delButton");
delButton.onclick = () => {
  if (curTile.previousElementSibling) {
    curTile = curTile.previousElementSibling;
    curTile.innerText = "";
  }
};

// Set functionality of enter button
const entButton = document.getElementById("entButton");
entButton.onclick = () => {
  // If not completed word do nothing.
  if (curTile.nextElementSibling) {
    return;
  } else {
    // add letters to form the guess
    for (tile of curRow.children) {
      curGuess += tile.innerText;
    }
    // check if it is the answer
    if (curGuess === ans) {
      for (tile of curRow.children) {
        tile.style.backgroundColor = "lightgreen";
        tile.classList.add(...["animate__animated", "animate__swing"]);
      }

      for (let button of letButtons) {
        if (ans.indexOf(button.innerText) != -1) {
          button.style.backgroundColor = "lightgreen";
        }
      }
      setTimeout(() => {
        alert(
          "YOU ARE THE WINNER! Click 'play again' or refresh the page for another game!"
        );
        let playAgain = document.getElementsByClassName("playAgain");
        playAgain[0].classList.toggle("hide");
      }, 1000);
      console.log("Yay");
      // Make sure the guess is a word in our wordlist
    } else if (wrdList.includes(curGuess.toLowerCase())) {
      for (let i = 0; i <= 4; i++) {
        let tile = curRow.children[i];
        let indOfLetter = ans.indexOf(tile.innerText);
        // the current letter is not in the answer
        if (indOfLetter === -1) {
          tile.style.backgroundColor = "silver";
          tile.style.color = "white";
          for (let button of letButtons) {
            if (button.innerText === tile.innerText) {
              button.style.backgroundColor = "silver";
              button.style.color = "silver";
            }
          }
          // The current letter is in the word and in the correct spot
        } else if (indOfLetter === i) {
          tile.style.backgroundColor = "lightgreen";
          tile.classList.add(...["animate__animated", "animate__swing"]);
          for (let button of letButtons) {
            if (button.innerText === tile.innerText) {
              button.style.backgroundColor = "lightgreen";
            }
          }
          // The current letter is in the word but in the wrong spot.
        } else {
          tile.style.backgroundColor = "khaki";
          tile.classList.add(...["animate__animated", "animate__swing"]);
          for (let button of letButtons) {
            if (button.innerText === tile.innerText) {
              button.style.backgroundColor = "khaki";
            }
          }
        }
      }
      curGuess = "";
      // check if that was the last guess
      if (!curRow.nextElementSibling) {
        setTimeout(() => {
          alert(
            `YOU LOST! The word was ${ans}.\n Click 'play again' or refresh the page for another game!`
          );
          let playAgain = document.getElementsByClassName("playAgain");
          playAgain[0].classList.toggle("hide");
        }, 1000);
        return;
      }
      curRow = curRow.nextElementSibling;
      curTile = curRow.firstElementChild;
      // The guess was not a word in our wordlist.
    } else {
      alert(`${curGuess} is not a word.\n Please enter a different word.`);
      curGuess = "";
    }
  }
};

// Set dark switch functionality.
const darkSwitch = document.getElementById("mySwitch");
darkSwitch.onclick = () => {
  if (localStorage.getItem("darkMode") === null) {
    localStorage.setItem("darkMode", true);
  } else {
    localStorage.removeItem("darkMode");
  }
  let body = document.getElementsByTagName("body");
  body[0].classList.toggle("dark");

  let hintBtn = document.getElementById("hintBtn");
  hintBtn.classList.toggle("dark");
  let helpBtn = document.getElementById("helpBtn");
  helpBtn.classList.toggle("dark");
  let modalHeaders = document.getElementsByClassName("modal-header");
  let modalBodys = document.getElementsByClassName("modal-body");
  let modalFooters = document.getElementsByClassName("modal-footer");
  for (modal of modalHeaders) {
    modal.classList.toggle("dark");
  }
  for (modal of modalBodys) {
    modal.classList.toggle("dark");
  }
  for (modal of modalFooters) {
    modal.classList.toggle("dark");
  }
};
// Set playAgain button functionality
const playAgain = document.getElementById("playAgain");
playAgain.onclick = () => {
  location.reload();
};
// Check if darkmode should be on once the page is loaded.
window.onload = () => {
  if (localStorage.getItem("darkMode")) {
    darkSwitch.click();
    localStorage.setItem("darkMode", true);
  }
};
