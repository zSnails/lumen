export function Date() {
    const date = Temporal.Now.plainDateISO().toLocaleString(
        'en-US',
        {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
        },
    );
    return <div className="text-xl font-sans text-steel">
        {date}
    </div>
}
