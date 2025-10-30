/**
 * BaseNode Component - Foundation for all pipeline nodes
 * 
 * This abstract base component provides common functionality for all node types
 * including styling, handle management, and state persistence patterns.
 * 
 * Benefits of this abstraction:
 * - Reduces code duplication across node types
 * - Ensures consistent styling and behavior
 * - Centralizes state management logic
 * - Makes it easy to add new node types
 * 
 * @module nodes/BaseNode
 */

import React from 'react';
import { Handle, Position } from 'reactflow';
import './BaseNode.css';

/**
 * BaseNode component that all custom nodes should extend
 * 
 * @param {Object} props - Component props
 * @param {string} props.id - Unique identifier for the node
 * @param {Object} props.data - Node data containing configuration and state
 * @param {string} props.title - Display title for the node
 * @param {string} props.icon - Optional icon to display (emoji or text)
 * @param {Array} props.inputHandles - Array of input handle configurations
 * @param {Array} props.outputHandles - Array of output handle configurations
 * @param {React.Component} props.children - Custom content to render inside node
 * @param {string} props.className - Additional CSS classes for custom styling
 * @returns {JSX.Element} Rendered base node with handles and content
 */
export const BaseNode = ({
    id,
    data,
    title,
    icon = '⚙️',
    inputHandles = [],
    outputHandles = [],
    children,
    className = ''
}) => {
    return (
        <div className={`base-node ${className}`}>
            {/* Render all input handles on the left side */}
            {inputHandles.map((handle, index) => (
                <Handle
                    key={`input-${handle.id || index}`}
                    type="target"
                    position={Position.Left}
                    id={handle.id || `input-${index}`}
                    style={handle.style || { top: handle.top }}
                    className={handle.className || ''}
                />
            ))}
            
            {/* Node header with title and icon */}
            <div className="base-node-header">
                {icon && <span className="base-node-icon">{icon}</span>}
                <span className="base-node-title">{title}</span>
            </div>
            
            {/* Custom content area for node-specific fields */}
            <div className="base-node-content">
                {children}
            </div>
            
            {/* Render all output handles on the right side */}
            {outputHandles.map((handle, index) => (
                <Handle
                    key={`output-${handle.id || index}`}
                    type="source"
                    position={Position.Right}
                    id={handle.id || `output-${index}`}
                    style={handle.style || { top: handle.top }}
                    className={handle.className || ''}
                />
            ))}
        </div>
    );
};

/**
 * Hook for managing node field updates with state persistence
 * 
 * This hook ensures that field changes are properly saved to the global Zustand store,
 * preventing data loss on re-renders.
 * 
 * @param {string} nodeId - Unique node identifier
 * @param {Function} updateNodeField - Function to update node data in global store
 * @returns {Function} Handler function for field changes
 */
export const useNodeFieldHandler = (nodeId, updateNodeField) => {
    return (fieldName, fieldValue) => {
        if (updateNodeField) {
            updateNodeField(nodeId, fieldName, fieldValue);
        }
    };
};

