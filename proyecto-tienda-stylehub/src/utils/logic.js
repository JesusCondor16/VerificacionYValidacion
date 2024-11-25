export const roundToDecimals = (number, decimals) => {
  const factor = Math.pow(10, decimals);
  return Math.round(number * factor) / factor;
};

export const totalQuantityItems = (shoppingCartProducts) => {
  return shoppingCartProducts.reduce(
    (accumulator, product) => product.quantity + accumulator,
    0
  );
};

export const totalCost = (shoppingCartProducts) => {
  return shoppingCartProducts.reduce(
    (accumulator, product) => product.quantity * product.price + accumulator,
    0
  );
};
