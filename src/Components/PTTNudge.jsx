export default function PTTNudge({ status }) {
    if (status === "idle") return null;

    const textMap = {
        connecting: "Connecting…",
        listening: "Listening…",
        transcribing: "Transcribing…",
    };

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2
                    bg-black text-white px-6 py-3 rounded-full
                    shadow-lg text-sm font-medium z-50">
            {textMap[status]}
        </div>
    );
}
