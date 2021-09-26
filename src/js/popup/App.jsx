import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader';

const App = () => {
  const [newUrl, setNewUrl] = useState('');
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    chrome.storage.local.get('urls', (result) => {
      setUrls(result.urls || []);
    });
  }, []);

  useEffect(() => {
    chrome.storage.local.set({ urls });
  }, [urls]);

  return (
    <main className="app">
      <section className="header">
        <h1>Anti-Autofill</h1>
      </section>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Block URL</label>
          <input
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value.toLowerCase())}
            className="form-control"
            placeholder="google.com"
          />
        </div>
      </form>
      <section className="currentUrls">
        <h2>Current URLs</h2>
        <ul>
          {urls.map((url) => (
            <li key={url}>
              {url} --{' '}
              <a href="#" onClick={() => removeUrl(url)}>
                (delete)
              </a>
            </li>
          ))}
          {!urls.length && <li>No URLs</li>}
        </ul>
      </section>
    </main>
  );

  function removeUrl(url) {
    setUrls(urls.filter((u) => u !== url));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!newUrl.match(/^(http|https):\/\/[^ "]+$/)) return;
    if (urls.includes(newUrl)) return;
    setUrls([...urls, newUrl]);
  }
};

export default hot(module)(App);
