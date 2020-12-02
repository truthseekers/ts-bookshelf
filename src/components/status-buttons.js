import { useListItem, useUpdateListItem } from "../utils/list-items";

function StatusButtons({ book }) {
  const listItem = useListItem(book.id);

  const [mutate] = useUpdateListItem({ throwOnError: true });
  return <div>status buttons.</div>;
}

export { StatusButtons };
