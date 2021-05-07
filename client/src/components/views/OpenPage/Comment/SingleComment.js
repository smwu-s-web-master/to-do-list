import React, { useState } from "react";
import { Comment, Avatar, Button, Input } from "antd";
import axios from "axios";
//import LikeDislikes from "./LikeDislikes";

const { TextArea } = Input;

function SingleComment(props) {
  const currentUserID = localStorage.getItem("userId");
  const [CommentValue, setCommentValue] = useState("");
  const [OpenReply, setOpenReply] = useState(false);
  const handleChange = (e) => {
    setCommentValue(e.currentTarget.value);
  };
  const openReply = () => {
    setOpenReply(!OpenReply);
  };
  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      writer: currentUserID,
      userId: props.userId,
      category: props.category,
      responseTo: props.comment._id,
      content: CommentValue,
      year: props.year,
      month: props.month,
      date: props.date,
    };

    axios
      .post("/api/comment/saveComment", variables)

      .then((response) => {
        if (response.data.success) {
          setCommentValue("");
          setOpenReply(!OpenReply);
          props.refreshFunction(response.data.result);
        } else {
          alert("Failed to save Comment");
        }
      });
  };

  const actions = [
    <span onClick={openReply} key="comment-basic-reply-to">
      Reply to 
    </span>,
  ];
  return (
    <div>
                  
      <Comment
        actions={actions}
        author={props.comment.writer.name}
        avatar={
          <Avatar
            src={`http://localhost:4000/${props.comment.writer.image}`}
            alt="image"
          />
        }
        content={<p>{props.comment.content}</p>}
      />
                  
      {OpenReply && (
        <form style={{ display: "flex" }} onSubmit={onSubmit}>
                              
          <TextArea
            style={{ width: "100%", borderRadius: "5px" }}
            onChange={handleChange}
            value={CommentValue}
            placeholder="write some comments"
          />
                              
          <br />
                              
          <Button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
            Submit
          </Button>
                          
        </form>
      )}
                           
    </div>
  );
}
export default SingleComment;
