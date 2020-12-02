import * as React from "react";
import * as colors from "../styles/colors";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useBookSearch, setQueryDataForBook } from "../utils/books";
import { Spinner, Input } from "../components/lib";
import Tooltip from "@reach/tooltip";

function DiscoverBooksScreen() {
  const [query, setQuery] = React.useState("");
  const [queried, setQueried] = React.useState();
  const { isLoading, isError } = useBookSearch(query);

  function handleSearchClick(event) {
    event.preventDefault();
    setQueried(true);
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
                {isLoading ? (
                  <Spinner />
                ) : isError ? (
                  <FaTimes aria-label="error" css={{ color: colors.danger }} />
                ) : (
                  <FaSearch aria-label="search" />
                )}
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
