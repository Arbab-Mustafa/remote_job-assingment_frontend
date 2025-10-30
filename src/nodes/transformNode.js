/**
 * Transform Node Component
 * 
 * Represents a data transformation/conversion node.
 * Uses BaseNode abstraction for consistent structure and styling.
 * 
 * Features:
 * - Transformation type selection
 * - Output format configuration
 * - Transformation parameters
 * 
 * @module nodes/transformNode
 */

import { useState, useEffect } from 'react';
import { useStore } from '../store';
import { BaseNode } from './BaseNode';
import { NodeTextField, NodeSelectField } from './NodeFields';

export const TransformNode = ({ id, data }) => {
    const { updateNodeField } = useStore();
    
    const [transformType, setTransformType] = useState(data?.transformType || 'json');
    const [outputFormat, setOutputFormat] = useState(data?.outputFormat || 'string');
    
    useEffect(() => {
        if (updateNodeField) {
            updateNodeField(id, 'transformType', transformType);
            updateNodeField(id, 'outputFormat', outputFormat);
        }
    }, [transformType, outputFormat, id, updateNodeField]);
    
    return (
        <BaseNode
            id={id}
            data={data}
            title="Transform"
            icon="🔄"
            className="transform-node"
            inputHandles={[{ id: `${id}-input` }]}
            outputHandles={[{ id: `${id}-output` }]}
        >
            <NodeSelectField
                label="Transform Type"
                value={transformType}
                onChange={setTransformType}
                options={[
                    { value: 'json', label: 'JSON' },
                    { value: 'xml', label: 'XML' },
                    { value: 'csv', label: 'CSV' },
                    { value: 'html', label: 'HTML' }
                ]}
            />
            <NodeSelectField
                label="Output Format"
                value={outputFormat}
                onChange={setOutputFormat}
                options={[
                    { value: 'string', label: 'String' },
                    { value: 'object', label: 'Object' },
                    { value: 'array', label: 'Array' }
                ]}
            />
        </BaseNode>
    );
};

