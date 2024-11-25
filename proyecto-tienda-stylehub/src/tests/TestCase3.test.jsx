import { validateCheckout } from "../utils/validations/checkoutValidations";
import { checkoutValidationsModal } from "../utils/notifications/modals";
import { DELIVERY_OPTIONS, PAYMENT_OPTIONS } from "../pages/Checkout/constants";

// Importar las funciones de Vitest
import { describe, it, expect, vi } from "vitest";
import { INPUT_NAMES } from "../utils/constants";

// Mock de la función del modal
vi.mock("../utils/notifications/modals", () => ({
  checkoutValidationsModal: vi.fn(),
}));

// Datos de prueba válidos
const validCheckoutData = {
  email: "usuario@ejemplo.com",
  deliveryOption: "Shipping",
  country: "Perú",
  firstName: "Jhunior",
  lastName: "Ccora Quispe",
  dni: "12345678",
  address: "Av. Principal 123",
  department: "Lima",
  province: "Callao",
  district: "Ventanilla",
  cellPhone: "987654321",
  paymentOption: "Yape",
};

// Datos de prueba inválidos
// const invalidCheckoutData = {
//   email: "usuario.com", // Email inválido
//   deliveryOption: "Shipping",
//   country: "notValid", // Valor predeterminado no válido
//   firstName: "Jhunior",
//   lastName: "Pérez",
//   dni: "abc12345", // No cumple con la regex
//   address: "",
//   department: "notValid",
//   province: "notValid",
//   district: "notValid",
//   cellPhone: "123456", // No cumple con la regex
//   paymentOption: "",
// };

const invalidCheckoutData = {
  [INPUT_NAMES.EMAIL]: "usuario.com", // Email inválido
  [INPUT_NAMES.DELIVERY_OPTION]: DELIVERY_OPTIONS[0].text,
  [INPUT_NAMES.COUNTRY]: "notValid", // Valor predeterminado no válido
  [INPUT_NAMES.FIRST_NAME]: "Jhunior",
  [INPUT_NAMES.LAST_NAME]: "Ccora",
  [INPUT_NAMES.DNI]: "abc12345", // No cumple con la regex
  [INPUT_NAMES.ADDRESS]: "Av. Principal 123",
  [INPUT_NAMES.DEPARTMENT]: "Lima",
  [INPUT_NAMES.PROVINCE]: "Callao",
  [INPUT_NAMES.DISTRICT]: "Ventanilla",
  [INPUT_NAMES.CELL_PHONE]: "98765432", // No cumple con la regex
  [INPUT_NAMES.PAYMENT_OPTION]: PAYMENT_OPTIONS[0].text, // Simulamos que se seleccionó Paypal
};

describe("Validar que el sistema no procese pagos con datos incompletos o inválidos", () => {
  it("Debe mostrar un modal de error y detener el flujo si los datos son inválidos", async () => {
    // Simula el evento de formulario
    const event = { preventDefault: vi.fn() };

    // Mocks para las funciones utilizadas
    const sendForm = async (event) => {
      event.preventDefault(); // Evitar que la página se recargue

      const checkoutValidated = validateCheckout(
        invalidCheckoutData,
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

      // Aquí seguiría el código si la validación fuera exitosa
    };

    // Llamada a sendForm
    await sendForm(event);

    // Verificar que el modal haya sido llamado
    expect(checkoutValidationsModal).toHaveBeenCalled();
    expect(checkoutValidationsModal).toHaveBeenCalledWith({
      title: "Error en el ingreso de datos",
      text: "Por favor, complete correctamente todos los campos.",
      icon: "warning",
      confirmButtonColor: "black",
    });

    // Verificar que preventDefault fue llamado, para asegurarnos que la recarga de la página fue detenida
    // expect(event.preventDefault).toHaveBeenCalled();
  });
});

// import { validateCheckout } from "../utils/validations/checkoutValidations";
// import { checkoutValidationsModal } from "../utils/notifications/modals";
// import { DELIVERY_OPTIONS } from "../pages/Checkout/constants";

// // Importar las funciones de Vitest
// import { describe, it, expect, vi } from "vitest";

// // Mock de la función del modal
// vi.mock("../utils/notifications/modals", () => ({
//   checkoutValidationsModal: vi.fn(),
// }));

// // Datos de prueba
// const validCheckoutData = {
//   email: "usuario@ejemplo.com",
//   deliveryOption: "Shipping",
//   country: "Perú",
//   firstName: "Juan",
//   lastName: "Pérez",
//   dni: "12345678",
//   address: "Av. Principal 123",
//   department: "Lima",
//   province: "Lima",
//   district: "Miraflores",
//   cellPhone: "987654321",
//   paymentOption: "Tarjeta de Crédito",
// };

// const invalidCheckoutData = {
//   email: "usuario.com", // Email inválido
//   deliveryOption: "Shipping",
//   country: "notValid", // Valor predeterminado no válido
//   firstName: "",
//   lastName: "Pérez",
//   dni: "abc12345", // No cumple con la regex
//   address: "",
//   department: "notValid",
//   province: "notValid",
//   district: "notValid",
//   cellPhone: "123456", // No cumple con la regex
//   paymentOption: "",
// };

// // Pruebas
// describe("Validar que el sistema no procese pagos con datos incompletos o inválidos", () => {
//   it("Debe mostrar un modal de error si los datos son inválidos", () => {
//     const result = validateCheckout(
//       invalidCheckoutData,
//       DELIVERY_OPTIONS[0].text
//     );

//     expect(result.success).toBe(false); // La validación debe fallar
//   });

//   // Esto será cuando queramos validar datos correctos
//   // it("Debe permitir el avance si los datos son válidos", () => {
//   //   const result = validateCheckout(
//   //     validCheckoutData,
//   //     DELIVERY_OPTIONS[0].text
//   //   );

//   //   expect(result.success).toBe(true); // La validación debe pasar
//   //   expect(checkoutValidationsModal).not.toHaveBeenCalled(); // No debe mostrar el modal
//   // });
// });
