// components/ui/textarea.jsx

import React from 'react';

export const Textarea = React.forwardRef(({ className = "", ...props }, ref) => (
  <textarea
    ref={ref}
    className={`border border-gray-300 rounded-md p-2 w-full text-sm ${className}`}
    {...props}
  />
));
