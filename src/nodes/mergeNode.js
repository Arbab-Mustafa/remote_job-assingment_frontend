/**
 * Merge Node Component
 * 
 * Represents a data merging/combination node.
 * Uses BaseNode abstraction for consistent structure and styling.
 * 
 * Features:
 * - Multiple input sources
 * - Merge strategy selection
 * - Output format configuration
 * 
 * @module nodes/mergeNode
 */

import { useState, useEffect } from 'react';
import { useStore } from '../store';
import { BaseNode } from './BaseNode';
import { NodeTextField, NodeSelectField } from './NodeFields';

export const MergeNode = ({ id, data }) => {
    const { updateNodeField } = useStore();
    
    const [strategy, setStrategy] = useState(data?.strategy || 'union');
    const [keyField, setKeyField] = useState(data?.keyField || 'id');
    
    useEffect(() => {
        if (updateNodeField) {
            updateNodeField(id, 'strategy', strategy);
            updateNodeField(id, 'keyField', keyField);
        }
    }, [strategy, keyField, id, updateNodeField]);
    
    return (
        <BaseNode
            id={id}
            data={data}
            title="Merge"
            icon="🔗"
            className="merge-node"
            inputHandles={[
                { id: `${id}-input1`, style: { top: '25%' } },
                { id: `${id}-input2`, style: { top: '50%' } },
                { id: `${id}-input3`, style: { top: '75%' } }
            ]}
            outputHandles={[{ id: `${id}-output` }]}
        >
            <NodeSelectField
                label="Merge Strategy"
                value={strategy}
                onChange={setStrategy}
                options={[
                    { value: 'union', label: 'Union (All)' },
                    { value: 'intersect', label: 'Intersect' },
                    { value: 'concat', label: 'Concatenate' },
                    { value: 'zip', label: 'Zip' }
                ]}
            />
            <NodeTextField
                label="Key Field"
                value={keyField}
                onChange={setKeyField}
                placeholder="id"
            />
        </BaseNode>
    );
};

