import * as React from "react";
import { useQuery, queryCache } from "react-query";
import { useClient } from "../context/auth-context";
import bookPlaceholderSvg from "../assets/book-placeholder.svg";

const loadingBook = {
  title: "Loading...",
  author: "loading...",
  coverImageUrl: bookPlaceholderSvg,
  publisher: "Loading Publishing",
  synopsis: "Loading...",
  loadingBook: true,
};

const loadingBooks = Array.from({ length: 10 }, (v, index) => ({
  id: `loading-book-${index}`,
  ...loadingBook,
}));

const bookQueryConfig = {
  staleTime: 1000 * 60 * 60,
  cacheTime: 1000 * 60 * 60,
};

const getBookSearchConfig = (client, query) => ({
  queryKey: ["bookSearch", { query }],
  queryFn: () =>
    client(`books?query=${encodeURIComponent(query)}`).then((data) => {
      // console.log("in queryFn. data: ", data);
      return data.books;
    }),
  config: {
    onSuccess(books) {
      // console.log("onSuccess books ts: ", books);
      for (const book of books) {
        queryCache.setQueryData(
          ["book", { bookId: book.id }],
          book,
          bookQueryConfig
        );
      }
    },
  },
});

function useBookSearch(query) {
  const client = useClient();
  const result = useQuery(getBookSearchConfig(client, query));
  // console.log("useBookSearch result: ", result);
  return { ...result, books: result.data ?? loadingBooks };
}

function useBook(bookId) {
  const client = useClient();
  const { data } = useQuery({
    queryKey: ["book", { bookId }],
    queryFn: () =>
      client(`books/${bookId}`).then((data) => {
        console.log("data.book after useBook: ", data);
        return data.book;
      }),
    ...bookQueryConfig,
  });
  return data ?? loadingBook;
}

function useRefetchBookSearchQuery() {
  const client = useClient();
  return React.useCallback(
    async function refetchBookSearchQuery() {
      queryCache.removeQueries("bookSearch");
      await queryCache.prefetchQuery(getBookSearchConfig(client, ""));
    },
    [client]
  );
}

function setQueryDataForBook(book) {
  queryCache.setQueryData({
    queryKey: ["book", { bookId: book.id }],
    queryFn: book,
    ...bookQueryConfig,
  });
}

export {
  useBookSearch,
  useRefetchBookSearchQuery,
  setQueryDataForBook,
  useBook,
};
