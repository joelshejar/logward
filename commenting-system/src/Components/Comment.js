import Button from "./Common/Button";

const Comment = (props) => {
  const { commentList } = props;
  return (
    <div>
      {commentList.map((comment) => {
        return (
          <div className="comment__body" key={comment.id}>
            <div className="flex-between">
              <div className="comment__body--name">{comment.name}</div>
              <div className="comment__body--date">{comment.date}</div>
            </div>
            <div className="comment__body--comment">{comment.text}</div>
            <div className="flex-center">
              <Button value="Reply" />
              <Button value="Edit" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Comment;
