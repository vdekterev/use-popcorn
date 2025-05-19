import {useEffect, useRef} from "react";

export default function SearchBar({ query, onSetQuery }) {
    const inputEl = useRef();

    useEffect(() => {
        const handleFocusInput = e => {
            if (document.activeElement === inputEl.current) return;

            if (e.code === 'Enter') {
                e.stopPropagation();
                inputEl.current.focus();
            }
        }
        document.addEventListener('keydown', handleFocusInput);
        return () => document.removeEventListener('keydown', handleFocusInput)
    }, [])

    return (
        <input
            ref={inputEl}
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={e => onSetQuery(e.target.value)}
        />
    );
}