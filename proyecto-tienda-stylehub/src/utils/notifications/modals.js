import Swal from "sweetalert2";

export const confirmPurchaseModal = ({
  title,
  text,
  icon,
  confirmButtonColor,
}) => {
  Swal.fire({
    title,
    text,
    icon,
    confirmButtonColor,
  });
};

export const noProductsCartExist = () => {
  Swal.fire({
    title: "¡Ocurrió un error!",
    text: "No hay productos en su carrito",
    icon: "error",
    confirmButtonColor: "black",
  });
};

export const removeAllProductsCartModal = ({
  title,
  text,
  icon,
  showCancelButton,
  confirmButtonColor,
  cancelButtonColor,
  confirmButtonText,
  cancelButtonText,
  title2,
  text2,
  icon2,
  confirmButtonColor2,
  removeAllShoppingCart,
}) => {
  Swal.fire({
    title,
    text,
    icon,
    showCancelButton,
    confirmButtonColor,
    cancelButtonColor,
    confirmButtonText,
    cancelButtonText,
  }).then((result) => {
    if (result.isConfirmed) {
      removeAllShoppingCart();
      Swal.fire({
        title: title2,
        text: text2,
        icon: icon2,
        confirmButtonColor: confirmButtonColor2,
      });
    }
  });
};

export const checkoutValidationsModal = ({
  title,
  text,
  icon,
  confirmButtonColor,
}) => {
  Swal.fire({
    title,
    text,
    icon,
    confirmButtonColor,
  });
};
