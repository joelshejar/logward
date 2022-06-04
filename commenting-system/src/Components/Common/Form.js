import Button from "./Button";

const Form = (props) => {
  const { heading, name, comment, setName, setComment, handleSubmit, type } =
    props;
  return (
    <form className="comment__form" onSubmit={handleSubmit}>
      <div className="comment__form--heading">{heading}</div>
      {setName && (
        <input
          type="text"
          className="comment__form--name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}
      <textarea
        className="comment__form--text"
        placeholder="Comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <Button type={type} value="Post" />
    </form>
  );
};

export default Form;
