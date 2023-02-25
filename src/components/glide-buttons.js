import React from "react";
import PropTypes from "prop-types";

function GlideButton({ children, clicked, classes }) {
  return (
    <button type="button" className={classes} onClick={clicked}>
      {children}
    </button>
  );
}

export default React.memo(GlideButton);
GlideButton.propTypes = {
  children: PropTypes.node.isRequired,
  clicked: PropTypes.func.isRequired
};
