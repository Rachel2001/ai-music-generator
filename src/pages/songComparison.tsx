import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../styles/songPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faForward,
  faBackward,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

interface GeneratedMusic {
  title: string;
  artist: string;
  genre: string;
  albumArt: string;
  link: string;
}

const musicData: Record<string, GeneratedMusic> = {
  "Igniting the Flame": {
    title: "Igniting the Flame",
    artist: "Rock Band",
    genre: "Rock",
    albumArt: "/images/rocknroll-track1-image.jpg",
    link: "/audio/Igniting the Flame.mp3",
  },
  "Fire in the Night": {
    title: "Fire in the Night",
    artist: "Rock Band",
    genre: "Rock",
    albumArt: "/images/rocknroll-track2-image.jpg",
    link: "/audio/Fire in the Night.mp3",
  },
  "Chasing the Night": {
    title: "Chasing the Night",
    artist: "Pop Band",
    genre: "Pop",
    albumArt: "/images/pop-track3-image.jpg",
    link: "/audio/Chasing the Night.mp3",
  },
  "Endless Night": {
    title: "Endless Night",
    artist: "Pop Band",
    genre: "Pop",
    albumArt: "/images/pop-track4-image.jpg",
    link: "/audio/Endless Night.mp3",
  },
  "Rhythms of Unity": {
    title: "Rhythms of Unity",
    artist: "Hip-hop Artist",
    genre: "Hip-Hop",
    albumArt: "/images/hiphop-track5-image.jpg",
    link: "/audio/Rhythms of Unity.mp3",
  },
  "Crowns of Strength": {
    title: "Crowns of Strength",
    artist: "Hip-hop Artist",
    genre: "Hip-Hop",
    albumArt: "/images/hiphop-track6-image.jpg",
    link: "/audio/Crowns of Strength.mp3",
  },
  "City Lights and Rhythms": {
    title: "City Lights & Rhythms",
    artist: "Jazz Band",
    genre: "Jazz",
    albumArt: "/images/jazz-track7-image.jpg",
    link: "/audio/City Lights and Rhythms.mp3",
  },
  "Moonlight Rhythms": {
    title: "Moonlight Rhythms",
    artist: "Jazz Band",
    genre: "Jazz",
    albumArt: "/images/jazz-track7-image.jpg",
    link: "/audio/Moonlight Rhythms.mp3",
  },
};

const SongComparison: React.FC = () => {
  const router = useRouter();
  const { category } = router.query;
  const [audioInstances, setAudioInstances] = useState<
    Record<string, HTMLAudioElement>
  >({});
  const [playingStates, setPlayingStates] = useState<Record<string, boolean>>(
    {}
  );

  // Filter music based on the selected category
  const filteredTracks = Object.values(musicData)
    .filter(
      (track) =>
        track.genre.toLowerCase() === category?.toString().toLowerCase()
    )
    .slice(0, 2);

  useEffect(() => {
    // Create audio instances for each track
    const newAudioInstances: Record<string, HTMLAudioElement> = {};
    filteredTracks.forEach((track) => {
      newAudioInstances[track.title] = new Audio(track.link);
    });
    setAudioInstances(newAudioInstances);

    // Cleanup function
    return () => {
      Object.values(newAudioInstances).forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
      });
    };
  }, [category]);

  const handlePlayPause = (trackTitle: string) => {
    const audio = audioInstances[trackTitle];
    if (audio) {
      if (playingStates[trackTitle]) {
        audio.pause();
      } else {
        // Pause all other tracks
        Object.entries(audioInstances).forEach(([title, audioInstance]) => {
          if (title !== trackTitle) {
            audioInstance.pause();
            setPlayingStates((prev) => ({ ...prev, [title]: false }));
          }
        });
        audio.play().catch((err) => console.error("Playback error:", err));
      }
      setPlayingStates((prev) => ({
        ...prev,
        [trackTitle]: !prev[trackTitle],
      }));
    }
  };

  const handleTrackChange = (
    trackTitle: string,
    direction: "previous" | "next"
  ) => {
    const currentIndex = filteredTracks.findIndex(
      (track) => track.title === trackTitle
    );
    let newIndex;
    if (direction === "next") {
      newIndex = (currentIndex + 1) % filteredTracks.length;
    } else {
      newIndex =
        (currentIndex - 1 + filteredTracks.length) % filteredTracks.length;
    }
    const newTrack = filteredTracks[newIndex];

    // Stop the current track and start the new one
    audioInstances[trackTitle].pause();
    audioInstances[trackTitle].currentTime = 0;
    setPlayingStates((prev) => ({ ...prev, [trackTitle]: false }));

    audioInstances[newTrack.title]
      .play()
      .catch((err) => console.error("Playback error:", err));
    setPlayingStates((prev) => ({ ...prev, [newTrack.title]: true }));
  };

  return (
    <div className={styles.songPageContainer}>
      <button className={styles.backButton} onClick={() => router.back()}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <div className={styles.songHeader}>
        <h2 className={styles.songHeaderText}>Enjoy your AI Generated Songs!</h2>
      </div>
      {category && <h3 className={styles.categoryText}>{category}</h3>}
      <div className={styles.songsContainer}>
        {filteredTracks.map((track) => (
          <div key={track.title} className={styles.songContainer}>
            <img
              src={track.albumArt}
              alt={track.title}
              className={styles.albumArt}
            />
            <div className={styles.songInfo}>
              <h4 className={styles.songTitle}>{track.title}</h4>
              <p className={styles.songArtist}>{track.artist}</p>
            </div>
            <div className={styles.musicControls}>
              <button
                className={styles.controlButton}
                onClick={() => handleTrackChange(track.title, "previous")}
              >
                <FontAwesomeIcon icon={faBackward} />
              </button>
              <button
                className={styles.controlButton}
                onClick={() => handlePlayPause(track.title)}
              >
                <FontAwesomeIcon
                  icon={playingStates[track.title] ? faPause : faPlay}
                />
              </button>
              <button
                className={styles.controlButton}
                onClick={() => handleTrackChange(track.title, "next")}
              >
                <FontAwesomeIcon icon={faForward} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SongComparison;
