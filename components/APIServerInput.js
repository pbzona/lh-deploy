import { useState, useEffect } from 'react';
import { getUrlFromLocalStorage, setUrlInLocalStorage } from '../lib/urlHelpers';

// Need to import custom styles because we can't reconfigure the Tailwind installation in the theme
// to add the @tailwind/forms plugin
import styles from './css/APIServerInput.module.css';

// Include this component to make the backend address configurable
//
// Example:
// You are hosting the frontend as a static site and want to host the backend
// on a site like Replit instead of requiring attendees to run the app locally.
// In this case, attendees could set the server address to the URL on which
// their Replit app is listening.
// Todo: refactor this and FlagKeyInput to use a shared component for the display

export default function APIServerInput() {
  let [ url, setUrl ] = useState('');
  let [ isButtonActive, updateButtonState ] = useState(false);

  useEffect(() => {
    const apiServer = getUrlFromLocalStorage();
    if (apiServer) {
      setUrl(apiServer);
    }
  }, []);

  const handleInputChange = (event) => {
    if (event.target.value.length !== 0) {
      updateButtonState(true);
    } else {
      updateButtonState(false);
    }
  };

  const handleSubmit = (event) => {
    // Remove this line if other widgets appear on the same page:
    //   default behavior forces a page refresh, which allows other widgets
    //   to correctly obtain the URL they need to poll
    event.preventDefault();
    
    let updatedUrl = event.target.elements['serverUrl'].value;
    setUrlInLocalStorage(updatedUrl);
    setUrl(updatedUrl);
    
    // Reset the form input field on submit
    event.target.elements['serverUrl'].form.reset();

    updateButtonState(false);
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className={`w-full ${styles.form}`}>
        <fieldset className="block w-full">
          <div className="flex">
            <label className="w-full mr-8 text-sm font-medium text-gray-700">
            Server URL:
            <input name="serverUrl" type="text" className={`w-full rounded-md border-1 line border-gray-500 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${styles.input}`} placeholder="Enter server URL" onChange={handleInputChange} onSubmit={handleSubmit}></input>
            </label>
            <button className={isButtonActive ? styles.buttonActive : styles.buttonInactive} type="submit">Set</button>
          </div>
        </fieldset>
      </form>
      <p><b>Saved server URL:</b> {url ? url : "N/A"}</p>
    </div>
  )
}
