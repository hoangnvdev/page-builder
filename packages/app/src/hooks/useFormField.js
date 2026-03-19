import { useCallback, useState } from "react";

export const useFormField = (initialValue, { validator, transformer } = {}) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(null);
  const [touched, setTouched] = useState(false);

  const validate = useCallback(
    (val) => {
      if (!validator) return null;

      const validationError = validator(val);
      setError(validationError);
      return validationError;
    },
    [validator],
  );

  const handleChange = useCallback(
    (e) => {
      const newValue = e.target?.value !== undefined ? e.target.value : e;
      const transformedValue = transformer ? transformer(newValue) : newValue;

      setValue(transformedValue);

      if (touched) {
        validate(transformedValue);
      }
    },
    [transformer, touched, validate],
  );

  const handleBlur = useCallback(() => {
    setTouched(true);
    validate(value);
  }, [value, validate]);

  const reset = useCallback(() => {
    setValue(initialValue);
    setError(null);
    setTouched(false);
  }, [initialValue]);

  const setValueAndValidate = useCallback(
    (newValue) => {
      setValue(newValue);
      validate(newValue);
    },
    [validate],
  );

  return {
    value,
    error,
    touched,
    setValue,
    handleChange,
    handleBlur,
    reset,
    validate: () => validate(value),
    setValueAndValidate,
  };
};
