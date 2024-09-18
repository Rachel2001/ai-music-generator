import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faForward,
  faBackward,
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
    artist: "Pop Star",
    genre: "Pop",
    albumArt: "/images/pop-track3-image.jpg",
    link: "/audio/Chasing the Night.mp3",
  },
  "Endless Night": {
    title: "Endless Night",
    artist: "Pop Star",
    genre: "Pop",
    albumArt: "/images/pop-track4-image.jpg",
    link: "/audio/Endless Night.mp3",
  },
  "Rhythms of Unity": {
    title: "Rhythms of Unity",
    artist: "Hip Hop Artist",
    genre: "Hip Hop",
    albumArt: "/images/hiphop-track5-image.jpg",
    link: "/audio/Rhythms of Unity.mp3",
  },
  "Crowns of Strength": {
    title: "Crowns of Strength",
    artist: "Hip Hop Artist",
    genre: "Hip Hop",
    albumArt: "/images/hiphop-track6-image.jpg",
    link: "/audio/Crowns of Strength.mp3",
  },
  "City Lights and Rhythms": {
    title: "City Lights and Rhythms",
    artist: "Jazz Ensemble",
    genre: "Jazz",
    albumArt: "/images/jazz-track7-image.jpg",
    link: "/audio/City lights and Rhythms.mp3",
  },
  "Moonlight Rhythms": {
    title: "Moonlight Rhythms",
    artist: "Jazz Ensemble",
    genre: "Jazz",
    albumArt: "/images/jazz-track8-image.jpg",
    link: "/audio/Moonlight Rhythms.mp3",
  },
};

const SongComparison = () => {
  const router = useRouter();
  const { prompt } = router.query;

  // Ensuring that we handle `prompt` type properly (it could be string or string[])
  const promptValue = Array.isArray(prompt) ? prompt[0] : prompt || "";

  const [generatedMusic, setGeneratedMusic] = useState<GeneratedMusic | null>(
    null
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio()); // Create a new audio element

  useEffect(() => {
    if (promptValue && musicData[promptValue]) {
      const selectedMusic = musicData[promptValue];
      setGeneratedMusic(selectedMusic);
      audio.src = selectedMusic.link; // Set the selected track as the audio source
    }

    return () => {
      audio.pause(); // Cleanup audio on component unmount
    };
  }, [promptValue, audio]);

  const handlePlayPause = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <h1>Music Selection</h1>
      {generatedMusic ? (
        <div>
          <img
            src={generatedMusic.albumArt}
            alt={generatedMusic.title}
            style={{ width: "200px" }}
          />
          <h2>{generatedMusic.title}</h2>
          <p>Artist: {generatedMusic.artist}</p>
          <p>Genre: {generatedMusic.genre}</p>

          {/* Audio Controls */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <FontAwesomeIcon
              icon={faBackward}
              size="2x"
              style={{ cursor: "pointer" }}
              onClick={() => (audio.currentTime -= 10)}
            />
            <FontAwesomeIcon
              icon={isPlaying ? faPause : faPlay}
              size="2x"
              style={{ margin: "0 20px", cursor: "pointer" }}
              onClick={handlePlayPause}
            />
            <FontAwesomeIcon
              icon={faForward}
              size="2x"
              style={{ cursor: "pointer" }}
              onClick={() => (audio.currentTime += 10)}
            />
          </div>

          <p>
            <a
              href={generatedMusic.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Listen to the track in a new tab
            </a>
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SongComparison;
