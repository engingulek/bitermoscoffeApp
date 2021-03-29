import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { useRifm } from 'rifm';
import { useUtils } from './useUtils';
import { createDelegatedEventHandler } from '../utils';
import { maskedDateFormatter, getDisplayDate, checkMaskIsValidForCurrentFormat } from '../text-field-helper';
export function useMaskedInput({
  acceptRegex = /[\d]/gi,
  disabled,
  disableMaskedInput,
  ignoreInvalidInputs,
  inputFormat,
  inputProps,
  label,
  mask,
  onChange,
  rawValue,
  readOnly,
  rifmFormatter,
  TextFieldProps,
  validationError
}) {
  const utils = useUtils();
  const isFocusedRef = React.useRef(false);
  const getInputValue = React.useCallback(() => getDisplayDate(utils, rawValue, inputFormat), [inputFormat, rawValue, utils]);
  const formatHelperText = utils.getFormatHelperText(inputFormat);
  const [innerInputValue, setInnerInputValue] = React.useState(getInputValue());
  const shouldUseMaskedInput = React.useMemo(() => {
    // formatting of dates is a quite slow thing, so do not make useless .format calls
    if (!mask || disableMaskedInput) {
      return false;
    }

    return checkMaskIsValidForCurrentFormat(mask, inputFormat, acceptRegex, utils);
  }, [acceptRegex, disableMaskedInput, inputFormat, mask, utils]);
  const formatter = React.useMemo(() => shouldUseMaskedInput && mask ? maskedDateFormatter(mask, acceptRegex) : st => st, [acceptRegex, mask, shouldUseMaskedInput]);
  React.useEffect(() => {
    // We do not need to update the input value on keystroke
    // Because library formatters can change inputs from 12/12/2 to 12/12/0002
    if ((rawValue === null || utils.isValid(rawValue)) && !isFocusedRef.current) {
      setInnerInputValue(getInputValue());
    }
  }, [utils, getInputValue, rawValue]);

  const handleChange = text => {
    const finalString = text === '' || text === mask ? '' : text;
    setInnerInputValue(finalString);
    const date = finalString === null ? null : utils.parse(finalString, inputFormat);

    if (ignoreInvalidInputs && !utils.isValid(date)) {
      return;
    }

    onChange(date, finalString || undefined);
  };

  const rifmProps = useRifm({
    value: innerInputValue,
    onChange: handleChange,
    format: rifmFormatter || formatter
  });
  const inputStateArgs = shouldUseMaskedInput ? rifmProps : {
    value: innerInputValue,
    onChange: event => {
      handleChange(event.currentTarget.value);
    }
  };
  return _extends({
    label,
    disabled,
    error: validationError,
    helperText: formatHelperText,
    inputProps: _extends({}, inputStateArgs, {
      disabled,
      placeholder: formatHelperText,
      readOnly,
      type: shouldUseMaskedInput ? 'tel' : 'text'
    }, inputProps, {
      onFocus: createDelegatedEventHandler(() => {
        isFocusedRef.current = true;
      }, inputProps === null || inputProps === void 0 ? void 0 : inputProps.onFocus),
      onBlur: createDelegatedEventHandler(() => {
        isFocusedRef.current = false;
      }, inputProps === null || inputProps === void 0 ? void 0 : inputProps.onBlur)
    })
  }, TextFieldProps);
}
export default useMaskedInput;