/**
 * Submit Button Component
 * 
 * Handles pipeline submission to backend API for validation.
 * 
 * Features:
 * - Sends nodes and edges to backend
 * - Displays validation results
 * - Shows loading and error states
 * - User-friendly alerts
 * 
 * @module submit
 */

import { useState } from 'react';
import { useStore } from './store';
import './submit.css';

// API endpoint configuration
const API_BASE_URL = 'http://localhost:8000';

/**
 * Format pipeline validation results for user display
 * 
 * @param {Object} results - Validation results from API
 * @param {number} results.num_nodes - Number of nodes
 * @param {number} results.num_edges - Number of edges
 * @param {boolean} results.is_dag - Whether graph is acyclic
 * @returns {string} Formatted message
 */
const formatValidationResults = (results) => {
    const { num_nodes, num_edges, is_dag } = results;
    const statusEmoji = is_dag ? '✅' : '⚠️';
    const dagStatus = is_dag ? 'Valid DAG' : 'Not a DAG (Cycle Detected)';
    
    return `
🎯 Pipeline Validation Results

${statusEmoji} Graph Structure: ${dagStatus}
📊 Number of Nodes: ${num_nodes}
🔗 Number of Edges: ${num_edges}

${is_dag 
    ? '✅ Your pipeline is valid and can be executed!' 
    : '⚠️ Warning: Your pipeline contains cycles and cannot be executed.'}
    `.trim();
};

/**
 * Display validation results in an alert
 * 
 * @param {Object} results - Validation results
 */
const showValidationAlert = (results) => {
    const message = formatValidationResults(results);
    alert(message);
};

export const SubmitButton = () => {
    const { nodes, edges } = useStore();
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);

    /**
     * Submit pipeline to backend for validation
     * 
     * Sends nodes and edges to /pipelines/parse endpoint
     * and displays the validation results to the user
     */
    const handleSubmit = async () => {
        // Validate that there are nodes in the pipeline
        if (nodes.length === 0) {
            alert('⚠️ Please add at least one node to the pipeline before submitting.');
            return;
        }

        setLoading(true);
        setStatus(null);

        try {
            // Prepare pipeline data
            const pipelineData = {
                nodes: nodes,
                edges: edges
            };

            // ========================================
            // PROFESSIONAL LOGGING - SEND TO BACKEND
            // ========================================
            console.log('╔════════════════════════════════════════════════════════════╗');
            console.log('║          🚀 PIPELINE VALIDATION REQUEST                   ║');
            console.log('╚════════════════════════════════════════════════════════════╝');
            console.log('📤 Sending data to backend:', API_BASE_URL);
            console.log('');
            console.log('📊 Pipeline Statistics:');
            console.log('   ├─ Total Nodes:', nodes.length);
            console.log('   └─ Total Edges:', edges.length);
            console.log('');
            console.log('🗂️  Node Details:');
            nodes.forEach((node, index) => {
                console.log(`   ${index + 1}. ${node.type}: ${node.id}`, {
                    position: node.position,
                    data: node.data
                });
            });
            console.log('');
            console.log('🔗 Edge Details:');
            edges.forEach((edge, index) => {
                console.log(`   ${index + 1}. ${edge.source} → ${edge.target}`, {
                    sourceHandle: edge.sourceHandle,
                    targetHandle: edge.targetHandle
                });
            });
            console.log('');
            console.log('📦 Request Payload:', {
                nodes: nodes,
                edges: edges
            });
            console.log('');

            // Send POST request to backend
            const response = await fetch(`${API_BASE_URL}/pipelines/parse`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `pipeline=${encodeURIComponent(JSON.stringify(pipelineData))}`
            });

            // ========================================
            // RESPONSE LOGGING
            // ========================================
            console.log('📥 Received response from backend');
            console.log('   ├─ Status:', response.status, response.statusText);
            console.log('   └─ Headers:', Object.fromEntries(response.headers.entries()));
            console.log('');

            // Handle response
            if (!response.ok) {
                const errorData = await response.json();
                console.error('❌ Backend Error Response:', errorData);
                throw new Error(errorData.detail || 'Failed to validate pipeline');
            }

            const results = await response.json();

            // ========================================
            // RESULTS LOGGING
            // ========================================
            console.log('╔════════════════════════════════════════════════════════════╗');
            console.log('║            ✅ VALIDATION RESULTS RECEIVED                  ║');
            console.log('╚════════════════════════════════════════════════════════════╝');
            console.log('');
            console.log('📊 Validation Summary:');
            console.log('   ├─ Total Nodes:', results.num_nodes);
            console.log('   ├─ Total Edges:', results.num_edges);
            console.log('   ├─ Is Valid DAG:', results.is_dag ? '✅ YES' : '❌ NO');
            console.log('   └─ Status:', results.is_dag ? '🟢 VALID' : '🔴 INVALID');
            console.log('');
            console.log('📦 Full Response Data:', results);
            console.log('');

            // Display results
            showValidationAlert(results);

            // Update status
            setStatus({
                type: 'success',
                message: `Validation complete! (${results.num_nodes} nodes, ${results.num_edges} edges)`
            });

        } catch (error) {
            console.error('╔════════════════════════════════════════════════════════════╗');
            console.error('║                   ❌ ERROR OCCURRED                       ║');
            console.error('╚════════════════════════════════════════════════════════════╝');
            console.error('Error details:', error);
            console.error('Error message:', error.message);
            console.error('Stack trace:', error.stack);
            console.error('');
            
            // Show error alert
            alert(`❌ Error: ${error.message}\n\nPlease ensure the backend server is running on ${API_BASE_URL}`);
            
            // Update status
            setStatus({
                type: 'error',
                message: error.message || 'Failed to validate pipeline'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="submit-container">
            <button
                className={`submit-button ${loading ? 'submit-button-loading' : ''}`}
                onClick={handleSubmit}
                disabled={loading || nodes.length === 0}
                type="button"
            >
                {loading ? (
                    <>
                        <div className="spinner"></div>
                        <span>Validating...</span>
                    </>
                ) : (
                    <>
                        <span>🚀</span>
                        <span>Submit Pipeline</span>
                    </>
                )}
            </button>
            
            {status && (
                <div className={`submit-status ${status.type}`}>
                    {status.type === 'success' ? '✅' : '❌'}
                    {status.message}
                </div>
            )}
        </div>
    );
};
