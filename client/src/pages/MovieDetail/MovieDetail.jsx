import React, { useState, useEffect, useRef } from "react";

// React Router
import { useParams } from "react-router-dom";

// Redux
import { useDispatch } from "react-redux";
import { setSavedMovies } from "../../redux/services/movies/setSavedMovies";

// Context
import { useMovieContext } from "../../context/context";

// Hooks
import { useGetMovieInfo } from "../../hooks/useGetMovieInfo";

// Components
import Header from "../../components/Header/Header";
import SmallHeader from "../../components/Header/SmallHeader/SmallHeader";
import Menu from "../../components/Menu/Menu";
import SearchModal from "../../components/SearchModal/SearchModal";

import MovieInfo from "../../components/MovieInfo/MovieInfo";
import CastBackdropsVideo from "../../components/CastBackdropsVideo/CastBackdropsVideo";
//import YouTubePlayer from '../../Components/MovieDetail/YoutubePlayer/YouTubePlayer'
//import CastBackdropVideo from '../../Components/CastBackdropVideo/CastBackdropVideo'
//import Reviews from '../../Components/Reviews/Reviews'
//import ImageViewer from '../../Components/ImageViewer/ImageViewer'

// Sub-Components
import Loading from "../../other/Loading/Loading";
import Error from "../../other/Error/Error";

const MovieDetail = () => {
  const { mode, movieState } = useMovieContext();
  const dispatch = useDispatch();

  const { getMovieInfo, getCast, getReviews } = useGetMovieInfo();

  // Movie info
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Cast
  const [cast, setCast] = useState([]);
  const [castLoading, setCastLoading] = useState(true);
  const [castError, setCastError] = useState("");

  // Reviews
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewsError, setReviewsError] = useState("");

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    const savedToken = sessionStorage.getItem("token");

    if (savedToken !== "" || savedToken !== undefined || savedToken !== null) {
      dispatch(setSavedMovies());
    }
  }, [dispatch, movieState]);

  useEffect(() => {
    // 1. Get movie info
    getMovieInfo(id, setData, setLoading, setError);

    getCast(id, setCast, setCastLoading, setCastError);

    getReviews(id, setReviews, setReviewsLoading, setReviewsError);

    //2. Get cast
    // setTimeout(() => {
    //   getCast(id, setCast, setCastLoading, setCastError)
    // }, 1000)

    // // 3. Get Reviews
    // setTimeout(() => {
    //   getReviews(id, setReviews, setReviewsLoading, setReviewsError)
    // }, 2000)
  }, []);

  return (
    <div className={"movie-detail " + (mode === true ? "lightBg1" : "darkBg2")}>
      <Header />
      <SmallHeader />
      <Menu />
      <SearchModal />

      <MovieInfo id={id} data={data} loading={loading} error={error} />

      <CastBackdropsVideo />

      {/* <MovieDetail
        data={data}
        loading={loading}
        error={error}
        playerRef={playerRef}
        playerInnerRef={playerInnerRef}
        id={id}
        trailerUrl={trailerUrl}
        setTrailerUrl={setTrailerUrl}
        setPlayerLoading={setPlayerLoading}
        setPlayerError={setPlayerError}
      />

      <YouTubePlayer
        playerRef={playerRef}
        playerInnerRef={playerInnerRef}
        trailerUrl={trailerUrl}
        setTrailerUrl={setTrailerUrl}
        playerLoading={playerLoading}
        playerError={playerError}
      /> */}

      {!loading && !error && (
        <>
          {/* <CastBackdropVideo
            id={id}
            cast={cast}
            castError={castError}
            castLoading={castLoading}
            setCast={setCast}
            setCastLoading={setCastLoading}
            setCastError={setCastError}
            reviews={reviews}
            reviewsError={reviewsError}
            reviewsLoading={reviewsLoading}
          />

          <Reviews
            id={id}
            reviews={reviews}
            reviewsError={reviewsError}
            reviewsLoading={reviewsLoading}
          />

          <ImageViewer /> */}
        </>
      )}
      {/* <Login />
      <Register /> */}
    </div>
  );
};

export default MovieDetail;
