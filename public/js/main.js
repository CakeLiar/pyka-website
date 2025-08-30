import { fastCards, slowCards } from './tweetData.js';
import {
    state,
    scrollThreshold,
    scrollStates,
    maxScrollLimit
} from './state.js';
import { populateContainer, createAutoScroll } from './ui.js';
import { showSpotlight, hideSpotlight } from './spotlight.js';

// State is managed via ES module imports/exports

document.addEventListener('wheel', function (e) {
    const delta = e.deltaY;
    if (delta > 0) {
        state.scrollAccumulator = Math.min(state.scrollAccumulator + delta, maxScrollLimit);
        const progress = Math.min(state.scrollAccumulator / scrollThreshold, 1);
        showSpotlight(progress);
    } else if (delta < 0) {
        state.scrollAccumulator = Math.max(0, state.scrollAccumulator + delta);
        if (state.scrollAccumulator <= 10) {
            hideSpotlight();
        } else {
            const progress = Math.min(state.scrollAccumulator / scrollThreshold, 1);
            showSpotlight(progress);
        }
    }
    e.preventDefault();
}, { passive: false });

document.addEventListener('DOMContentLoaded', function () {
    populateContainer('fast-container', fastCards);
    populateContainer('slow-container', slowCards);
    createAutoScroll('fast-container', 50);
    createAutoScroll('slow-container', 15);
    console.log('Multi-state scroll system initialized');
});
