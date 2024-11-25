import { useContext, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { FaEye } from "react-icons/fa6";
import styles from "./ProductCard.module.css";
import { useNavigate } from "react-router-dom";
import { ShoppingCartContext } from "../../context/ShoppingCartContext/ShoppingCartContext";
import { Toast as addOrRemoveProductToast } from "../../utils/notifications/toasts";
import { PRODUCT_CATEGORIES } from "../../utils/constants";

export const ProductCard = ({ id, image, category, name, price }) => {
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);
  const { shoppingCartProducts, addShoppingCart } =
    useContext(ShoppingCartContext);

  const cartProductsExist = () => {
    return shoppingCartProducts.some((product) => id === product.id);
  };

  const addProductCart = () => {
    if (cartProductsExist()) {
      addOrRemoveProductToast({
        toast: true,
        position: "bottom-left",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        icon: "error",
        title: "Este producto ya se encuentra en el carrito",
      });
    } else {
      addShoppingCart({ id, name, image, price, category });
      addOrRemoveProductToast({
        toast: true,
        position: "bottom-left",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        icon: "success",
        title: "Producto agregado al carrito",
      });
    }
  };

  return (
    <div
      className={styles.boxProduct}
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
    >
      <div className={styles.boxImage}>
        <img
          src={image}
          alt={name}
          className={`${
            category === PRODUCT_CATEGORIES.jewelery
              ? styles.heightImageJewelries
              : category === PRODUCT_CATEGORIES.electronics
              ? styles.heightImageElectronics
              : styles.heightImageClothes
          }`}
        />
      </div>

      <div className={styles.boxText}>
        <p className={styles.productCategory}>{category}</p>
        <h2 className={styles.productName}>{name}</h2>
        <p className={styles.productPrice}>S/. {price}</p>
      </div>

      <div
        className={
          showOptions
            ? styles.boxOptions
            : `${styles.boxOptions} ${styles.hideBox}`
        }
      >
        <button
          className={`${styles.addButton} ${styles.optionButton} ${
            cartProductsExist() ? styles.productDisabled : ""
          }`}
          onClick={addProductCart}
        >
          <IoMdAdd />
        </button>
        <button
          className={`${styles.detailsButton} ${styles.optionButton}`}
          onClick={() => navigate(`/product/${id}`)}
        >
          <FaEye />
        </button>
      </div>
    </div>
  );
};
