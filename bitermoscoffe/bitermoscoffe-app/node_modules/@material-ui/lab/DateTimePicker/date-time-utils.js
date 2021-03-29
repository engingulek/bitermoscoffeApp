import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import { validateDate } from '../internal/pickers/date-utils';
import { validateTime } from '../internal/pickers/time-utils';
export function validateDateAndTime(utils, value, _ref) {
  let {
    minDate,
    maxDate,
    disableFuture,
    shouldDisableDate,
    disablePast
  } = _ref,
      timeValidationProps = _objectWithoutPropertiesLoose(_ref, ["minDate", "maxDate", "disableFuture", "shouldDisableDate", "disablePast"]);

  const dateValidationResult = validateDate(utils, value, {
    minDate,
    maxDate,
    disableFuture,
    shouldDisableDate,
    disablePast
  });

  if (dateValidationResult !== null) {
    return dateValidationResult;
  }

  return validateTime(utils, value, timeValidationProps);
}