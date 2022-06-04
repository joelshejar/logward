import { useState } from "react";
import "../Styles/Comments/comments.scss";
import Comment from "./Comment";

const CommentParent = () => {
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");

  const commentSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="flex-center">
      <form className="comment__form" onSubmit={commentSubmit}>
        <div className="comment__form--heading">Comment</div>
        <input
          type="text"
          className="comment__form--name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          className="comment__form--text"
          placeholder="Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <input type="submit" className="comment__form--submit" value="Submit" />
      </form>
      <Comment />
    </div>
  );
};

export default CommentParent;
