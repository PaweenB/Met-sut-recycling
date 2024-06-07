import React from 'react';

const CustomDateInput = ({ value, onClick }) => (
  <input
    type="text"
    value={value}
    onClick={onClick}
    style={{ width: '100%', padding: '8px', fontSize: '1rem', color: 'black', border: '1px solid #ccc', borderRadius: '4px' }}
    readOnly
  />
);

export default CustomDateInput;