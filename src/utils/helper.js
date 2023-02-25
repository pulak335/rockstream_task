export const indices = (start, delta, size) => {
    const arr = [];
    for (let idx = start; arr.length < size; idx += delta) {
      arr.push(idx);
    }
    return delta < 0 ? arr.reverse() : arr;
  };
  
  export const updateObject = (oldObject, updatedProperties) => {
    return {
      ...oldObject,
      ...updatedProperties
    };
  };
  
  export const dragPower = (offset, velocity) => Math.abs(offset) * velocity;
  
  export const calcOffset = (show, active, frameWidth) =>
    -(show + active) * frameWidth;
  
  export const debounce = function (fn, ms) {
    let timer;
    return () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        fn.apply(this, arguments);
      }, ms);
    };
  };
  
  export const getMaxBreakpoint = (arr) =>
    Math.max(...arr.map((obj) => obj.breakpoint));
  
  export const responsiveBreakpoint = (viewWidth, settings) => {
    const { responsive } = settings;
  
    if (viewWidth > getMaxBreakpoint(responsive)) return settings;
  
    for (let k = 0; k < responsive.length; k++) {
      if (!responsive[k + 1]) {
        if (viewWidth <= responsive[k].breakpoint) {
          return updateObject(settings, responsive[k].settings);
        }
      }
  
      if (
        viewWidth <= responsive[k].breakpoint &&
        viewWidth > responsive[k + 1].breakpoint
      ) {
        return updateObject(responsive[k].settings, settings);
      }
    }
  };
  