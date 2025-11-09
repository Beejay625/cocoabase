export type ValidationRule<T = unknown> = {
  validate: (value: T) => boolean;
  message: string;
};

export type FormField<T = unknown> = {
  value: T;
  error?: string;
  touched: boolean;
  dirty: boolean;
  rules?: ValidationRule<T>[];
};

export type FormState<T extends Record<string, unknown>> = {
  fields: {
    [K in keyof T]: FormField<T[K]>;
  };
  isValid: boolean;
  isDirty: boolean;
  isTouched: boolean;
};

export const createFormField = <T>(
  initialValue: T,
  rules?: ValidationRule<T>[]
): FormField<T> => {
  return {
    value: initialValue,
    touched: false,
    dirty: false,
    rules,
  };
};

export const validateField = <T>(field: FormField<T>): FormField<T> => {
  if (!field.rules || field.rules.length === 0) {
    return { ...field, error: undefined };
  }

  for (const rule of field.rules) {
    if (!rule.validate(field.value)) {
      return { ...field, error: rule.message };
    }
  }

  return { ...field, error: undefined };
};

export const createFormState = <T extends Record<string, unknown>>(
  initialValues: T,
  rules?: Partial<{ [K in keyof T]: ValidationRule<T[K]>[] }>
): FormState<T> => {
  const fields = {} as FormState<T>["fields"];

  for (const key in initialValues) {
    fields[key] = createFormField(initialValues[key], rules?.[key]);
  }

  return {
    fields,
    isValid: true,
    isDirty: false,
    isTouched: false,
  };
};

export const updateFormField = <T extends Record<string, unknown>, K extends keyof T>(
  state: FormState<T>,
  key: K,
  value: T[K]
): FormState<T> => {
  const field = state.fields[key];
  const updatedField: FormField<T[K]> = {
    ...field,
    value,
    dirty: field.value !== value,
    touched: true,
  };

  const validatedField = validateField(updatedField);

  const newFields = {
    ...state.fields,
    [key]: validatedField,
  };

  const isValid = Object.values(newFields).every((f) => !f.error);
  const isDirty = Object.values(newFields).some((f) => f.dirty);
  const isTouched = Object.values(newFields).some((f) => f.touched);

  return {
    fields: newFields,
    isValid,
    isDirty,
    isTouched,
  };
};

export const touchFormField = <T extends Record<string, unknown>, K extends keyof T>(
  state: FormState<T>,
  key: K
): FormState<T> => {
  const field = state.fields[key];
  const updatedField: FormField<T[K]> = {
    ...field,
    touched: true,
  };

  const validatedField = validateField(updatedField);

  const newFields = {
    ...state.fields,
    [key]: validatedField,
  };

  const isValid = Object.values(newFields).every((f) => !f.error);

  return {
    ...state,
    fields: newFields,
    isValid,
    isTouched: true,
  };
};

export const resetForm = <T extends Record<string, unknown>>(
  state: FormState<T>,
  initialValues: T
): FormState<T> => {
  const fields = {} as FormState<T>["fields"];

  for (const key in initialValues) {
    const originalField = state.fields[key];
    fields[key] = {
      ...originalField,
      value: initialValues[key],
      error: undefined,
      touched: false,
      dirty: false,
    };
  }

  return {
    fields,
    isValid: true,
    isDirty: false,
    isTouched: false,
  };
};

export const getFormValues = <T extends Record<string, unknown>>(
  state: FormState<T>
): T => {
  const values = {} as T;
  for (const key in state.fields) {
    values[key] = state.fields[key].value;
  }
  return values;
};

export const validateForm = <T extends Record<string, unknown>>(
  state: FormState<T>
): FormState<T> => {
  const fields = {} as FormState<T>["fields"];
  let isValid = true;

  for (const key in state.fields) {
    const field = state.fields[key];
    const validatedField = validateField({
      ...field,
      touched: true,
    });
    fields[key] = validatedField;
    if (validatedField.error) {
      isValid = false;
    }
  }

  return {
    ...state,
    fields,
    isValid,
    isTouched: true,
  };
};

export const createValidationRule = <T>(
  validate: (value: T) => boolean,
  message: string
): ValidationRule<T> => {
  return { validate, message };
};

export const requiredRule = <T>(message: string = "This field is required"): ValidationRule<T> => {
  return createValidationRule(
    (value) => {
      if (value === null || value === undefined) return false;
      if (typeof value === "string") return value.trim().length > 0;
      if (Array.isArray(value)) return value.length > 0;
      return true;
    },
    message
  );
};

export const minLengthRule = (min: number, message?: string): ValidationRule<string> => {
  return createValidationRule(
    (value) => value.length >= min,
    message || `Must be at least ${min} characters`
  );
};

export const maxLengthRule = (max: number, message?: string): ValidationRule<string> => {
  return createValidationRule(
    (value) => value.length <= max,
    message || `Must be at most ${max} characters`
  );
};

export const emailRule = (message?: string): ValidationRule<string> => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return createValidationRule(
    (value) => emailRegex.test(value),
    message || "Must be a valid email address"
  );
};

export const numberRule = (message?: string): ValidationRule<number> => {
  return createValidationRule(
    (value) => !isNaN(value) && isFinite(value),
    message || "Must be a valid number"
  );
};

export const minRule = (min: number, message?: string): ValidationRule<number> => {
  return createValidationRule(
    (value) => value >= min,
    message || `Must be at least ${min}`
  );
};

export const maxRule = (max: number, message?: string): ValidationRule<number> => {
  return createValidationRule(
    (value) => value <= max,
    message || `Must be at most ${max}`
  );
};

export const patternRule = (pattern: RegExp, message?: string): ValidationRule<string> => {
  return createValidationRule(
    (value) => pattern.test(value),
    message || "Invalid format"
  );
};

