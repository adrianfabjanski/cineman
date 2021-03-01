import React, { useState, createContext, useEffect } from "react";
import swal from "sweetalert";

export const DataContext = createContext();

export const DataProvider = (props) => {
  const [search, setSearch] = useState("");
  const [selectedMovie, setSelectedMovie] = useState();
  const [movies, setMovies] = useState([]);
  const [sidebar, setSidebar] = useState(false);
  const [selectedMovieDetails, setSelectedMovieDetails] = useState();
  const [watchLater, setWatchLater] = useState(
    localStorage.getItem("watchlater")
      ? JSON.parse(localStorage.getItem("watchlater"))
      : []
  );
  const [watched, setWatched] = useState(
    localStorage.getItem("watched")
      ? JSON.parse(localStorage.getItem("watched"))
      : []
  );

  const showSidebar = () => setSidebar(!sidebar);
  const openSidebar = () => setSidebar(true);

  useEffect(() => {
    localStorage.setItem("watchlater", JSON.stringify(watchLater));
  }, [watchLater]);

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1&include_adult=false&query=${e.target.value}`
    )
      .then((res) => res.json())
      .then((data) => setMovies(data));
  };

  const handlePageChange = (page) => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${page}&include_adult=false&query=${search}`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
      });
  };

  const addToWatched = (movie) => {
    const check = watched.every((item) => {
      return item.id !== movie.id;
    });
    if (check) {
      setWatched([...watched, movie]);
    } else {
      swal("You've already seen this movie");
    }
  };

  const getMovie = (id) => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setSelectedMovieDetails(data));
  };

  return (
    <DataContext.Provider
      value={{
        handleSearch,
        movies,
        handlePageChange,
        watchLater,
        setWatchLater,
        addToWatched,
        watched,
        setWatched,
        selectedMovie,
        setSelectedMovie,
        getMovie,
        selectedMovieDetails,
        showSidebar,
        openSidebar,
        sidebar,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};
