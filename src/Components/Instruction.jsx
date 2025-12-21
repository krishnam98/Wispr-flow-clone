const Instruction = () => {
    return (
        <div className="w-[60%] text-xl mb-4">
            Hold the <b>Hold to Speak</b> button or <b>Ctrl / Cmd + Shift + Space</b> to start dictation.
            While speaking, keep any text field on your screen selected (browser, editor, document, etc.).
            Release the button or shortcut to stop recording.
            Your speech will be transcribed and automatically inserted into the focused text field.
            Make sure microphone access is enabled for best results.
        </div>
    );
}

export default Instruction;