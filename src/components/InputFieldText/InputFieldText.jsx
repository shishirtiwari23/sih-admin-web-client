import styles from "./InputFieldText.module.scss";

const InputFieldText = ({
  id,
  type,
  label,
  value,
  onChange,
  setValue,
  required = false,
}) => {
  return (
    <div className={styles.container}>
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
