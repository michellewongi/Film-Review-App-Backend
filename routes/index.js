const express = require("express");
// Middleware to allow for routing on the node server
const router = express.Router();
// require firebase
const firestore = require("firebase/firestore");
// initialize firestore database
const db = firestore.getFirestore();

// get all articles from firebase
router.get("/", (req, res) => {
  const reviews = firestore.getDocs(firestore.collection(db, "reviews"));
  const reviewsArray = [];

  reviews
    .then((response) => {
      response.forEach((doc) => {
        const docData = doc.data();
        docData.id = doc.id;
        // push document into array everytime the query loops over
        reviewsArray.push(docData);
      });
      return res.send(reviewsArray);
    })
    .catch(function (error) {
      console.log("Error:", error);
      return res.send(error);
    });
});

module.exports = router;
