import React from "react";
import Link from "next/link";
import styles from "../styles/HomePage.module.css";

const HomePage = () => {
  return (
    <div className={styles.homePageContainer}>
      <video autoPlay muted loop className={styles.backgroundVideo}>
        <source src="/videos/background-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={styles.content}>
        <h1 className={styles.heading}>Welcome To HarmoniAI</h1>
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
    </div>
  );
};

export default HomePage;
