const TranscriptDisplay = ({ transcripts }) => {
    return (
        <div style={{ marginTop: 20 }}>
            {transcripts.map((item) => (
                <div
                    key={item.id}
                    style={{
                        opacity: item.isFinal ? 1 : 0.6,
                        fontStyle: item.isFinal ? "normal" : "italic",
                        marginBottom: 4,
                    }}
                >
                    {item.text}
                </div>
            ))}
        </div>
    );
}

export default TranscriptDisplay;