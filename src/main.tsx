import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import AppLayout from "./App.tsx";
import { RouterProvider, createBrowserRouter } from "react-router";
import { HomePage } from "./clients/pages/home.page.tsx";
import ListCourse from "./clients/pages/ListCoursePage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "/users",
        element: <>Hello</>,
      },
      {
        path: "/list-course",
        element: <ListCourse />
      }
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
