import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/common/RootLayout";
import Main from "./pages/MainPage";
import Login from "./pages/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="h-full bg-light-primary dark:bg-dark-primary">
      <div className="h-full w-full">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
