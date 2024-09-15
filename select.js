import React from 'react';

function Select({ children, ...props }) {
  return <select {...props}>{children}</select>;
}

function SelectContent({ children }) {
  return <>{children}</>;
}

function SelectItem({ children, ...props }) {
  return <option {...props}>{children}</option>;
}

function SelectTrigger({ children, ...props }) {
  return <div {...props}>{children}</div>;
}

function SelectValue({ children }) {
  return <>{children}</>;
}

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue };
