import React from 'react';

import './custom-button.styles.scss';

const CustomButton = ({ children, type, isGoogleSignIn, ...otherProps }) => (
    <button
        className={`${isGoogleSignIn && 'google-sign-in'} custom-button`}
        type={type}
        onClick={otherProps.handleClick}
        {...otherProps}
    >
        {children}
    </button>
)

export default CustomButton;