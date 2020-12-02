import { useClient } from "../context/auth-context";
import { useQuery, useMutation, queryCache } from "react-query";
import { setQueryDataForBook } from "./books";

function useListItem(bookId, options) {
  const listItems = useListItems(options);
  return listItems?.find((li) => li.bookId === bookId) ?? null;
}

function useListItems() {
  const client = useClient();

  //   const { data: listItems } = useQuery({
  //     queryKey: "list-items",
  //     queryFn: () => client("list-items").then((data) => data.listItems),
  //     onSuccess: async (listItems) => {
  //       console.log("on success?");
  //       await onSuccess?.(listItems);
  //       for (const listItem of listItems) {
  //         setQueryDataForBook(listItem.book);
  //       }
  //     },
  //     ...options,
  //   });
  //   return listItems ?? [];
  return [];
}

const defaultMutationOptions = {
  onError: (err, variables, recover) =>
    typeof recover === "function" ? recover() : null,
  onSettled: () => queryCache.invalidateQueries("list-items"),
};

function onUpdateMutation(newItem) {
  const previousItems = queryCache.getQueryData("list-items");

  queryCache.setQueryData("list-items", (old) => {
    return old.map((item) => {
      return item.id === newItem.id ? { ...item, ...newItem } : item;
    });
  });

  return () => queryCache.setQueryData("list-items", previousItems);
}

function useUpdateListItem(options) {
  const client = useClient();

  return useMutation(
    (updates) =>
      client(`list-items/${updates.id}`, {
        method: "PUT",
        data: updates,
      }),
    {
      onMutate: onUpdateMutation,
      ...defaultMutationOptions,
      ...options,
    }
  );
}

export { useListItem, useListItems, useUpdateListItem };
