import { useState, useEffect } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter'
import { getSdkKeyFromLocalStorage } from '../lib/flagHelpers';
import { docco } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { OPTIONS } from '../lib/constants';


export default function DynamicCode() {
    let [sdkKey, setSdkKey] = useState('');

    useEffect(() => {
      const interval = setInterval(() => {
        updateCodeSample();
      }, 200);

      return () => clearInterval(interval);
    }, [])

    const updateCodeSample = () => {
      setSdkKey(getSdkKeyFromLocalStorage());
    }

return (
  <SyntaxHighlighter showLineNumbers="true" startingLineNumber={14} language="javascript" style={docco}>
  {
  `  // STEP 2: Define your SDK key
    const SDK_KEY = '${ sdkKey }'` 
  }
  </SyntaxHighlighter>
)}