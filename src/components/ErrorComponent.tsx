import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

type ErrorComponentProps = { title: string; message: string };

const ErrorComponent: React.FC<ErrorComponentProps> = ({ title, message }) => {
  const navigate = useNavigate();

  return (
    <Result
      status="500"
      title={title}
      subTitle={message}
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          На главную
        </Button>
      }
    />
  );
};

export default ErrorComponent;
