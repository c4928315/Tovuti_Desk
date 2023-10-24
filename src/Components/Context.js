import React, { createContext, useState } from 'react'

const Context = ({children}) => {

  const [currentStep, setStep] = useState(1)
  const [userData, setUserData] = useState({
   
    assets: [],
    asset: [],
    TicketRef: "Ref101",
    DueDate: "2023-11-20",
    ModifiedDate: "2023-06-16",
    TicketStatus: {
      StatusId: 3,
      StatusName: "In Progress"
    },
    TicketCurrentTeam:{},
    TicketAdditionalTeams:[],
    TicketLocation: {
      
    },
    TicketPriority: {
      TicketPriorityId: 1,
      TicketPriorityName: "High"
    },
    TicketChecklistForms: {
      FormsAndSectionsId: 20,
      FormsAndSectionsName: "Form 1"
    },
    features:[],
    TicketCategoryOfWork: {

    }
    
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
