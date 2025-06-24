const express = require("express");
const app = express();
const path = require("path");
app.set("view engine", "ejs");
const axios = require("axios");
require("dotenv").config();
const PORT = 3500;

app.use(express.static(path.join(__dirname, "public")));
// api key for unsplash
const accessId = process.env.API_ACCESS_KEY;

const fs = require("fs");
const wrds = fs.readFileSync("wordList.txt").toString("utf-8");
const listWrds = wrds.split(/\r?\n/);

// function to return a random word from our wordlist.
function randWord() {
  return listWrds[Math.floor(Math.random() * 5757) + 1];
}

app.get("/", (req, res) => {
  console.log("received a request to play a new game. \n");
  const answer = randWord();
  console.log("This game's answer is:", answer, "\n");

  // render the page without api call for hint
  if (accessId === "undefined") {
    res.render("home.ejs", {
      answer,
      wrdList: listWrds,
      hint: false,
      reason: "Unsplash API not set up! check documentation.",
    });
  } else {
    //call unsplash to get an image for our hint
    axios
      .get(
        `https://api.unsplash.com/search/photos?query=${answer}&client_id=${accessId}`
      )
      .then((response) => {
        console.log("Received an image from image service.\n");
        console.log(
          "The URL for the image: ",
          response.data.results[0].urls.small,
          "\n"
        );
        res.render("home.ejs", {
          answer,
          wrdList: listWrds,
          hint: response.data.results[0].urls.small,
        });
      })
      .catch((error) => {
        console.log("No image available", error);
        res.render("home.ejs", {
          answer,
          wrdList: listWrds,
          hint: false,
          reason: "No images were found for this answer.",
        });
      });
  }
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
