"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useIsLandscape = useIsLandscape;
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _useKeyDown = require("./useKeyDown");

var _utils = require("../utils");

// tslint:disable deprecation
const getOrientation = () => {
  if (typeof window === 'undefined') {
    return 'portrait';
  }

  if (window.screen && window.screen.orientation && window.screen.orientation.angle) {
    return Math.abs(window.screen.orientation.angle) === 90 ? 'landscape' : 'portrait';
  } // Support IOS safar


  if (window.orientation) {
    return Math.abs(Number(window.orientation)) === 90 ? 'landscape' : 'portrait';
  }

  return 'portrait';
};

function useIsLandscape(views, customOrientation) {
  const [orientation, setOrientation] = React.useState(getOrientation());
  (0, _useKeyDown.useIsomorphicEffect)(() => {
    const eventHandler = () => {
      setOrientation(getOrientation());
    };

    window.addEventListener('orientationchange', eventHandler);
    return () => {
      window.removeEventListener('orientationchange', eventHandler);
    };
  }, []);

  if ((0, _utils.arrayIncludes)(views, ['hours', 'minutes', 'seconds'])) {
    // could not display 13:34:44 in landscape mode
    return false;
  }

  const orientationToUse = customOrientation || orientation;
  return orientationToUse === 'landscape';
}

var _default = useIsLandscape;
exports.default = _default;