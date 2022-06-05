import Button from "./Button";

const Form = (props) => {
  const {
    heading,
    name,
    comment,
    error,
    setError,
    setName,
    setComment,
    handleSubmit,
    type,
  } = props;
  return (
    <form className="comment__form" onSubmit={handleSubmit}>
      <div className="comment__form--wrapper">
        <div className="comment__form--heading">{heading}</div>
        {setName ? (
          <>
            <input
              type="text"
              className="comment__form--name"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setError({ ...error, name: "" });
                setName(e.target.value);
              }}
            />
            {error.name && (
              <div className="comment__form--error">{error.name}</div>
            )}
          </>
        ) : (
          <div>{name}</div>
        )}
        <textarea
          className="comment__form--text"
          placeholder="Comment"
          value={comment}
          onChange={(e) => {
            setError({ ...error, comment: "" });
            setComment(e.target.value);
          }}
        ></textarea>
        {error.comment && (
          <div className="comment__form--error">{error.comment}</div>
        )}
        <div className="comment__form--button">
          <Button type={type} value="Post" />
        </div>
      </div>
    </form>
  );
};

export default Form;
