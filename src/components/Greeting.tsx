function getGreeting(hour: number): string {
    switch (true) {
        case (hour >= 22 && hour <= 23 || hour >= 0 && hour <= 4):
            return "Goodnight.";
        case (hour >= 5 && hour <= 11):
            return "Good morning.";
        case (hour >= 12 && hour <= 16):
            return "Good afternoon.";
        case (hour >= 17 && hour <= 21):
            return "Good evening.";
        default:
            return "Hello.";
    }
}

export function Greeting() {
    return <div className="tracking-widest text-steel">
        {getGreeting(Temporal.Now.plainTimeISO().hour)}
    </div>;
}
