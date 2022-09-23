import { useEffect, useState } from 'react';
import { useModule } from '../hooks/useModule';
import { 
  getFirstFlagFromLocalStorage as getKey, 
  setFirstFlagValueInLocalStorage as setLocalValue,
  getFirstFlagValueFromLocalStorage as getLocalValue
} from '../lib/flagHelpers';
import { FlagIcon } from '@heroicons/react/24/solid';
import styles from './css/FlagKeyAndValue.module.css';
import { OPTIONS } from '../lib/constants';

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

  // Need to use this hacky localStorage effect because SWR will deduplicate
  // requests - if multiple components of this type are on same page,
  // only the first one will actually fetch data from the API. This ensures the rest
  // will stay up to date as well
  useEffect(() => {
    const interval = setInterval(() => {
      if (flagValue !== getLocalValue()) {
        setFlagValue(getLocalValue());
      }
    }, OPTIONS.refreshInterval);

    return () => clearInterval(interval);
  }, [])

  function successHandler() {
    setFlagValue(mod.flagValue);
    setLocalValue(mod.flagValue);
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
