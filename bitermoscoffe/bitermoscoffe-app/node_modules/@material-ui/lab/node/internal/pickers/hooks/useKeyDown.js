"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runKeyHandler = runKeyHandler;
exports.useKeyDownHandler = useKeyDownHandler;
exports.useGlobalKeyDown = useGlobalKeyDown;
exports.keycode = exports.useIsomorphicEffect = void 0;

var React = _interopRequireWildcard(require("react"));

const useIsomorphicEffect = typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;
exports.useIsomorphicEffect = useIsomorphicEffect;

function runKeyHandler(event, keyHandlers) {
  // tslint:disable-next-line deprecation IE11
  const handler = keyHandlers[event.keyCode];

  if (handler) {
    handler(); // if event was handled prevent other side effects (e.g. page scroll)

    event.preventDefault();
  }
}

function useKeyDownHandler(active, keyHandlers) {
  const keyHandlersRef = React.useRef(keyHandlers);
  keyHandlersRef.current = keyHandlers;
  return React.useCallback(event => {
    if (active) {
      runKeyHandler(event, keyHandlersRef.current);
    }
  }, [active]);
}

function useGlobalKeyDown(active, keyHandlers) {
  const keyHandlersRef = React.useRef(keyHandlers);
  keyHandlersRef.current = keyHandlers;
  useIsomorphicEffect(() => {
    if (active) {
      const handleKeyDown = nativeEvent => {
        runKeyHandler(nativeEvent, keyHandlersRef.current);
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }

    return undefined;
  }, [active]);
}

const keycode = {
  ArrowUp: 38,
  ArrowDown: 40,
  ArrowLeft: 37,
  ArrowRight: 39,
  Enter: 13,
  Home: 36,
  End: 35,
  PageUp: 33,
  PageDown: 34,
  Esc: 27
};
exports.keycode = keycode;