import { useState } from 'react'
import { useModule } from '../hooks/useModule'
import LearningModule from './LearningModule'

function Display({ text, emoji, strong}) {
  return (
    <>
    <p style={{"fontSize": 18, "textAlign": "center", "fontWeight": strong ? "bold" : "normal"}}>
      {text}
    </p>
    <p style={{"fontSize": 36, "textAlign": "center"}}>
      {emoji}
    </p>
    </>
  )
}

export default function SDKSetupModule({ moduleId }) {
  let [ initialized, setInitialized ] = useState(false);
  let _ = useModule(moduleId, successHandler, errorHandler);

  function successHandler(res) {
    setInitialized(res.is_initialized);
  }
  
  function errorHandler(err){
    console.error(err);
  }

  // TODO: Style the p els
  return (
    <LearningModule>
      { initialized ? 
        <Display text="Nice work! Your SDK client has been initialized!" emoji="🚀  🚀  🚀" strong/> :
        <Display text="SDK client not yet initialized" emoji="🚫" />
    }
    </LearningModule>
  )
}
