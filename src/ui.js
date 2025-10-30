/**
 * Pipeline UI Component
 * 
 * Main canvas component that renders the ReactFlow interface.
 * Handles drag-and-drop node creation and connection management.
 * 
 * @module ui
 */

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { DataNode } from './nodes/dataNode';
import { ProcessNode } from './nodes/processNode';
import { ConditionalNode } from './nodes/conditionalNode';
import { TransformNode } from './nodes/transformNode';
import { MergeNode } from './nodes/mergeNode';
import { FilterNode } from './nodes/filterNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };

/**
 * Node types registry - maps node type identifiers to their components
 */
const nodeTypes = {
    customInput: InputNode,
    llm: LLMNode,
    customOutput: OutputNode,
    text: TextNode,
    data: DataNode,
    process: ProcessNode,
    conditional: ConditionalNode,
    transform: TransformNode,
    merge: MergeNode,
    filter: FilterNode,
};

/**
 * Zustand selector for optimizing re-renders
 */
const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
    getNodeID: state.getNodeID,
    addNode: state.addNode,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const {
        nodes,
        edges,
        getNodeID,
        addNode,
        onNodesChange,
        onEdgesChange,
        onConnect
    } = useStore(selector, shallow);

    /**
     * Initialize node data structure based on type
     * 
     * @param {string} nodeID - Unique node identifier
     * @param {string} type - Node type
     * @returns {Object} Node data object
     */
    const getInitNodeData = useCallback((nodeID, type) => {
        return { 
            id: nodeID, 
            nodeType: `${type}` 
        };
    }, []);

    /**
     * Handle node drop event on canvas
     * Creates a new node at the drop position
     */
    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            const data = event?.dataTransfer?.getData('application/reactflow');
            
            if (data) {
                try {
                    const appData = JSON.parse(data);
                    const type = appData?.nodeType;

                    // Validate node type
                    if (!type) {
                        console.warn('Invalid node type');
                        return;
                    }

                    // Calculate drop position relative to canvas
                    const position = reactFlowInstance.project({
                        x: event.clientX - reactFlowBounds.left,
                        y: event.clientY - reactFlowBounds.top,
                    });

                    // Create new node with unique ID
                    const nodeID = getNodeID(type);
                    const newNode = {
                        id: nodeID,
                        type,
                        position,
                        data: getInitNodeData(nodeID, type),
                    };

                    // Add node to store
                    addNode(newNode);
                } catch (error) {
                    console.error('Error parsing drop data:', error);
                }
            }
        },
        [reactFlowInstance, getNodeID, getInitNodeData, addNode]
    );

    /**
     * Handle drag over event to enable drop
     */
    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
        <div ref={reactFlowWrapper} style={{ width: '100%', height: '70vh' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType='smoothstep'
                fitView
            >
                <Background color="#aaa" gap={gridSize} />
                <Controls />
                <MiniMap />
            </ReactFlow>
        </div>
    );
};
