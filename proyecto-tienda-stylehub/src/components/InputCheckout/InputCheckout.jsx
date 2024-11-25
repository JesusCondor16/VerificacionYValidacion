import { useState } from "react";
import { validateInputCheckout } from "../../utils/validations/checkoutValidations";
import styles from "./InputCheckout.module.css";
import { INPUT_STATES } from "../../utils/constants";

export const InputCheckout = ({
  placeholder,
  name,
  handleInput,
  isSelect,
  children,
}) => {
  const [inputValidated, setInputValidated] = useState(INPUT_STATES.INITIAL);

  // Validar el input al perder el foco
  const handleBlur = ({ target }) => {
    const { name, value } = target;
    const resultInputValidated = validateInputCheckout({ name, value });

    if (!resultInputValidated.success) {
      setInputValidated(INPUT_STATES.ERROR);
    } else if (resultInputValidated.success) {
      setInputValidated(INPUT_STATES.SUCCESS);
    }
  };

  return (
    <div className={styles.inputBox}>
      {isSelect ? (
        <select
          name={name}
          id=""
          className={`${styles.input} ${
            inputValidated === INPUT_STATES.SUCCESS
              ? styles.inputValidated
              : inputValidated === INPUT_STATES.ERROR
              ? styles.inputNotValidated
              : ""
          }`}
          onChange={handleInput}
          onBlur={handleBlur}
        >
          {children}
        </select>
      ) : (
        <input
          className={`${styles.input} ${
            inputValidated === INPUT_STATES.SUCCESS
              ? styles.inputValidated
              : inputValidated === INPUT_STATES.ERROR
              ? styles.inputNotValidated
              : ""
          }`}
          type="text"
          placeholder={placeholder}
          name={name}
          onChange={handleInput}
          onBlur={handleBlur}
        />
      )}
      {inputValidated === INPUT_STATES.SUCCESS ? (
        <div
          className={`${styles.messageCompleteInput} ${styles.successColor}`}
        >
          Field completed successfully.
        </div>
      ) : inputValidated === INPUT_STATES.ERROR ? (
        <div className={`${styles.messageCompleteInput} ${styles.errorColor}`}>
          Please complete the field correctly.
        </div>
      ) : null}
    </div>
  );
};
