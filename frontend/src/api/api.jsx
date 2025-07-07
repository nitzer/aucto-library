import { QueryClient } from "@tanstack/react-query";
const baseUrl = "http://localhost:3000";

export const queryClient = new QueryClient();

export async function addNewAuthor(author) {
  const response = await fetch(`${baseUrl}/authors`, {
    method: "POST",
    body: JSON.stringify(author),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = new Error("An error occurred, please try again later");
    error.code = response.status;
    error.info = await response.json();

    throw error;
  }

  return await response.json();
}

export async function getAuthors({ signal, page }) {
  const url = new URL(`${baseUrl}/authors`);

  const currentPage = page ? page : 0;
  url.searchParams.append("page", currentPage);

  const response = await fetch(url.toString(), { signal });

  if (!response.ok) {
    const error = new Error("An error occurred, please try again later");
    error.code = response.status;
    error.info = await response.json();

    throw error;
  }

  return await response.json();
}

export async function getAuthor({ signal, authorId }) {
  const response = await fetch(`${baseUrl}/authors/${authorId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    signal,
  });

  if (!response.ok) {
    const error = new Error("An error occurred, please try again later");
    error.code = response.status;
    error.info = await response.json();

    throw error;
  }

  return await response.json();
}

export async function getBook({ signal, bookId }) {
  const response = await fetch(`${baseUrl}/books/${bookId}`, { signal });

  if (!response.ok) {
    const error = new Error("An error occurred, please try again later");
    error.code = response.status;
    error.info = await response.json();

    throw error;
  }

  return await response.json();
}

export async function getLatestBooks({ signal, page }) {
  const url = new URL(`${baseUrl}/books`);

  const currentPage = page ? page : 1;

  url.searchParams.append("page", currentPage);

  const response = await fetch(url.toString(), { signal });

  if (!response.ok) {
    const error = new Error("An error occurred, please try again later");
    error.code = response.status;
    error.info = await response.json();

    throw error;
  }

  return await response.json();
}

export async function getBooksByAuthor({ signal, authorId, page = 1 }) {
  console.log(page);
  const url = new URL(`${baseUrl}/books/author/${authorId}`);
  url.searchParams.append("page", page);
  const response = await fetch(url.toString(), { signal });

  if (!response.ok) {
    const error = new Error("An error occurred, please try again later");
    error.code = response.status;
    error.info = await response.json();

    throw error;
  }

  return await response.json();
}

export async function addNewBook(authorId, book) {
  const newBook = { author: authorId, ...book };

  const response = await fetch(`${baseUrl}/books`, {
    method: "POST",
    body: JSON.stringify(newBook),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = new Error("An error occurred, please try again later");
    error.code = response.status;
    error.info = await response.json();

    throw error;
  }

  return await response.json();
}
