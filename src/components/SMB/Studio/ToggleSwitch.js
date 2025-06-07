// src/pages/smb/studio/components/ToggleSwitch.js
import React from 'react';
import PropTypes from 'prop-types';

const ToggleSwitch = ({
  id,
  label,
  checked,
  onChange,
  disabled = false,
  size = 'md',
  variant = 'primary',
  showLabel = true,
  className = ''
}) => {
  // Size classes
  const sizeClasses = {
    sm: 'w-9 h-5',
    md: 'w-11 h-6',
    lg: 'w-14 h-8'
  };

  // Variant classes
  const variantClasses = {
    primary: 'bg-cyan-500',
    secondary: 'bg-purple-500',
    success: 'bg-green-500',
    danger: 'bg-red-500',
    warning: 'bg-amber-500'
  };

  // Disabled classes
  const disabledClasses = disabled
    ? 'opacity-50 cursor-not-allowed'
    : 'cursor-pointer';

  // Handle toggle change
  const handleChange = (e) => {
    if (!disabled && onChange) {
      onChange(e.target.checked);
    }
  };

  return (
    <div className={`flex items-center ${className}`}>
      <label
        htmlFor={id}
        className={`flex items-center ${disabledClasses}`}
        aria-disabled={disabled}
      >
        {/* Hidden checkbox for accessibility */}
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          className="sr-only"
          aria-labelledby={`${id}-label`}
        />
        
        {/* Toggle track */}
        <div
          className={`relative rounded-full transition-colors duration-200 ease-in-out ${
            checked ? variantClasses[variant] : 'bg-gray-200 dark:bg-gray-600'
          } ${sizeClasses[size]}`}
        >
          {/* Toggle thumb */}
          <div
            className={`absolute top-1/2 transform -translate-y-1/2 rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out ${
              checked
                ? size === 'sm'
                  ? 'translate-x-4'
                  : size === 'md'
                  ? 'translate-x-5'
                  : 'translate-x-6'
                : 'translate-x-1'
            } ${
              size === 'sm'
                ? 'w-3 h-3'
                : size === 'md'
                ? 'w-4 h-4'
                : 'w-6 h-6'
            }`}
          />
        </div>

        {/* Label */}
        {showLabel && label && (
          <span id={`${id}-label`} className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-100">
            {label}
          </span>
        )}
      </label>
    </div>
  );
};

ToggleSwitch.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning']),
  showLabel: PropTypes.bool,
  className: PropTypes.string
};

export default ToggleSwitch;
