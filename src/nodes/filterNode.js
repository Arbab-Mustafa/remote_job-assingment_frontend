/**
 * Filter Node Component
 * 
 * Represents a data filtering/selection node.
 * Uses BaseNode abstraction for consistent structure and styling.
 * 
 * Features:
 * - Filter criteria configuration
 * - Filter mode selection
 * - Multiple filter conditions
 * 
 * @module nodes/filterNode
 */

import { useState, useEffect } from 'react';
import { useStore } from '../store';
import { BaseNode } from './BaseNode';
import { NodeTextField, NodeSelectField } from './NodeFields';

export const FilterNode = ({ id, data }) => {
    const { updateNodeField } = useStore();
    
    const [criteria, setCriteria] = useState(data?.criteria || 'status == "active"');
    const [mode, setMode] = useState(data?.mode || 'include');
    
    useEffect(() => {
        if (updateNodeField) {
            updateNodeField(id, 'criteria', criteria);
            updateNodeField(id, 'mode', mode);
        }
    }, [criteria, mode, id, updateNodeField]);
    
    return (
        <BaseNode
            id={id}
            data={data}
            title="Filter"
            icon="🔍"
            className="filter-node"
            inputHandles={[{ id: `${id}-input` }]}
            outputHandles={[
                { id: `${id}-match`, style: { top: '33%' } },
                { id: `${id}-nonmatch`, style: { top: '66%' } }
            ]}
        >
            <NodeTextField
                label="Filter Criteria"
                value={criteria}
                onChange={setCriteria}
                placeholder="status == 'active'"
            />
            <NodeSelectField
                label="Mode"
                value={mode}
                onChange={setMode}
                options={[
                    { value: 'include', label: 'Include Match' },
                    { value: 'exclude', label: 'Exclude Match' }
                ]}
            />
        </BaseNode>
    );
};

