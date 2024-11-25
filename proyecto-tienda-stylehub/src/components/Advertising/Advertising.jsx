import styles from "./Advertising.module.css";
import { PiShoppingCart } from "react-icons/pi";
import { IoStorefrontOutline } from "react-icons/io5";

export const Advertising = () => {
  return (
    <div className={styles.advertising}>
      <PiShoppingCart className={styles.icon} />
      <div className={styles.content}>
        <p>COMPRA ONLINE</p>
        <p>AND PICK UP FOR FREE IN OUR STORES</p>
      </div>
      <IoStorefrontOutline className={styles.icon} />
    </div>
  );
};
