import React, { useState, useEffect } from "react";

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
    clearMovieInputRef,
    clearTvInputRef,
    setSearchQuery,
  } = useMovieContext();
  const { showSort, hideSort } = useShowHide();

  const [windowWidth, setWindowWidth] = useState(787);

  window.onresize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    const toggleSearchModal = (e) => {
      if (searchIconRef.current.contains(e.target)) {
        searchModalRef.current.style.zIndex = "5";
        searchModalRef.current.style.opacity = "1";
      }

      if (
        !searchIconRef.current.contains(e.target) &&
        e.target.nodeName !== "INPUT" &&
        e.target.nodeName !== "path" &&
        e.target.nodeName !== "svg"
      ) {
        console.log("modal hide");
        searchModalRef.current.style.zIndex = "-1";
        searchModalRef.current.style.opacity = "0";
      }
    };

    document.body.addEventListener("click", toggleSearchModal);

    return () => {
      document.body.removeEventListener("click", toggleSearchModal);
    };
  }, [windowWidth]);

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