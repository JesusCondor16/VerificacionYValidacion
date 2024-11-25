import { useState } from "react";
import styles from "./OptionsBox.module.css";

export const OptionsBox = ({
  dataOptions,
  name,
  onChange,
  defaultOption,
  changeDeliveryTypeSelection,
}) => {
  const [selectedOption, setSelectedOption] = useState(defaultOption);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    onChange(event);
    if (changeDeliveryTypeSelection) changeDeliveryTypeSelection();
  };

  return (
    <div className={styles.optionsBox}>
      {dataOptions.map((option, index) => {
        const { text, icon, additionalData } = option;

        return (
          <div key={index}>
            <label
              className={`${styles.option} ${
                selectedOption === text ? styles.selectedOption : ""
              }`}
            >
              <div className={styles.optionInputBox}>
                <input
                  className={`${styles.input}`}
                  type="radio"
                  name={name}
                  value={text}
                  onChange={handleOptionChange}
                  checked={selectedOption === text}
                />
                <p className={styles.optionText}>{text}</p>
              </div>
              <span
                className={
                  selectedOption === text
                    ? `${styles.iconOption} ${styles.iconOptionSelected}`
                    : styles.iconOption
                }
              >
                {icon}
              </span>
            </label>
            {additionalData && (
              <div
                className={
                  selectedOption === text
                    ? `${styles.additionalDataBox} ${styles.visible}`
                    : styles.additionalDataBox
                }
              >
                <span className={styles.iconAdditional}>
                  {additionalData.icon}
                </span>
                <p className={styles.additionalOptionText}>
                  {additionalData.message}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
