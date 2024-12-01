
## Pruebas Funcionales
Las pruebas funcionales realizadas validan dos aspectos clave del sistema:

1. Envío de datos correctos al backend (TestCase2.test.jsx)
2. Validación de datos incompletos o inválidos en el formulario de pago (TestCase3.test.jsx)

### 1. Envío de datos correctos al backend

Archivo de testeo: TestCase2.test.jsx

Descripción:

Esta prueba asegura que los datos del formulario de checkout, cuando son válidos, se envíen correctamente al backend utilizando el método postPaymentPaypal.

Pasos de la prueba:

-Simular el envío de un formulario con datos válidos.

-Verificar que la función preventDefault del evento fue llamada para evitar la recarga de la página.

-Validar que los datos fueron enviados correctamente al endpoint /payment/create-order del servidor con la estructura esperada.

Objetivo:

-Garantizar que el sistema pueda procesar pedidos y enviar datos correctos al backend.

Código clave:
                expect(postPaymentPaypal).toHaveBeenCalledWith(
                  `${URL_SERVER}/payment/create-order`,
                  {
                    productList: [ { name: "producto1" }, { name: "producto2" } ],
                    checkoutData: validCheckoutData,
                  }
                );
### 2. Validación de datos incompletos o inválidos en el formulario de pago
Archivo de testeo: TestCase3.test.jsx

Descripción:
Esta prueba verifica que el sistema no permita el procesamiento de pagos si los datos ingresados en el formulario son inválidos o incompletos.

Pasos de la prueba:

-Simular el envío de un formulario con datos inválidos (como un email mal formado o un número de DNI no válido).
-Verificar que se muestre un modal de error con un mensaje descriptivo.
-Comprobar que la función checkoutValidationsModal sea llamada con los parámetros correctos.

Objetivo:
Evitar que el sistema procese pagos con datos incorrectos, garantizando la integridad y seguridad de las transacciones.

Código clave:

expect(checkoutValidationsModal).toHaveBeenCalledWith({title: "Error en el ingreso de datos", text: "Por favor, complete correctamente todos los campos.", icon: "warning", confirmButtonColor: "black",});
                
Resumen de las Pruebas Funcionales

| **Función Probada**                     | **Descripción**                                                                                           | **Resultado Esperado**                                                                                  | **CHECK** |
|-----------------------------------------|-----------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------|-----------|
| **Envío de datos al backend**           | Verifica que los datos válidos del formulario se envíen correctamente al backend usando `postPaymentPaypal`. | Los datos enviados deben coincidir con la estructura esperada y ser recibidos correctamente por el servidor. | ✔️        |
| **Validación de email**                 | Asegura que el campo de email solo acepte direcciones con formato válido.                                  | Muestra un modal de error si el email no es válido.                                                      | ✔️        |
| **Validación de DNI**                   | Comprueba que el DNI tenga un formato válido (solo números).                                               | Muestra un modal de error si el DNI contiene letras o tiene una longitud incorrecta.                      | ✔️        |
| **Validación de teléfono celular**      | Valida que el número de celular tenga un formato válido (9 dígitos).                                       | Muestra un modal de error si el número de celular tiene un formato incorrecto.                            | ✔️        |
| **Validación de campos obligatorios**   | Verifica que todos los campos obligatorios estén llenos antes de permitir el envío del formulario.          | Muestra un modal de error si algún campo obligatorio está vacío.                                          | ✔️        |
| **Manejo del evento preventDefault**    | Garantiza que la página no se recargue al enviar el formulario.                                            | `event.preventDefault` debe ser llamado correctamente.                                                    | ✔️        |
| **Manejo de modal de validación**       | Asegura que el modal se muestre con el mensaje correcto cuando los datos son inválidos.                    | Se muestra un modal con el título "Error en el ingreso de datos" y un mensaje descriptivo.                | ✔️        |

