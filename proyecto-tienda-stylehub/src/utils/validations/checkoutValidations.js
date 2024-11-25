import { z } from "zod";
import { DEFAULT_SELECT_VALUE, INPUT_NAMES } from "../constants";
import {
  DELIVERY_OPTIONS,
  PAYMENT_OPTIONS,
} from "../../pages/Checkout/constants";

const checkoutSchema = z.object({
  email: z
    .string({ message: "El email debe ser una cadena de texto." })
    .email(),
  deliveryOption: z.enum([DELIVERY_OPTIONS[0].text, DELIVERY_OPTIONS[1].text]),
  country: z
    .string()
    .min(1)
    .refine((value) => value !== DEFAULT_SELECT_VALUE, {
      message: "El país seleccionado no es válido.",
    }),
  firstName: z
    .string()
    .min(1, { message: "El campo para los nombres no debe estar vacío." }),
  lastName: z
    .string()
    .min(1, { message: "El campo para los apellidos no debe estar vacío." }),
  dni: z
    .string()
    .regex(/^\d{8}$/, { message: "El DNI debe tener 8 dígitos números." }),
  address: z
    .string()
    .min(1, { message: "El campo para la dirección no debe estar vacío." }),
  department: z
    .string()
    .min(1)
    .refine((value) => value !== DEFAULT_SELECT_VALUE, {
      message: "El departamento seleccionado no es válido.",
    }),
  province: z
    .string()
    .min(1)
    .refine((value) => value !== DEFAULT_SELECT_VALUE, {
      message: "La provincia seleccionado no es válida.",
    }),
  district: z
    .string()
    .min(1)
    .refine((value) => value !== DEFAULT_SELECT_VALUE, {
      message: "El distrito seleccionado no es válido.",
    }),
  cellPhone: z.string().regex(/^\d{9}$/, {
    message: "El número de celular debe tener 9 dígitos números.",
  }),
  paymentOption: z.enum([
    PAYMENT_OPTIONS[0].text,
    PAYMENT_OPTIONS[1].text,
    PAYMENT_OPTIONS[2].text,
  ]),
});

export const validateCheckout = (checkoutData, selectedDelivery) => {
  // Si el Tipo de Entrega es por Delivery usamos todas las reglas, pero si es por Recojo omitimos -> department, province y district
  if (selectedDelivery === DELIVERY_OPTIONS[1].text) {
    const deliverySchema = checkoutSchema.omit({
      country: true,
      address: true,
      department: true,
      province: true,
      district: true,
    });

    return deliverySchema.safeParse(checkoutData);
  }

  return checkoutSchema.safeParse(checkoutData);
};

export const validateInputCheckout = ({ name, value }) => {
  // DeliveryOption y PaymentOption son validados como correctos siempre, ya que su valor por defecto está bien hecho
  const selectedSchema =
    name === INPUT_NAMES.EMAIL
      ? checkoutSchema.pick({ email: true })
      : name === INPUT_NAMES.DELIVERY_OPTION
      ? checkoutSchema.pick({ deliveryOption: true })
      : name === INPUT_NAMES.COUNTRY
      ? checkoutSchema.pick({ country: true })
      : name === INPUT_NAMES.FIRST_NAME
      ? checkoutSchema.pick({ firstName: true })
      : name === INPUT_NAMES.LAST_NAME
      ? checkoutSchema.pick({ lastName: true })
      : name === INPUT_NAMES.DNI
      ? checkoutSchema.pick({ dni: true })
      : name === INPUT_NAMES.ADDRESS
      ? checkoutSchema.pick({ address: true })
      : name === INPUT_NAMES.DEPARTMENT
      ? checkoutSchema.pick({ department: true })
      : name === INPUT_NAMES.PROVINCE
      ? checkoutSchema.pick({ province: true })
      : name === INPUT_NAMES.DISTRICT
      ? checkoutSchema.pick({ district: true })
      : name === INPUT_NAMES.CELL_PHONE
      ? checkoutSchema.pick({ cellPhone: true })
      : name === INPUT_NAMES.PAYMENT_OPTION
      ? checkoutSchema.pick({ paymentOption: true })
      : null;

  if (selectedSchema) {
    return selectedSchema.safeParse({ [name]: value });
  }
};
