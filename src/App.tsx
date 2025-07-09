import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import TodoPage from "./pages/Todo";
import RootLayout from "./pages/Root";
import ProfilePage from "./pages/Profile/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import { useInitAuth } from "./hooks/useInitAuth";
import AuthorizationPage from "./pages/Authorization/Authorization";
import RegistrationPage from "./pages/RegistrationPage/Registration";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/todo" replace />,
      },
      { path: "authorization", element: <AuthorizationPage /> },
      { path: "registration", element: <RegistrationPage /> },
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
    ],
  },
]);

const App = () => {
  useInitAuth();

  return <RouterProvider router={router} />;
};

export default App;
