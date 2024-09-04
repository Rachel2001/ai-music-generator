import React, { useState } from "react";
import styles from "../styles/MainPage.module.css";
import { BackgroundBeams } from "../components/ui/background-beams";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faForward } from "@fortawesome/free-solid-svg-icons";

// Define the structure of track data
interface Track {
  title: string;
  artist: string;
  description: string;
  albumArt: string;
}

// Define the structure for the entire dataset
interface TracksData {
  today: Track[];
  thisWeek: Track[];
  thisMonth: Track[];
  allTime: Track[];
}

// Define the music categories (genres), removed Classical and Electronic
const categories: string[] = ["Pop", "Rock", "Hip-Hop", "Jazz"];

// Track data with explicit types and made-up artists/songs
const tracksData: TracksData = {
  today: [
    {
      title: "Electric Dream",
      artist: "Skylar Nova",
      description: "A fusion of synth beats and ambient vocals.",
      albumArt: "/images/electric-dream.jpg",
    },
    {
      title: "Sunset Mirage",
      artist: "Zara Eclipse",
      description: "A dreamy pop anthem perfect for evening vibes.",
      albumArt: "/images/sunset-mirage.jpg",
    },
    {
      title: "Echoes of Time",
      artist: "Liam Vortex",
      description: "A deep house track with reverberating rhythms.",
      albumArt: "/images/echoes-of-time.jpg",
    },
  ],
  thisWeek: [
    {
      title: "Galactic Groove",
      artist: "Orion Pulse",
      description: "A funky, space-inspired dance track.",
      albumArt: "/images/galactic-groove.jpg",
    },
    {
      title: "Moonlight Serenade",
      artist: "Luna Breeze",
      description: "A smooth jazz number with hints of R&B.",
      albumArt: "/images/moonlight-serenade.jpg",
    },
    {
      title: "Rhythm of the Rain",
      artist: "Storm Scribe",
      description:
        "A soulful track mixing natural sounds with electronic beats.",
      albumArt: "/images/rhythm-of-the-rain.jpg",
    },
  ],
  thisMonth: [
    {
      title: "Shadows in Motion",
      artist: "Nova Phantom",
      description: "A hauntingly beautiful trip-hop track.",
      albumArt: "/images/shadows-in-motion.jpg",
    },
    {
      title: "Starlight Symphony",
      artist: "Celeste Harmony",
      description: "An orchestral masterpiece with modern twists.",
      albumArt: "/images/starlight-symphony.jpg",
    },
    {
      title: "Ocean's Heartbeat",
      artist: "Coral Wave",
      description: "A chillout tune inspired by the sea's rhythms.",
      albumArt: "/images/oceans-heartbeat.jpg",
    },
  ],
  allTime: [
    {
      title: "Firefly's Flight",
      artist: "Ignis Aura",
      description: "A timeless ballad with ethereal harmonies.",
      albumArt: "/images/fireflys-flight.jpg",
    },
    {
      title: "Whispers of the Forest",
      artist: "Emerald Wind",
      description: "A folk-inspired melody with nature-inspired lyrics.",
      albumArt: "/images/whispers-of-the-forest.jpg",
    },
    {
      title: "Celestial Dawn",
      artist: "Cosmos Nova",
      description:
        "An uplifting track blending classical and electronic elements.",
      albumArt: "/images/celestial-dawn.jpg",
    },
  ],
};

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
        <h1 className={styles.Header}>Generate Your Music!</h1>
        <div className={styles.mainContent}>
          <PlaceholdersAndVanishInput
            onChange={handleChange}
            onSubmit={handleSubmit}
          />

          {/* Top Genres Section */}
          <h2 className={styles.mainHeading}>Top Genres</h2>
          <div className={styles.categories}>
            {categories.map((category, index) => (
              <div
                key={index}
                className={styles.category}
                style={{
                  backgroundImage: `url('/images/${
                    category === "Rock" ? "rocknroll" : category.toLowerCase()
                  }.jpg')`,
                }}
              >
                {category}
              </div>
            ))}
          </div>

          {/* Top Tracks Section */}
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
                {/* Display album art */}
                <img
                  src={track.albumArt}
                  alt={track.title}
                  className={styles.albumArt}
                />

                <div className={styles.trackInfo}>
                  <p>{track.title}</p>
                  <p>{track.artist}</p>
                  <p>{track.description}</p>
                </div>

                {/* Music control buttons */}
                <div className={styles.musicControls}>
                  <FontAwesomeIcon
                    icon={faPlay}
                    className={styles.controlIcon}
                  />
                  <FontAwesomeIcon
                    icon={faPause}
                    className={styles.controlIcon}
                  />
                  <FontAwesomeIcon
                    icon={faForward}
                    className={styles.controlIcon}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </BackgroundBeams>
    </div>
  );
};

export default Main;
