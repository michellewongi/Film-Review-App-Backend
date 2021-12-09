const express = require("express");
// Middleware to allow for routing on the node server
const router = express.Router();
// require firebase
const firestore = require("firebase/firestore");
// initialize firestore database
const db = firestore.getFirestore();

// get all articles from firebase
router.get("/", (req, res) => {
  const film = firestore.getDocs(firestore.collection(db, "film"));
  const filmArray = [];

  film
    .then((response) => {
      response.forEach((doc) => {
        // push document into array everytime the query loops over
        filmArray.push(doc.data());
      });
      return res.send(filmArray);
    })
    .catch(function (error) {
      console.log("Error:", error);
      return res.send(error);
    });
});

module.exports = router;
