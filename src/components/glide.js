import React, { Children, useState, useRef, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

import useGlide from "../hooks/useGlide";
import {
  indices,
  responsiveBreakpoint,
  updateObject,
  calcOffset,
  debounce,
  getMaxBreakpoint
} from "../helpers/util";
import GlideButton from "./glide-buttons";

function Glide({ children, settings }) {
  const [options, setOptions] = useState(
    updateObject(
      {
        glideToShow: 1,
        glideToScroll: 1
      },
      settings
    )
  );
  const childrenArray = Children.toArray(children);
  const length = childrenArray.length;

  const screenRef = useRef(null);
  const [screenWidth, setScreenWidth] = useState(0);
  const [frameWidth, animate, actions, active] = useGlide(
    options,
    screenWidth,
    length
  );
  const childrenCloneEnd = indices(
    children.length - 1,
    -1,
    options.glideToShow
  );
  const childrenCloneStart = indices(0, +1, options.glideToShow);
  const totalChild =
    length + childrenCloneStart.length + childrenCloneEnd.length;
  const offset = calcOffset(options.glideToShow, active, frameWidth);

  useEffect(() => {
    let updateSettings;
    if (window.innerWidth < getMaxBreakpoint(settings.responsive)) {
      updateSettings = responsiveBreakpoint(window.innerWidth, settings);
      setOptions(updateSettings);
    }

    const debounceOptionHandler = debounce(function () {
      updateSettings = responsiveBreakpoint(window.innerWidth, settings);
      setOptions(updateSettings);
    }, 500);

    window.addEventListener("resize", debounceOptionHandler);

    return () => window.removeEventListener("resize", debounceOptionHandler);
  }, [settings]);

  useEffect(() => {
    !screenWidth && setScreenWidth(screenRef.current.offsetWidth);
    const debounceResizeHandler = debounce(function () {
      setScreenWidth(screenRef.current.offsetWidth);
    }, 500);

    window.addEventListener("resize", debounceResizeHandler);
    return () => window.removeEventListener("resize", debounceResizeHandler);
  }, [screenWidth]);

  const cloneGlide = useMemo(
    () => (arr, frameWidth) => {
      return arr.map((idx) => (
        <Frame style={{ width: `${frameWidth}px` }} key={`c-${idx}`}>
          {childrenArray[idx]}
        </Frame>
      ));
    },
    [childrenArray]
  );

  const glides = useMemo(
    () => (frameWidth) =>
      childrenArray.map((g, idx) => (
        <Frame style={{ width: `${frameWidth}px` }} key={idx}>
          {g}
        </Frame>
      )),
    [childrenArray]
  );

  return (
    <div className="glide" ref={screenRef}>
      <GlideButton
        classes="glide__btn glide__btn--prev"
        clicked={actions.prevHandler}
      >
        <i className="fa-solid fa-chevron-left"></i>
      </GlideButton>
      <GlideButton
        classes="glide__btn glide__btn--next"
        clicked={actions.nextHandler}
      >
        <i className="fa-solid fa-chevron-right"></i>
      </GlideButton>

      <motion.div
        className="glide__container"
        style={{
          width: `${frameWidth * totalChild}px`,
          x: offset
        }}
        animate={frameWidth && animate}
        transition={{ type: "tween" }}
        drag="x"
        dragConstraints={{
          left: offset,
          right: offset
        }}
        onDragEnd={(e, { offset, velocity }) =>
          actions.dragHandler({ offset, velocity })
        }
      >
        {cloneGlide(childrenCloneEnd, frameWidth)}
        {glides(frameWidth)}
        {cloneGlide(childrenCloneStart, frameWidth)}
      </motion.div>

      {/* <GlideDots
        length={children.length}
        active={active}
        clicked={actions.selectHandler}
      /> */}
    </div>
  );
}

function Frame({ children, ...props }) {
  return <div {...props}>{children}</div>;
}
export default React.memo(Glide);
Glide.propTypes = {
  children: PropTypes.array.isRequired,
  settings: PropTypes.object.isRequired
};

//Glide.whyDidYouRender = true;
