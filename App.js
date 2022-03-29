import { useEffect, useState } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './movieCard';

const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=42f95664'




const App = ()=>{

   const [movies, setMovies] = useState([]);
   const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title)=>{
        const response = await fetch (`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
    }

    useEffect(()=>{
        searchMovies('spiderman');
    }, []);
    return(
        <div className="app">
            <h1>MoviesLand</h1>
            <div className='search'>
                <input placeholder='search for movie' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                <img src={SearchIcon} alt="search" onClick={() => searchMovies(searchTerm)}/>
            </div>

            {
                movies?.length > 0
                ? (
                    <div className='container'>
                      {
                          movies.map((movie)=>(
                              <MovieCard movie={movie} />
                          ))
                      }
                    </div>
                ) : (
                    <div className='empty'>
                        <h2>no movies found</h2>
                    </div>
                )
            }

            
        </div>
    );
}

export default App;