let audioContext;
let processor;

export async function getMicrophoneStream() {
  return navigator.mediaDevices.getUserMedia({
    audio: {
      echoCancellation: true,
      noiseSuppression: true,
      sampleRate: 16000,
    },
  });
}

export function startAudioCapture(stream, onAudioChunk) {
  audioContext = new AudioContext({ sampleRate: 16000 });

  const source = audioContext.createMediaStreamSource(stream);
  processor = audioContext.createScriptProcessor(4096, 1, 1);

  processor.onaudioprocess = (e) => {
    const input = e.inputBuffer.getChannelData(0);

    let sum = 0;
    for (let i = 0; i < input.length; i++) {
      sum += input[i] * input[i];
    }

    const rms = Math.sqrt(sum / input.length);

    console.log("RMS:", rms.toFixed(4));

    const pcm = floatTo16BitPCM(input);
    onAudioChunk(pcm);
  };

  source.connect(processor);
  processor.connect(audioContext.destination);
}

export function stopAudioCapture() {
  if (processor) {
    processor.disconnect();
  }
  if (audioContext) {
    audioContext.close();
  }
}

function floatTo16BitPCM(float32Array) {
  const pcm16 = new Int16Array(float32Array.length);

  for (let i = 0; i < float32Array.length; i++) {
    pcm16[i] = Math.max(-1, Math.min(1, float32Array[i])) * 0x7fff;
  }

  return pcm16;
}
