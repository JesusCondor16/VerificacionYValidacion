import styles from "./Checkout.module.css";
import { OptionsBox } from "../../components/OptionsBox/OptionsBox";
import { useContext, useEffect, useState } from "react";
import { validateCheckout } from "../../utils/validations/checkoutValidations";
import { checkoutValidationsModal } from "../../utils/notifications/modals";
import {
  DEFAULT_SELECT_VALUE,
  INPUT_NAMES,
  URL_SERVER,
} from "../../utils/constants";
import { InputCheckout } from "../../components/InputCheckout/InputCheckout";
import { ShoppingCartContext } from "../../context/ShoppingCartContext/ShoppingCartContext";
import { OrderSummary } from "../../components/OrderSummary/OrderSummary";
import { useNavigate } from "react-router-dom";
import { DELIVERY_OPTIONS, PAYMENT_OPTIONS } from "./constants";
import { usePost } from "../../hooks/usePost";
import { Loader } from "../../components/Loader/Loader";
import { ProductsContext } from "../../context/ProductsContext/ProductsContext";
import { FaArrowLeft } from "react-icons/fa";

export const Checkout = () => {
  console.log("Estoy en Checkout");
  const {
    postData: postPaymentPaypal,
    responsePost: responsePaymentPaypal,
    loadingPost: loadingPaymentPaypal,
    errorPost: errorPaymentPaypal,
  } = usePost();

  const {
    postData: postPayment,
    responsePost: responsePayment,
    loadingPost: loadingPayment,
    errorPost: errorPayment,
  } = usePost();

  const { shoppingCartProducts } = useContext(ShoppingCartContext);
  const { refetchProducts } = useContext(ProductsContext);

  const navigate = useNavigate();

  const [checkoutForm, setCheckoutForm] = useState({
    [INPUT_NAMES.EMAIL]: null,
    [INPUT_NAMES.DELIVERY_OPTION]: DELIVERY_OPTIONS[0].text,
    [INPUT_NAMES.COUNTRY]: null,
    [INPUT_NAMES.FIRST_NAME]: null,
    [INPUT_NAMES.LAST_NAME]: null,
    [INPUT_NAMES.DNI]: null,
    [INPUT_NAMES.ADDRESS]: null,
    [INPUT_NAMES.DEPARTMENT]: null,
    [INPUT_NAMES.PROVINCE]: null,
    [INPUT_NAMES.DISTRICT]: null,
    [INPUT_NAMES.CELL_PHONE]: null,
    [INPUT_NAMES.PAYMENT_OPTION]: PAYMENT_OPTIONS[0].text,
  });

  const changeDeliveryTypeSelection = () => {
    setCheckoutForm((prev) => ({
      ...prev,
      [INPUT_NAMES.COUNTRY]: null,
      [INPUT_NAMES.ADDRESS]: null,
      [INPUT_NAMES.DEPARTMENT]: null,
      [INPUT_NAMES.PROVINCE]: null,
      [INPUT_NAMES.DISTRICT]: null,
    }));
  };

  const handleInput = ({ target }) => {
    const { name, value } = target;

    setCheckoutForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const sendForm = async (event) => {
    event.preventDefault();

    const checkoutValidated = validateCheckout(
      checkoutForm,
      checkoutForm[INPUT_NAMES.DELIVERY_OPTION]
    );

    if (!checkoutValidated.success) {
      checkoutValidationsModal({
        title: "Error en el ingreso de datos",
        text: "Porfavor, complete correctamente todos los campos.",
        icon: "warning",
        confirmButtonColor: "black",
      });

      return;
    }

    setCheckoutForm(checkoutValidated.data);

    if (checkoutForm[INPUT_NAMES.PAYMENT_OPTION] === PAYMENT_OPTIONS[0].text) {
      try {
        await postPaymentPaypal(`${URL_SERVER}/payment/create-order`, {
          productList: shoppingCartProducts,
          checkoutData: checkoutValidated.data,
        });

        console.log(
          "Estoy haciendo un POST a mi backend para hacer el pago con Paypal"
        );
      } catch (error) {
        console.error("", error.message);
      }
    } else {
      try {
        await postPayment(`${URL_SERVER}/order`, {
          productList: shoppingCartProducts,
          checkoutData: checkoutValidated.data,
        });
      } catch (error) {
        console.error("", error.message);
      }
    }
  };

  // useEffect para el PAGO con YAPE o DEPÓSITO
  useEffect(() => {
    if (!loadingPayment && responsePayment) {
      if (!responsePayment.success) {
        alert("Ocurrió un problema. Su pedido no pudo realizarse.");
        return;
      }

      refetchProducts();
      navigate("/order-completion", { state: responsePayment.data });
    }
  }, [responsePayment]);

  // useEffect para el PAGO con PAYPAL
  useEffect(() => {
    if (!loadingPaymentPaypal && responsePaymentPaypal) {
      if (!responsePaymentPaypal.links[1]) {
        alert("Ocurrió un problema. No se pudo conectar con Paypal.");
        return;
      }

      window.location.href = responsePaymentPaypal.links[1].href;
    }
  }, [responsePaymentPaypal]);

  return loadingPaymentPaypal || loadingPayment ? (
    <Loader />
  ) : (
    <>
      <div className={styles.checkoutBox}>
        <div className={styles.orderFormBox}>
          <div className={styles.boxTitle}>
            <FaArrowLeft
              className={styles.backButton}
              onClick={() => navigate("/")}
            />
            <h1 className={styles.title}>STYLE HUB</h1>
          </div>
          <form className={styles.orderForm} onSubmit={sendForm}>
            <section className={styles.conctactBox}>
              <h2 className={styles.sectionTitle}>Contact</h2>

              <InputCheckout
                placeholder="Email"
                name={INPUT_NAMES.EMAIL}
                handleInput={handleInput}
                messageCompleteInput="Please enter a valid email address."
              />

              <div className={styles.namesBox}>
                <InputCheckout
                  placeholder="First name"
                  name={INPUT_NAMES.FIRST_NAME}
                  handleInput={handleInput}
                />
                <InputCheckout
                  placeholder="Last name"
                  name={INPUT_NAMES.LAST_NAME}
                  handleInput={handleInput}
                />
              </div>

              <InputCheckout
                placeholder="DNI"
                name={INPUT_NAMES.DNI}
                handleInput={handleInput}
              />

              <InputCheckout
                placeholder="Cell phone"
                name={INPUT_NAMES.CELL_PHONE}
                handleInput={handleInput}
              />
            </section>
            {/* Delivery */}
            <section className={styles.deliveryBox}>
              <h2 className={styles.sectionTitle}>Delivery</h2>

              <OptionsBox
                name={INPUT_NAMES.DELIVERY_OPTION}
                dataOptions={DELIVERY_OPTIONS}
                onChange={handleInput}
                defaultOption={DELIVERY_OPTIONS[0].text}
                changeDeliveryTypeSelection={changeDeliveryTypeSelection}
              />

              {checkoutForm[INPUT_NAMES.DELIVERY_OPTION] ===
              DELIVERY_OPTIONS[0].text ? (
                <>
                  <InputCheckout
                    name={INPUT_NAMES.COUNTRY}
                    handleInput={handleInput}
                    isSelect={true}
                  >
                    <option value={DEFAULT_SELECT_VALUE}>
                      Select a country
                    </option>
                    <option value="Perú">Perú</option>
                  </InputCheckout>
                  <InputCheckout
                    placeholder="Address"
                    name={INPUT_NAMES.ADDRESS}
                    handleInput={handleInput}
                  />
                  <div className={styles.locationsBox}>
                    <InputCheckout
                      name={INPUT_NAMES.DEPARTMENT}
                      handleInput={handleInput}
                      isSelect={true}
                    >
                      <option value={DEFAULT_SELECT_VALUE}>
                        Select a department
                      </option>
                      <option value="Lima">Lima</option>
                    </InputCheckout>

                    <InputCheckout
                      name={INPUT_NAMES.PROVINCE}
                      handleInput={handleInput}
                      isSelect={true}
                    >
                      <option value={DEFAULT_SELECT_VALUE}>
                        Select a province
                      </option>
                      <option value="Callao">Callao</option>
                    </InputCheckout>

                    <InputCheckout
                      name={INPUT_NAMES.DISTRICT}
                      handleInput={handleInput}
                      isSelect={true}
                    >
                      <option value={DEFAULT_SELECT_VALUE}>
                        Select a district
                      </option>
                      <option value="Ventanilla">Ventanilla</option>
                    </InputCheckout>
                  </div>
                </>
              ) : (
                <div className={styles.storeBranchBox}>
                  <h3 className={styles.storeBrachTitle}>Store branch</h3>
                  <div className={styles.storeBranchDataBox}>
                    <div className={styles.storeBranchData}>
                      <h4 className={styles.storeBranchTitle}>
                        StyleHub Store, Gamarra (Lima)
                      </h4>
                      <p className={styles.storeBranchAddress}>
                        Av. Emilio Caveneda 151, Miraflores, Lima PE-LMA
                      </p>
                    </div>
                    <p>
                      <strong>GRATIS</strong>
                    </p>
                  </div>
                </div>
              )}
            </section>
            {/* Payment */}
            <section className={styles.paymentBox}>
              <h2 className={styles.sectionTitle}>Payment</h2>

              <OptionsBox
                name={INPUT_NAMES.PAYMENT_OPTION}
                dataOptions={PAYMENT_OPTIONS}
                onChange={handleInput}
                defaultOption={PAYMENT_OPTIONS[0].text}
              />
            </section>
            {/* Pay now o Finalize Order */}
            <div>
              <button className={styles.finalizeOrderButton}>
                {checkoutForm[INPUT_NAMES.PAYMENT_OPTION] ===
                PAYMENT_OPTIONS[0].text
                  ? "Pay now"
                  : "Finalize Order"}
              </button>
            </div>
          </form>
        </div>
        <div className={styles.orderSummaryBox}>
          <OrderSummary
            shoppingCartProducts={shoppingCartProducts}
            orderData={checkoutForm}
          />
        </div>
      </div>
    </>
  );
};
