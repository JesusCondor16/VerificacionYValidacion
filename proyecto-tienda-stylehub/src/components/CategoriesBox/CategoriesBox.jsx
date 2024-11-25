import styles from "./CategoriesBox.module.css";
import { CategoryBox } from "../CategoryBox/CategoryBox";
import { PRODUCT_CATEGORIES } from "../../utils/constants";

export const CategoriesBox = ({ categoryList }) => {
  return (
    <div className={styles.sectionBoxCategories}>
      <h2 className={styles.titleBoxCategories}>EXPLORE THE BEST WITH US</h2>
      <div className={styles.boxCategories}>
        {categoryList.map((category, index) => (
          <CategoryBox
            key={index}
            title={category.title}
            image={category.image}
          />
        ))}
      </div>

      <div className={styles.boxButtonStart}>
        <p>Don't wait any longer, start now!</p>
        <a href={`#${PRODUCT_CATEGORIES.menClothing}`}>Start now !</a>
      </div>
    </div>
  );
};
