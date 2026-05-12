// Bring in useState so i can remember things that change on screen
import { useState } from "react";
// Bring in the list of episodes from the data file
import { episodeList } from "./data";

// This shows the list of episodes on the left side
// It needs 3 things passed in: the episodes array (episodes), a click handler (onSelectEpisode), and which episode is selected (selectEpisode)
function EpisodeList({ episodes, onSelectEpisode, selectedEpisode }) {
  return (
    // A list
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {/* Loop through every episode and make a row for each one */}
      {episodes.map((episode) => (
        // Each row needs a unique key so React can keep track of it
        // When clicked, tell App which episode was picked
        // If this is the selected episode, make it grey, otherwise keep it clear
        <li
          key={episode.id}
          onClick={() => onSelectEpisode(episode)}
          style={{
            padding: "1rem",
            cursor: "pointer",
            borderBottom: "1px solid #823636", //used random color in the color spectrum
            backgroundColor:
              selectedEpisode?.id === episode.id ? "#6f6b6b" : "transparent", // used random color in the color spectrum
            color: "white",
          }}
        >
          {/* Show the episode title as the text */}
          {episode.title}
        </li>
      ))}
    </ul>
  );
}

// This component shows the details of whichever episode was clicked
// It receives the selected episode from App (could be null or undefined(maybe) if nothing clicked yet. Maybe not undefined because that would mean there is no explination for it)
function EpisodeDetails({ episode }) {
  // If nothing is selected yet, it should show "Select an episode to see Details"
  if (!episode) {
    return <p style={{ color: "white" }}>Select an episode to see details.</p>;
  }

  // If something IS selected, show all of its info
  return (
    <div style={{ color: "white" }}>
      {/* Show the episode number */}
      <h2>Episode {episode.id}</h2>
      {/* Show the episode title */}
      <h3>{episode.title}</h3>
      {/* Show the episode description */}
      <p>{episode.description}</p>
      {/* A button to watch the episode */}
      <button
        style={{
          display: "block",
          width: "100%",
          padding: "0.75rem",
          marginTop: "1rem",
          backgroundColor: "light-blue",
          color: "green",
          border: "none",
          cursor: "pointer",
          fontSize: "1rem",
        }}
      >
        Watch now
      </button>
    </div>
  );
}

// This is the main component — it holds all the state and puts everything together
export default function App() {
  // Load all the episodes from data.js into a state variable
  const [episodes] = useState(episodeList);

  // Keep track of which episode the user clicked — starts as null (nothing selected)
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  return (
    // Dark background covering the whole page (black)
    <div
      style={{
        backgroundColor: "black",
        minHeight: "100vh",
        padding: "2rem",
        fontFamily: "sans-serif", // fancy font! lol
      }}
    >
      {/* The show title at the top */}
      <h1 style={{ color: "white" }}>Dark Echoes</h1>

      {/* Flex container to put the list and details side by side */}
      <div style={{ display: "flex", gap: "2rem" }}>
        {/* Left side — the episode list, fixed at 300px wide */}
        <div style={{ width: "300px" }}>
          <h2 style={{ color: "white" }}>Episodes</h2>
          {/* Pass the episodes, click handler, and selected episode down to EpisodeList */}
          <EpisodeList
            episodes={episodes}
            onSelectEpisode={setSelectedEpisode}
            selectedEpisode={selectedEpisode}
          />
        </div>

        {/* Right side — episode details, fills the remaining space */}
        <div style={{ flex: 1 }}>
          {/* Pass whichever episode is selected down to EpisodeDetails */}
          <EpisodeDetails episode={selectedEpisode} />
        </div>
      </div>
    </div>
  );
}
