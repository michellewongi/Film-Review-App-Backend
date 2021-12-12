const express = require("express");
const router = express.Router();
// require firebase
const firestore = require("firebase/firestore");
// initialize firestore database
const db = firestore.getFirestore();

router.get("/:uid", (req, res) => {
  const uid = req.params.uid;
  const reviewsColRef = firestore.collection(db, "reviews");
  const userPostsQuery = firestore.query(
    reviewsColRef,
    firestore.where("userId", "==", uid)
  );
  const userPostsPromise = firestore.getDocs(userPostsQuery);

  userPostsPromise
    .then((querySnapshot) => {
      const postsArray = querySnapshot.docs.map((docSnap) => {
        const docData = { id: docSnap.id, ...docSnap.data() };
        return docData;
      });
      res.json({ posts: postsArray, count: postsArray.length });
    })
    .catch((err) => {
      // don't send the full error object to the client,
      // instead you should log the error and send the
      // client as little information as possible
      console.error(`Failed to get user posts for firebase:${uid}`, err);
      res.status(500).json({ error: err.code || err.message }); // Don't forget to use an appropriate status code!
    });
});

router.get("/", (req, res) => {
  res.send("No user id provided");
});

module.exports = router;
