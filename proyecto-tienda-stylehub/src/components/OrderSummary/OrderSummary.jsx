import { DELIVERY_OPTIONS } from "../../pages/Checkout/constants";
import { PRODUCT_CATEGORIES, SHIPPING_COST } from "../../utils/constants";
import {
  roundToDecimals,
  totalCost,
  totalQuantityItems,
} from "../../utils/logic";
import styles from "./OrderSummary.module.css";

export const OrderSummary = ({ shoppingCartProducts, orderData }) => {
  return (
    <div className={styles.orderSummary}>
      <ul className={styles.productList}>
        {shoppingCartProducts &&
          shoppingCartProducts.map((product) => (
            <li key={product.id} className={styles.productBox}>
              <div>
                <div className={styles.imageBox}>
                  <img
                    src={product.image}
                    alt="Product image"
                    className={
                      product.category === PRODUCT_CATEGORIES.electronics
                        ? styles.heightElectronics
                        : product.category === PRODUCT_CATEGORIES.jewelery
                        ? styles.heightJawelery
                        : styles.heightClothes
                    }
                  />
                  <span className={styles.quantity}>{product.quantity}</span>
                </div>
                <div className={styles.nameProductBox}>
                  <p className={styles.nameProduct}>{product.name}</p>
                </div>
              </div>
              <p className={styles.priceProduct}>S/. {product.price}</p>
            </li>
          ))}
      </ul>
      <div className={styles.productCostsBox}>
        <div className={styles.subTotalBox}>
          <div>
            <p>Subtotal ({totalQuantityItems(shoppingCartProducts)} items)</p>
            <p>S/. {roundToDecimals(totalCost(shoppingCartProducts), 2)}</p>
          </div>
          <div>
            {orderData.deliveryOption === DELIVERY_OPTIONS[0].text ? (
              <>
                <p>{orderData.deliveryOption}</p>
                <p>{`S/. ${SHIPPING_COST}.00`}</p>
              </>
            ) : orderData.deliveryOption === DELIVERY_OPTIONS[1].text ? (
              <>
                <p>{orderData.deliveryOption}</p>
                <p>FREE</p>
              </>
            ) : null}
          </div>
        </div>
        <div className={styles.totalBox}>
          <div>
            <p className={styles.totalText}>TOTAL</p>
            <p className={styles.taxtText}>Includes S/. 18.28 of taxes</p>
          </div>
          <div>
            <p>
              <span className={styles.textPEN}>PEN</span>{" "}
              <span className={styles.totalCost}>
                S/.{" "}
                {orderData.deliveryOption === DELIVERY_OPTIONS[0].text
                  ? roundToDecimals(
                      totalCost(shoppingCartProducts) + SHIPPING_COST,
                      2
                    )
                  : orderData.deliveryOption === DELIVERY_OPTIONS[1].text
                  ? roundToDecimals(totalCost(shoppingCartProducts), 2)
                  : null}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
