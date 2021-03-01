import React, { useContext } from "react";
import { DataContext } from "../DataContext";

export default function Watched() {
  const { watched, setWatched } = useContext(DataContext);

  const removeFromWatched = (movie) => {
    const updater = [...watched];
    updater.forEach((item, index) => {
      if (item.id === movie.id) {
        updater.splice(index, 1);
      }
    });
    setWatched(updater);
  };

  return (
    <div>
      <h1 id="watched-header">Movies you've watched:</h1>
      <div className="watchlater-movies-cnt">
        {watched && watched.length >= 1 ? (
          watched.map((movie) => {
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
                      removeFromWatched(movie);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="no-results">
            <h1>You don't have any movies to watch yet.</h1>
          </div>
        )}
      </div>
    </div>
  );
}
