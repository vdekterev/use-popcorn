import {useEffect, useState} from "react";
import NavBar from "./components/NavBar/NavBar";
import Main from "./components/Main/Main";
import SearchBar from "./components/NavBar/SearchBar";
import NumResults from "./components/NavBar/NumResults";
import MovieList from "./components/Main/MovieList/MovieList";
import WatchedList from "./components/Main/WatchedList/WatchedList";
import Box from "./components/shared/Box";
import WatchedSummary from "./components/Main/WatchedList/WatchedSummary";
import Loader from "./components/shared/Loader";
import ErrorMessage from "./components/shared/ErrorMessage";
import useDebouncedValue from "./components/hooks/useDebouncedValue";
import MovieDetails from "./components/Main/MovieDetails";

const KEY = '9fe50e69';

export default function App() {
    const [movies, setMovies] = useState([]);
    const [selectedMovieId, setSelectedMovieId] = useState(null);
    const [watched, setWatched] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearchQuery = useDebouncedValue(searchQuery);

    useEffect(() => {
        async function fetchMovies() {
            try {
                setError('');

                setIsLoading(true);
                const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${debouncedSearchQuery}`);
                if (!res.ok) throw new Error('Something went wrong')

                const data = await res.json();
                if (data.Response === 'False') throw new Error('Movie not found')

                setMovies(data.Search)
            } catch (error) {
                setError(error.message)
            } finally {
                setIsLoading(false);
            }
        }

        if (debouncedSearchQuery.length < 3) {
            setMovies([]);
            setError('');
            return;
        }
        fetchMovies();
    }, [debouncedSearchQuery]);

    // useEffect(() => {
    //     async function fetchMovie() {
    //         const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedMovieId}`);
    //         const data = await res.json();
    //     }
    //     if (!selectedMovieId) return;
    //     fetchMovie();
    // }, [selectedMovieId]);

    function handleSelectMovie(id) {
        setSelectedMovieId(prevId => prevId === id ? null : id)
    }

    return (
        <>
            <NavBar>
                <SearchBar query={searchQuery} onSetQuery={setSearchQuery}/>
                <NumResults num={movies.length}/>
            </NavBar>
            <Main>
                <Box>
                    {!isLoading && !error &&
                        <MovieList
                            movies={movies}
                            onSelectMovie={handleSelectMovie}
                        />
                    }
                    {isLoading &&
                        <Loader/>
                    }
                    {error &&
                        <ErrorMessage message={error}/>
                    }
                </Box>
                <Box>
                    {selectedMovieId
                        ? <MovieDetails
                            id={selectedMovieId}
                            onCloseMovie={() => setSelectedMovieId(null)}
                        /> :
                        <>
                            <WatchedSummary watched={watched}/>
                            <WatchedList watched={watched}/>
                        </>
                        }
                </Box>
            </Main>
        </>
    );
}
