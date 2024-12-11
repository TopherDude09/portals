import React from 'react';
import Header from './components/Header';
// import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';

const App: React.FC = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* <Sidebar /> */}
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* <Header /> */}
        <MainContent />
      </div>
    </div>
  );
};

export default App;
