import React, { useEffect, useRef } from "react";
import "./App.css";
import Header from "./components/Header";
import ScrollingContainer from "./components/ScrollingContainer";

function App() {
  // Sample data for the cards
  const fastCards = [
    {
      id: 1,
      title: "Fast Card 1",
      content: "This is a fast scrolling card with some content to display.",
    },
    {
      id: 2,
      title: "Fast Card 2",
      content: "Another fast card with different content and information.",
    },
    {
      id: 3,
      title: "Fast Card 3",
      content: "Fast scrolling card number three with unique content.",
    },
    {
      id: 4,
      title: "Fast Card 4",
      content: "Fourth fast card containing interesting information.",
    },
    {
      id: 5,
      title: "Fast Card 5",
      content: "Fifth fast card with more content to scroll through.",
    },
    {
      id: 6,
      title: "Fast Card 6",
      content: "Sixth fast card with additional details and text.",
    },
    {
      id: 7,
      title: "Fast Card 7",
      content: "Seventh fast card with even more content to display.",
    },
    {
      id: 8,
      title: "Fast Card 8",
      content: "Eighth fast card with comprehensive information.",
    },
  ];

  const slowCards = [
    {
      id: 1,
      title: "Slow Card 1",
      content:
        "This is a slow scrolling card with detailed content and descriptions.",
    },
    {
      id: 2,
      title: "Slow Card 2",
      content:
        "Another slow card with extensive information and longer text content.",
    },
    {
      id: 3,
      title: "Slow Card 3",
      content: "Slow scrolling card number three with comprehensive details.",
    },
    {
      id: 4,
      title: "Slow Card 4",
      content:
        "Fourth slow card containing elaborate information and descriptions.",
    },
    {
      id: 5,
      title: "Slow Card 5",
      content:
        "Fifth slow card with thorough content and detailed explanations.",
    },
    {
      id: 6,
      title: "Slow Card 6",
      content:
        "Sixth slow card with in-depth information and extended content.",
    },
    {
      id: 7,
      title: "Slow Card 7",
      content: "Seventh slow card with comprehensive details and descriptions.",
    },
    {
      id: 8,
      title: "Slow Card 8",
      content:
        "Eighth slow card with complete information and thorough content.",
    },
  ];

  return (
    <div className="App">
      <Header />
      <div className="containers-wrapper">
        <ScrollingContainer
          cards={fastCards}
          speed={2}
          className="fast-container"
        />
        <ScrollingContainer
          cards={slowCards}
          speed={5}
          className="slow-container"
        />
      </div>
    </div>
  );
}

export default App;
