/**
 * Main Application Component
 * 
 * Root component that orchestrates the pipeline builder interface.
 * 
 * @module App
 */

import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import './App.css';

function App() {
  return (
    <div className="app">
      <div className="app-header">
        <h1>🚀 VectorShift Pipeline Builder</h1>
        <p>Build, validate, and execute complex data processing pipelines</p>
      </div>
      <div className="app-main">
        <PipelineToolbar />
        <PipelineUI />
        <SubmitButton />
      </div>
    </div>
  );
}

export default App;
