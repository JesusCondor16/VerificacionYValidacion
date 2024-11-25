import { useState } from "react";
import styles from "./CategoryBox.module.css";

export const CategoryBox = ({ image, title }) => {
  const [activeOptions, setActiveOptions] = useState(false);

  return (
    <a
      className={styles.boxCategoryImage}
      onMouseEnter={() => setActiveOptions(true)}
      onMouseLeave={() => setActiveOptions(false)}
      href={`#${title.toLowerCase()}`}
    >
      <img className={styles.categoryImage} src={image} alt={title} />
      <div className={styles.boxCategoryTitle}>
        <p
          className={
            activeOptions
              ? `${styles.categoryTitle} ${styles.moveCategoryTitle}`
              : styles.categoryTitle
          }
        >
          {title}
        </p>
        <span
          className={
            activeOptions
              ? `${styles.buttonSeeMore} ${styles.showButtonSeeMore}`
              : styles.buttonSeeMore
          }
        >
          Ver más
        </span>
      </div>
    </a>
  );
};
