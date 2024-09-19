import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/MainPage.module.css";
import BackgroundBeams from "../components/ui/background-beams";
import { PlaceholdersAndVanishInput } from "../components/ui/placeholders-and-vanish-input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faForward,
  faBackward,
} from "@fortawesome/free-solid-svg-icons";

interface Track {
  title: string;
  artist: string;
  description: string;
  albumArt: string;
}

interface TracksData {
  today: Track[];
  thisWeek: Track[];
  thisMonth: Track[];
  allTime: Track[];
}

const categories: string[] = ["Pop", "Rock", "Hip-Hop", "Jazz"];

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


const MainPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [currentTab, setCurrentTab] = useState<keyof TracksData>("today");
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    const genres = ["pop", "rock", "hip-hop", "jazz"];
    const lowerCaseInput = inputValue.toLowerCase();

    const matchedGenre = genres.find((genre) => lowerCaseInput.includes(genre));

    if (matchedGenre) {
      router.push({
        pathname: "/songComparison",
        query: { category: matchedGenre, prompt: inputValue },
      });
    } else {
      alert(
        "Please include a genre (pop, rock, hip-hop, or jazz) in your prompt."
      );
    }
  };

  const handleTabClick = (tab: keyof TracksData) => {
    setCurrentTab(tab);
  };

  const handlePlayTrack = (trackTitle: string) => {
    setPlayingTrack(playingTrack === trackTitle ? null : trackTitle);
  };

  const formatTabLabel = (tab: string) =>
    tab.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

  return (
    <div className={styles.mainPageContainer}>
      <div className={styles.backgroundBeams}>
        <div className={styles.header}>
          <h2 className={styles.headerText}>Generate your tracks here!</h2>
        </div>
        <PlaceholdersAndVanishInput
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
        <div className={styles.subHeading}>Top Genres</div>
        <div className={styles.categories}>
          {categories.map((category) => (
            <div
              key={category}
              className={styles.category}
              style={{
                backgroundImage:
                  category === "Rock"
                    ? "url(/images/rocknroll.jpg)"
                    : `url(/images/${category.toLowerCase()}.jpg)`,
              }}
            >
              {category}
            </div>
          ))}
        </div>

        <div className={styles.subHeading}>Top Tracks</div>
        <div className={styles.tabButtons}>
          {Object.keys(tracksData).map((tab) => (
            <button
              key={tab}
              className={
                currentTab === tab
                  ? `${styles.tab} ${styles.activeTab}`
                  : styles.tab
              }
              onClick={() => handleTabClick(tab as keyof TracksData)}
            >
              {formatTabLabel(tab)}
            </button>
          ))}
        </div>

        <div className={styles.tracks}>
          {tracksData[currentTab].map((track) => (
            <div
              key={track.title}
              className={
                playingTrack === track.title
                  ? `${styles.track} ${styles.playingTrack}`
                  : styles.track
              }
            >
              <img
                src={track.albumArt}
                alt={track.title}
                className={styles.trackImage}
              />
              <div className={styles.trackInfo}>
                <div className={styles.trackTitle}>{track.title}</div>
                <div className={styles.trackArtist}>{track.artist}</div>
                <div className={styles.trackDescription}>
                  {track.description}
                </div>
                <div className={styles.musicControls}>
                  <FontAwesomeIcon
                    icon={faBackward}
                    className={styles.controlIcon}
                  />
                  <FontAwesomeIcon
                    icon={faPlay}
                    className={styles.controlIcon}
                    onClick={() => handlePlayTrack(track.title)}
                  />
                  <FontAwesomeIcon
                    icon={faForward}
                    className={styles.controlIcon}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
