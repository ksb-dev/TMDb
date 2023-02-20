import React, { useEffect } from "react";

// context
import { useMovieContext } from "../../context/context";

// hooks
import { useShowHide } from "../../hooks/useShowHide";

// components
import Search from "../Search/Search";

const SearchModal = () => {
  const {
    mode,
    searchModalRef,
    searchIconRef,
    searchResultsRef,
    searchInputRef,
  } = useMovieContext();
  const { showSort, hideSort } = useShowHide();

  useEffect(() => {
    const toggleSearchModal = (e) => {
      if (searchIconRef.current.contains(e.target)) {
        searchModalRef.current.style.zIndex = "5";
        searchModalRef.current.style.opacity = "1";
      } else if (
        searchInputRef.current.contains(e.target) ||
        (searchResultsRef.current &&
          searchResultsRef.current.contains(e.target))
      ) {
        return;
      } else {
        searchModalRef.current.style.zIndex = "-1";
        searchModalRef.current.style.opacity = "0";
      }
    };

    document.body.addEventListener("click", toggleSearchModal);

    return () => {
      document.body.removeEventListener("click", toggleSearchModal);
    };
  }, []);

  return (
    <div
      ref={searchModalRef}
      className={
        "search__modal " + (mode === true ? "lightAlpha5" : "darkAlpha5")
      }
    >
      <div className="search__modal__inner">
        <Search />
      </div>
    </div>
  );
};

export default SearchModal;
