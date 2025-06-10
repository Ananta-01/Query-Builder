import React from 'react';
import QueryBuilder from './components/QueryBuilder/QueryBuilder';

function App() {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
     
      }}
    >
      <div
        style={{
          width: '600px',
          padding: '40px',
          background: 'grey',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(255, 255, 255, 0.3)',
        }}
      >
        <h1 style={{ textAlign: 'center' }}>Query Builder</h1>
        <QueryBuilder />
      </div>
    </div>
  );
}

export default App;
