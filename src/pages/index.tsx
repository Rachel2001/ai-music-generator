import React from "react";
import Link from "next/link";
import styles from "../styles/HomePage.module.css";
import { BackgroundBeams } from "../components/ui/background-beams";

const HomePage: React.FC = () => {
  return (
    <div className={styles.homePageContainer}>
      <BackgroundBeams
        gradientBackgroundStart="rgb(0, 100, 255)"
        gradientBackgroundEnd="rgb(255, 0, 100)"
        firstColor="255, 0, 0"
        secondColor="0, 255, 0"
        thirdColor="0, 0, 255"
        fourthColor="255, 255, 0"
        fifthColor="255, 0, 255"
        pointerColor="0, 255, 255"
        size="90%"
        blendingValue="overlay"
      >
        <div className={styles.content}>
          <h1 className={styles.heading}>Welcome To HarmoniAI!</h1>
          <p className={styles.slogan}>
            Create your own music with just a few clicks. Dive into the world of
            endless musical possibilities!
          </p>
          <div className={styles.buttonContainer}>
            <Link href="/main" className={styles.button}>
              Get started
            </Link>
          </div>
        </div>
      </BackgroundBeams>
    </div>
  );
};

export default HomePage;
