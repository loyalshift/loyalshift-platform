// src/components/ContactInfoItem.js
import React from 'react';
import PropTypes from 'prop-types';

const ContactInfoItem = ({ icon: Icon, title, lines, links }) => (
  <div className="flex items-start">
    {Icon && <Icon className="text-primary-main text-xl mr-4 mt-1 flex-shrink-0" aria-hidden="true" />}
    <div>
      <h3 className="font-bold text-neutral-dark">{title}</h3>
      {lines.map((line, index) => (
        links && links[index] ? (
          <a
            key={index}
            href={links[index]}
            className="block text-neutral-main hover:text-primary-main transition-colors text-sm md:text-base"
          >
            {line}
          </a>
        ) : (
          <p key={index} className={`text-neutral-main ${index === lines.length - 1 && lines.length > 1 ? 'text-sm' : 'text-sm md:text-base'}`}>
            {line}
          </p>
        )
      ))}
    </div>
  </div>
);

ContactInfoItem.propTypes = {
  icon: PropTypes.elementType, // Icon component type
  title: PropTypes.string.isRequired,
  lines: PropTypes.arrayOf(PropTypes.string).isRequired,
  links: PropTypes.arrayOf(PropTypes.string), // Optional links corresponding to lines
};

export default ContactInfoItem;
