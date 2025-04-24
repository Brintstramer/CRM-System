import { ButtonProps } from "../../types/types";

const Button: React.FC<ButtonProps> = ({
  disabled,
  className,
  onClick,
  children,
}) => {
  return (
    <button disabled={disabled} className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
