# hookable-unform

A set of React Hooks to use with [Unform](https://unform.dev/)

### Getting Started

```
yarn add hookable-unform yup @unform/core

// or

npm i hookable-unform yup @unform/core
```

- yup and @unform/core are required as peer dependencies

## Hooks

### useFormValidator

Simple Example

```tsx
import { useFormValidator } from 'hookable-unform';

import schema from './schema';

const formRef = useRef<FormHandles>(null);
const validateForm = useFormValidator(formRef, schema);

const handleSubmit = useCallback(async () => {
  const validationResult = await validateForm();

  if (validationResult.success) {
    console.log(validationResult.data);
  } else {
    console.log(validationResult.errors);
  }
}, [validateForm]);

<Form onSubmit={handleSubmit} ref={formRef}>
  {/* inputs */}
</Form>;
```

Complete Example

```tsx
import React, { useRef, useCallback } from 'react';
import { useFormValidator } from 'hookable-unform';
import { FormHandles } from '@unform/core';
import { Form as Unform } from '@unform/web';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string()
    .min(6)
    .required()
});

const Form: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const validateForm = useFormValidator(formRef, schema);

  const handleSubmit = useCallback(async () => {
    const validationResult = await validateForm();

    if (validationResult.success) {
      console.log(validationResult.data);
    } else {
      console.log(validationResult.errors);
    }
  }, [validateForm]);

  return (
    <Form onSubmit={handleSubmit} ref={formRef}>
      {/* inputs */}
    </Form>
  );
};

export default Form;
```
