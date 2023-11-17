import { createHashRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import LoginPage from "./pages/Login.jsx";
import DashBoard from "./pages/DashBoard.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import { action as signInAction } from "./components/SignIn.jsx";
import { queryClient } from "./util/util.js";
import { loader as detailsLoader } from "./components/EditDetails.jsx";

const router = createHashRouter([
  {
    path: "/",
    element: <LoginPage />,
    action: signInAction,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <DashBoard />,
    loader: detailsLoader,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
