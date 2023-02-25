import { NEXT, PREV, TRANSITIONEND, SELECT } from "../actions/actionTypes";
import { updateObject } from "../../helpers/util";

export const initialState = {
  active: 0,
  target: 0,
  dragThreshold: 10000
};

const nextHandler = (state, action) => {
  const updateState = { ...state };
  updateState.active = (state.active + action.scrollTo) % action.length;
  updateState.target += action.scrollTo;

  return updateObject(state, updateState);
};

const prevHandler = (state, action) => {
  const updateState = { ...state };
  updateState.active =
    (updateState.active - action.scrollTo + action.length) % action.length;
  updateState.target -= action.scrollTo;

  return updateObject(state, updateState);
};

const transitionendHandler = (state, action) => {
  const updateState = { ...state };
  updateState.target = updateState.active;

  return updateObject(state, updateState);
};

const selectHandler = (state, action) => {
  if (state.active === action.value) return state;

  const updateState = { ...state };
  updateState.target = action.value;
  updateState.active = action.value;
  return updateObject(state, updateState);
};

export const reducer = (state, action) => {
  switch (action.type) {
    case NEXT:
      return nextHandler(state, action);
    case PREV:
      return prevHandler(state, action);
    case TRANSITIONEND:
      return transitionendHandler(state, action);
    case SELECT:
      return selectHandler(state, action);
    default:
      return state;
  }
};
