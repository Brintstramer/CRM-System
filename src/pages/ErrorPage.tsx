import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import ErrorComponent from "../components/ErrorComponent";

function ErrorPage() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <>
        <MainNavigation />
        <ErrorComponent
          title={`${error.status} - ошибка загрузки`}
          message={error.data.message || "Что-то пошло не так"}
        />
      </>
    );
  }

  return (
    <>
      <MainNavigation />
      <ErrorComponent title="Ошибка" message="Неизвестная ошибка" />
    </>
  );
}

export default ErrorPage;
