import { useState } from 'react';
import { useModule } from '../hooks/useModule';
import { 
  setFirstFlagValueInLocalStorage as setLocalValue,
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
  let [ emoji, setEmoji ] = useState("🔥");
  let [ label, setLabel ] = useState("fire"); // Handle aria-label for each emoji
  let [ flagValue, setFlagValue ] = useState(null);
  let [ featureIsWorking, setFeatureIsWorking ] = useState(null);
  let { mod } = useModule(moduleId, successHandler, errorHandler, randomId);

  function handleState(targetingOn, featureWorking) {
    if (targetingOn !== null) {
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
  }

  function successHandler() {
    setFlagValue(mod.flagValue);
    setLocalValue(mod.flagValue);
    setFeatureIsWorking(mod.featureIsWorking);
    setLocalStatus(mod.featureIsWorking);
    handleState(flagValue, featureIsWorking);
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
