import styles from "./Button.module.scss";
import clsx from "clsx";

const Button = ({
  children,
  onClick,
  icon,
  left = false,
  right = false,
  color,
  type = "button",
  variant = "primary",
  ...remaining
}) => {
  function getVariantClass() {
    switch (variant) {
      case "primary": {
        return styles.primary;
      }
      case "secondary": {
        return styles.secondary;
      }
      case "tertiary": {
        return styles.tertiary;
      }
      default: {
        throw new Error("Invalid Variant Type");
      }
    }
  }
  function getBackgroundColor() {
    switch (color) {
      case undefined: {
        return styles.primaryColor;
      }
      case null: {
        return styles.primaryColor;
      }
      case "primary": {
        return styles.primaryColor;
      }
      case "warning": {
        return styles.warningColor;
      }
      case "error": {
        return styles.errorColor;
      }

      default: {
        throw new Error("Invalid Color Type");
      }
    }
  }

  return (
    <button
      className={clsx(
        styles.container,
        getVariantClass(),
        getBackgroundColor()
      )}
      type={type}
      style={right ? { flexDirection: "row-reverse" } : {}}
      onClick={onClick}
      {...remaining}
    >
      {icon && <img src={icon} alt="" />}
      <div className={styles.children}>{children}</div>
    </button>
  );
};

export default Button;
