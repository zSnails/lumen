import { useEffect, useState } from "react";

declare class Temporal {
    static Now: {
        plainTimeISO(): {
            toLocaleString(): string;
        };
    };
}

function getTime(): string {
    return Temporal.Now.plainTimeISO().toLocaleString();
}

export function Clock() {
    const [currentTime, setCurrentTime] = useState<string>(getTime);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(getTime);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return <div className="text-9xl font-serif">
        {currentTime}
    </div>
}
