import React from "react";
import Auth from "./components/Auth";
import { db } from "./config/firebase";
import { useState, useEffect } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";

const App = () => {
  const [movieList, setMovieList] = useState([]);
  const movieCollectionRef = collection(db, "movies");

  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseYear, setNewReleaseYear] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);

  const getMovieList = async () => {
    try {
      const data = await getDocs(movieCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setMovieList(filteredData);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getMovieList();
  }, []);

  const onAddMovie = async () => {
    try {
      await addDoc(movieCollectionRef, {
        title: newMovieTitle,
        releaseYear: newReleaseYear,
        Oscar: isNewMovieOscar,
      });

      getMovieList();
    } catch (error) {
      console.error("Error adding movie: ", error);
    }
  };

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
    getMovieList();
  };

  return (
    <div className="App">
      <Auth />

      <div className="container-center">
        <h1 className="text-7xl">Add Movie</h1>
        <br />
        <div className="border-black-solid container-center w-auto">
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => setNewMovieTitle(e.target.value)}
          />
          <input
            type="number"
            placeholder="Release Year"
            onChange={(e) => setNewReleaseYear(Number(e.target.value))}
          />
          <label htmlFor="Oscar">
            Does {newMovieTitle !== "" ? newMovieTitle : "the movie"} have an
            Oscar?{" "}
          </label>
          <input
            type="checkbox"
            id="Oscar"
            className="w-6 h-6"
            checked={isNewMovieOscar}
            onChange={(e) => setIsNewMovieOscar(e.target.checked)}
          />
          <button className="border-gray-solid" onClick={onAddMovie}>
            Add Movie
          </button>
        </div>
      </div>

      <div className="container-center">
        <h1 className="text-7xl">Movie List</h1>
        <br />
        {movieList.map((movie) => (
          <div key={movie.id} className="movieCard">
            <h1 className="text-5xl ">{movie.title}</h1>
            <p>Date: {movie.releaseYear}</p>
            <p>
              {movie.Oscar ? "Recieved an Oscar" : "Did not recieve an Oscar"}
            </p>

            <button className="border-gray-solid mt-2 hover:bg-blue-200" onClick={() => deleteMovie(movie.id)}>Delete Movie</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
