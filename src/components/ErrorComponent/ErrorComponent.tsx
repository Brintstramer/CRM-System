import classes from "../ErrorComponent/ErrorComponent.module.css";

type ErrorComponentProps = { title: string; message: string };

const ErrorComponent: React.FC<ErrorComponentProps> = ({ title, message }) => {
  return (
    <div className={classes.error}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
};

export default ErrorComponent;
