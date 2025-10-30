/**
 * Node Field Components
 * 
 * Reusable form field components for consistent node inputs
 * 
 * @module nodes/NodeFields
 */

import React from 'react';
import './NodeFields.css';

/**
 * Text input field component
 * 
 * @param {Object} props
 * @param {string} props.label - Field label
 * @param {string} props.value - Current value
 * @param {Function} props.onChange - Change handler
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.error - Error message
 * @param {boolean} props.disabled - Disabled state
 * @returns {JSX.Element}
 */
export const NodeTextField = ({ label, value, onChange, placeholder, error, disabled }) => {
    return (
        <div className="node-field">
            <label className="node-field-label">{label}</label>
            <input
                type="text"
                className={`node-field-input ${error ? 'error' : ''}`}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                disabled={disabled}
            />
            {error && <span className="node-field-error">{error}</span>}
        </div>
    );
};

/**
 * Select dropdown field component
 * 
 * @param {Object} props
 * @param {string} props.label - Field label
 * @param {string} props.value - Current value
 * @param {Function} props.onChange - Change handler
 * @param {Array} props.options - Array of {value, label} objects
 * @param {string} props.error - Error message
 * @param {boolean} props.disabled - Disabled state
 * @returns {JSX.Element}
 */
export const NodeSelectField = ({ label, value, onChange, options = [], error, disabled }) => {
    return (
        <div className="node-field">
            <label className="node-field-label">{label}</label>
            <select
                className={`node-field-select ${error ? 'error' : ''}`}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
            >
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <span className="node-field-error">{error}</span>}
        </div>
    );
};

/**
 * Textarea field component for multi-line text
 * 
 * @param {Object} props
 * @param {string} props.label - Field label
 * @param {string} props.value - Current value
 * @param {Function} props.onChange - Change handler
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.error - Error message
 * @param {boolean} props.disabled - Disabled state
 * @param {number} props.rows - Number of rows
 * @returns {JSX.Element}
 */
export const NodeTextAreaField = ({ label, value, onChange, placeholder, error, disabled, rows = 4 }) => {
    return (
        <div className="node-field">
            <label className="node-field-label">{label}</label>
            <textarea
                className={`node-field-textarea ${error ? 'error' : ''}`}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                disabled={disabled}
                rows={rows}
            />
            {error && <span className="node-field-error">{error}</span>}
        </div>
    );
};

/**
 * Number input field component
 * 
 * @param {Object} props
 * @param {string} props.label - Field label
 * @param {number} props.value - Current value
 * @param {Function} props.onChange - Change handler
 * @param {string} props.error - Error message
 * @param {boolean} props.disabled - Disabled state
 * @param {number} props.min - Minimum value
 * @param {number} props.max - Maximum value
 * @returns {JSX.Element}
 */
export const NodeNumberField = ({ label, value, onChange, error, disabled, min, max }) => {
    return (
        <div className="node-field">
            <label className="node-field-label">{label}</label>
            <input
                type="number"
                className={`node-field-input ${error ? 'error' : ''}`}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                disabled={disabled}
                min={min}
                max={max}
            />
            {error && <span className="node-field-error">{error}</span>}
        </div>
    );
};

