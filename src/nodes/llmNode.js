/**
 * LLM Node Component
 * 
 * Represents a Large Language Model processing node.
 * Uses BaseNode abstraction for consistent structure and styling.
 * 
 * Features:
 * - System prompt input (for LLM configuration)
 * - User prompt input (for actual content)
 * - Model response output
 * - Multiple handles with custom positioning
 * 
 * @module nodes/llmNode
 */

import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
    return (
        <BaseNode
            id={id}
            data={data}
            title="LLM"
            icon="🤖"
            className="llm-node"
            inputHandles={[
                { id: `${id}-system`, style: { top: '33%' } },
                { id: `${id}-prompt`, style: { top: '66%' } }
            ]}
            outputHandles={[{ id: `${id}-response` }]}
        >
            <div style={{ padding: '8px 0', color: '#4a5568', fontSize: '12px' }}>
                <div style={{ marginBottom: '8px' }}>
                    <strong>System:</strong> Model configuration
                </div>
                <div>
                    <strong>Prompt:</strong> User message
                </div>
            </div>
        </BaseNode>
    );
};
