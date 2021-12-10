const express = require("express");
const router = express.Router();
const firestore = require("firebase/firestore");
const db = firestore.getFirestore();

router.get("/:id", (req, res) => {
  const reviewId = req.params.id;
  const reviewpost = firestore.getDoc(firestore.doc(db, "reviews", reviewId));

  reviewpost
    .then((response) => {
      const post = response.data();
      if (post) {
        return res.send(post);
      } else {
        return res.send({ postMessage: `No doc lol` });
      }
    })
    .catch((error) => {
      res.send(`No doc...sorry`);
    });
});

router.get("/", (req, res) => {
  res.send(`Please include an ID`);
});

module.exports = router;
