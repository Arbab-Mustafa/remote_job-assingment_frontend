/**
 * Text Node Component with Advanced Features
 * 
 * Enhanced text node with:
 * - Dynamic sizing based on content
 * - Variable extraction from {{variable}} syntax
 * - Auto-generation of input handles for variables
 * - State persistence
 * 
 * Features:
 * - Parses {{variable}} patterns in text
 * - Creates handles dynamically based on variables
 * - Auto-resizes to fit content
 * - Validates JavaScript variable names
 * 
 * @module nodes/textNode
 */

import { useState, useEffect, useRef } from 'react';
import { useStore } from '../store';
import { BaseNode } from './BaseNode';
import { NodeTextAreaField } from './NodeFields';

/**
 * Validates if a string is a valid JavaScript variable name
 * 
 * @param {string} name - Name to validate
 * @returns {boolean} True if valid
 */
const isValidVariableName = (name) => {
    const varNameRegex = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;
    return varNameRegex.test(name);
};

/**
 * Extracts variables from text using {{variable}} pattern
 * 
 * @param {string} text - Text to parse
 * @returns {Array<string>} Array of unique variable names
 */
const extractVariables = (text) => {
    const variableRegex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const variables = new Set();
    let match;
    
    while ((match = variableRegex.exec(text)) !== null) {
        const varName = match[1].trim();
        if (isValidVariableName(varName)) {
            variables.add(varName);
        }
    }
    
    return Array.from(variables);
};

export const TextNode = ({ id, data }) => {
    const { updateNodeField } = useStore();
    const contentRef = useRef(null);
    
    // Local state for immediate UI updates
    const [text, setText] = useState(data?.text || '{{input}}');
    const [variables, setVariables] = useState([]);
    
    // Extract variables whenever text changes
    useEffect(() => {
        const extractedVars = extractVariables(text);
        setVariables(extractedVars);
        
        // Update store with extracted variables
        if (updateNodeField) {
            updateNodeField(id, 'text', text);
            updateNodeField(id, 'variables', extractedVars);
        }
    }, [text, id, updateNodeField]);
    
    const handleTextChange = (value) => {
        setText(value);
    };
    
    // Generate input handles for each variable
    const inputHandles = variables.map((varName, index) => ({
        id: `${id}-${varName}`,
        style: { 
            top: `${(index + 1) * 100 / (variables.length + 1)}%` 
        }
    }));
    
    return (
        <BaseNode
            id={id}
            data={data}
            title="Text"
            icon="📝"
            className="text-node"
            inputHandles={inputHandles}
            outputHandles={[{ id: `${id}-output` }]}
        >
            <div>
                <NodeTextAreaField
                    label="Text"
                    value={text}
                    onChange={handleTextChange}
                    placeholder="Enter text with {{variables}}"
                    rows={variables.length > 0 ? 8 : 4}
                />
                {variables.length > 0 && (
                    <div style={{ 
                        marginTop: '8px', 
                        fontSize: '11px', 
                        color: '#667eea',
                        padding: '6px',
                        backgroundColor: '#f0f4ff',
                        borderRadius: '4px'
                    }}>
                        <strong>Variables detected:</strong> {variables.join(', ')}
                    </div>
                )}
            </div>
        </BaseNode>
    );
};
