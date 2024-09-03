import React, { useState } from "react";
import styles from "../styles/MainPage.module.css";
import { BackgroundGradientAnimation } from "../components/ui/background-gradient-animation";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

// Define the structure of track data
interface Track {
  title: string;
  artist: string;
  description: string;
}

// Define the structure for the entire dataset
interface TracksData {
  today: Track[];
  thisWeek: Track[];
  thisMonth: Track[];
  allTime: Track[];
}

// Track data with explicit types
const tracksData: TracksData = {
  today: [
    {
      title: "Track 1",
      artist: "Artist 1",
      description: "Description of Track 1",
    },
    {
      title: "Track 2",
      artist: "Artist 2",
      description: "Description of Track 2",
    },
    {
      title: "Track 3",
      artist: "Artist 3",
      description: "Description of Track 3",
    },
  ],
  thisWeek: [
    {
      title: "Track 4",
      artist: "Artist 4",
      description: "Description of Track 4",
    },
    {
      title: "Track 5",
      artist: "Artist 5",
      description: "Description of Track 5",
    },
    {
      title: "Track 6",
      artist: "Artist 6",
      description: "Description of Track 6",
    },
  ],
  thisMonth: [
    {
      title: "Track 7",
      artist: "Artist 7",
      description: "Description of Track 7",
    },
    {
      title: "Track 8",
      artist: "Artist 8",
      description: "Description of Track 8",
    },
    {
      title: "Track 9",
      artist: "Artist 9",
      description: "Description of Track 9",
    },
  ],
  allTime: [
    {
      title: "Track 10",
      artist: "Artist 10",
      description: "Description of Track 10",
    },
    {
      title: "Track 11",
      artist: "Artist 11",
      description: "Description of Track 11",
    },
    {
      title: "Track 12",
      artist: "Artist 12",
      description: "Description of Track 12",
    },
  ],
};

// Define categories
const categories = ["Pop", "Hip-Hop", "Rock n Roll", "Jazz"];

const Main: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [currentTab, setCurrentTab] = useState<keyof TracksData>("today");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted with value:", inputValue);
  };

  const handleTabClick = (tab: keyof TracksData) => {
    setCurrentTab(tab);
  };

  return (
    <div className={styles.mainPageContainer}>
      <BackgroundGradientAnimation
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
        <h1 className={styles.Header}>Generate Your Music!</h1>
        <div className={styles.mainContent}>
          <PlaceholdersAndVanishInput
            onChange={handleChange}
            onSubmit={handleSubmit}
          />

          <h2 className={styles.mainHeading}>Top Genres</h2>

          <div className={styles.categories}>
            {categories.map((category, index) => (
              <div
                key={index}
                className={styles.category}
                style={{
                  backgroundImage: `url('/images/${category
                    .toLowerCase()
                    .replace(/ /g, "")}.jpg')`,
                }}
              >
                {category}
              </div>
            ))}
          </div>

          <h2 className={styles.subHeading}>Top Tracks</h2>
          <div className={styles.tabButtons}>
            <button
              className={currentTab === "today" ? styles.activeTab : ""}
              onClick={() => handleTabClick("today")}
            >
              Today
            </button>
            <button
              className={currentTab === "thisWeek" ? styles.activeTab : ""}
              onClick={() => handleTabClick("thisWeek")}
            >
              This Week
            </button>
            <button
              className={currentTab === "thisMonth" ? styles.activeTab : ""}
              onClick={() => handleTabClick("thisMonth")}
            >
              This Month
            </button>
            <button
              className={currentTab === "allTime" ? styles.activeTab : ""}
              onClick={() => handleTabClick("allTime")}
            >
              All Time
            </button>
          </div>
          <div className={styles.tracks}>
            {tracksData[currentTab].map((track, index) => (
              <div key={index} className={styles.track}>
                <p>{track.title}</p>
                <p>{track.artist}</p>
                <p>{track.description}</p>
              </div>
            ))}
          </div>
        </div>
      </BackgroundGradientAnimation>
    </div>
  );
};

export default Main;
