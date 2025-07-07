import { QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { queryClient } from "./api/api";
import '@ant-design/v5-patch-for-react-19';

import HomePage from "./pages/HomePage";
import AuthorsPage from "./pages/AuthorsPage";
import AuthorBooksPage from "./pages/AuthorBooksPage";
import RootLayout from "./pages/RootLayout";
import BookPage from "./pages/BookPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/authors",
        element: <AuthorsPage />,
        children: [
          {
            path: ":authorId/",
            element: <AuthorBooksPage />,
          },
        ],
      },
      {
        path: "/books/:bookId",
        element: <BookPage />,
      },
    ],
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
