import { useCallback, useEffect, useState } from 'react';

const useDebounce = (callback: (value: string) => void, delay: number) => {
    const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(
        null,
    );

    useEffect(() => {
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [timer]);

    return useCallback(
        (value: string) => {
            if (timer) {
                clearTimeout(timer);
            }
            const newTimer = setTimeout(() => {
                callback(value);
            }, delay);
            setTimer(newTimer);
        },
        [callback, delay, timer],
    );
};

export default useDebounce;
