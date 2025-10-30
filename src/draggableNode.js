/**
 * Draggable Node Component
 * 
 * Represents a draggable toolbar item that can be dropped onto the canvas
 * to create new nodes.
 * 
 * @param {Object} props
 * @param {string} props.type - Node type identifier
 * @param {string} props.label - Display label
 * @param {string} props.icon - Optional icon
 * @returns {JSX.Element}
 */

import './draggableNode.css';

export const DraggableNode = ({ type, label, icon }) => {
    /**
     * Handles drag start event to pass node type to drop target
     */
    const onDragStart = (event, nodeType) => {
        const appData = { nodeType };
        event.target.style.cursor = 'grabbing';
        event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
        event.dataTransfer.effectAllowed = 'move';
    };

    /**
     * Handles drag end event to reset cursor
     */
    const onDragEnd = (event) => {
        event.target.style.cursor = 'grab';
    };

    return (
        <div
            className={`draggable-node ${type}`}
            onDragStart={(event) => onDragStart(event, type)}
            onDragEnd={onDragEnd}
            draggable
            title={`Drag to create ${label} node`}
        >
            {icon && <span className="draggable-node-icon">{icon}</span>}
            <span className="draggable-node-label">{label}</span>
        </div>
    );
};
