import * as React from 'react';
import { useUtils } from './useUtils';

const defaultIsSameError = (a, b) => a === b;

export function makeValidationHook(validateFn, {
  isSameError = defaultIsSameError
} = {}) {
  return (value, props) => {
    const utils = useUtils();
    const previousValidationErrorRef = React.useRef(null);
    const validationError = validateFn(utils, value, props);
    React.useEffect(() => {
      if (props.onError && !isSameError(validationError, previousValidationErrorRef.current)) {
        props.onError(validationError, value);
      }

      previousValidationErrorRef.current = validationError;
    }, [previousValidationErrorRef, props, validationError, value]);
    return validationError;
  };
}