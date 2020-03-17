import { RefObject, useCallback, useState } from 'react';

import { FormHandles as UnformHandles } from '@unform/core';
import * as Yup from 'yup';
import { ObjectSchema, ValidationError } from 'yup';

export interface ValidationResult {
  success: boolean;
  errors?: { [key: string]: string };
  data?: object;
}

export interface ValidationOptions {
  applyErrors: boolean;
}

export function useFormValidator(
  ref: RefObject<UnformHandles>,
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

export interface FormHandles extends UnformHandles {
  validate(
    schema: ObjectSchema,
    options: ValidationOptions
  ): Promise<ValidationResult>;
}

export function useFormHandlers(ref: RefObject<UnformHandles>) {
  const [schema, setSchema] = useState<ObjectSchema>(Yup.object());
  const handleValidate = useFormValidator(ref, schema);

  return {
    ...ref.current,
    validate: (objSchema: ObjectSchema, options: ValidationOptions) => {
      setSchema(objSchema);

      return handleValidate(options);
    }
  };
}
