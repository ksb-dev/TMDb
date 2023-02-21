import React, { useState, useEffect, useRef } from "react";
import moment from "moment";

// react router dom
import { useNavigate } from "react-router-dom";

// APIs
import { APIs } from "../../APIs/APIs";

// context
import { useMovieContext } from "../../context/context";

// hooks
import { useWatchlistOperations } from "../../hooks/useWatchlistOperations";
import { useGetClassByVote } from "../../hooks/useGetClassByVote";
import { useGetMovieInfo } from "../../hooks/useGetMovieInfo";
import { useShowHide } from "../../hooks/useShowHide";

// data
import { genreArray } from "../../data/genreData";

// redux
import { useSelector } from "react-redux";
import { iconsData } from "../../data/icons";

// other
import Loading from "../../other/Loading/Loading";
import Error from "../../other/Error/Error";
import VideoPlayer from "../../other/VideoPlayer/VideoPlayer";

// Circular progress bar
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

// Recat Icons
import { IoAddOutline, IoCheckmark } from "react-icons/io5";
import { BsCalendar2Date } from "react-icons/bs";
import { MdOutlineAccessTime } from "react-icons/md";
import { TbMessageLanguage } from "react-icons/tb";
import { FiPlay } from "react-icons/fi";

const MovieInfo = ({ id, data, loading, error }) => {
  const navigate = useNavigate();

  //context
  const { mode } = useMovieContext();

  // hooks
  const { addMovie, deleteMovie } = useWatchlistOperations();
  const { getClassBg } = useGetClassByVote();
  const { getTrailer } = useGetMovieInfo();
  const { showPlayer } = useShowHide();

  // states
  const [genres, setGenres] = useState(new Set());
  const [genre_ids, setGenre_ids] = useState(new Set());

  // Youtube player properties
  const [trailerUrl, setTrailerUrl] = useState("");
  const [playerLoading, setPlayerLoading] = useState(false);
  const [playerError, setPlayerError] = useState("");
  const playerRef = useRef(null);
  const playerInnerRef = useRef(null);

  console.log(trailerUrl);

  // redux state
  const savedMovies = useSelector((state) => state.savedMovies.savedMovies);
  const user = useSelector((state) => state.savedMovies.user);

  // Get trailer
  useEffect(() => {
    getTrailer(id, trailerUrl, setTrailerUrl, setPlayerLoading, setPlayerError);
  }, []);

  // Get & store genre__ids
  useEffect(() => {
    if (data && data.genres) {
      for (let i = 0; i < data.genres.length; i++) {
        setGenre_ids((prevId) => new Set([...prevId, data.genres[i].id]));
      }

      for (let i = 0; i < data.genres.length; i++) {
        for (let j = 0; j < genreArray.length; j++) {
          if (data.genres[i].name === genreArray[j].genre) {
            setGenres((prevGenre) => new Set([...prevGenre, genreArray[j]]));
          }
        }
      }
    }
  }, [data]);

  if (loading) {
    return (
      <div className="loading">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <Error msg={"Failed to fetch movie information"} />
      </div>
    );
  }

  return (
    <div
      className={
        "info " +
        (mode === true ? "lightBg1 darkColor1" : "darkBg2 lightColor1")
      }
    >
      <div
        className={"info__detail " + (mode === true ? "lightBg1" : "darkBg2")}
      >
        <div className="info__detail__one">
          <div className="info__detail__one__title-tgline">
            <span className="title">{data.title && data.title}</span>
            <span className="tagline">{data.tagline && data.tagline}</span>
          </div>

          <div className="info__detail__one__date-time">
            {data.release_date && (
              <span className="date">
                <BsCalendar2Date size={"20px"} style={{ marginRight: "5px" }} />
                {moment(data.release_date).format("Do MMM, YYYY")}
              </span>
            )}

            {data.runtime && (
              <span className="time">
                <MdOutlineAccessTime
                  size={"20px"}
                  style={{ marginRight: "5px" }}
                />
                <>
                  {`${Math.floor(data.runtime / 60)}` > 0 &&
                    `${Math.floor(data.runtime / 60)}h`}
                  {` ${data.runtime % 60}`}m
                </>
              </span>
            )}
          </div>

          <div
            className={
              "info__detail__one__rating " + getClassBg(data.vote_average)
            }
          >
            <CircularProgressbar
              value={data.vote_average * 10}
              strokeWidth={5}
              styles={buildStyles({
                pathColor: "#fff",
              })}
            />
            <span>{Number(String(data.vote_average).substring(0, 3))}</span>
          </div>
        </div>
      </div>

      <div className="info__image__video">
        <img
          className="info__image__video--image"
          src={
            data.poster_path === null ? url : APIs.img_path + data.poster_path
          }
          alt={data.title}
        />

        {user && savedMovies && savedMovies.length === 0 && (
          <p
            className="info__image__video__add-btn"
            onClick={() =>
              addMovie(
                id,
                data.title,
                data.poster_path,
                data.backdrop_path,
                data.release_date,
                data.vote_average,
                genre_ids,
                data.overview
              )
            }
          >
            <span className="info__image__video__add-btn-icon">
              {iconsData.star}
            </span>
          </p>
        )}

        {/* ADD-BUTTON */}
        {user &&
          savedMovies &&
          savedMovies.length > 0 &&
          savedMovies.every((item, index) => item.id !== id) && (
            <p
              key={id}
              className="info__image__video__add-btn"
              onClick={() =>
                addMovie(
                  id,
                  title,
                  poster_path,
                  backdrop_path,
                  release_date,
                  vote_average,
                  genre_ids,
                  overview
                )
              }
            >
              <span className="info__image__video__add-btn-icon">
                {iconsData.star}
              </span>
            </p>
          )}
        {/* DELETE-BUTTON */}
        {user &&
          savedMovies &&
          savedMovies.length > 0 &&
          savedMovies.map((item, index) => {
            if (item.id === id) {
              return (
                <p
                  key={index}
                  className="info__image__video__delete-btn"
                  onClick={() => deleteMovie(id)}
                  style={{ background: "gold" }}
                >
                  <span
                    className="info__image__video__delete-btn--icon"
                    style={{ color: "#000" }}
                  >
                    {iconsData.star}
                  </span>
                </p>
              );
            }
          })}
        {/* ADD-BUTTON (without user) */}
        {!user && (
          <p
            className="info__image__video__btn "
            onClick={() => navigate("/login")}
          >
            <span className="info__image__video__btn-icon">
              {iconsData.star}
            </span>
          </p>
        )}
        <div className="info__image__video__player">
          <VideoPlayer embedId={trailerUrl && trailerUrl} />
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
