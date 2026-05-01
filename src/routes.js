import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Users from "./pages/Users";
import Login from "./pages/SignIn";
import UserNew from "./pages/UserNew";
import UserEdit from "./pages/UserEdit";
import ProtectedRoute from "./routes/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/users",
    element: (
      <ProtectedRoute>
        <Users />
      </ProtectedRoute>
    ),
  },
  {
    path: "/users/novo",
    element: (
      <ProtectedRoute>
        <UserNew />
      </ProtectedRoute>
    ),
  },
  {
    path: "/users/:id/edit",
    element: (
      <ProtectedRoute>
        <UserEdit />
      </ProtectedRoute>
    ),
  },
]);

export default router;