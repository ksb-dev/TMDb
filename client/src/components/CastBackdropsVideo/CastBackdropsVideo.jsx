import React from "react";

// data
import { iconsData } from "../../data/icons";

// context
import { useMovieContext } from "../../context/context";

// components
import Cast from "./Cast/Cast";

const CastBackdropsVideo = ({ id, cast, castLoading, castError }) => {
  const { mode } = useMovieContext();

  return (
    <div
      className={
        "castBackdropVideo " +
        (mode === true ? "lightBg1 darkColor1" : "darkBg2 lightColor1")
      }
    >
      <div className="castBackdropVideo__cast">
        <div className="castBackdropVideo__cast__title">
          Top Cast
          <p className="length">
            <span>{cast && cast.length}</span>
          </p>
          <span className="icon">{iconsData.forwardArrow}</span>
        </div>
        <Cast cast={cast} castLoading={castLoading} castError={castError} />
      </div>
    </div>
  );
};

export default CastBackdropsVideo;
