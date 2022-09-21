import { useState, useEffect } from 'react';
import { getFirstFlagFromLocalStorage, setFirstFlagInLocalStorage } from '../lib/flagHelpers';

// Need to import custom styles because we can't reconfigure the Tailwind installation in the theme
// to add the @tailwind/forms plugin
import styles from './css/FlagKeyInput.module.css';

// Include this component to store the user's first flag key in localStorage
// Todo: refactor this and APIServerInput to use a shared component for the display

export default function FlagKeyInput() {
  let [ flagKey, setFlagKey ] = useState('');
  
  useEffect(() => {
    const firstFlag = getFirstFlagFromLocalStorage();
    if (firstFlag) {
      setFlagKey(firstFlag);
    }
  }, []);

  const handleInputChange = (event) => {
    setFlagKey(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setFirstFlagInLocalStorage(flagKey);
  }

  return (
      <form onSubmit={handleSubmit} className={`w-full ${styles.form}`}>
        <fieldset className="block w-full">
          <div className="flex">
            <label className="w-full mr-8 text-sm font-medium text-gray-700">
            Feature Flag Key:
              <input type="text" className={`w-full rounded-md border-1 line border-gray-500 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${styles.input}`} value={flagKey} onChange={handleInputChange}></input>
            </label>
            <button className={styles.button}>Save</button>
          </div>
        </fieldset>
      </form>
  )
}
