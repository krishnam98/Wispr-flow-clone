const PushToTalkButton = ({ recording, start, stop }) => {

    return (
        <button className="py-4 px-2 w-[200px] rounded-md border hover:bg-black hover:text-white transition-all duration-200 ease-in " onMouseDown={start} onMouseUp={stop} >
            Hold to Speak
        </button>
    );
}

export default PushToTalkButton