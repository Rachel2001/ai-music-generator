import { useState } from "react";

interface Track {
  id: number;
  title: string;
  audioUrl: string;
}

const SongComparison: React.FC = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [tracks, setTracks] = useState<Track[]>([]); // Array of Track objects
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Simulate fetching two AI-generated tracks (replace with actual API call)
    const fetchedTracks = await mockFetchTracks(prompt);

    setTracks(fetchedTracks);
    setLoading(false);
  };

  // This is a mock function, replace it with the actual API call
  const mockFetchTracks = async (prompt: string): Promise<Track[]> => {
    return [
      { id: 1, title: "Track 1", audioUrl: "/audio/track1.mp3" },
      { id: 2, title: "Track 2", audioUrl: "/audio/track2.mp3" },
    ];
  };

  return (
    <div>
      <h1>Song Comparison</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a prompt"
          value={prompt}
          onChange={handleChange}
        />
        <button type="submit">Generate Tracks</button>
      </form>

      {loading && <p>Loading tracks...</p>}

      {tracks.length > 0 && (
        <div>
          <h2>Select which song is better:</h2>
          {tracks.map((track) => (
            <div key={track.id}>
              <h3>{track.title}</h3>
              <audio controls>
                <source src={track.audioUrl} type="audio/mpeg" />
                Your browser does not support the audio tag.
              </audio>
              <button>Choose this song</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SongComparison;
