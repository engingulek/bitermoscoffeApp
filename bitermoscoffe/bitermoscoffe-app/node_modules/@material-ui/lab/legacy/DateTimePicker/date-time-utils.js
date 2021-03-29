import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { validateDate } from '../internal/pickers/date-utils';
import { validateTime } from '../internal/pickers/time-utils';
export function validateDateAndTime(utils, value, _ref) {
  var minDate = _ref.minDate,
      maxDate = _ref.maxDate,
      disableFuture = _ref.disableFuture,
      shouldDisableDate = _ref.shouldDisableDate,
      disablePast = _ref.disablePast,
      timeValidationProps = _objectWithoutProperties(_ref, ["minDate", "maxDate", "disableFuture", "shouldDisableDate", "disablePast"]);

  var dateValidationResult = validateDate(utils, value, {
    minDate: minDate,
    maxDate: maxDate,
    disableFuture: disableFuture,
    shouldDisableDate: shouldDisableDate,
    disablePast: disablePast
  });

  if (dateValidationResult !== null) {
    return dateValidationResult;
  }

  return validateTime(utils, value, timeValidationProps);
}