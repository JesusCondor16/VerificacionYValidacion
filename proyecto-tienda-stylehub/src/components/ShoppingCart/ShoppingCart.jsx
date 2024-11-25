import { FaArrowRight } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import styles from "./ShoppingCart.module.css";
import { ShoppingCartProduct } from "../ShoppingCartProduct/ShoppingCartProduct";
import { useContext } from "react";
import { ShoppingCartContext } from "../../context/ShoppingCartContext/ShoppingCartContext";
import {
  roundToDecimals,
  totalCost,
  totalQuantityItems,
} from "../../utils/logic";
import {
  noProductsCartExist,
  removeAllProductsCartModal,
} from "../../utils/notifications/modals";
import { useNavigate } from "react-router-dom";

export const ShoppingCart = ({ showShoppingCart, appearShoppingCart }) => {
  const { shoppingCartProducts, removeAllShoppingCart } =
    useContext(ShoppingCartContext);

  const navigate = useNavigate();

  const productsExistCart = shoppingCartProducts.length > 0;

  const confirmPurchase = () => {
    if (productsExistCart) {
      console.log("CARRITO DE COMPRAS: ", shoppingCartProducts);
      navigate("/checkout");
    } else {
      noProductsCartExist();
    }
  };

  const removeAllProductsCart = () => {
    if (productsExistCart) {
      removeAllProductsCartModal({
        title: "¿Está seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, remuevelos!",
        cancelButtonText: "Cancelar",
        title2: "¡Productos removidos!",
        text2: "Se han removido todos los productos del carrito",
        icon2: "success",
        confirmButtonColor2: "black",
        removeAllShoppingCart,
      });
    } else {
      noProductsCartExist();
    }
  };

  return (
    <div
      className={
        showShoppingCart
          ? styles.boxShoppingCart
          : `${styles.boxShoppingCart} ${styles.hideShoppingCart}`
      }
    >
      <div className={styles.boxQuantityProducts}>
        <p className={styles.quantityProducts}>
          SHOPPING CART {`(${totalQuantityItems(shoppingCartProducts)})`}
        </p>
        <FaArrowRight
          onClick={appearShoppingCart}
          className={styles.backButton}
        />
      </div>
      <div className={styles.boxProducts}>
        {shoppingCartProducts &&
          shoppingCartProducts.map((product) => (
            <ShoppingCartProduct
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.image}
              price={product.price}
              quantity={product.quantity}
              category={product.category}
            />
          ))}
      </div>
      <div className={styles.boxFinalCartResult}>
        <div>
          <p className={styles.totalCost}>
            TOTAL: S/. {roundToDecimals(totalCost(shoppingCartProducts), 2)}
          </p>
          <button
            onClick={removeAllProductsCart}
            className={styles.deleteAllButton}
          >
            <FaTrashAlt />
          </button>
        </div>
        <div>
          <button
            onClickCapture={() => {
              confirmPurchase();
              appearShoppingCart();
            }}
            className={styles.buyButton}
          >
            Buy products
          </button>
        </div>
      </div>
    </div>
  );
};
