import { v4 as uuid } from "uuid";
import { useState, useEffect } from "react";
import "../Styles/Comments/comments.scss";
import Form from "./Common/Form";
import Comment from "./Comment";
import { setItem, getItem } from "../Utils";

const CommentParent = () => {
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState({ name: "", comment: "" });
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    setCommentList(getItem("commentList") || []);
  }, []);

  //create comment

  const commentSubmit = (e) => {
    e.preventDefault();
    if (name.length === 0 || comment.length === 0) {
      return setError({
        name: name?.length === 0 ? "Name is required" : "",
        comment: comment?.length === 0 ? "Comment is required" : "",
      });
    } else {
      let newCommentObj = {
        id: uuid(),
        name,
        text: comment,
        date: new Date().toLocaleString(),
        replies: [],
      };
      commentList.push(newCommentObj);
      setItem("commentList", commentList);
      setComment("");
      setName("");
    }
  };

  const handleSort = (e) => {
    const sortByDate = (a, b) => {
      return new Date(a.date) - new Date(b.date);
    };
    e.preventDefault();
    let newCommentList;
    if (e.target.value === "Oldest") {
      newCommentList = [...commentList.sort(sortByDate)];
      newCommentList.forEach((el) => {
        el.replies = el.replies.sort(sortByDate);
      });
    } else {
      newCommentList = commentList.sort(sortByDate).reverse();
      newCommentList.forEach((el) => {
        el.replies = el.replies.sort(sortByDate).reverse();
      });
    }
    setCommentList(JSON.parse(JSON.stringify(newCommentList)));
  };

  return (
    <div className="container">
      <Form
        heading="Comments"
        name={name}
        setName={setName}
        comment={comment}
        error={error}
        setError={setError}
        type="submit"
        setComment={setComment}
        handleSubmit={commentSubmit}
      />
      {commentList?.length > 0 && (
        <div className="sort">
          Sort By:{" "}
          <select onChange={handleSort}>
            <option value="Oldest">Oldest</option>
            <option value="Latest">Latest</option>
          </select>
        </div>
      )}

      {commentList.map((comment) => {
        return (
          <Comment
            key={comment.id}
            comment={comment}
            commentList={commentList}
            setCommentList={setCommentList}
          />
        );
      })}
    </div>
  );
};

export default CommentParent;
