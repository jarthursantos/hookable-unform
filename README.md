# hookable-unform

A set of React Hooks to use with [Unform](https://unform.dev/)

## Getting Started

- `yarn add hookable-unform yup @unform/core`
  or
- `npm i hookable-unform yup @unform/core`

  - `yup` and `@unform/core` are required as peer dependencies

## Hooks

All hooks have two variations, the one that receives the form reference as a parameter and the one that returns a reference to be used later, this second one always suffixes the word `Ref`

```tsx
import { useRef } from 'react';
import { useFormValidator, useFormValidatorRef } from 'hookable-unform';

import schema from './schema'; // Yup Schema

const formRef = useRef(null);

const validateForm = useFormValidator(formRef, schema);
const [formRef, validateForm] = useFormValidatorRef(schema);
```

### useFormValidator[Ref]

useFormValidator execute validation on your form based in a Yup Schema.

```tsx
import { useFormValidatorRef } from 'hookable-unform';

import schema from './schema'; // Yup Schema

const [formRef, validateForm] = useFormValidatorRef(schema);

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

Options in returned function of hook

- `applyErrors: boolean`: set if automatically apply founded errors, default is true

### useFormHandlers[Ref]

userFormHandlers execute the ref null verification, and you can call function without `Object is possibly 'null'`, exclude use of `?.` operator.

```tsx
import { useFormHandlersRef } from 'hookable-unform';

const [formRef, { getData, setData, submitForm, ...rest }] = useFormHandlersRef();

const handleSubmit = useCallback(async () => {
  console.log(getData());
}, [validateForm]);

<Form onSubmit={handleSubmit} ref={formRef}>
  {/* inputs */}
</Form>;
```
