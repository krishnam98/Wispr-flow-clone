import { useEffect, useRef } from "react";
import "./App.css";
import PushToTalkButton from "./Components/PushToTalkButton";
import { useRecorder } from "./Hooks/useRecorder";
import TranscriptDisplay from "./Components/TransciptDisplay";
import { listen } from "@tauri-apps/api/event";
import PTTNudge from "./Components/PTTNudge";
import Instruction from "./Components/Instruction";

function App() {
  const { recording, transcripts, status, start, stop } = useRecorder();
  const isRecordingRef = useRef(false);

  useEffect(() => {
    let unlistenStart;
    let unlistenStop;

    (async () => {
      unlistenStart = await listen("ptt-start", () => {
        if (!isRecordingRef.current) {
          start();
          isRecordingRef.current = true;
        }
      });

      unlistenStop = await listen("ptt-stop", () => {
        if (isRecordingRef.current) {
          stop();
          isRecordingRef.current = false;
        }
      });
    })();

    return () => {
      unlistenStart?.();
      unlistenStop?.();
    };
  }, []);

  return (
    <div className="flex flex-col p-4 gap-4 items-center justify-center h-screen border-2 bg-[#fffae5]">
      <div className="w-[70%]"><h1 className="text-5xl font-bold mb-4">Wispr Flow Clone</h1></div>
      <Instruction />

      <PushToTalkButton recording={recording} start={start} stop={stop} />
      <TranscriptDisplay transcripts={transcripts} />
      <PTTNudge status={status} />
    </div>
  );
}

export default App;
