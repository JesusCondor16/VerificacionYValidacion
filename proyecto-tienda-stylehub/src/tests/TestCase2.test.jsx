import { describe, it, expect, vi } from "vitest";
import { INPUT_NAMES, URL_SERVER } from "../utils/constants";
import { DELIVERY_OPTIONS, PAYMENT_OPTIONS } from "../pages/Checkout/constants";
import { usePost } from "../hooks/usePost";
import { validateCheckout } from "../utils/validations/checkoutValidations";
import { checkoutValidationsModal } from "../utils/notifications/modals";

// Mock del hook usePost
vi.mock("../hooks/usePost", () => ({
  usePost: vi.fn(() => ({
    postData: vi.fn(),
    responsePost: null,
    loadingPost: false,
    errorPost: null,
  })),
}));

// Datos de prueba
const validCheckoutData = {
  [INPUT_NAMES.EMAIL]: "usuario@correo.com",
  [INPUT_NAMES.DELIVERY_OPTION]: DELIVERY_OPTIONS[0].text,
  [INPUT_NAMES.COUNTRY]: "Perú",
  [INPUT_NAMES.FIRST_NAME]: "Jhunior",
  [INPUT_NAMES.LAST_NAME]: "Ccora",
  [INPUT_NAMES.DNI]: "12345678",
  [INPUT_NAMES.ADDRESS]: "Av. Principal 123",
  [INPUT_NAMES.DEPARTMENT]: "Lima",
  [INPUT_NAMES.PROVINCE]: "Lima",
  [INPUT_NAMES.DISTRICT]: "Miraflores",
  [INPUT_NAMES.CELL_PHONE]: "987654321",
  [INPUT_NAMES.PAYMENT_OPTION]: PAYMENT_OPTIONS[0].text, // Simulamos que se seleccionó Paypal
};

describe("Envía datos correctos al backend al validar el formulario", () => {
  it("Debe enviar los datos al backend usando postPaymentPaypal si el método de pago es Paypal", async () => {
    const { postData: postPaymentPaypal } = usePost();

    // Simular el envío de formulario
    const event = { preventDefault: vi.fn() };
    const sendForm = async (event) => {
      event.preventDefault();

      // Simulamos que los datos son válidos
      const checkoutValidated = validateCheckout(
        validCheckoutData,
        DELIVERY_OPTIONS[0].text
      );

      if (!checkoutValidated.success) {
        checkoutValidationsModal({
          title: "Error en el ingreso de datos",
          text: "Por favor, complete correctamente todos los campos.",
          icon: "warning",
          confirmButtonColor: "black",
        });

        return; // Detener el flujo si la validación falla
      }

      await postPaymentPaypal(`${URL_SERVER}/payment/create-order`, {
        productList: [
          {
            name: "producto1",
          },
          { name: "producto2" },
        ], // Simulación de productos en el carrito
        checkoutData: checkoutValidated.data,
      });
    };

    // Llamada a sendForm
    await sendForm(event);

    // Verificar que preventDefault fue llamado
    expect(event.preventDefault).toHaveBeenCalled();

    // Verificar que se realizó el POST con los datos esperados
    expect(postPaymentPaypal).toHaveBeenCalledWith(
      `${URL_SERVER}/payment/create-order`,
      {
        productList: [
          {
            name: "producto1",
          },
          { name: "producto2" },
        ],
        checkoutData: validCheckoutData,
      }
    );
  });
});
