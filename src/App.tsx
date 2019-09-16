import React from 'react';
import Header from './layout/Header'
import Register from './modules/Auth/Register';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Register />
    </div>
  );
}

export default App;
