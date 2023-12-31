import React, { createContext, useState } from 'react'

const Context = ({children}) => {

  const [currentStep, setStep] = useState(1)
  const [userData, setUserData] = useState({
   
   
    "TicketRef": "Ref101",
    "DueDate": "2023-11-20",
    "ModifiedDate": "2023-06-16",
    "TicketAssets": [],
    "TicketStatus": {
      "StatusId": 3,
      "StatusName": "In Progress"
    },
    "TicketCurrentTeam":{},
    "TicketAdditionalTeams":[],
    "TicketLocation": {
      
    },
    "TicketPriority": {
      
    },
    "TicketProjectedParts": [],
    "TicketAssetCategory": [],
    "TicketRequestedParts": [],
    "TicketUsedParts": [],
    "TicketChecklistForms":[],
    "TicketRecievedParts": [],
    "TicketReturnedParts": [],
    "TicketCategoryOfWork": {},
    "TicketMileageDetails": {},
    "TicketCostItems": {},
    "ItemType": {},
    "Cost": "",
    "Budget": "",
})

const [requestedPartz, setRequestedPartz] = useState({
  "parts": {},
  "location": {},
  "quantity": 0,
  "amount": 0
})



  const [requestData, setRequestData] = useState({})
  const [finalData, setFinalData] = useState([])

  const storedClaims = localStorage.getItem('claims');
  const [userClaims, setUserClaims] = useState(storedClaims ? JSON.parse(storedClaims) : []);

  function submitData(){

  }
  
  return (
    <div>
      <MultiStepContext.Provider value={{currentStep, setStep, userData, setUserData, finalData, setFinalData, submitData,requestData, setRequestData, userClaims, requestedPartz, setRequestedPartz}}>
       {children}
      </MultiStepContext.Provider>
    </div>
  )
}

export const MultiStepContext = React.createContext();

export default Context
