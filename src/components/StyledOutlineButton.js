// src/components/StyledOutlineButton.js
// Refined outline button component with parameterized colors, text, and action.

import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button'; // Assuming Button is in the same folder

/**
 * Renders a styled outline button, inheriting base functionality from Button.
 * Allows customization of colors, text, and action (link or onClick).
 *
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - The text or content inside the button (required).
 * @param {string} [props.to] - Optional path for react-router Link behavior.
 * @param {function} [props.onClick] - Optional onClick handler for button behavior.
 * @param {React.ElementType | React.ReactNode} [props.icon] - Optional icon component or node.
 * @param {string} [props.size='lg'] - Button size ('base', 'lg', 'xl').
 * @param {string} [props.textColorClass='text-cyan-400'] - Tailwind class for base text color.
 * @param {string} [props.borderColorClass='border-cyan-400'] - Tailwind class for base border color.
 * @param {string} [props.hoverBgClass='hover:bg-cyan-400/10'] - Tailwind class for hover background color.
 * @param {string} [props.hoverTextColorClass='hover:text-cyan-300'] - Tailwind class for hover text color.
 * @param {string} [props.hoverBorderColorClass='hover:border-cyan-300'] - Tailwind class for hover border color.
 * @param {string} [props.className] - Additional custom Tailwind classes to merge or override.
 */
const StyledOutlineButton = ({
    children,
    to,
    onClick,
    icon,
    size = 'lg', // Default size to large as per original example
    textColorClass = 'text-cyan-400',
    borderColorClass = 'border-cyan-400',
    hoverBgClass = 'hover:bg-cyan-400/10',
    hoverTextColorClass = 'hover:text-cyan-300',
    hoverBorderColorClass = 'hover:border-cyan-300',
    className = '',
    ...rest // Pass any other props down to the base Button
}) => {

    // Base styles for the outline look - applied regardless of color props
    const baseOutlineStyles = `
        bg-transparent
        border-2
        font-semibold
        transition-all duration-300 ease-out
        transform hover:-translate-y-0.5
        shadow-lg hover:shadow-xl
    `; // Added hover:shadow-xl for more pop

    // Combine all classes
    const combinedClassName = `
        ${baseOutlineStyles}
        ${borderColorClass}
        ${textColorClass}
        ${hoverBgClass}
        ${hoverTextColorClass}
        ${hoverBorderColorClass}
        ${className}
    `.replace(/\s+/g, ' ').trim(); // Clean up extra whitespace

    return (
        <Button
            to={to} // Pass 'to' prop for Link behavior
            onClick={onClick} // Pass 'onClick' prop for button behavior
            size={size}
            icon={icon}
            className={combinedClassName} // Pass the combined classes
            // Ensure the base Button component doesn't apply conflicting background/border variants
            // It might be better if the base Button primarily handles layout/base state and accepts style overrides via className
            variant="custom" // Assuming base Button might ignore default styles if variant="custom"
            {...rest} // Pass down other props like 'disabled', 'type', etc.
        >
            {children} {/* Render the button text/content */}
        </Button>
    );
};

StyledOutlineButton.propTypes = {
    children: PropTypes.node.isRequired,
    to: PropTypes.string,
    onClick: PropTypes.func,
    icon: PropTypes.oneOfType([PropTypes.elementType, PropTypes.node]),
    size: PropTypes.oneOf(['base', 'lg', 'xl']),
    textColorClass: PropTypes.string,
    borderColorClass: PropTypes.string,
    hoverBgClass: PropTypes.string,
    hoverTextColorClass: PropTypes.string,
    hoverBorderColorClass: PropTypes.string,
    className: PropTypes.string,
};

export default StyledOutlineButton;
