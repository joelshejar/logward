import { useState } from "react";
import Button from "./Common/Button";
import { setItem } from "../Utils";

const CommentBody = (props) => {
  const {
    parentId,
    replyId,
    name,
    date,
    text,
    setIsReply,
    commentList,
    setCommentList,
  } = props;
  const [isEditable, setIsEditable] = useState(false);
  const [editComment, setEditComment] = useState(text);
  const [error, setError] = useState({ text: "" });

  //delete comments and replies

  const handleDelete = () => {
    const editedElement =
      commentList[commentList.findIndex((comment) => comment.id === parentId)];

    setIsReply && !replyId
      ? commentList.splice(
          [commentList.findIndex((comment) => comment.id === parentId)],
          1
        )
      : replyId &&
        editedElement?.replies.splice(
          [editedElement?.replies.findIndex((reply) => reply.id === replyId)],
          1
        );

    setItem("commentList", commentList);
    setCommentList(JSON.parse(JSON.stringify(commentList)));
  };

  //edit comments and replies

  const handleEdit = () => {
    if (editComment.length === 0) {
      return setError({ text: "Comment shouldn't be empty" });
    } else {
      const editedElement =
        commentList[
          commentList.findIndex((comment) => comment.id === parentId)
        ];

      setIsReply && !replyId
        ? (editedElement.text = editComment)
        : replyId &&
          (editedElement.replies[
            editedElement.replies.findIndex((reply) => reply.id === replyId)
          ].text = editComment);
      setCommentList(commentList);
      setItem("commentList", commentList);
      setIsEditable(false);
    }
  };

  return (
    <div className="comment__body">
      <div className="flex-between">
        <div className="comment__body--name">{name}</div>
        <div className="comment__body--date">{date}</div>
      </div>
      {isEditable ? (
        <>
          <textarea
            className="comment__form--text"
            placeholder="Comment"
            value={editComment}
            onChange={(e) => {
              setError({ text: "" });
              setEditComment(e.target.value);
            }}
          ></textarea>
          {error?.text?.length > 0 && (
            <div className="comment__reply--error">{error.text}</div>
          )}
        </>
      ) : (
        <div className="comment__body--text">{editComment}</div>
      )}
      <div className="flex-center">
        {setIsReply && !isEditable ? (
          <Button onClick={() => setIsReply(true)} value="Reply" />
        ) : (
          isEditable && (
            <Button
              onClick={() => {
                setEditComment(text);
                setIsEditable(false);
              }}
              value="Cancel"
            />
          )
        )}
        {isEditable ? (
          <Button onClick={handleEdit} value="Save" />
        ) : (
          <Button onClick={() => setIsEditable(true)} value="Edit" />
        )}
      </div>
      <button onClick={handleDelete} className="delete"></button>
    </div>
  );
};

export default CommentBody;
