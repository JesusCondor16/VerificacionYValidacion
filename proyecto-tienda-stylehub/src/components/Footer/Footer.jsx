import styles from "./Footer.module.css";
import { IoMailOutline } from "react-icons/io5";
import { IoMdPhonePortrait } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { SiTelegram } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import complaintsBook from "../../assets/images/complaints-book.png";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <section className={`${styles.footerSection}`}>
        <h3 className={styles.titleSection}>CONTACT</h3>
        <div className={styles.contactRow}>
          <IoMailOutline className={styles.icon} />
          <p>stylehub@gmail.com</p>
        </div>

        <div className={styles.contactRow}>
          <IoMdPhonePortrait className={styles.icon} />
          <p>+51 936 128 801</p>
        </div>

        <div className={`${styles.contactRow} ${styles.boxSocialNetworks}`}>
          <FaFacebook className={styles.icon} />
          <IoLogoWhatsapp className={styles.icon} />
          <SiTelegram className={styles.icon} />
          <FaXTwitter className={styles.icon} />
        </div>
      </section>

      <section
        className={`${styles.footerSection} ${styles.informationSection}`}
      >
        <h3 className={styles.titleSection}>INFORMATION</h3>
        <p>Razón social: STYLE HUB S.A.</p>
        <p>RUC: 20501057682</p>
        <p>Dirección legal: Av. Emilio Caveneda 151, Miraflores</p>
        <div>
          <p>Complaints book:</p>
          <div className={styles.bookComplaintsBook}>
            <img src={complaintsBook} alt="Complaints book" />
          </div>
        </div>
      </section>

      <section className={`${styles.footerSection}`}>
        <h3 className={styles.titleSection}>GET THE LATEST NEWS</h3>
        <div>
          <div className={styles.boxInputSubscribe}>
            <input
              className={styles.inputSubscribe}
              type="text"
              placeholder="Email"
            />
            <button className={styles.buttonSubscribe}>Subscribe</button>
          </div>
        </div>
      </section>
    </footer>
  );
};
