/**
 * Output Node Component
 * 
 * Represents an output node that produces data from the pipeline.
 * Uses BaseNode abstraction for consistent structure and styling.
 * 
 * Features:
 * - Configurable output name
 * - Data type selection (Text/Image)
 * - Target handle for upstream connections
 * - State persistence via Zustand store
 * 
 * @module nodes/outputNode
 */

import { useState, useEffect } from 'react';
import { useStore } from '../store';
import { BaseNode } from './BaseNode';
import { NodeTextField, NodeSelectField } from './NodeFields';

export const OutputNode = ({ id, data }) => {
    const { updateNodeField } = useStore();
    
    // Local state for immediate UI updates
    const [outputName, setOutputName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
    const [outputType, setOutputType] = useState(data?.outputType || 'Text');
    
    // Persist changes to global store
    useEffect(() => {
        if (updateNodeField) {
            updateNodeField(id, 'outputName', outputName);
            updateNodeField(id, 'outputType', outputType);
        }
    }, [outputName, outputType, id, updateNodeField]);
    
    const handleNameChange = (value) => {
        setOutputName(value);
    };
    
    const handleTypeChange = (value) => {
        setOutputType(value);
    };
    
    return (
        <BaseNode
            id={id}
            data={data}
            title="Output"
            icon="📤"
            className="output-node"
            inputHandles={[{ id: `${id}-value` }]}
        >
            <NodeTextField
                label="Name"
                value={outputName}
                onChange={handleNameChange}
                placeholder="Enter output name"
            />
            <NodeSelectField
                label="Type"
                value={outputType}
                onChange={handleTypeChange}
                options={[
                    { value: 'Text', label: 'Text' },
                    { value: 'Image', label: 'Image' }
                ]}
            />
        </BaseNode>
    );
};
