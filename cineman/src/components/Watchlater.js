import React, { useContext } from "react";
import { DataContext } from "../DataContext";

export default function Watchlater() {
  const { watchLater, setWatchLater, addToWatched } = useContext(DataContext);

  const removeFromWatchLater = (movie) => {
    const updater = [...watchLater];
    updater.forEach((item, index) => {
      if (item.id === movie.id) {
        updater.splice(index, 1);
      }
    });
    setWatchLater(updater);
  };

  return (
    <div>
      <h1 id="watch-list">Watch list:</h1>
      <div className="watchlater-movies-cnt">
        {watchLater && watchLater.length >= 1 ? (
          watchLater.map((movie) => {
            return (
              <div className="movies-item">
                <h1 className="movie-title">{movie.title}</h1>
                {movie.poster_path ? (
                  <img
                    className="movie-poster"
                    alt={`${movie.title} poster`}
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
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
                      removeFromWatchLater(movie);
                    }}
                  >
                    Remove
                  </button>
                  <button
                    className="movie-btn"
                    onClick={() => {
                      removeFromWatchLater(movie);
                      addToWatched(movie);
                    }}
                  >
                    Watched
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="no-results">
            <h1>You don't have any watched movies yet.</h1>
          </div>
        )}
      </div>
    </div>
  );
}
