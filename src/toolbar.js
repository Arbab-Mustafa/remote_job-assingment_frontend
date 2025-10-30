/**
 * Pipeline Toolbar Component
 * 
 * Provides draggable node items for building pipelines.
 * Includes all available node types organized by category.
 * 
 * @module toolbar
 */

import { DraggableNode } from './draggableNode';
import './toolbar.css';

export const PipelineToolbar = () => {
    return (
        <div className="toolbar">
            <div className="toolbar-title">Add Nodes to Pipeline</div>
            <div className="toolbar-nodes">
                {/* Core Nodes */}
                <DraggableNode type='customInput' label='Input' icon='📥' />
                <DraggableNode type='customOutput' label='Output' icon='📤' />
                <DraggableNode type='llm' label='LLM' icon='🤖' />
                <DraggableNode type='text' label='Text' icon='📝' />
                
                {/* Data Processing Nodes */}
                <DraggableNode type='data' label='Data' icon='📊' />
                <DraggableNode type='process' label='Process' icon='⚡' />
                <DraggableNode type='transform' label='Transform' icon='🔄' />
                
                {/* Logic Nodes */}
                <DraggableNode type='conditional' label='If/Else' icon='🔀' />
                <DraggableNode type='filter' label='Filter' icon='🔍' />
                
                {/* Combination Nodes */}
                <DraggableNode type='merge' label='Merge' icon='🔗' />
            </div>
        </div>
    );
};
