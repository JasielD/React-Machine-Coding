import React from 'react'

const Checkbox = ({title,state,onChange,id}) => {
  return (
    <div>
          <input type='checkbox' 
          id={id}
          checked={state}
          onChange={onChange}/>
          <label htmlFor={id}>{title}</label>
          </div>
  )
}

export default Checkbox
