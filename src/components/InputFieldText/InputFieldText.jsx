import styles from "./InputFieldText.module.scss";
import clsx from "clsx";

const InputFieldText = ({
  id,
  type,
  label,
  value,
  variant = "small",
  onChange,
  setValue,
  required = false,
}) => {
  if (variant === "large") {
    return (
      <div className={clsx(styles.container, styles.large)}>
        <label htmlFor={id}>{label}</label>
        <textarea
          id={id}
          rows={16}
          type={type}
          value={value}
          required={required}
          onChange={onChange ? onChange : setValue}
        />
      </div>
    );
  }
  return (
    <div className={clsx(styles.container, styles.small)}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        required={required}
        onChange={onChange ? onChange : setValue}
      />
    </div>
  );
};

export default InputFieldText;
