type ButtonProps = {
  disabled?: boolean;
  className: string;
  onClick?: () => Promise<void> | void;
  children: React.ReactNode;
};

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
