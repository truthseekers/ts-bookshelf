import {
  useListItem,
  useUpdateListItem,
  useRemoveListItem,
  useCreateListItem,
} from "../utils/list-items";

function StatusButtons({ book }) {
  const listItem = useListItem(book.id);

  const [mutate] = useUpdateListItem({ throwOnError: true });
  const [handleRemoveClick] = useRemoveListItem({ throwOnError: true });
  const [handleAddClick] = useCreateListItem({ throwOnError: true });

  return <div>status buttons.</div>;
}

export { StatusButtons };
