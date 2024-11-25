import { useContext, useEffect, useState } from "react";
import { OrderSummary } from "../../components/OrderSummary/OrderSummary";
import { ShoppingCartContext } from "../../context/ShoppingCartContext/ShoppingCartContext";
import styles from "./OrderCompletion.module.css";
import { BsCartCheck } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { DELIVERY_OPTIONS, PAYMENT_OPTIONS } from "../Checkout/constants";
import { roundToDecimals, totalCost } from "../../utils/logic";
import { SHIPPING_COST, URL_SERVER } from "../../utils/constants";
import { useManualGet } from "../../hooks/useManualGet";
import { Loader } from "../../components/Loader/Loader";
import { ProductsContext } from "../../context/ProductsContext/ProductsContext";

export const OrderCompletion = () => {
  const { removeAllShoppingCart } = useContext(ShoppingCartContext);
  const { refetchProducts } = useContext(ProductsContext);

  const { search: queryParameters, state: orderInfo } = useLocation();

  const { getData, responseGet, loadingGet, errorGet } = useManualGet(); // Uso -> Cuando el pago fue por Paypal
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    if (orderInfo && !orderData) {
      setOrderData(orderInfo);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(queryParameters);
    const idOrder = params.get("idOrder");

    if (idOrder) {
      getData(`${URL_SERVER}/order/${idOrder}`);
    } else {
      // Borrar esto
      return;
    }
  }, []);

  useEffect(() => {
    if (responseGet) {
      if (responseGet.success) {
        setOrderData(responseGet.data);
        refetchProducts();
      } else {
        alert("Ocurrió un error tu pedido NO ha sido registrado.");
      }
    }
  }, [responseGet]);

  if (!orderInfo) {
    if (loadingGet) return <Loader paypal={true} />;
  }

  if (!orderData) return;

  return (
    <div className={styles.orderCompletionBox}>
      <div className={styles.orderCompletionDataBox}>
        <h1 className={styles.storeName}>STYLE HUB</h1>

        <div className={styles.thankyouBox}>
          <BsCartCheck className={styles.checkIcon} />
          <p>¡Gracias, {orderData.firstName}!</p>
        </div>

        <div className={styles.orderReservedBox}>
          {orderData.deliveryOption === PAYMENT_OPTIONS[0].text ? (
            <>
              <h2>Your order has already been reserved</h2>
              <p>
                You must pay for your order within the next 24 hours at the
                latest, otherwise your order will be cancelled.
              </p>
            </>
          ) : (
            <>
              <h2>Your order has been paid successfully.</h2>
              <p>
                Thank you very much for your purchase, below you can see the
                summary of your order.
              </p>
            </>
          )}

          <div className={styles.paymentMethodDataBox}>
            {orderData.paymentOption === PAYMENT_OPTIONS[1].text ? (
              <>
                <h3>Yape number</h3>
                <p>936128801</p>
              </>
            ) : orderData.paymentOption === PAYMENT_OPTIONS[2].text ? (
              <>
                <h3>BCP account</h3>
                <p>Account: 191-9876543-2-10</p>
                <p>CCI: 00112233445566778899</p>
                <p>In the name of: Style Hub S.A.C.</p>
              </>
            ) : null}
          </div>
        </div>

        <div className={styles.orderDetailsBox}>
          <h2>Order details</h2>
          <div className={styles.orderDetailsDataBox}>
            <div>
              <div className={styles.sectionOrderDetails}>
                <h3>Contact information</h3>
                <p>{orderData.firstName}</p>
                <p>{orderData.lastName}</p>
                <p>{orderData.dni}</p>
                <p>{orderData.email}</p>
                <p>{orderData.cellPhone}</p>
              </div>

              <div className={styles.sectionOrderDetails}>
                <h3>Delivery Type</h3>
                <p>{orderData.deliveryOption}</p>
              </div>
            </div>

            <div>
              {orderData.deliveryOption === DELIVERY_OPTIONS[0].text && (
                <div className={styles.sectionOrderDetails}>
                  <h3>Dirección de envío</h3>
                  <p>{orderData.country}</p>
                  <p>{orderData.department}</p>
                  <p>{orderData.province}</p>
                  <p>{orderData.district}</p>
                </div>
              )}

              <div className={styles.sectionOrderDetails}>
                <h3>Payment Method</h3>
                <p>
                  {orderData.paymentOption}: S/.{" "}
                  {orderData.deliveryOption === DELIVERY_OPTIONS[0].text
                    ? roundToDecimals(totalCost(orderData.productList), 2) +
                      SHIPPING_COST
                    : orderData.deliveryOption === DELIVERY_OPTIONS[1].text
                    ? roundToDecimals(totalCost(orderData.productList), 2)
                    : null}
                </p>
              </div>

              <div className={styles.sectionOrderDetails}>
                <h3>Date of Payment</h3>
                <p>{orderData.orderDate}</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.finalOptionsBox}>
          <Link
            to="https://wa.me/936128801"
            target="_blank"
            className={styles.helpLink}
          >
            Do you need help? Please contact us.
          </Link>

          <Link
            to="/"
            className={styles.backButton}
            onClick={removeAllShoppingCart}
          >
            Return to the store
          </Link>
        </div>
      </div>
      <div className={styles.orderSummaryBox}>
        <OrderSummary
          shoppingCartProducts={orderData.productList}
          orderData={orderData}
        />
      </div>
    </div>
  );
};
