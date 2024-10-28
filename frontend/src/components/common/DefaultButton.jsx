import React from "react";
import PropTypes from "prop-types";

/**
 * A customizable button component with theming options.
 *
 * @param {Object} props - The properties object.
 * @param {function} props.onClick - The function to call when the button is clicked.
 * @param {string} [props.type="button"] - The button type (e.g., "button", "submit").
 * @param {string} props.text - The text to display on the button.
 * @param {string} [props.className] - Additional CSS classes to apply to the button.
 * @param {string} [props.theme] - The theme of the button. Can be "default" or "bright".
 *
 * @returns {JSX.Element} The rendered button component.
 */
function DefaultButton({
  onClick,
  type = "button",
  text,
  className = "",
  theme = "default",
}) {
  const defaultStyle =
    "px-4 py-2 mt-1 bg-blue-900 text-white rounded-md shadow hover:bg-blue-800 transition";
  const brightStyle =
    "px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${
        theme === "bright" ? brightStyle : defaultStyle
      } ${className}`}
    >
      {text}
    </button>
  );
}

DefaultButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string,
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  theme: PropTypes.oneOf(["default", "bright"]),
};

export default DefaultButton;