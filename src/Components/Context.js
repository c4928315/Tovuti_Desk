import React, { createContext, useState } from 'react'

const Context = ({children}) => {

  const [currentStep, setStep] = useState(1)
  const [userData, setUserData] = useState({
   
    assets: [],
    asset: [],
    description: ""
})

  const [requestData, setRequestData] = useState({})
  const [finalData, setFinalData] = useState([])

  function submitData(){

  }
  
  return (
    <div>
      <MultiStepContext.Provider value={{currentStep, setStep, userData, setUserData, finalData, setFinalData, submitData,requestData, setRequestData}}>
       {children}
      </MultiStepContext.Provider>
    </div>
  )
}

export const MultiStepContext = React.createContext();

export default Context
