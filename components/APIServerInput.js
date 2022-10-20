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
  
  useEffect(() => {
    const apiServer = getUrlFromLocalStorage();
    if (apiServer) {
      setUrl(apiServer);
    }
  }, []);

  const handleInputChange = (event) => {
    setUrl(event.target.value);
  }

  const handleSubmit = (event) => {
    // Remove this line if other widgets appear on the same page:
    //   default behavior forces a page refresh, which allows other widgets
    //   to correctly obtain the URL they need to poll
    event.preventDefault();
    
    setUrlInLocalStorage(url);
    setEditing(false);
  }

  return (
      <form onSubmit={handleSubmit} className={`w-full ${styles.form}`}>
        <fieldset className="block w-full">
          <div className="flex">
            <label className="w-full mr-8 text-sm font-medium text-gray-700">
            Server URL:
              <input type="text" className={`w-full rounded-md border-1 line border-gray-500 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${styles.input}`} value={url} onChange={handleInputChange}></input>
            </label>
            <button className={styles.button}>Set</button>
          </div>
        </fieldset>
      </form>
  )
}
