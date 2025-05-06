// src/components/ImagePlaceholder.js
// Reusable component for displaying styled placeholders where images will go.

import React from 'react';
import PropTypes from 'prop-types';
import { FiImage } from 'react-icons/fi'; // Default icon

// Define some default placeholder colors (adjust as needed or import from theme)
const defaultColors = {
    background: 'bg-slate-200',
    border: 'border-slate-300',
    icon: 'text-slate-400',
    text: 'text-slate-500',
};

/**
 * Renders a styled placeholder box for images.
 *
 * @param {object} props - Component props.
 * @param {string} [props.aspectRatio='aspect-video'] - Tailwind aspect ratio class (e.g., 'aspect-video', 'aspect-square', 'aspect-[4/3]').
 * @param {React.ElementType} [props.icon=FiImage] - Icon component to display (e.g., FiMap, FiLayers). Defaults to FiImage.
 * @param {string} [props.text] - Optional text to display below the icon.
 * @param {string} [props.iconSize='w-12 h-12'] - Tailwind size class for the icon.
 * @param {string} [props.textSize='text-xs'] - Tailwind size class for the text.
 * @param {string} [props.className] - Additional Tailwind classes for the container div.
 * @param {string} [props.bgColor=defaultColors.background] - Tailwind background color class.
 * @param {string} [props.borderColor=defaultColors.border] - Tailwind border color class.
 * @param {string} [props.iconColor=defaultColors.icon] - Tailwind text color class for the icon.
 * @param {string} [props.textColor=defaultColors.text] - Tailwind text color class for the text.
 */
const ImagePlaceholder = ({
    aspectRatio = 'aspect-video', // Default to 16:9
    icon: Icon = FiImage, // Default icon
    text,
    iconSize = 'w-12 h-12', // Default icon size
    textSize = 'text-xs',   // Default text size
    className = '',
    bgColor = defaultColors.background,
    borderColor = defaultColors.border,
    iconColor = defaultColors.icon,
    textColor = defaultColors.text,
}) => {

    const baseClasses = `border rounded-lg shadow-inner flex flex-col items-center justify-center overflow-hidden p-4`;

    return (
        <div
            className={`${baseClasses} ${aspectRatio} ${bgColor} ${borderColor} ${className}`}
        >
            {Icon && (
                 <Icon className={`${iconSize} ${iconColor} opacity-50 mb-2`} aria-hidden="true" />
            )}
            {text && (
                <span className={`${textSize} ${textColor} font-medium text-center`}>
                    {/* Allow multi-line text using <br/> in the prop */}
                    {text.split('<br/>').map((line, index) => (
                        <React.Fragment key={index}>
                            {line}
                            {index < text.split('<br/>').length - 1 && <br />}
                        </React.Fragment>
                    ))}
                </span>
            )}
        </div>
    );
};

ImagePlaceholder.propTypes = {
    aspectRatio: PropTypes.string,
    icon: PropTypes.elementType,
    text: PropTypes.string,
    iconSize: PropTypes.string,
    textSize: PropTypes.string,
    className: PropTypes.string,
    bgColor: PropTypes.string,
    borderColor: PropTypes.string,
    iconColor: PropTypes.string,
    textColor: PropTypes.string,
};

export default ImagePlaceholder;
