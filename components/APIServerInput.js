import { useState, useEffect } from 'react';
import { getUrlFromLocalStorage, setUrlInLocalStorage } from '../lib/urlHelpers';

// Include this component to make the backend address configurable
//
// Example:
// You are hosting the frontend as a static site and want to host the backend
// on a site like Replit instead of requiring attendees to run the app locally.
// In this case, attendees could set the server address to the URL on which
// their Replit app is listening.

export default function APIServerInput() {
  let [ url, setUrl ] = useState('');
  let [ editing, setEditing ] = useState(true);
  
  useEffect(() => {
    const apiServer = getUrlFromLocalStorage();
    if (apiServer) {
      setUrl(apiServer);
    }
  }, []);

  const handleInputChange = (event) => {
    setUrl(event.target.value);
  }

  const handleSubmit = () => {
    setUrlInLocalStorage(url);
    setEditing(false);
  }

  return (
      <form onSubmit={handleSubmit} className="w-full">
        <fieldset disabled={!editing} className="block w-full">
          <label className="block text-sm font-medium text-gray-700">
          Server URL:
            <input type="text" className="block w-full rounded-md border-1 border-gray-500 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" value={url} onChange={handleInputChange}></input>
          </label>
          <button className="bg-blue-200 px-6 py-2">Set</button>
        </fieldset>
        {!editing && <button onClick={() => setEditing(true)}>Edit</button>}
      </form>
  )
}
