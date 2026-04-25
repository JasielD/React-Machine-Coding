import React, { useState } from 'react'

const Folder = ({handleInsertNode,explorer}) => {
  const [expand,setExpand] = useState(false)
  const [showInput,setShowInput] = useState({
    visible:false,
    isFolder:null
  })
  const handleNewFolder = (e,isFolder)=>{
    e.stopPropagation()
    setExpand(true)
    setShowInput({
      visible:true,
      isFolder
    })
  }
  const onAddFolder = (e)=>{
    if(e.keyCode === 13 && e.target.value){
      handleInsertNode(explorer.id,e.target.value,showInput.isFolder)
      setShowInput({...showInput,visible:false})
    }
  }
  if(explorer.isFolder){
  return (
    <div style={{marginTop:10}}>
      <div className='folder' onClick={()=>setExpand(!expand)}>
        <span>📁{explorer.name}</span>
        <div>
          <button className='btn' onClick={(e)=>handleNewFolder(e,true)}>Folder +</button>
          <button className='btn' onClick={(e)=>handleNewFolder(e,false)}>File +</button>
        </div>
      </div>
      <div style={{display:expand?'block':'none',paddingLeft:25}}>
        {showInput.visible && (
          <div className='inputContainer'>
            <span>{showInput.isFolder?"📁":"📃"}</span>
            <input className='inputContainer__input'
            autoFocus
            type='text'
            onBlur={()=>setShowInput({...showInput,visible:false})}
            onKeyDown={(e)=>onAddFolder(e)}/>
          </div>
        )}
        {explorer.items.map((exp)=>{
          return (
            <Folder handleInsertNode={handleInsertNode} explorer={exp} key={exp.id}/>
          )
        })}
      </div>
    </div>
  )
}else{
  return (
    <div className='file'>
      <span >📃{explorer.name}</span>
    </div>)
}
}

export default Folder
