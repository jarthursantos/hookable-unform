import { RefObject, useCallback, useState, useMemo, useEffect } from 'react';

import { FormHandles as UnformHandles } from '@unform/core';
import * as Yup from 'yup';

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
  schema: Yup.ObjectSchema
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

        if (err instanceof Yup.ValidationError) {
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
    schema: Yup.ObjectSchema,
    options: ValidationOptions
  ): Promise<ValidationResult>;
}

export function useFormHandlers(ref: RefObject<UnformHandles>) {
  const [schema, setSchema] = useState<Yup.ObjectSchema>(Yup.object());
  const handleValidate = useFormValidator(ref, schema);

  const [handlers, setHandlers] = useState<FormHandles>();

  useEffect(() => {
    if (ref.current === null) {
      throw Error('null form reference');
    }

    setHandlers({
      ...ref.current,
      validate: (objSchema: Yup.ObjectSchema, options: ValidationOptions) => {
        setSchema(objSchema);

        return handleValidate(options);
      }
    });
  }, [ref, handleValidate]);

  return handlers;
}
