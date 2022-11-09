import { useState, useEffect } from 'react';
import { getSdkKeyFromLocalStorage, setSdkKeyInLocalStorage } from '../lib/flagHelpers';

// Need to import custom styles because we can't reconfigure the Tailwind installation in the theme
// to add the @tailwind/forms plugin
import styles from './css/FlagKeyInput.module.css';

// Include this component to store the user's first flag key in localStorage
// Todo: refactor this and APIServerInput to use a shared component for the display

export default function SdkKeyInput() {
  let [ sdkKey, setSdkKey ] = useState('');
  let [ isButtonActive, updateButtonState ] = useState(false);
  
  useEffect(() => {
    const sdkKey = getSdkKeyFromLocalStorage();
    if (sdkKey) {
      setSdkKey(sdkKey);
    }
  }, []);

  const handleInputChange = (event) => {
    setSdkKey(event.target.value);
    if(event.target.value.length !== 0) {
      updateButtonState(true);
    } else {
      updateButtonState(false);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setSdkKeyInLocalStorage(sdkKey);

    // Reset the form input field on submit
    event.target.elements['sdkKey'].form.reset();
    updateButtonState(false);
  }

  return (
      <form onSubmit={handleSubmit} className={`w-full ${styles.form}`}>
        <fieldset className="block w-full">
          <div className="flex">
            <label className="w-full mr-8 text-sm font-medium text-gray-700">
            SDK Key:
              <input name="sdkKey" type="text" placeholder="Enter your SDK key" className={`w-full rounded-md border-1 line border-gray-500 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${styles.input}`} onChange={handleInputChange}></input>
            </label>
            <button className={isButtonActive ? styles.buttonActive : styles.buttonInactive}>Save</button>
          </div>
        </fieldset>
      </form>
  )
}