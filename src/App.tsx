import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TodoPage from "./pages/Todo";
import RootLayout from "./pages/Root";
import ProfilePage from "./pages/Profile";
import HomePage from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "todo",
        element: <TodoPage />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
