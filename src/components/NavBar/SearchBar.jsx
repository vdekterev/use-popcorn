import { useRef } from "react";
import {useKeyPress} from "../hooks/useKeyPress";

export default function SearchBar({ query, onSetQuery }) {
    const inputEl = useRef();
    useKeyPress(['Enter', 'NumpadEnter'],  e => {
        if (document.activeElement === inputEl.current) return;
        e.stopPropagation();
        inputEl.current.focus();
    });
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