const express = require("express");
const router = express.Router();
const { List } = require("../models/List");

// writer, category 정보 받아서 그에 맞는 리스트 보내줌
router.post("/getList", (req, res) => {
  List.findOne({
    writer: req.body.userId,
    category: req.body.category,
    "todos.privated": false,
    "todos.year": req.body.selectedYear,
    "todos.month": req.body.selectedMonth,
    "todos.today": req.body.selectedDate,
  }).exec((err, list) => {
    if (err) return res.status(400).send(err);
    if (!list) return res.json({success: true, list})
    for (i = 0; i < list.length; i++) {
      for (j = 0; j < list[i].todos.length; j++) {
        if (list[i].todos[j].privated === true) {
          list[i].todos.splice(j, 1);
        }
      }
    }

    return res.status(200).json({
      success: true,
      list
    });
  });
});

module.exports = router;
