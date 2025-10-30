/**
 * Data Node Component
 * 
 * Represents a data transformation/aggregation node.
 * Uses BaseNode abstraction for consistent structure and styling.
 * 
 * Features:
 * - Data source selection
 * - Aggregation operation selection
 * - Target field configuration
 * 
 * @module nodes/dataNode
 */

import { useState, useEffect } from 'react';
import { useStore } from '../store';
import { BaseNode } from './BaseNode';
import { NodeTextField, NodeSelectField } from './NodeFields';

export const DataNode = ({ id, data }) => {
    const { updateNodeField } = useStore();
    
    const [dataSource, setDataSource] = useState(data?.dataSource || '');
    const [operation, setOperation] = useState(data?.operation || 'sum');
    
    useEffect(() => {
        if (updateNodeField) {
            updateNodeField(id, 'dataSource', dataSource);
            updateNodeField(id, 'operation', operation);
        }
    }, [dataSource, operation, id, updateNodeField]);
    
    return (
        <BaseNode
            id={id}
            data={data}
            title="Data Transform"
            icon="📊"
            className="data-node"
            inputHandles={[{ id: `${id}-data-input` }]}
            outputHandles={[{ id: `${id}-data-output` }]}
        >
            <NodeTextField
                label="Data Source"
                value={dataSource}
                onChange={setDataSource}
                placeholder="Enter data source"
            />
            <NodeSelectField
                label="Operation"
                value={operation}
                onChange={setOperation}
                options={[
                    { value: 'sum', label: 'Sum' },
                    { value: 'average', label: 'Average' },
                    { value: 'count', label: 'Count' },
                    { value: 'filter', label: 'Filter' }
                ]}
            />
        </BaseNode>
    );
};

