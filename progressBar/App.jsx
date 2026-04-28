import React, { useEffect, useState } from 'react'
import ProgressBar from './components/ProgressBar'

const App = () => {
  const [value , setValue] = useState(0)
  const [sucess,setSuccess] = useState(false)
    useEffect(()=>{
        setInterval(()=>{
            setValue((val)=>val+1)
        },100)
    },[])

  return (
    <div className='container'>   
    <span>Progress Bar </span>
    <ProgressBar value={value}
    onComplete={()=>{setSuccess(true)}}/>
    <span>{sucess?"complete!":"loading..."}</span>
   </div>
  )
}

export default App
