import * as React from 'react';
import { useUtils } from './useUtils';

var defaultIsSameError = function defaultIsSameError(a, b) {
  return a === b;
};

export function makeValidationHook(validateFn) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$isSameError = _ref.isSameError,
      isSameError = _ref$isSameError === void 0 ? defaultIsSameError : _ref$isSameError;

  return function (value, props) {
    var utils = useUtils();
    var previousValidationErrorRef = React.useRef(null);
    var validationError = validateFn(utils, value, props);
    React.useEffect(function () {
      if (props.onError && !isSameError(validationError, previousValidationErrorRef.current)) {
        props.onError(validationError, value);
      }

      previousValidationErrorRef.current = validationError;
    }, [previousValidationErrorRef, props, validationError, value]);
    return validationError;
  };
}