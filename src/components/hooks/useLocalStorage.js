import { useState } from "react";

export default function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.warn("Ошибка чтения localStorage", error);
            return initialValue;
        }
    })

    const setStoredValue = newValue => {
        try {
            setValue(newValue);
            localStorage.setItem(key, JSON.stringify(newValue));
        } catch (error) {
            console.warn("Ошибка записи в localStorage", error);
        }
    }

    return [value, setStoredValue];
}