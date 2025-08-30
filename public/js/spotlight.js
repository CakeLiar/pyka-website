import { state, scrollStates, maxScrollLimit } from './state.js';
import { fastCards, slowCards } from './tweetData.js';
import { populateContainer } from './ui.js';

export function showSpotlight(progress) {
    const overlay = document.getElementById("spotlight-overlay");
    const container = overlay.querySelector(".spotlight-container");
    const searchInput = overlay.querySelector(".search-input");
    if (!state.spotlightVisible && progress > 0) {
        state.spotlightVisible = true;
        overlay.style.display = "flex";
    }
    const opacity = Math.min(progress * 2, 1);
    const scale = 0.8 + progress * 0.2;
    const translateY = 30 - progress * 30;
    overlay.style.opacity = opacity;
    container.style.transform = `scale(${scale}) translateY(${translateY}px)`;
    let displayText = "";
    let showCursor = false;
    for (let i = 0; i < scrollStates.length; i++) {
        if (state.scrollAccumulator <= scrollStates[i].threshold) {
            state.currentStateIndex = i;
            break;
        }
        if (i === scrollStates.length - 1) {
            state.currentStateIndex = i;
        }
    }
    const currentState = scrollStates[state.currentStateIndex];
    const prevThreshold = state.currentStateIndex > 0 ? scrollStates[state.currentStateIndex - 1].threshold : 0;
    const stateProgress = Math.min((state.scrollAccumulator - prevThreshold) / (currentState.threshold - prevThreshold), 1);
    if (currentState.type === "type") {
        const charactersToShow = Math.floor(stateProgress * currentState.message.length);
        displayText = currentState.message.substring(0, charactersToShow);
        showCursor = charactersToShow < currentState.message.length;
    } else if (currentState.type === "delete") {
        const charactersToDelete = Math.floor(stateProgress * currentState.message.length);
        displayText = currentState.message.substring(0, currentState.message.length - charactersToDelete);
        showCursor = charactersToDelete < currentState.message.length;
    } else if (currentState.type === "loading") {
        const dots = Math.floor((Date.now() / 300) % 4);
        displayText = "loading" + ".".repeat(dots);
        showCursor = false;
    } else if (currentState.type === "remove_posts") {
        displayText = currentState.message;
        showCursor = false;
        const totalPosts = document.querySelectorAll(".tweet-card").length;
        const postsToRemove = Math.floor(stateProgress * Math.min(totalPosts * 0.7, 10));
        document.querySelectorAll(".tweet-card").forEach((card, index) => {
            if (index < postsToRemove && !state.removedPosts.has(index)) {
                state.removedPosts.add(index);
                removePostWithAnimation(card, index * 100);
            }
        });
    } else if (currentState.type === "remove_more_posts") {
        displayText = currentState.message;
        showCursor = false;
        const remainingPosts = document.querySelectorAll(".tweet-card:not(.removing)");
        const postsToRemove = Math.floor(stateProgress * Math.min(remainingPosts.length * 0.8, 15));
        Array.from(remainingPosts).forEach((card, index) => {
            const content = card.querySelector(".tweet-content").textContent.toLowerCase();
            const isClient = content.includes("business") || content.includes("startup") || content.includes("tech") || content.includes("development") || content.includes("software");
            if (index < postsToRemove && !isClient) {
                removePostWithAnimation(card, index * 80);
            }
        });
    } else if (currentState.type === "highlight_clients") {
        displayText = currentState.message;
        showCursor = false;
        if (!state.highlightedClients && stateProgress > 0.5) {
            state.highlightedClients = true;
            hideSpotlightForClients();
            highlightPotentialClients();
        }
    }
    if (showCursor && progress > 0.1) {
        const shouldBlink = Math.floor(Date.now() / 500) % 2;
        displayText += shouldBlink ? "|" : "";
    }
    if (searchInput) {
        searchInput.value = displayText;
    }
    if (state.scrollAccumulator > 15000) {
        document.body.classList.add("retro-mode");
    } else {
        document.body.classList.remove("retro-mode");
    }
}

export function removePostWithAnimation(card, delay = 0) {
    setTimeout(() => {
        card.classList.add("warning-flash");
        card.style.borderColor = "rgba(255, 59, 48, 0.8)";
        card.style.boxShadow = "0 0 30px rgba(255, 59, 48, 0.9)";
        setTimeout(() => {
            card.classList.remove("warning-flash");
            card.classList.add("removing");
            card.style.transition = "all 0.25s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
            card.style.transformOrigin = "center center";
            card.style.transform = "scale(0.1) rotate(5deg) translateY(-30px)";
            card.style.opacity = "0";
            card.style.filter = "blur(3px) brightness(0.3)";
            card.style.boxShadow = "0 0 20px rgba(255, 59, 48, 0.8)";
            card.style.borderColor = "#ff3b30";
            card.style.backgroundColor = "rgba(255, 59, 48, 0.1)";
            setTimeout(() => {
                if (card.parentNode) {
                    card.remove();
                }
            }, 250);
        }, 150);
    }, delay);
}

export function hideSpotlightForClients() {
    const overlay = document.getElementById("spotlight-overlay");
    overlay.style.transition = "opacity 1s ease-out";
    overlay.style.opacity = "0";
    setTimeout(() => {
        overlay.style.display = "none";
    }, 1000);
}

export function highlightPotentialClients() {
    const remainingPosts = document.querySelectorAll(".tweet-card:not(.removing)");
    remainingPosts.forEach((card, index) => {
        const content = card.querySelector(".tweet-content").textContent.toLowerCase();
        const isClient = content.includes("business") || content.includes("startup") || content.includes("tech") || content.includes("development") || content.includes("software");
        if (isClient) {
            setTimeout(() => {
                card.classList.add("potential-client");
                const badge = document.createElement("div");
                badge.className = "client-badge";
                badge.textContent = "💼 Potential Client";
                card.appendChild(badge);
            }, index * 200);
        }
    });
}

export function hideSpotlight() {
    const overlay = document.getElementById("spotlight-overlay");
    const container = overlay.querySelector(".spotlight-container");
    const searchInput = overlay.querySelector(".search-input");
    if (!state.spotlightVisible) return;
    state.spotlightVisible = false;
    overlay.style.opacity = "0";
    container.style.transform = "scale(0.8) translateY(30px)";
    if (searchInput) {
        searchInput.value = "";
    }
    state.removedPosts.clear();
    state.highlightedClients = false;
    populateContainer("fast-container", fastCards);
    populateContainer("slow-container", slowCards);
    document.querySelectorAll(".potential-client").forEach((card) => {
        card.classList.remove("potential-client");
        const badge = card.querySelector(".client-badge");
        if (badge) badge.remove();
    });
    setTimeout(() => {
        if (!state.spotlightVisible) {
            overlay.style.display = "none";
            state.scrollAccumulator = 0;
        }
    }, 300);
}
