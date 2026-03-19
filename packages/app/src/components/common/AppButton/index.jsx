import "./index.scss";

import PropTypes from "prop-types";

import { withMemo } from "@/hocs";

const AppButtonComponent = ({
  children,
  variant = "primary",
  size = "medium",
  icon,
  iconPosition = "left",
  disabled = false,
  fullWidth = false,
  onClick,
  type = "button",
  className = "",
  ...props
}) => {
  // Build className string
  const buttonClasses = [
    "app-button",
    `app-button--${variant}`,
    `app-button--${size}`,
    fullWidth && "app-button--full-width",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const renderContent = () => {
    if (variant === "icon") {
      return icon || children;
    }

    if (icon && iconPosition === "left") {
      return (
        <>
          <span>{icon}</span>
          <span>{children}</span>
        </>
      );
    }

    if (icon && iconPosition === "right") {
      return (
        <>
          <span>{children}</span>
          <span>{icon}</span>
        </>
      );
    }

    return children;
  };

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {renderContent()}
    </button>
  );
};

AppButtonComponent.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "export",
    "danger",
    "ghost",
    "icon",
  ]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(["left", "right"]),
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  className: PropTypes.string,
};

export const AppButton = withMemo(AppButtonComponent);
