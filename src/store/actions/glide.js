import { PREV, NEXT, SELECT, TRANSITIONEND } from "./actionTypes";
// I think it needs to be inside the payload
export const nextHandler = (scrollTo, length) => {
  return {
    type: NEXT,
    scrollTo,
    length
  };
};

export const prevHandler = (scrollTo, length) => {
  return {
    type: PREV,
    scrollTo,
    length
  };
};

export const selectHandler = (value) => {
  return {
    type: SELECT,
    value
  };
};

export const transitionendHandler = () => {
  return {
    type: TRANSITIONEND
  };
};
