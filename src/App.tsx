import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import TodoPage from "./pages/Todos/Todos";
import AppLayout from "./layouts/AppLayout";
import ProfilePage from "./pages/Profile/Profile";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { useInitAuth } from "./hooks/useInitAuth";
import AuthorizationPage from "./pages/Authorization/Authorization";
import RegistrationPage from "./pages/RegistrationPage/Registration";
import AuthLayout from "./layouts/AuthLayout";
import User from "./pages/User/User";
import UsersTable from "./pages/UsersTable/UsersTable";
import Notifications from "./components/Notifications/Notifications";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/todo" replace />,
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "todo",
        element: (
          <ProtectedRoute>
            <TodoPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "users",
        element: (
          <ProtectedRoute>
            <UsersTable />
          </ProtectedRoute>
        ),
      },
      {
        path: "users/:id",
        element: (
          <ProtectedRoute>
            <User />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: "authorization", element: <AuthorizationPage /> },
      { path: "registration", element: <RegistrationPage /> },
    ],
  },
]);

const App = () => {
  useInitAuth();

  return (
    <>
      <Notifications />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
