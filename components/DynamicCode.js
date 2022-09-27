import { useState, useEffect } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter'
import { getSdkKeyFromLocalStorage } from '../lib/flagHelpers';
import { docco } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import styles from './css/FlagKeyInput.module.css';


export default function DynamicCode() {
    let [sdkKey, setSdkKey] = useState('');

    const updateCodeSample = () => {
        setSdkKey(getSdkKeyFromLocalStorage());
    }


return (
  <>
  <SyntaxHighlighter showLineNumbers="true" startingLineNumber={14} language="javascript" style={docco}>
  {
  `  // STEP 2: Define your SDK key
    const SDK_KEY = '${ sdkKey }'` 
  }
  </SyntaxHighlighter>
  <button onClick={updateCodeSample} className={styles.button}>Generate Code Sample</button>
  </>
)}