import styles from "./StartSection.module.css";
import carouselMensClothing from "../../assets/images/carouselMensClothing.png";
import carouselWomensClothing from "../../assets/images/carouselWomensClothing.png";
import carouselElectronics from "../../assets/images/carouselElectronics.png";
import carouselJewelry from "../../assets/images/carouselJewelry.png";
import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";

const carouselImages = [
  {
    image: carouselMensClothing,
    titlePartOne: "SHARP LOOKS",
    titlePartTwo: "EVERY DAY",
    paragraph: "Clothes that define modern masculinity",
  },
  {
    image: carouselWomensClothing,
    titlePartOne: "EFFORTLESS",
    titlePartTwo: "ELEGANCE",
    paragraph: "Styles that shine for every occasion",
  },
  {
    image: carouselElectronics,
    titlePartOne: "EMPOWERING",
    titlePartTwo: "MODERN LIFE",
    paragraph: "Innovation to enhance your day",
  },
  {
    image: carouselJewelry,
    titlePartOne: "TIMELESS",
    titlePartTwo: "ELEGANCE",
    paragraph: "Discover jewels that define your style",
  },
];

export const StartSection = () => {
  const [indexCarousel, setIndexCarousel] = useState(0);

  const decreaseCarouselIndex = () => {
    setIndexCarousel((prev) =>
      prev === 0 ? carouselImages.length - 1 : prev - 1
    );
  };

  const increaseCarouselIndex = () => {
    setIndexCarousel((prev) =>
      prev === carouselImages.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      increaseCarouselIndex();
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.boxCarousel}>
      <img
        className={styles.imageCarousel}
        src={carouselImages[indexCarousel].image}
        alt="Carrousel image"
      />
      <div className={styles.boxTextCarousel}>
        <div className={styles.boxTitleCarousel}>
          <p className={styles.titleCarousel}>
            {carouselImages[indexCarousel].titlePartOne}
          </p>
          <p className={styles.titleCarousel}>
            {carouselImages[indexCarousel].titlePartTwo}
          </p>
        </div>
        <p className={styles.paragraphCarousel}>
          {carouselImages[indexCarousel].paragraph}
        </p>
      </div>
      <FaChevronLeft
        className={`${styles.buttonCarousel} ${styles.buttonLeft}`}
        onClick={decreaseCarouselIndex}
      />
      <FaChevronRight
        className={`${styles.buttonCarousel} ${styles.buttonRight}`}
        onClick={increaseCarouselIndex}
      />
    </section>
  );
};
