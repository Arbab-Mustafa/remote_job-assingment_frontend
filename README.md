# Frontend - VectorShift Pipeline Builder

React-based node editor for building data processing pipelines.

## Installation

```bash
npm install
```

## Running

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

## Architecture

### Components

- **BaseNode**: Abstract base component for all node types
- **NodeFields**: Reusable form field components
- **PipelineToolbar**: Draggable node toolbar
- **PipelineUI**: ReactFlow canvas and main editor
- **SubmitButton**: API integration for validation

### State Management

Uses Zustand for global state:
- `nodes`: Array of node objects
- `edges`: Array of edge connections
- `nodeIDs`: Counter for unique IDs

### Node System

All nodes extend BaseNode with:
- Consistent styling
- Handle management
- State persistence
- Error handling

## Node Types

11 total node types including:
- Core: Input, Output, LLM, Text
- Processing: Data, Process, Transform
- Logic: Conditional, Filter
- Combination: Merge

## Styling

- CSS Modules for scoped styles
- Gradient themes per node type
- Responsive design
- Professional animations

## Features

- Drag & drop node creation
- Dynamic handle generation
- Variable extraction in Text nodes
- Auto-sizing components
- Real-time validation
