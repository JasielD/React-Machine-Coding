import React from 'react'

const StrengthChecker = ({password}) => {
   const getpasswordStrength = ()=>{
        const passwordLength = password.length
        if(passwordLength < 1){
            return "";
        } else if (passwordLength === 4) {
        return "Very Weak";
        } else if (passwordLength < 8) {
        return "Poor";
        } else if (passwordLength < 12) {
        return "Medium";
        } else if (passwordLength < 16) {
        return "Strong";
        } else {
        return "Very Strong";
        }
    }
    const passwordStrength = getpasswordStrength()
    if(!passwordStrength) return <React.Fragment />
  return (
    <div className='password-strength'>
      strength:<span style={{fontWeight:"bold"}}>{passwordStrength}</span>
    </div>
  )
}

export default StrengthChecker
