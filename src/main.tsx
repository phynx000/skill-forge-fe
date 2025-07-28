import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import AppLayout from "./App.tsx";
import { RouterProvider, createBrowserRouter } from "react-router";
import { HomePage } from "./clients/pages/home.page.tsx";
import ListCourse from "./clients/pages/CrudCourse/ListCoursePage.tsx";
import CourseDetail from "./clients/pages/CrudCourse/CourseDetail.tsx";
import LoginPage from "./clients/pages/auth/LoginPage.tsx";
import RegisterPage from "./clients/pages/auth/RegisterPage.tsx";
import ForgotPasswordPage from "./clients/pages/auth/ForgotPasswordPage.tsx";
import UserProfilePage from "./clients/pages/Profile/UserProfilePage.tsx";
import InstructorProfilePage from "./clients/pages/Profile/InstructorProfilePage.tsx";
import ProfileTypePage from "./clients/pages/Profile/ProfileTypePage.tsx";
import CoursePlayerPage from "./clients/pages/Player/CoursePlayerPage.tsx";
import CreateCoursePage from "./clients/pages/CrudCourse/CreateCoursePage.tsx";
import EditCoursePage from "./clients/pages/CrudCourse/EditCoursePage.tsx";
import VideoTestPage from "./clients/pages/VideoTestPage.tsx";

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
      },
      {
        path: "/course/:id",
        element: <CourseDetail />
      },
      {
        path: "/course/:id/learn",
        element: <CoursePlayerPage />
      },
      {
        path: "/create-course",
        element: <CreateCoursePage />
      },
      {
        path: "/edit-course/:id",
        element: <EditCoursePage />
      },
      {
        path: "/video-test",
        element: <VideoTestPage />
      },
      {
        path: "/profile",
        element: <ProfileTypePage />
      },
      {
        path: "/profile/student/:id",
        element: <UserProfilePage />
      },
      {
        path: "/profile/instructor/:id",
        element: <InstructorProfilePage />
      }
    ],
  },
  // Auth routes without AppLayout
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />
  }
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />

  </StrictMode>
);
