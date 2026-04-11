'use client';

import React from 'react';
import Button from './Button';

const StyledOutlineButton = ({
    children,
    to,
    onClick,
    icon,
    size = 'lg',
    textColorClass = 'text-cyan-400',
    borderColorClass = 'border-cyan-400',
    hoverBgClass = 'hover:bg-cyan-400/10',
    hoverTextColorClass = 'hover:text-cyan-300',
    hoverBorderColorClass = 'hover:border-cyan-300',
    className = '',
    ...rest
}) => {
    const baseOutlineStyles = `bg-transparent border-2 font-semibold transition-all duration-300 ease-out transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl`;

    const combinedClassName = `${baseOutlineStyles} ${borderColorClass} ${textColorClass} ${hoverBgClass} ${hoverTextColorClass} ${hoverBorderColorClass} ${className}`.replace(/\s+/g, ' ').trim();

    return (
        <Button
            to={to}
            onClick={onClick}
            size={size}
            icon={icon}
            className={combinedClassName}
            variant="custom"
            {...rest}
        >
            {children}
        </Button>
    );
};

export default StyledOutlineButton;
