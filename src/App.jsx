import {useCallback, useEffect, useState} from "react";
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
import MovieDetails from "./components/Main/MovieDetails";

import { useDebouncedValue } from "./components/hooks/useDebouncedValue";
import { useLocalStorage } from "./components/hooks/useLocalStorage";
import { useMovies } from "./components/hooks/useMovies";

const KEY = '9fe50e69';

export default function App() {
    const [selectedMovieId, setSelectedMovieId] = useState(null);
    const [watched, setWatched] = useLocalStorage('watched', []);
    const [searchQuery, setSearchQuery] = useState('south park');
    const debouncedSearchQuery = useDebouncedValue(searchQuery);
    const { movies, isLoading, error } = useMovies(debouncedSearchQuery);

    function handleSelectMovie(id) {
        setSelectedMovieId(prevId => prevId === id ? null : id)
    }

    function handleAddWatched(movie) {
        if (!findExistingMovie(movie.imdbID)) {
            setWatched(watched => [...watched, movie]);
        }
        setSelectedMovieId(null);
    }

    function handleDeleteMovie(movieID) {
        setWatched(movies => movies.filter(movie => movieID !== movie.imdbID));
    }

    function findExistingMovie(movieID) {
        return watched.find(w => w.imdbID === movieID);
    }

    useEffect(() => {
        setWatched(watched);
    }, [watched, setWatched]);
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
                            key={selectedMovieId}
                            id={selectedMovieId}
                            watched={watched}
                            onAddWatched={handleAddWatched}
                            onCloseMovie={() => setSelectedMovieId(null)}
                        /> :
                        <>
                            <WatchedSummary watched={watched}/>
                            <WatchedList
                                watched={watched}
                                onDelete={handleDeleteMovie}
                                onSelect={id => setSelectedMovieId(id)}
                            />
                        </>
                        }
                </Box>
            </Main>
        </>
    );
}
