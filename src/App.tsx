import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import TodoPage from "./pages/Todos/Todos";
import AppLayout from "./layouts/AppLayout";
import ProfilePage from "./pages/Profile/Profile";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { useInitAuth } from "./hooks/useInitAuth";
import AuthorizationPage from "./pages/Authorization/Authorization";
import RegistrationPage from "./pages/RegistrationPage/Registration";
import AuthLayout from "./layouts/AuthLayout";
import Notifications from "./components/Notifications/Notifications";
import UsersTablePage from "./pages/UsersTable/UsersTable";
import UserPage from "./pages/User/User";

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
            <UsersTablePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "users/:id",
        element: (
          <ProtectedRoute>
            <UserPage />
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
