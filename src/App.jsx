import React from "react";
import Auth from "./components/Auth";
import { db } from "./config/firebase";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";

const App = () => {
  const [movieList, setMovieList] = useState([]);

  const movieCollectionRef = collection(db, "movies");

  useEffect(() => {
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

    getMovieList();
  }, []);

  return (
    <div className="App">
      <Auth />

      <div>
        {movieList.map((movie) => (
          <div key={movie.id}>
            <h1 className="text-5xl ">{movie.title}</h1>
            <p>Date: {movie.releaseYear}</p>
            <p>{movie.Oscar ? "Recieved an Oscar" : "Did not Recieve and Oscar"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
