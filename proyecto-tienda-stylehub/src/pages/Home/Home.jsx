import styles from "./Home.module.css";
import { StoreSection } from "../../components/StoreSection/StoreSection";
import { useContext } from "react";
import { ProductsContext } from "../../context/ProductsContext/ProductsContext";
import { PRODUCT_CATEGORIES } from "../../utils/constants";
import { StartSection } from "../../components/StartSection/StartSection";
import { Loader } from "../../components/Loader/Loader";
import { CategoriesBox } from "../../components/CategoriesBox/CategoriesBox";
import categoryMensClothing from "../../assets/images/categoryMensClothing.png";
import categoryWomensClothing from "../../assets/images/categoryWomensClothing.png";
import categoryElectronics from "../../assets/images/categoryElectronics.png";
import categoryJewelry from "../../assets/images/categoryJewelry.png";
import imagePoster from "../../assets/images/imagePoster.png";
import backgroundMens from "../../assets/images/backgroundMens.png";
import backgroundWomens from "../../assets/images/backgroundWomens.png";
import backgroundElectronics from "../../assets/images/backgroundElectronics.png";
import backgroundJewelry from "../../assets/images/backgroundJewelry.png";
import { PosterBox } from "../../components/PosterBox/PosterBox";
import { Advertising } from "../../components/Advertising/Advertising";
import { Footer } from "../../components/Footer/Footer";

const categoryList = [
  {
    title: "MEN'S CLOTHING",
    image: categoryMensClothing,
  },
  {
    title: "WOMEN'S CLOTHING",
    image: categoryWomensClothing,
  },
  {
    title: "ELECTRONICS",
    image: categoryElectronics,
  },
  {
    title: "JEWELRY",
    image: categoryJewelry,
  },
];

export const Home = () => {
  const {
    responseGet: responseProducts,
    loadingGet: loadingProducts,
    errorGet,
  } = useContext(ProductsContext);

  const menClothingList = responseProducts.filter(
    (product) => product.category === PRODUCT_CATEGORIES.menClothing
  );
  const womenClothingList = responseProducts.filter(
    (product) => product.category === PRODUCT_CATEGORIES.womenClothing
  );

  const electronicsList = responseProducts.filter(
    (product) => product.category === PRODUCT_CATEGORIES.electronics
  );

  const jeweleryList = responseProducts.filter(
    (product) => product.category === PRODUCT_CATEGORIES.jewelery
  );

  return (
    <div className={styles.boxHome}>
      {/* SECCIÓN DE INICIO */}
      <StartSection />

      {/* CAJA DE LAS CATEGORÍAS DE PRODUCTOS */}
      <CategoriesBox categoryList={categoryList} />

      <Advertising />

      <PosterBox image={imagePoster} />

      {/* Mover a otro componente */}
      {loadingProducts ? (
        <Loader />
      ) : (
        <div className={styles.boxSections}>
          {/* LISTA DE PRODUCTOS DE HOMBRE */}
          <StoreSection
            id={PRODUCT_CATEGORIES.menClothing}
            productList={menClothingList}
            sectionTitle="MEN'S CLOTHING"
            backgroundImage={backgroundMens}
          />

          {/* LISTA DE PRODUCTOS DE MUJER */}
          <StoreSection
            id={PRODUCT_CATEGORIES.womenClothing}
            productList={womenClothingList}
            sectionTitle="WOMEN'S CLOTHING"
            backgroundImage={backgroundWomens}
          />

          {/* LISTA DE PRODUCTOS ELECTRÓNICOS */}
          <StoreSection
            id={PRODUCT_CATEGORIES.electronics}
            productList={electronicsList}
            sectionTitle="ELECTRONICS"
            backgroundImage={backgroundElectronics}
          />

          {/* LISTA DE PRODUCTOS DE JOYERÍA */}
          <StoreSection
            id={PRODUCT_CATEGORIES.jewelery}
            productList={jeweleryList}
            sectionTitle="JEWELRY"
            backgroundImage={backgroundJewelry}
          />
        </div>
      )}

      <Footer />
    </div>
  );
};
