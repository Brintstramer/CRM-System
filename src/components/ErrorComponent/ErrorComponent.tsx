import { ErrorComponentProps } from "../../types/types";
import classes from "../ErrorComponent/ErrorComponent.module.css";

const ErrorComponent: React.FC<ErrorComponentProps> = ({ title, message }) => {
  return (
    <div className={classes.error}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
};

export default ErrorComponent;
