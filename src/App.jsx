import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PushToTalkButton from './Components/PushToTalkButton'
import { useRecorder } from './Hooks/useRecorder'
import TranscriptDisplay from './Components/TransciptDisplay'
import { listen } from '@tauri-apps/api/event'

function App() {
  const { recording, transcripts, start, stop } = useRecorder();
  const isRecordingRef = useRef(false);

  useEffect(() => {
    let unlisten;

    listen("ptt-start", () => {
      if (!isRecordingRef.current) {
        start();
        isRecordingRef.current = true;
      }
    }).then((fn) => {
      unlisten = fn;
    })

    const handleKeyUp = (e) => {
      if (e.ctrlKey === false && e.shiftKey === false) {
        if (isRecordingRef.current) {
          stop();
          isRecordingRef.current = false;
        }
      }
    }

    window.addEventListener("keyup", handleKeyUp);

    return () => {
      if (unlisten) {
        unlisten();
      }

      window.removeEventListener("keyup", handleKeyUp);
    }
  }, []);


  return (
    <div className='flex flex-col p-4 gap-4 items-center justify-center h-screen '>
      <h2 className='text-2xl font-bold'>Wispr Flow Clone</h2>
      <PushToTalkButton recording={recording} start={start} stop={stop} />
      <TranscriptDisplay transcripts={transcripts} />


    </div>
  )
}

export default App
