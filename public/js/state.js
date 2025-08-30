// State management and scroll states
export const state = {
    scrollAccumulator: 0,
    spotlightVisible: false,
    currentStateIndex: 0,
    removedPosts: new Set(),
    highlightedClients: false
};
export const scrollThreshold = 200;
export const scrollStates = [
    { type: "type", message: "design your own recommendation system...", threshold: 5000 },
    { type: "delete", message: "design your own recommendation system...", threshold: 8000 },
    { type: "type", message: "make website look cool and retro", threshold: 12000 },
    { type: "loading", message: "loading", threshold: 15000 },
    { type: "delete", message: "make website look cool and retro", threshold: 18000 },
    { type: "type", message: "remove clutter from my homepage...", threshold: 22000 },
    { type: "remove_posts", message: "remove clutter from my homepage...", threshold: 26000 },
    { type: "delete", message: "remove clutter from my homepage...", threshold: 29000 },
    { type: "type", message: "only show posts from potential clients...", threshold: 32000 },
    { type: "remove_more_posts", message: "only show posts from potential clients...", threshold: 35000 },
    { type: "highlight_clients", message: "only show posts from potential clients...", threshold: 38000 },
];
export const maxScrollLimit = 40000;
