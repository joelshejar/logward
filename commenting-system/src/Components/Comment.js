import { useState } from "react";
import { v4 as uuid } from "uuid";
import Form from "./Common/Form";
import { setItem } from "../Utils";
import CommentBody from "./CommentBody";
import ReplyComment from "./ReplyComment";

const Comment = (props) => {
  const { comment, commentList, setCommentList } = props;
  const { id, name, text, date, replies } = comment;
  const [isReply, setIsReply] = useState(false);
  const [error, setError] = useState({ name: "", comment: "" });
  const [replyName, setReplyName] = useState("");
  const [replyComment, setReplyComment] = useState("");

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (replyName?.length === 0 || replyComment?.length === 0) {
      return setError({
        name: replyName?.length === 0 ? "Name is required" : "",
        comment: replyComment?.length === 0 ? "Comment is required" : "",
      });
    } else {
      let newReplyObj = {
        id: uuid(),
        name: replyName,
        parentId: id,
        text: replyComment,
        date: new Date().toLocaleString(),
      };
      commentList[
        commentList.findIndex((comment) => comment.id === id)
      ].replies.push(newReplyObj);
      setCommentList(commentList);
      setItem("commentList", commentList);
      setReplyName("");
      setReplyComment("");
      setIsReply(false);
    }
  };

  return (
    <div>
      <>
        <div className="comment" key={id}>
          <CommentBody
            parentId={id}
            name={name}
            date={date}
            text={text}
            commentList={commentList}
            setCommentList={setCommentList}
            setIsReply={setIsReply}
          />
          {isReply && (
            <div className="comment__form--reply">
              <Form
                heading="Reply"
                name={replyName}
                setName={setReplyName}
                error={error}
                setError={setError}
                comment={replyComment}
                type="submit"
                setComment={setReplyComment}
                handleSubmit={handleReplySubmit}
              />
            </div>
          )}
          {replies?.length > 0 &&
            replies.map((reply) => {
              return (
                <div key={reply.id} className="comment__body--reply">
                  <ReplyComment
                    reply={reply}
                    commentList={commentList}
                    setCommentList={setCommentList}
                  />
                </div>
              );
            })}
        </div>
      </>
    </div>
  );
};

export default Comment;
