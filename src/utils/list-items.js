import { useClient } from "../context/auth-context";
import { useQuery } from "react-query";
import { setQueryDataForBook } from "./books";

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

export { useListItems };