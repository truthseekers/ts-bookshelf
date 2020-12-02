import { useClient } from "../context/auth-context";
import { useQuery, queryCache } from "react-query";

const bookQueryConfig = {
  staleTime: 1000 * 60 * 60,
  cacheTime: 1000 * 60 * 60,
};

const getBookSearchConfig = (client, query) => ({
  queryKey: ["bookSearch", { query }],
  queryFn: () =>
    client(`books?query=${encodeURIComponent(query)}`).then((data) => {
      console.log("in queryFn. data: ", data);
      return data.books;
    }),
  config: {
    onSuccess(books) {
      console.log("onSuccess books ts: ", books);
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
  console.log("useBookSearch result: ", result);
  return { books: [] };
}

function setQueryDataForBook(book) {
  //...
}

export { useBookSearch, setQueryDataForBook };
