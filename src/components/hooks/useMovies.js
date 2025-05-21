import {useEffect, useState} from "react";

const API_KEY = '9fe50e69';
export function useMovies(query) {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const MIN_CHARS = 3;

        if (query?.length < MIN_CHARS) {
            setMovies([]);
            setError('');
            setIsLoading(false);
            return;
        }

        const controller = new AbortController();

        async function fetchMovies() {
            try {
                setError('');
                setIsLoading(true);

                const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`, {
                    signal: controller.signal
                });

                if (!res.ok) throw new Error('Something went wrong');

                const data = await res.json();

                if (data.Response === 'False') throw new Error('Movie not found');

                setMovies(data.Search);
            } catch (err) {
                if (err.name !== 'AbortError') setError(err.message);
            } finally {
                setIsLoading(false)
            }
        }

        void fetchMovies();

        return () => controller.abort();
    }, [query]);

    return { movies, error, isLoading };
}