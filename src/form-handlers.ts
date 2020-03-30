import { RefObject, useRef } from "react";

import { FormHandles, UnformErrors } from "@unform/core";

export function useFormHandlers(ref: RefObject<FormHandles>): FormHandles {
  return {
    getFieldValue(fieldName: string): any {
      if (!ref.current) throw Error("null form reference");

      return ref.current.getFieldValue(fieldName);
    },
    setFieldValue(fieldName: string, value: any): void | boolean {
      if (!ref.current) throw Error("null form reference");

      return ref.current.setFieldValue(fieldName, value);
    },
    getFieldError(fieldName: string): string {
      if (!ref.current) throw Error("null form reference");

      return ref.current.getFieldError(fieldName);
    },
    setFieldError(fieldName: string, error: string): void {
      if (!ref.current) throw Error("null form reference");

      return ref.current.setFieldError(fieldName, error);
    },
    clearField(fieldName: string): void {
      if (!ref.current) throw Error("null form reference");

      return ref.current.clearField(fieldName);
    },
    getData(): object {
      if (!ref.current) throw Error("null form reference");

      return ref.current.getData();
    },
    getFieldRef(fieldName: string): any {
      if (!ref.current) throw Error("null form reference");

      return ref.current.getFieldRef(fieldName);
    },
    setData(data: object): void {
      if (!ref.current) throw Error("null form reference");

      return ref.current.setData(data);
    },
    getErrors(): UnformErrors {
      if (!ref.current) throw Error("null form reference");

      return ref.current.getErrors();
    },
    setErrors(errors: object): void {
      if (!ref.current) throw Error("null form reference");

      return ref.current.setErrors(errors);
    },
    reset(data?: object): void {
      if (!ref.current) throw Error("null form reference");

      return ref.current.reset(data);
    },
    submitForm(): void {
      if (!ref.current) throw Error("null form reference");

      return ref.current.submitForm();
    }
  };
}

export function useFormHandlersRef(): [RefObject<FormHandles>, FormHandles] {
  const ref = useRef<FormHandles>(null);

  const handlers = useFormHandlers(ref);

  return [ref, handlers];
}
