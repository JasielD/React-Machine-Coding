import React, { useEffect, useState } from 'react'
import usePasswordGenerator from './hooks/use-password-generator'
import StrengthChecker from './components/StrengthChecker'
import Button from './components/Button'
import Checkbox from './components/Checkbox'

const App = () => {
  const [length,setLength] = useState(4)
  const [checkboxData,setCheckboxData] = useState([
      { title: "Include Uppercase Letters", state: false },
    { title: "Include Lowercase Letters", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include Symbols", state: false }
  ])
  const [copied,setCopied] = useState(false)

  const handlecheckboxChange = (i)=>{
    let updatedCheckboxData = [...checkboxData]
    updatedCheckboxData[i].state = !updatedCheckboxData[i].state
    setCheckboxData(updatedCheckboxData)
  }

  const handleCopy  = ()=>{
    navigator.clipboard.writeText(password)
    setCopied(true);
    setTimeout(()=>{
      setCopied(false)
    },2000)
  }

  const {password,errorMessage,generatePassword} = usePasswordGenerator()

  return (
    <div className='container'>   
      {/* password text and copy */}
      <div className='header'>
        <div className='title'>{password}</div>
        <Button className={"copy_btn"} onClick={()=>handleCopy} text={copied?"Copied":"Copy"}/>
      </div>
      {/* character Length */}
      <div className='charlength'>
        <span>
          <label htmlFor='char-slider'>Character Length</label>
          <output>{length}</output>
        </span>
        <input 
        id='char-slider'
        type='range'
        min={4}
        max={20}
        onChange={(e)=>{setLength(e.target.value)}}
        value={length}/>
      </div>
      {/* checkboxes  */}
      <div className='checkboxes'>
      {checkboxData.map((item,i)=>{
        const checkboxID = `checkbox-${i}`;
        return(<Checkbox key={checkboxID}
          id={i} 
          state={item.state} 
          title={item.title}
          onChange={()=>{handlecheckboxChange(i)}}/>)
      })}
      </div>
      {/* strengths */}
      <StrengthChecker  password={password}/>
      {/* error Handleling */}
      {errorMessage && <div className='errorMessage'>{errorMessage}</div>}
      {/* generate Button */}
      <Button text={"Generate"} onClick={()=>{generatePassword(checkboxData,length)}} className={"generatebtn"}/>
    </div>
  )
}

export default App
