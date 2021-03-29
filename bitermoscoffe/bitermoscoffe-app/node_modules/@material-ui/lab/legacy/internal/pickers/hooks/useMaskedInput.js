import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { useRifm } from 'rifm';
import { useUtils } from './useUtils';
import { createDelegatedEventHandler } from '../utils';
import { maskedDateFormatter, getDisplayDate, checkMaskIsValidForCurrentFormat } from '../text-field-helper';
export function useMaskedInput(_ref) {
  var _ref$acceptRegex = _ref.acceptRegex,
      acceptRegex = _ref$acceptRegex === void 0 ? /[\d]/gi : _ref$acceptRegex,
      disabled = _ref.disabled,
      disableMaskedInput = _ref.disableMaskedInput,
      ignoreInvalidInputs = _ref.ignoreInvalidInputs,
      inputFormat = _ref.inputFormat,
      inputProps = _ref.inputProps,
      label = _ref.label,
      mask = _ref.mask,
      onChange = _ref.onChange,
      rawValue = _ref.rawValue,
      readOnly = _ref.readOnly,
      rifmFormatter = _ref.rifmFormatter,
      TextFieldProps = _ref.TextFieldProps,
      validationError = _ref.validationError;
  var utils = useUtils();
  var isFocusedRef = React.useRef(false);
  var getInputValue = React.useCallback(function () {
    return getDisplayDate(utils, rawValue, inputFormat);
  }, [inputFormat, rawValue, utils]);
  var formatHelperText = utils.getFormatHelperText(inputFormat);

  var _React$useState = React.useState(getInputValue()),
      innerInputValue = _React$useState[0],
      setInnerInputValue = _React$useState[1];

  var shouldUseMaskedInput = React.useMemo(function () {
    // formatting of dates is a quite slow thing, so do not make useless .format calls
    if (!mask || disableMaskedInput) {
      return false;
    }

    return checkMaskIsValidForCurrentFormat(mask, inputFormat, acceptRegex, utils);
  }, [acceptRegex, disableMaskedInput, inputFormat, mask, utils]);
  var formatter = React.useMemo(function () {
    return shouldUseMaskedInput && mask ? maskedDateFormatter(mask, acceptRegex) : function (st) {
      return st;
    };
  }, [acceptRegex, mask, shouldUseMaskedInput]);
  React.useEffect(function () {
    // We do not need to update the input value on keystroke
    // Because library formatters can change inputs from 12/12/2 to 12/12/0002
    if ((rawValue === null || utils.isValid(rawValue)) && !isFocusedRef.current) {
      setInnerInputValue(getInputValue());
    }
  }, [utils, getInputValue, rawValue]);

  var handleChange = function handleChange(text) {
    var finalString = text === '' || text === mask ? '' : text;
    setInnerInputValue(finalString);
    var date = finalString === null ? null : utils.parse(finalString, inputFormat);

    if (ignoreInvalidInputs && !utils.isValid(date)) {
      return;
    }

    onChange(date, finalString || undefined);
  };

  var rifmProps = useRifm({
    value: innerInputValue,
    onChange: handleChange,
    format: rifmFormatter || formatter
  });
  var inputStateArgs = shouldUseMaskedInput ? rifmProps : {
    value: innerInputValue,
    onChange: function onChange(event) {
      handleChange(event.currentTarget.value);
    }
  };
  return _extends({
    label: label,
    disabled: disabled,
    error: validationError,
    helperText: formatHelperText,
    inputProps: _extends({}, inputStateArgs, {
      disabled: disabled,
      placeholder: formatHelperText,
      readOnly: readOnly,
      type: shouldUseMaskedInput ? 'tel' : 'text'
    }, inputProps, {
      onFocus: createDelegatedEventHandler(function () {
        isFocusedRef.current = true;
      }, inputProps === null || inputProps === void 0 ? void 0 : inputProps.onFocus),
      onBlur: createDelegatedEventHandler(function () {
        isFocusedRef.current = false;
      }, inputProps === null || inputProps === void 0 ? void 0 : inputProps.onBlur)
    })
  }, TextFieldProps);
}
export default useMaskedInput;