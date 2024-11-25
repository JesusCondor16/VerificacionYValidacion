import { IoArrowRedoOutline } from "react-icons/io5";
import { LuStore } from "react-icons/lu";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { RiBankCardLine } from "react-icons/ri";
import { TbTruck } from "react-icons/tb";

// OPCIONES DE ENVÍO
export const DELIVERY_OPTIONS = [
  {
    text: "Shipping",
    icon: <TbTruck />,
  },
  {
    text: "Pick up in store",
    icon: <LuStore />,
  },
];

// OPCIONES DE PAGO
export const PAYMENT_OPTIONS = [
  {
    text: "Paypal",
    additionalData: {
      message:
        "After clicking on “Pay now”, you will be redirected to Paypal to complete your purchase safely.",
      icon: <IoArrowRedoOutline />,
    },
  },
  {
    text: "Yape",
    additionalData: {
      message: "The number will appear after clicking “Finalize Order”.",
      icon: <MdOutlinePhoneIphone />,
    },
  },
  {
    text: "Bank Deposit",
    additionalData: {
      message:
        "Your order will be reserved for a maximum of 24 to 48 hours. Our bank account details will be after clicking on “Finalize Order”.",
      icon: <RiBankCardLine />,
    },
  },
];
