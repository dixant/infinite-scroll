import React from 'react';
import './App.css';
import Header from './header/Header';
import './header/Header.css';
import InfiniteUsers from './InfiniteUsers/InfiniteUsers';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <div className="main">
        <InfiniteUsers></InfiniteUsers>
      </div>

    </div>
  );
}

export default App;
