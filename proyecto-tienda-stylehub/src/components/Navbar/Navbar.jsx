import { Link, useLocation } from "react-router-dom";
import { AiOutlineShopping } from "react-icons/ai";
import { LuSearch } from "react-icons/lu";
import logo from "../../assets/images/logo.png";
import styles from "./Navbar.module.css";
import { ShoppingCart } from "../ShoppingCart/ShoppingCart";
import { useContext, useState } from "react";
import { ShoppingCartContext } from "../../context/ShoppingCartContext/ShoppingCartContext";

export const Navbar = () => {
  const { shoppingCartProducts } = useContext(ShoppingCartContext);
  const [showShoppingCart, setShowShoppingCart] = useState(false);

  const location = useLocation();

  const appearShoppingCart = () => {
    setShowShoppingCart(!showShoppingCart);
  };

  return (
    <>
      {!(
        location.pathname === "/order-completion" ||
        location.pathname === "/checkout"
      ) && (
        <>
          <header>
            <nav className={styles.navBar}>
              <Link className={styles.logo} to="/">
                <img src={logo} alt="Logo" />
              </Link>

              <div className={styles.boxNavOptions}>
                <div className={styles.boxSearchIcon}>
                  <LuSearch className={styles.searchIcon} />
                </div>
                <div
                  className={styles.boxShoppingCart}
                  onClick={appearShoppingCart}
                >
                  <AiOutlineShopping className={styles.shoppingCart} />
                  <p className={styles.quantityProducts}>
                    {shoppingCartProducts.length}
                  </p>
                </div>
              </div>
            </nav>
          </header>

          <ShoppingCart
            showShoppingCart={showShoppingCart}
            appearShoppingCart={appearShoppingCart}
          />
        </>
      )}
    </>
  );
};
