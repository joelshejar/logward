const Button = (props) => {
  const { type, value, onClick } = props;
  return (
    <button
      type={type ?? "button"}
      onClick={onClick ? onClick : () => {}}
      className={`${type === "submit" ? "btn__submit" : "btn__default"}`}
    >
      {value}
    </button>
  );
};

export default Button;
