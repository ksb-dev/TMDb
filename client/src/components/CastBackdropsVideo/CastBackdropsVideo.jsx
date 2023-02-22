import React, { useState } from "react";

// hooks
import { useGetMovieInfo } from "../../hooks/useGetMovieInfo";

// context
import { useMovieContext } from "../../context/context";

const CastBackdropsVideo = ({
  id,
  cast,
  castLoading,
  castError,
  setCast,
  setCastLoading,
  setCastError,
}) => {
  const {
    mode,
    backdrops,
    setBackdrops,
    backdropsLoading,
    setBackdropsLoading,
    backdropsError,
    setBackdropsError,
  } = useMovieContext();
  const { getCast, getBackdrops, getVideos } = useGetMovieInfo();

  // cast states
  const [castState, setCastState] = useState(true);
  const [backdropState, setBackdropState] = useState(false);
  const [videoState, setVideoState] = useState(false);

  // videos states
  const [videos, setVideos] = useState([]);
  const [videosLoading, setVideosLoading] = useState(true);
  const [videosError, setVideosError] = useState("");

  const handleCast = () => {
    getCast(id, setCast, setCastLoading, setCastError);

    setBackdropState(false);
    setVideoState(false);
    setCastState(true);
  };

  const handleBackdrops = () => {
    getBackdrops(id, setBackdrops, setBackdropsLoading, setBackdropsError);

    setCastState(false);
    setVideoState(false);
    setBackdropState(true);
  };

  const handleVideos = () => {
    getVideos(id, setVideos, setVideosLoading, setVideosError);

    setCastState(false);
    setBackdropState(false);
    setVideoState(true);
  };

  return (
    <div
      className={
        "castBackdropVideo " + (mode === true ? "darkColor1" : "lightColor1")
      }
    >
      <div className="castBackdropVideo__options">
        {castState ? (
          <span
            className="activeCastBackdropVideo"
            //className={mode === true ? "darkBorderBottom" : "lightBorderBottom"}
            onClick={() => handleCast()}
          >
            Cast
          </span>
        ) : (
          <span
            onClick={() => handleCast()}
            className={mode === true ? "lightBg2" : "darkBg1"}
          >
            Cast
          </span>
        )}

        {backdropState ? (
          <span
            className="activeCastBackdropVideo"
            //className={mode === true ? "darkBorderBottom" : "lightBorderBottom"}
            onClick={() => handleBackdrops()}
          >
            Backdrops
          </span>
        ) : (
          <span
            onClick={() => handleBackdrops()}
            className={mode === true ? "lightBg2" : "darkBg1"}
          >
            Backdrops
          </span>
        )}

        {videoState ? (
          <span
            className="activeCastBackdropVideo"
            //className={mode === true ? "darkBorderBottom" : "lightBorderBottom"}
            onClick={() => handleVideos()}
          >
            Videos
          </span>
        ) : (
          <span
            onClick={() => handleVideos()}
            className={mode === true ? "lightBg2" : "darkBg1"}
          >
            Videos
          </span>
        )}
      </div>
    </div>
  );
};

export default CastBackdropsVideo;
