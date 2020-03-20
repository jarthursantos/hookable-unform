import React, { useCallback } from 'react';

import { Form } from '@unform/web';
import { useFormValidator } from 'hookable-unform';
import * as Yup from 'yup';

import Input from './components/Input';

const schema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string()
    .min(6)
    .required()
});

function App() {
  const [formRef, validate] = useFormValidator(schema);
  const handleSubmit = useCallback(async () => {
    const result = await validate();

    if (result.success) {
      console.log(result.data);
    } else {
      console.log(result.errors);
    }
  }, [validate]);

  return (
    <div className="App">
      <Form onSubmit={handleSubmit} ref={formRef}>
        <Input name="email" />
        <Input name="password" />

        <button type="submit">Send</button>
      </Form>
    </div>
  );
}

export default App;
