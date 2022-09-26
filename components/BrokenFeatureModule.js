import { useState, useEffect } from 'react';
import { useModule } from '../hooks/useModule';
import { 
  getFirstFlagValueFromLocalStorage as getLocalValue,
  setFirstFlagValueInLocalStorage as setLocalValue,
  getFeatureStatusFromLocalStorage as getLocalStatus,
  setFeatureStatusInLocalStorage as setLocalStatus
} from '../lib/flagHelpers';
import { DevicePhoneMobileIcon } from '@heroicons/react/24/outline';
import { nanoid } from 'nanoid';
import styles from './css/BrokenFeatureModule.module.css';

function Emoji({ symbol, label }) {
  return (
    <span 
      role="img"
      aria-label={label}
      aria-hidden={false}
      className={styles.iconEmoji}>
      {symbol}
    </span>
  )
}

function EmojiManager({ moduleId }) {
  let [ randomId, _ ] = useState(nanoid());
  let [ emoji, setEmoji ] = useState("❓");
  let [ label, setLabel ] = useState("unknown"); // Handle aria-label for each emoji
  let [ flagValue, setFlagValue ] = useState(null);
  let [ featureStatus, setFeatureStatus ] = useState(null);
  let { mod } = useModule(moduleId, successHandler, errorHandler, randomId);

  function handleState(targetingOn, featureWorking) {
    if (targetingOn) {
      if (featureWorking) {
        setEmoji("😎");
        setLabel("smiley face with sunglasses");
      }
      if (!featureWorking) {
        setEmoji("🔥");
        setLabel("fire");
      }
    }
    if (!targetingOn) {
      setEmoji("🙂");
      setLabel("smiley face");
    }
  }

  function successHandler() {
    setFlagValue(mod.flagValue);
    setLocalValue(mod.flagValue);
    setFeatureStatus(mod.configValid);
    setLocalStatus(mod.configValid);
    handleState(flagValue, featureStatus);
  }

  function errorHandler(err) {
    console.error(err);
  }

  return (
    <Emoji symbol={emoji} label={label} />
  )
}


export default function BrokenFeatureModule({ moduleId }) {
  return (
    <div className={styles.container}>
      <DevicePhoneMobileIcon className={styles.iconDevice} />
      <EmojiManager moduleId={moduleId} />
    </div>
  )
}
