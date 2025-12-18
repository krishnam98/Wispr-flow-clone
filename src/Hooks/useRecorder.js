import { useState } from "react";
import {
  getMicrophoneStream,
  startAudioCapture,
  stopAudioCapture,
} from "../Services/audioService";

export function useRecorder() {
  const [recording, setRecording] = useState(false);

  const start = async () => {
    const stream = await getMicrophoneStream();
    startAudioCapture(stream, () => {});

    setRecording(true);
  };

  const stop = () => {
    stopAudioCapture();
    setRecording(false);
  };

  return { recording, start, stop };
}
