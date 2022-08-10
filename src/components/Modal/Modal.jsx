import styles from "./Modal.module.scss";
import { Button } from "../";

const Modal = ({
  heading,
  subHeading,
  description,
  close,
  action,
  children,
  ...remaining
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.modal} {...remaining}>
        <h3>{heading}</h3>
        <h4>{subHeading}</h4>
        <p>{description}</p>
        {action && close && (
          <div className={styles.buttons}>
            <Button onClick={action?.handler}>{action?.label}</Button>
            <Button color="warning" onClick={close?.handler}>
              {close?.label}
            </Button>
          </div>
        )}
        <div className={styles.children}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
