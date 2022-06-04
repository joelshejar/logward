const Button = (props) => {
  const { type, value, onClick } = props;
  return (
    <button
      type={type ?? "button"}
      onClick={onClick ? onClick : () => {}}
      className="button"
    >
      {value}
    </button>
  );
};

export default Button;
