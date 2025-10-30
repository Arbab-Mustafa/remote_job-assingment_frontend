/**
 * Zustand State Management Store
 * 
 * Global state management for pipeline builder application.
 * Manages nodes, edges, and related operations.
 * 
 * @module store
 */

import { create } from "zustand";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
} from 'reactflow';

export const useStore = create((set, get) => ({
    // State
    nodes: [],
    edges: [],
    nodeIDs: {}, // Counter for generating unique node IDs
    
    /**
     * Generate unique ID for a new node based on type
     * 
     * @param {string} type - Node type identifier
     * @returns {string} Unique node ID
     */
    getNodeID: (type) => {
        const currentIDs = get().nodeIDs || {};
        const newIDs = { ...currentIDs };
        
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        
        newIDs[type] += 1;
        set({ nodeIDs: newIDs });
        
        return `${type}-${newIDs[type]}`;
    },
    
    /**
     * Add a new node to the pipeline
     * 
     * @param {Object} node - Node object with id, type, position, data
     */
    addNode: (node) => {
        set({
            nodes: [...get().nodes, node]
        });
    },
    
    /**
     * Handle node changes (position, selection, deletion)
     * Uses ReactFlow's applyNodeChanges utility
     * 
     * @param {Array} changes - Array of change objects
     */
    onNodesChange: (changes) => {
        set({
            nodes: applyNodeChanges(changes, get().nodes),
        });
    },
    
    /**
     * Handle edge changes (selection, deletion)
     * Uses ReactFlow's applyEdgeChanges utility
     * 
     * @param {Array} changes - Array of change objects
     */
    onEdgesChange: (changes) => {
        set({
            edges: applyEdgeChanges(changes, get().edges),
        });
    },
    
    /**
     * Handle new connection between nodes
     * Adds animated smoothstep edge with arrow marker
     * 
     * @param {Object} connection - Connection object with source, target, etc.
     */
    onConnect: (connection) => {
        set({
            edges: addEdge({
                ...connection,
                type: 'smoothstep',
                animated: true,
                markerEnd: {
                    type: MarkerType.Arrow,
                    height: '20px',
                    width: '20px'
                }
            }, get().edges),
        });
    },
    
    /**
     * Update a specific field in a node's data
     * Immutably updates the node data to prevent state issues
     * 
     * @param {string} nodeId - Node identifier
     * @param {string} fieldName - Field name to update
     * @param {*} fieldValue - New field value
     */
    updateNodeField: (nodeId, fieldName, fieldValue) => {
        set({
            nodes: get().nodes.map((node) => {
                if (node.id === nodeId) {
                    // Create new node object with updated data
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            [fieldName]: fieldValue
                        }
                    };
                }
                return node;
            }),
        });
    },
    
    /**
     * Clear all nodes and edges (utility function)
     */
    clearPipeline: () => {
        set({
            nodes: [],
            edges: []
        });
    },
}));
