import React, { FC } from 'react';
import './App.scss';
import { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import EditBar from './components/EditBar';
import CVPage from './components/CVPage';

const App: FC = () => {
  const [ data, setData ] = useState('');

  useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
      </header>
      <main>
        <EditBar />
        <CVPage />
      </main>
        <p>
          {!data ? "Loading..." : data}
        </p>
    </div>
  );
}

export default App;
