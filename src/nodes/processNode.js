/**
 * Process Node Component
 * 
 * Represents a data processing/workflow node.
 * Uses BaseNode abstraction for consistent structure and styling.
 * 
 * Features:
 * - Processing mode selection
 * - Batch size configuration
 * - Processing timeout setting
 * 
 * @module nodes/processNode
 */

import { useState, useEffect } from 'react';
import { useStore } from '../store';
import { BaseNode } from './BaseNode';
import { NodeTextField, NodeSelectField, NodeNumberField } from './NodeFields';

export const ProcessNode = ({ id, data }) => {
    const { updateNodeField } = useStore();
    
    const [mode, setMode] = useState(data?.mode || 'sync');
    const [batchSize, setBatchSize] = useState(data?.batchSize || 100);
    const [timeout, setTimeout] = useState(data?.timeout || 5000);
    
    useEffect(() => {
        if (updateNodeField) {
            updateNodeField(id, 'mode', mode);
            updateNodeField(id, 'batchSize', batchSize);
            updateNodeField(id, 'timeout', timeout);
        }
    }, [mode, batchSize, timeout, id, updateNodeField]);
    
    return (
        <BaseNode
            id={id}
            data={data}
            title="Process"
            icon="⚡"
            className="process-node"
            inputHandles={[{ id: `${id}-input` }]}
            outputHandles={[{ id: `${id}-output` }]}
        >
            <NodeSelectField
                label="Mode"
                value={mode}
                onChange={setMode}
                options={[
                    { value: 'sync', label: 'Synchronous' },
                    { value: 'async', label: 'Asynchronous' },
                    { value: 'parallel', label: 'Parallel' }
                ]}
            />
            <NodeNumberField
                label="Batch Size"
                value={batchSize}
                onChange={setBatchSize}
                min={1}
                max={1000}
            />
            <NodeNumberField
                label="Timeout (ms)"
                value={timeout}
                onChange={setTimeout}
                min={1000}
                max={60000}
            />
        </BaseNode>
    );
};

