import { useParams } from "react-router-dom";
import styles from "./ProductDetails.module.css";
import { useContext } from "react";
import { ShoppingCartContext } from "../../context/ShoppingCartContext/ShoppingCartContext";
import { ProductsContext } from "../../context/ProductsContext/ProductsContext";
import { Loader } from "../../components/Loader/Loader";
import { Toast as addOrRemoveProductToast } from "../../utils/notifications/toasts";

export const ProductDetails = () => {
  const { id } = useParams();

  const {
    responseGet: responseProducts,
    loadingGet: loadingProducts,
    errorGet: errorProducts,
  } = useContext(ProductsContext);

  const productData = responseProducts.find(
    (product) => product.id === Number(id)
  );

  const { addShoppingCart, shoppingCartProducts } =
    useContext(ShoppingCartContext);

  const cartProductsExist = () => {
    return shoppingCartProducts.some((product) => Number(id) === product.id);
  };

  const addProductCart = () => {
    addShoppingCart(productData);

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

  return loadingProducts ? (
    <Loader />
  ) : (
    <div className={styles.boxProductDetails}>
      <div className={styles.boxProduct}>
        <div className={styles.boxImage}>
          <img src={productData.image} alt={productData.name} />
        </div>
        <div className={styles.boxText}>
          <h2 className={styles.productTitle}>{productData.name}</h2>
          <p className={styles.productPrice}>$ {productData.price}</p>
          <p className={styles.productQuantity}>
            {productData.showQuantity} available
          </p>
          <p className={styles.productDescription}>{productData.description}</p>
          <button
            onClick={addProductCart}
            className={`${styles.addButton} ${
              cartProductsExist() ? styles.productDisabled : ""
            }`}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};
