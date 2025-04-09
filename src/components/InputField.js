// src/components/InputField.js
import React from 'react';
import PropTypes from 'prop-types';

const InputField = ({ id, name, label, type = 'text', value, onChange, required = false, rows, placeholder = '' }) => (
  <div>
    <label htmlFor={id} className="block text-neutral-main mb-2 font-medium">
      {label} {required && <span className="text-status-error">*</span>} {/* Use status color */}
    </label>
    {type === 'textarea' ? (
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows || 5}
        placeholder={placeholder}
        className="w-full p-3 border border-neutral-light rounded-md focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-transparent transition duration-150 ease-in-out bg-neutral-white text-neutral-dark placeholder:text-neutral-main/70" // Use Tailwind color classes
        required={required}
      />
    ) : (
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-3 border border-neutral-light rounded-md focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-transparent transition duration-150 ease-in-out bg-neutral-white text-neutral-dark placeholder:text-neutral-main/70" // Use Tailwind color classes
        required={required}
      />
    )}
  </div>
);

InputField.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  rows: PropTypes.number,
  placeholder: PropTypes.string,
};

export default InputField;
