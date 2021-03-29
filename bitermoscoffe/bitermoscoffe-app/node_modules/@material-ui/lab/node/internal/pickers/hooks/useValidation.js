"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeValidationHook = makeValidationHook;

var React = _interopRequireWildcard(require("react"));

var _useUtils = require("./useUtils");

const defaultIsSameError = (a, b) => a === b;

function makeValidationHook(validateFn, {
  isSameError = defaultIsSameError
} = {}) {
  return (value, props) => {
    const utils = (0, _useUtils.useUtils)();
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