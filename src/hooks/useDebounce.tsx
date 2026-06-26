import { useEffect, useRef } from 'react';

const useDebounce = <T,>(callback: (value: T) => void, delay: number) => {
    const callbackRef = useRef(callback);
    const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
        undefined,
    );

    callbackRef.current = callback;

    useEffect(() => {
        return () => clearTimeout(timerRef.current);
    }, []);

    return (value: T) => {
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => callbackRef.current(value), delay);
    };
};

export default useDebounce;
