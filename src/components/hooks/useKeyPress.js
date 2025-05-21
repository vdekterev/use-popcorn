import { useEffect } from "react";

export function useKeyPress(keycodes = [], callback) {
    useEffect(() => {
        function handler(e) {
            if (keycodes.map(k => k.toLowerCase()).includes(e.code.toLowerCase())) {
                callback(e);
            }
        }
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, [keycodes, callback]);
}