import React, { useContext } from "react";
import { DataContext } from "../DataContext";
import "./Mainpage.css";
import { useHistory } from "react-router-dom";
import Watchlater from "./Watchlater";
import swal from "sweetalert";

export default function Mainpage() {
  const {
    handleSearch,
    movies,
    handlePageChange,
    watchLater,
    setWatchLater,
    addToWatched,
    setSelectedMovie,
    sidebar,
    openSidebar,
    showSidebar,
  } = useContext(DataContext);

  let history = useHistory();

  const addToWatchLater = (movie) => {
    const check = watchLater.every((item) => {
      return item.id !== movie.id;
    });
    if (check) {
      setWatchLater([...watchLater, movie]);
    } else {
      swal("This movie is already in your watch list");
    }
  };

  const goToPage = (movie) => {
    setSelectedMovie(movie.id);
    let str = movie.title;
    str = str.replace(/\s+/g, "-").toLowerCase();
    history.push(`/details/${str}`);
  };

  return (
    <div className="main-cnt">
      <h1>Search for movies...</h1>
      <input
        type="text"
        autoComplete="off"
        placeholder="Search.."
        id="search-input"
        onChange={handleSearch}
      />
      <div className={sidebar ? "side-menu active" : "side-menu"}>
        <div className="close-sidebar-cnt">
          <p onClick={showSidebar}>X</p>
        </div>
        <Watchlater />
      </div>
      {movies.page ? (
        <div>
          <p id="pages-p">
            Page {movies.page} of {movies.total_pages}
          </p>
          <p id="pages-p">{movies.total_results} results</p>
          <button
            className="movie-btn"
            onClick={() => {
              if (movies.page !== 1) {
                handlePageChange(movies.page - 1);
              }
            }}
          >
            Previous page
          </button>
          <button
            onClick={() => {
              if (movies.page !== movies.total_pages) {
                handlePageChange(movies.page + 1);
              }
            }}
            className="movie-btn"
          >
            Next page
          </button>
        </div>
      ) : null}
      <div className="movies-cnt">
        {movies.results
          ? movies.results.map((movie) => {
              return (
                <div className="movies-item">
                  <h1 className="movie-title">{movie.title}</h1>
                  {movie.poster_path ? (
                    <img
                      className="movie-poster"
                      alt={`${movie.title} poster`}
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      onClick={() => {
                        goToPage(movie);
                      }}
                    />
                  ) : (
                    <div className="noimage">
                      <p>Poster unavailable</p>
                    </div>
                  )}
                  <div className="movie-buttons">
                    <button
                      className="movie-btn"
                      onClick={() => {
                        addToWatchLater(movie);
                        openSidebar();
                      }}
                    >
                      Watch Later
                    </button>
                    <button
                      className="movie-btn"
                      onClick={() => {
                        addToWatched(movie);
                      }}
                    >
                      Watched
                    </button>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}
