import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import TodoPage from "./pages/Todo";
import RootLayout from "./pages/Root";
import ProfilePage from "./pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/todo" replace />,
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
