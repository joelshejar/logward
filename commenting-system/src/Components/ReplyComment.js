import CommentBody from "./CommentBody";

const ReplyComment = (props) => {
  const { reply, commentList, setCommentList } = props;
  return (
    <CommentBody
      parentId={reply.parentId}
      replyId={reply.id}
      name={reply.name}
      date={reply.date}
      text={reply.text}
      commentList={commentList}
      setCommentList={setCommentList}
    />
  );
};

export default ReplyComment;
