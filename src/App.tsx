import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainScreen from './components/MainScreen/MainScreen';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  return (
    <div className="App">
        <DndProvider backend={HTML5Backend}>
            <MainScreen></MainScreen>
        </DndProvider>
    </div>
  );
}

export default App;
