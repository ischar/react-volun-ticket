import React from "react";
import ProtectedRoute from "./components/common/ProtectedRoute";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/common/RootLayout";
import Main from "./pages/MainPage";
import Login from "./pages/LoginPage";
import NewPost from "./pages/NewPostPage";
import { AuthProvider } from "./context/AuthProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Main />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/write",
        element: (
          <ProtectedRoute>
            <NewPost />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <div className="h-full bg-light-primary dark:bg-dark-primary">
        <div className="h-full w-full">
          <RouterProvider router={router} />
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
