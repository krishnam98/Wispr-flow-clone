import { invoke } from "@tauri-apps/api/core";
let socket;
let isOpen = false;
const url =
  "wss://api.deepgram.com/v1/listen" +
  "?model=nova" +
  "&encoding=linear16" +
  "&sample_rate=16000" +
  "&channels=1" +
  "&punctuate=true" +
  "&interim_results=true";

export async function startDeepgram(onTranscript, lifecycle = {}) {
  const apiKey = await invoke("get_deepgram_key");

  socket = new WebSocket(url, ["token", apiKey]);

  socket.onopen = () => {
    console.log("Deepgram Socket Open");
    isOpen = true;
    lifecycle.onOpen?.();
  };

  socket.onmessage = (message) => {
    const data = JSON.parse(message.data);
    console.log("Deepgram message", data);
    const transcipt = data.channel?.alternatives[0]?.transcript;
    const isFinal = data.is_final || data.speech_final;

    console.log(transcipt);

    if (transcipt) {
      onTranscript(transcipt);
    }
  };
  socket.onerror = (err) => {
    console.error("Deepgram socket error", err);
  };

  socket.onclose = () => {
    console.log("🔌 Deepgram connection closed");
    isOpen = false;
  };
}

export function sendAudio(chunk) {
  console.log("sending audio");
  if (!socket || !isOpen) return;
  socket.send(chunk.buffer);
}

export function stopDeepgram() {
  if (socket && socket.readyState === WebSocket.OPEN) {
    // 🔑 Tell Deepgram to flush final transcript
    socket.send(JSON.stringify({ type: "CloseStream" }));

    setTimeout(() => {
      if (socket) {
        socket.close();
      }
    }, 800);
  }
}
