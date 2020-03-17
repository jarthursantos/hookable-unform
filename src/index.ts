import { RefObject, useCallback } from 'react';

import { FormHandles } from '@unform/core';
import { ObjectSchema, ValidationError } from 'yup';

interface ValidationResult {
  success: boolean;
  errors?: { [key: string]: string };
  data?: object;
}

interface ValidationOptions {
  applyErrors: boolean;
}

export function useFormValidator(
  ref: RefObject<FormHandles>,
  schema: ObjectSchema
) {
  return useCallback(
    async function handle(
      { applyErrors }: ValidationOptions = {
        applyErrors: true
      }
    ): Promise<ValidationResult> {
      if (!ref.current) throw Error('null form reference');

      const data = ref.current.getData();

      try {
        await schema.validate(data, {
          abortEarly: false
        });

        return { success: true, data };
      } catch (err) {
        const validationErrors: { [key: string]: string } = {};

        if (err instanceof ValidationError) {
          err.inner.forEach(error => {
            validationErrors[error.path] = error.message;
          });

          if (applyErrors) ref.current.setErrors(validationErrors);

          return { success: false, errors: validationErrors };
        }

        throw err;
      }
    },
    [ref, schema]
  );
}
