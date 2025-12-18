import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PushToTalkButton from './Components/PushToTalkButton'
import { useRecorder } from './Hooks/useRecorder'

function App() {
  const [count, setCount] = useState(0);
  const { recording, start, stop } = useRecorder();

  return (
    <div className='flex flex-col p-4 gap-4 items-center justify-center h-screen '>
      <h2 className='text-2xl font-bold'>Wispr Flow Clone</h2>
      <PushToTalkButton recording={recording} start={start} stop={stop} />


    </div>
  )
}

export default App
