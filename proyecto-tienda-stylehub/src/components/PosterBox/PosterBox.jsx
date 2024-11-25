import styles from "./PosterBox.module.css";
import { FaTshirt } from "react-icons/fa";
import { FaTruckFront } from "react-icons/fa6";
import { GrPowerCycle } from "react-icons/gr";
import { MdOutlinePayment } from "react-icons/md";
import { MdDiscount } from "react-icons/md";
import { IoMdPhonePortrait } from "react-icons/io";

export const PosterBox = ({ image }) => {
  return (
    <div className={styles.boxPoster}>
      <div className={styles.boxPoster}>
        <img className={styles.posterImage} src={image} alt="Poster" />
      </div>
      <div className={styles.boxBenefits}>
        <div className={styles.boxIntroduction}>
          <h3>JOIN THE ADVENTURE</h3>
          <p>Learn about the benefits we have for you</p>
        </div>
        <ul className={styles.benefitsList}>
          <li className={styles.benefit}>
            <FaTshirt className={styles.benefitIcon} />
            <p>Men's and women's clothing of all qualities.</p>
          </li>
          <li className={styles.benefit}>
            <FaTruckFront className={styles.benefitIcon} />
            <p>We can send your product to any part of Peru.</p>
          </li>
          <li className={styles.benefit}>
            <GrPowerCycle className={styles.benefitIcon} />
            <p>
              100% money-back guarantee if you are not satisfied with your
              purchase.
            </p>
          </li>
          <li className={styles.benefit}>
            <MdOutlinePayment className={styles.benefitIcon} />
            <p>You can pay in 3 ways: Paypal, Yape or Bank Deposit.</p>
          </li>
          <li className={styles.benefit}>
            <MdDiscount className={styles.benefitIcon} />
            <p>Access exclusive promotions and discounts every week.</p>
          </li>
          <li className={styles.benefit}>
            <IoMdPhonePortrait className={styles.benefitIcon} />
            <p>Personalized attention 24/7. Contact us at 936128801</p>
          </li>
        </ul>
      </div>
    </div>
  );
};
