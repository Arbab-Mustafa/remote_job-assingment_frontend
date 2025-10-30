/**
 * Input Node Component
 * 
 * Represents an input node that accepts data into the pipeline.
 * Uses BaseNode abstraction for consistent structure and styling.
 * 
 * Features:
 * - Configurable input name
 * - Data type selection (Text/File)
 * - Source handle for downstream connections
 * - State persistence via Zustand store
 * 
 * @module nodes/inputNode
 */

import { useState, useEffect } from 'react';
import { useStore } from '../store';
import { BaseNode } from './BaseNode';
import { NodeTextField, NodeSelectField } from './NodeFields';

export const InputNode = ({ id, data }) => {
    const { updateNodeField } = useStore();
    
    // Local state for immediate UI updates
    const [inputName, setInputName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
    const [inputType, setInputType] = useState(data?.inputType || 'Text');
    
    // Persist changes to global store
    useEffect(() => {
        if (updateNodeField) {
            updateNodeField(id, 'inputName', inputName);
            updateNodeField(id, 'inputType', inputType);
        }
    }, [inputName, inputType, id, updateNodeField]);
    
    const handleNameChange = (value) => {
        setInputName(value);
    };
    
    const handleTypeChange = (value) => {
        setInputType(value);
    };
    
    return (
        <BaseNode
            id={id}
            data={data}
            title="Input"
            icon="📥"
            className="input-node"
            outputHandles={[{ id: `${id}-value` }]}
        >
            <NodeTextField
                label="Name"
                value={inputName}
                onChange={handleNameChange}
                placeholder="Enter input name"
            />
            <NodeSelectField
                label="Type"
                value={inputType}
                onChange={handleTypeChange}
                options={[
                    { value: 'Text', label: 'Text' },
                    { value: 'File', label: 'File' }
                ]}
            />
        </BaseNode>
    );
};
