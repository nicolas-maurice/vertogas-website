import React from 'react';

import TextField from 'material-ui/TextField';

const TextInput = ({input: {...input}, ...props }) => {
  return (
    <TextField
      fullWidth
      {...input}
      {...props}
    />
  );
};

export default TextInput