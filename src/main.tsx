import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import AppLayout from "./App.tsx";
import { RouterProvider, createBrowserRouter } from "react-router";
import { HomePage } from "./clients/pages/home.page.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true,
         element: <HomePage /> },
      {
        path: "/users",
        element: <>Hello</>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
