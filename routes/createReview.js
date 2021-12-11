const express = require("express");
const router = express.Router();
// require firebase
const firestore = require("firebase/firestore");
// initialize firestore database
const db = firestore.getFirestore();

// API endpoint for submitting data through our form
router.get("/", (req, res) => {
  // query params from URL
  const queryParams = req.query;
  const { imageSrc, postMessage, userId, userEmail } = queryParams;

  const setReviewPost = firestore.addDoc(firestore.collection(db, "reviews"), {
    imageSrc,
    postMessage,
    userId,
    userEmail,
  });

  setReviewPost
    .then((response) => {
      res.send(response);
    })
    .catch(function (error) {
      console.warn(error);
      res.send(error);
    });
});

module.exports = router;
