import React, { useEffect, useRef } from 'react';

import { useField } from '@unform/core';

interface Props {
  name: string;
}

const Input: React.FC<Props> = ({ name }) => {
  const inputRef = useRef(null);
  const { fieldName, defaultValue = '', registerField, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    });
  }, [fieldName, registerField]);
  return (
    <>
      <input ref={inputRef} defaultValue={defaultValue} />
      {error && <span>{error}</span>}
    </>
  );
};

export default Input;
