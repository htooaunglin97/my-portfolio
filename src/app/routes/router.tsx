import { createBrowserRouter } from "react-router-dom";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { ProtectedAdminRoute } from "@/features/auth/components/ProtectedAdminRoute";
import { AdminBlogEditPage } from "@/pages/admin/AdminBlogEditPage";
import { AdminBlogNewPage } from "@/pages/admin/AdminBlogNewPage";
import { AdminBlogPage } from "@/pages/admin/AdminBlogPage";
import { AdminDashboardPage } from "@/pages/admin/AdminDashboardPage";
import { AdminLayoutPage } from "@/pages/admin/AdminLayoutPage";
import { AdminLoginPage } from "@/pages/admin/AdminLoginPage";
import { AdminMessagesPage } from "@/pages/admin/AdminMessagesPage";
import { AdminProjectEditPage } from "@/pages/admin/AdminProjectEditPage";
import { AdminProjectNewPage } from "@/pages/admin/AdminProjectNewPage";
import { AdminProjectsPage } from "@/pages/admin/AdminProjectsPage";
import { BlogDetailPage } from "@/pages/public/BlogDetailPage";
import { BlogPage } from "@/pages/public/BlogPage";
import { HomePage } from "@/pages/public/HomePage";
import { NotFoundPage } from "@/pages/public/NotFoundPage";
import { ProjectDetailPage } from "@/pages/public/ProjectDetailPage";
import { ProjectsPage } from "@/pages/public/ProjectsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "projects", element: <ProjectsPage /> },
      { path: "projects/:slug", element: <ProjectDetailPage /> },
      { path: "blog", element: <BlogPage /> },
      { path: "blog/:slug", element: <BlogDetailPage /> },
    ],
  },
  {
    path: "/admin/login",
    element: <AdminLoginPage />,
  },
  {
    path: "/admin",
    element: <ProtectedAdminRoute />,
    children: [
      {
        element: <AdminLayoutPage />,
        children: [
          { index: true, element: <AdminDashboardPage /> },
          { path: "projects", element: <AdminProjectsPage /> },
          { path: "projects/new", element: <AdminProjectNewPage /> },
          { path: "projects/:id/edit", element: <AdminProjectEditPage /> },
          { path: "blog", element: <AdminBlogPage /> },
          { path: "blog/new", element: <AdminBlogNewPage /> },
          { path: "blog/:id/edit", element: <AdminBlogEditPage /> },
          { path: "messages", element: <AdminMessagesPage /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

