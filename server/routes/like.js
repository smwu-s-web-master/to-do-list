const express = require("express");
const router = express.Router();
const { Like } = require("../models/Like");
const { Dislike } = require("../models/Dislike");

router.post("/getLikes", (req, res) => {
  let variable = {}
  if(req.body.postUserID) {
    variable = { postUserID: req.body.postUserID, category: req.body.category }
  }
  else {
    variable = { commentId: req.body.commentId }
  }
  
  Like.find(variable).exec((err, likes) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, likes });
  });
});

router.post("/getDislikes", (req, res) => {
  let variable = {}
  if(req.body.postUserID) {
    variable = { postUserID: req.body.postUserID, category: req.body.category }
  }
  else {
    variable = { commentId: req.body.commentId }
  }
  
  Dislike.find(variable).exec((err, dislikes) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, dislikes });
  });
});

router.post("/upLike", (req, res) => {
  // Like collection에 클릭 정보 넣기
  let variable = {}
  if(req.body.postUserID) {
    variable = { postUserID: req.body.postUserID, userId: req.body.userId ,category: req.body.category }
  }
  else {
    variable = { commentId: req.body.commentId, userId: req.body.userId }
  }
  const like = new Like(variable);
  like.save((err, likeResult) => {
    if (err) return res.json({ success: false, err });
    // Dislike이 클릭되어 있는 상태라면 Dislike 1 줄이기
    Dislike.findOneAndDelete(variable)
      .exec((err, dislikeResult) => {
        if (err) return res.status(400).json({ success: false, err });
        res.status(200).json({ success: true });
    });
  });
});

router.post("/unLike", (req, res) => {
  let variable = {}
  if(req.body.postUserID) {
    variable = { postUserID: req.body.postUserID, userId: req.body.userId ,category: req.body.category }
  }
  else {
    variable = { commentId: req.body.commentId, userId: req.body.userId }
  }
  Like.findByIdAndDelete(variable).exec((err, result) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

router.post("/upDislike", (req, res) => {
  let variable = {}
  if(req.body.postUserID) {
    variable = { postUserID: req.body.postUserID, userId: req.body.userId ,category: req.body.category }
  }
  else {
    variable = { commentId: req.body.commentId, userId: req.body.userId }
  }
  
  // Dislike collection에 클릭 정보 넣기
  const dislike = new Dislike(req.body);

  dislike.save((err, dislikeResult) => {
    if (err) return res.json({ success: false, err });

    // like이 클릭되어 있는 상태라면 like 1 줄이기
    Like.findOneAndDelete(variable).exec((err, likeResult) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true });
    });
  });
});

router.post("/unDislike", (req, res) => {
  let variable = {}
  if(req.body.postUserID) {
    variable = { postUserID: req.body.postUserID, userId: req.body.userId ,category: req.body.category }
  }
  else {
    variable = { commentId: req.body.commentId, userId: req.body.userId }
  }
  
  Dislike.findByIdAndDelete(variable).exec((err, result) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

module.exports = router;
