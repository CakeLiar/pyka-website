console.log('main.js loaded');

// Waitlist form integration
function handleWaitlistForm(formId, inputId) {
    const form = document.getElementById(formId);
    if (!form) return;
    console.log(`Attached listener to ${formId}`);
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent page refresh
        const emailInput = document.getElementById(inputId);
        const email = emailInput.value.trim();
        if (!email) return;
        console.log(`[WAITLIST] Submitting email: ${email}`);
        fetch('http://localhost:7071/api/addEmail', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        })
        .then(async res => {
            let data;
            try {
                data = await res.json();
            } catch (err) {
                console.error('[WAITLIST] Error parsing response:', err);
                alert('Invalid server response.');
                return;
            }
            console.log('[WAITLIST] API response:', data);
            if (data.success) {
                emailInput.value = '';
                alert('You have been added to the waitlist!');
            } else {
                alert(data.error || 'Failed to join waitlist.');
            }
        })
        .catch((err) => {
            console.error('[WAITLIST] Network error:', err);
            alert('Network error. Please try again later.');
        });
    });
}

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
    handleWaitlistForm('waitlist-form', 'waitlist-email');
    handleWaitlistForm('waitlist-popup-form', 'waitlist-popup-email');
    console.log('Multi-state scroll system initialized');
});
