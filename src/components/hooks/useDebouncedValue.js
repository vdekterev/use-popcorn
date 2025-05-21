import { useEffect, useState } from "react";

const DEBOUNCE_DELAY = 500;

export function useDebouncedValue(value, delay = DEBOUNCE_DELAY) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay)

        return () => clearTimeout(timer);

    }, [value, delay]);

    return debouncedValue;
}