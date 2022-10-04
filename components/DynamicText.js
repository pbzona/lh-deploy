import React from 'react';
import { useState, useEffect } from 'react';
import { getFirstFlagValueFromLocalStorage } from '../lib/flagHelpers';

export default function DynamicText({children}) {
    let [flagValue, setFlagValue] = useState('');

    useEffect(() => {
      const interval = setInterval(() => {
        updateCodeSample();
      }, 200);

      return () => clearInterval(interval);
    }, [])

    const updateCodeSample = () => {
      setFlagValue(getFirstFlagValueFromLocalStorage());
    }


return (
    <span style={flagValue ? {color: "red", fontWeight: "bold"} : {color: "green", fontWeight: "bold"}}> 
    {flagValue ? children.trueOption : children.falseOption}
    </span>
)}