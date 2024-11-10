import React from 'react';
import Map from './components/Map';
import Legend from './components/Legend';
import Header from './components/Header';

function App() {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      <main className="flex-1 relative">
        <Map />
        <Legend />
      </main>
    </div>
  );
}

export default App;