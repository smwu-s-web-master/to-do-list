const mongoose = require("mongoose"); // 모듈 가져오기
const Schema = mongoose.Schema;

const likeSchema = mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    category: {
      type: String,
    },
    postUserID: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    commentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  },
  { timestamps: true }
);

const Like = mongoose.model("Like", likeSchema); // 스키마와 mongoDB 연결
module.exports = { Like };
