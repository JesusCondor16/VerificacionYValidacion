import styles from "./Loader.module.css";

export const Loader = ({ paypal }) => {
  return (
    <div className={styles.boxLoader}>
      {paypal && <p className={styles.text}>Getting your order summary ...</p>}
      <div className={styles.loader}></div>
    </div>
  );
};
