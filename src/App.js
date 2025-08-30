import React from "react";
import "./App.css";
import Header from "./components/Header";
import ScrollingContainer from "./components/ScrollingContainer";

function App() {
  // Sample data for tweet-like cards
  const fastCards = [
    {
      id: 1,
      username: "fastuser01",
      handle: "@fastuser01",
      time: "2h",
      content:
        "Just discovered this amazing new technology stack. The performance gains are incredible! #webdev #tech",
      replies: 12,
      retweets: 8,
      likes: 24,
    },
    {
      id: 2,
      username: "techguru",
      handle: "@techguru",
      time: "4h",
      content:
        "Hot take: The best code is the code you don't have to write. Sometimes simplicity wins over complexity.",
      replies: 5,
      retweets: 15,
      likes: 42,
    },
    {
      id: 3,
      username: "devlife",
      handle: "@devlife",
      time: "6h",
      content:
        "Coffee consumption directly correlates with code quality. Scientific fact. ☕️ #developerlife",
      replies: 23,
      retweets: 67,
      likes: 156,
    },
    {
      id: 4,
      username: "retrocoder",
      handle: "@retrocoder",
      time: "8h",
      content:
        "Remember when we used to program on green-screen terminals? Those were simpler times... #nostalgia",
      replies: 8,
      retweets: 12,
      likes: 35,
    },
    {
      id: 5,
      username: "pixelartist",
      handle: "@pixelartist",
      time: "10h",
      content:
        "Spent all day working on 8-bit sprites. There's something magical about pixel-perfect art. 🎮",
      replies: 7,
      retweets: 18,
      likes: 89,
    },
    {
      id: 6,
      username: "oldschool",
      handle: "@oldschool",
      time: "12h",
      content:
        "Why do modern websites need 50MB of JavaScript just to display text? Bring back the 90s web!",
      replies: 34,
      retweets: 92,
      likes: 203,
    },
    {
      id: 7,
      username: "terminalfan",
      handle: "@terminalfan",
      time: "14h",
      content:
        "GUI is overrated. Real developers use command line interfaces. Change my mind. 💻 #terminal",
      replies: 19,
      retweets: 28,
      likes: 71,
    },
    {
      id: 8,
      username: "vintagetech",
      handle: "@vintagetech",
      time: "16h",
      content:
        "Found my old CRT monitor in the basement. Still works perfectly! They don't make them like this anymore.",
      replies: 11,
      retweets: 22,
      likes: 58,
    },
  ];

  const slowCards = [
    {
      id: 1,
      username: "slowthoughts",
      handle: "@slowthoughts",
      time: "1d",
      content:
        "Taking time to really think about architecture decisions. Rushed code is technical debt waiting to happen.",
      replies: 15,
      retweets: 31,
      likes: 78,
    },
    {
      id: 2,
      username: "mindfuldev",
      handle: "@mindfuldev",
      time: "2d",
      content:
        "Meditation before coding sessions has improved my focus tremendously. Mindfulness in software development is underrated.",
      replies: 9,
      retweets: 24,
      likes: 112,
    },
    {
      id: 3,
      username: "deepcoder",
      handle: "@deepcoder",
      time: "3d",
      content:
        "Spent the entire day on one function. But now it's perfect, readable, and will save hours of debugging later.",
      replies: 18,
      retweets: 45,
      likes: 134,
    },
    {
      id: 4,
      username: "patientprog",
      handle: "@patientprog",
      time: "4d",
      content:
        "Good software takes time. Rome wasn't built in a day, and neither should your codebase be.",
      replies: 22,
      retweets: 67,
      likes: 189,
    },
    {
      id: 5,
      username: "craftsman",
      handle: "@craftsman",
      time: "5d",
      content:
        "Refactoring legacy code is like restoring a vintage car. Slow process, but the end result is beautiful.",
      replies: 13,
      retweets: 38,
      likes: 95,
    },
    {
      id: 6,
      username: "qualityfirst",
      handle: "@qualityfirst",
      time: "6d",
      content:
        "Feature complete doesn't mean quality complete. Testing, optimization, and documentation matter too.",
      replies: 27,
      retweets: 82,
      likes: 156,
    },
    {
      id: 7,
      username: "philosophdev",
      handle: "@philosophdev",
      time: "7d",
      content:
        "In programming, as in life, sometimes the best action is patient inaction. Think before you type.",
      replies: 8,
      retweets: 19,
      likes: 73,
    },
    {
      id: 8,
      username: "contemplator",
      handle: "@contemplator",
      time: "1w",
      content:
        "Every line of code is a decision. Every decision shapes the future. Choose wisely, code slowly.",
      replies: 16,
      retweets: 41,
      likes: 127,
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
