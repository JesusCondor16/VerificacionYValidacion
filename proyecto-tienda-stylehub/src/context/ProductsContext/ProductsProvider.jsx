import { ProductsContext } from "./ProductsContext";
import { useGet } from "../../hooks/useGet";
import { URL_SERVER } from "../../utils/constants";

export const ProductsProvider = ({ children }) => {
  const { responseGet, loadingGet, errorGet, getData } = useGet(
    `${URL_SERVER}/product`,
    true
  );

  return (
    <ProductsContext.Provider
      value={{
        responseGet,
        loadingGet,
        errorGet,
        refetchProducts: getData,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
