import { useState } from 'react';
import { useModule } from '../hooks/useModule';
import { getFirstFlagFromLocalStorage as getKey } from '../lib/flagHelpers';
import { FlagIcon } from '@heroicons/react/24/solid';
import styles from './css/FlagKeyAndValue.module.css';

function KeyValuePair({ keyProp, value }) {
  return (
    <div className={styles.container}>
      <FlagIcon className={styles.icon} />
      <p className={styles.keyValuePair} style={{marginTop: 0}}>
        {`${keyProp}: ${value}`}
      </p>
      <FlagIcon className={styles.icon} />
    </div>
  )
}

export default function FlagKeyAndValue({ moduleId }) {
  let [ flagValue, setFlagValue ] = useState(null);
  let { mod } = useModule(moduleId, successHandler, errorHandler);

  function successHandler() {
    setFlagValue(mod.flagValue);
  }

  function errorHandler() {
    console.error('There was an error');
  }

  return (
    <div className={
      `${styles.panel}
       ${flagValue ? styles.valTrue : styles.valFalse}`}>
      { flagValue === null && <p styles={styles.keyValuePair}>No flag data</p> }
      { flagValue !== null && <KeyValuePair keyProp={getKey()} value={flagValue} /> }
    </div>
  )
}
