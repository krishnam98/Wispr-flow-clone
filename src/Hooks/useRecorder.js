import { useState, useRef } from "react";
import { invoke } from "@tauri-apps/api/core";
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
  const [error, setError] = useState("");
  const [status, setStatus] = useState("idle"); // status: idle |  connecting | listening | transcribing

  // ref to hold current items without causing re-renders
  const itemsRef = useRef([]);

  const start = async () => {
    setStatus("connecting");
    setError("");
    let stream;

    try {
      stream = await getMicrophoneStream();
    } catch (error) {
      if (error.message === "MIC_PERMISSION_DENIED") {
        setError("Microphone access is required to use voice transcription.");
        setStatus("idle");
      }
      return;
    }

    itemsRef.current = [];
    setItems([]);

    await startDeepgram(
      (text, isFinal) => {
        const cleaned = text?.trim();
        if (!cleaned) return;

        let updated = [...itemsRef.current];

        if (isFinal) {
          if (updated.length && !updated[updated.length - 1].isFinal) {
            updated.pop();
          }

          if (
            updated.length &&
            updated[updated.length - 1].isFinal &&
            updated[updated.length - 1].text === cleaned
          ) {
            return;
          }

          updated.push({
            id: Date.now(),
            text: cleaned,
            isFinal: true,
          });
        } else {
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

        itemsRef.current = updated;
        setItems(updated);
      },
      {
        onOpen: () => {
          setStatus("listening");
        },
      }
    );

    startAudioCapture(stream, sendAudio);
    setRecording(true);
  };

  const stop = async () => {
    stopAudioCapture();
    setTimeout(stopDeepgram, 300);

    await new Promise((res) => setTimeout(res, 800));
    console.log("items Ref", itemsRef.current);

    const finalText = itemsRef.current[0].text;

    console.log("Final Transcript to paste:", finalText);

    if (finalText.trim()) {
      await invoke("paste_text", { text: finalText });
    }

    setRecording(false);
    setStatus("idle");
  };

  return {
    recording,
    transcripts: items,
    error,
    status,
    start,
    stop,
  };
}
