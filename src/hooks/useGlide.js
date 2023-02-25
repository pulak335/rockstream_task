import { useReducer } from "react";

import { initialState, reducer } from "../store/reducers/glide";
import {
  nextHandler,
  prevHandler,
  selectHandler,
  transitionendHandler
} from "../store/actions/index";
import { dragPower, calcOffset } from "../helpers/util";

export default function useGlide(options, screenWidth, length) {
  const { glideToShow, glideToScroll } = options;
  const [{ active, target, dragThreshold }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const scrollTo = Math.min(glideToScroll, glideToShow);
  const frameWidth = (screenWidth / glideToShow).toFixed(3) * 1;

  const animate = () => {
    if (target >= length || target < 0) {
      dispatch(transitionendHandler());
      return {
        x: calcOffset(glideToShow, target, frameWidth),
        transitionEnd: {
          x: calcOffset(glideToShow, active, frameWidth)
        }
      };
    }
    return {
      x: calcOffset(glideToShow, active, frameWidth)
    };
  };

  const actions = {
    nextHandler: () => {
      dispatch(nextHandler(scrollTo, length));
    },
    prevHandler: () => dispatch(prevHandler(scrollTo, length)),
    selectHandler: (idx) => dispatch(selectHandler(idx)),
    dragHandler: ({ offset, velocity }) => {
      const drag = dragPower(offset.x, velocity.x);

      if (drag < -dragThreshold) dispatch(nextHandler(scrollTo, length));
      if (drag > dragThreshold) dispatch(prevHandler(scrollTo, length));
    }
  };
  return [frameWidth, animate, actions, active];
}
