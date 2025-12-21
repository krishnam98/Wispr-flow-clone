import { useState } from "react";
import {
  getMicrophoneStream,
  startAudioCapture,
  stopAudioCapture,
} from "../Services/audioService";
import {
  startDeepgram,
  sendAudio,
  stopDeepgram,
} from "../Services/deepgramService";

export function useRecorder() {
  const [recording, setRecording] = useState(false);

  const [items, setItems] = useState([]);

  const start = async () => {
    const stream = await getMicrophoneStream();

    await startDeepgram((text, isFinal) => {
      const cleaned = text?.trim();
      if (!cleaned) return;

      setItems((prev) => {
        const updated = [...prev];

        if (isFinal) {
          // Remove last interim if present
          if (updated.length && !updated[updated.length - 1].isFinal) {
            updated.pop();
          }

          // Prevent duplicate final append
          if (
            updated.length &&
            updated[updated.length - 1].isFinal &&
            updated[updated.length - 1].text === cleaned
          ) {
            return updated;
          }

          updated.push({
            id: Date.now(),
            text: cleaned,
            isFinal: true,
          });
        } else {
          // Interim: replace last interim OR add new one
          if (updated.length && !updated[updated.length - 1].isFinal) {
            updated[updated.length - 1] = {
              ...updated[updated.length - 1],
              text: cleaned,
            };
          } else {
            updated.push({
              id: Date.now(),
              text: cleaned,
              isFinal: false,
            });
          }
        }

        return updated;
      });
    });

    startAudioCapture(stream, sendAudio);
    setRecording(true);
  };

  const stop = () => {
    stopAudioCapture();

    // Allow Deepgram to flush final transcript
    setTimeout(stopDeepgram, 300);

    setRecording(false);
  };

  return {
    recording,
    transcripts: items, // render this list directly
    start,
    stop,
  };
}
