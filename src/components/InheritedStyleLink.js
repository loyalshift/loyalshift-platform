// src/components/InheritedStyleLink.js
// A Link component that inherits base text styles from its parent
// and adds specific hover/transition effects.

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Renders a react-router Link that inherits font size, weight, and base color
 * from its parent, applying only specific hover color and transition classes.
 *
 * @param {object} props - Component props.
 * @param {string} props.to - The path to link to (required).
 * @param {string} [props.hoverColorClass='hover:text-emerald-700'] - Tailwind class for hover text color.
 * @param {string} [props.className] - Additional Tailwind classes to merge.
 * @param {React.ReactNode} props.children - The content of the link (required).
 */
const InheritedStyleLink = ({
    to,
    hoverColorClass = 'hover:text-emerald-700', // Default hover like the example
    className = '',
    children,
    ...rest // Pass through any other Link props like aria-label, etc.
}) => {

    // Base classes for interaction - does NOT include base text color, size, or weight
    const baseInteractionClasses = 'transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500/50 rounded'; // Added focus style

    // Combine base interaction classes, hover class, and any custom classes passed in
    const combinedClassName = `${baseInteractionClasses} ${hoverColorClass} ${className}`.trim();

    return (
        <Link
            to={to}
            className={combinedClassName}
            {...rest} // Spread remaining props onto the Link component
        >
            {children}
        </Link>
    );
};

InheritedStyleLink.propTypes = {
    /** The destination path for the link */
    to: PropTypes.string.isRequired,
    /** Tailwind class(es) defining the text color on hover */
    hoverColorClass: PropTypes.string,
    /** Additional custom CSS classes to apply */
    className: PropTypes.string,
    /** The text or elements to display inside the link */
    children: PropTypes.node.isRequired,
};

export default InheritedStyleLink;
