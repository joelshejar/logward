import { v4 as uuid } from "uuid";
import { useState } from "react";
import "../Styles/Comments/comments.scss";
import Form from "./Common/Form";
import Comment from "./Comment";
import { setItem, getItem } from "../Utils";

const CommentParent = () => {
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");

  let commentList = getItem("commentList") || [];

  const commentSubmit = (e) => {
    e.preventDefault();
    let newCommentObj = {
      id: uuid(),
      name,
      text: comment,
      date: new Date().toLocaleString(),
    };
    commentList.push(newCommentObj);
    setItem("commentList", commentList);
    setComment("");
    setName("");
  };

  return (
    <div className="flex-center">
      <Form
        heading="Comments"
        name={name}
        setName={setName}
        comment={comment}
        type="submit"
        setComment={setComment}
        handleSubmit={commentSubmit}
      />
      <Comment commentList={commentList} />
    </div>
  );
};

export default CommentParent;
