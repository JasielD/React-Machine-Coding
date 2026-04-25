import React, { useEffect, useState } from 'react'
import { tenureData } from './utils/constants'

const App = () => {
  const [cost,setCost] = useState(0)
  const [interest,setInterest] = useState(10)
  const [downPayment,setDownPayment] = useState(0)
  const [tenure,setTenure] = useState(12)
  const [fee,setFee] = useState(0)
  const [emi,setEmi] = useState(0)
  
  const calculateEmi = (downPayment)=>{
    //EMI Amount = [P x R x (1+R)^N]/[(1+R)^N-1]
    if(!cost)return

    const loanAmt = cost - downPayment
    const rateOfInterest = interest/100
    const numOfYears = tenure/12

    const EMI = (loanAmt * rateOfInterest * (1+rateOfInterest)**numOfYears)/((1+rateOfInterest)**rateOfInterest-1)   
    return EMI.toFixed(0)
  }

  const calculateDP = (emi)=>{
    const downPaymentPercentage = 100 - (emi/calculateEmi(0))*100
    return ((downPayment/100)*cost).toExponential(0)
  }
  const updateEmi = (e)=>{
    if(!cost) return
    const dp = Number(e.target.value)
    setDownPayment(dp.toFixed(0))
    const EMI = calculateEmi(dp)
    setEmi(EMI)
  }
  useEffect(()=>{
    if(!cost>0){
      setDownPayment(0)
      setEmi(0)
    }
    const emi = calculateEmi(downPayment)
    setEmi(emi)
  },[tenure])
  const updateDownPayment = (e)=>{
    if(!cost) return
    const emi = Number(e.target.value)
    setEmi(emi.toFixed(0))
    const dp = calculateDP(emi)
    setDownPayment = dp
  }

  return (
    <div className='App'>
      <h1 className='main_title'>Emi Calculator</h1>
      <span className='title'>The cost of Asset</span>
      <input value={cost} 
      type='number'
      onChange={(e)=>setCost(e.target.value)}
      placeholder='total cost of assets'/>

      <span className='title'>interest Rate (in %)</span>
      <input value={interest} 
      type='number'
      onChange={(e)=>setInterest(e.target.value)}
      placeholder='Processing Fee'/>

      <span className='title'>Processing Fee (in %)</span>
      <input value={fee} 
      type='number'
      onChange={(e)=>setFee(e.target.value)}
      placeholder='total cost of assets'/>

      <span className='title'>Down Payment</span>
      <div>
      <input type='range'
      min={0}
      max={cost}
      className='slider'
      value={downPayment}
      onChange={(e)=>updateEmi(e)}/>
      <div className='labels'>
      <label>0%</label>
      <b>{downPayment}</b>
      <label>100%</label>
      </div>
      </div>

      <span className='title'>Loan Per Month</span>
      <div>
        <input type='range'
      min={calculateEmi(cost)}
      max={calculateEmi(0)}
      className='slider'
      value={emi}
      onChange={(e)=>updateDownPayment(e)}/>
       <div className='labels'>
      <label>0%</label>
      <b>{emi}</b>
      <label>100%</label>
      </div>
      </div>


      <span className='title'>tenure</span>
      <div className='tenure_Container'>
      {tenureData.map((t)=>{
        return (
          <button className={`tenure ${t===tenure?"selected":""}`}
          onClick={()=>setTenure(t)}>{t}</button>
        )
      })}
      </div>
      
    </div>
  )
}

export default App
