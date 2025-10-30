/**
 * Conditional Node Component
 * 
 * Represents a conditional logic/decision node.
 * Uses BaseNode abstraction for consistent structure and styling.
 * 
 * Features:
 * - Condition expression configuration
 * - Multiple output branches (true/false)
 * - Condition validation
 * 
 * @module nodes/conditionalNode
 */

import { useState, useEffect } from 'react';
import { useStore } from '../store';
import { BaseNode } from './BaseNode';
import { NodeTextField, NodeSelectField } from './NodeFields';

export const ConditionalNode = ({ id, data }) => {
    const { updateNodeField } = useStore();
    
    const [condition, setCondition] = useState(data?.condition || 'value > 0');
    const [operator, setOperator] = useState(data?.operator || 'greater_than');
    
    useEffect(() => {
        if (updateNodeField) {
            updateNodeField(id, 'condition', condition);
            updateNodeField(id, 'operator', operator);
        }
    }, [condition, operator, id, updateNodeField]);
    
    return (
        <BaseNode
            id={id}
            data={data}
            title="Conditional"
            icon="🔀"
            className="conditional-node"
            inputHandles={[{ id: `${id}-input` }]}
            outputHandles={[
                { id: `${id}-true`, style: { top: '33%' } },
                { id: `${id}-false`, style: { top: '66%' } }
            ]}
        >
            <NodeTextField
                label="Condition"
                value={condition}
                onChange={setCondition}
                placeholder="value > 0"
            />
            <NodeSelectField
                label="Operator"
                value={operator}
                onChange={setOperator}
                options={[
                    { value: 'greater_than', label: 'Greater Than (>)' },
                    { value: 'less_than', label: 'Less Than (<)' },
                    { value: 'equal', label: 'Equal (==)' },
                    { value: 'not_equal', label: 'Not Equal (!=)' }
                ]}
            />
        </BaseNode>
    );
};

