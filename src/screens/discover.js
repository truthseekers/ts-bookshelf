import { setQueryDataForBook } from "../utils/books";
import { Input } from "../components/lib";
import Tooltip from "@reach/tooltip";

function DiscoverBooksScreen() {
  function handleSearchClick(event) {
    event.preventDefault();
    // setQueried(true)
    // setQuery(event.target.elements.search.value)
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSearchClick}>
          <Input
            placeholder="Search books..."
            id="search"
            type="search"
            css={{ width: "100%" }}
          />
          <Tooltip label="Search Books">
            <label htmlFor="search">
              <button
                type="submit"
                css={{
                  border: "0",
                  position: "relative",
                  marginLeft: "-35px",
                  background: "transparent",
                }}
              >
                button...
              </button>
            </label>
          </Tooltip>
        </form>
      </div>
      discover books screen.
    </div>
  );
}

export { DiscoverBooksScreen };
