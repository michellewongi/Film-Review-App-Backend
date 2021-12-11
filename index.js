const express = require("express");
//Initiate Express
const app = express();
// Setting port - dynamically with Heroku
const port = process.env.PORT || 4000;
// Import Firebase
const firebase = require("firebase/app");

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATTG26QTFLwpOxQ3gKU9Bl0oIZvwPQqwE",
  authDomain: "final-project-bf93e.firebaseapp.com",
  projectId: "final-project-bf93e",
  storageBucket: "final-project-bf93e.appspot.com",
  messagingSenderId: "1084742151259",
  appId: "1:1084742151259:web:e46afb640a85c76561e37e",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const indexRoute = require("./routes/index");
const createReviewRoute = require("./routes/createReview");
const singleReviewRoute = require("./routes/review");
const profileRoute = require("./routes/profile");

app.use(function (req, res, next) {
  // website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Method",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  next();
});

// Tell Express to use routes...
app.use("/", indexRoute);
// submit new post
app.use("/create", createReviewRoute);
// get single post
app.use("/review", singleReviewRoute);
app.use("/user", profileRoute);

app.listen(port, () => {
  console.log(`Example app running at http://localhost:${port}`);
});
