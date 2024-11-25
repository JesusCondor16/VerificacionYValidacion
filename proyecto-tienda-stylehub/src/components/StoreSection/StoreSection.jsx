import { ProductCard } from "../ProductCard/ProductCard";
import styles from "./StoreSection.module.css";

export const StoreSection = ({
  id,
  productList,
  sectionTitle,
  backgroundImage,
}) => {
  return (
    <div id={id} className={styles.boxStoreSection}>
      <img
        className={styles.backgroundImage}
        src={backgroundImage}
        alt="Background image"
      />
      <h2 className={styles.sectionTitle}>{sectionTitle}</h2>
      <div className={styles.boxProducts}>
        {productList.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            category={product.category}
            image={product.image}
            name={product.name}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
};
