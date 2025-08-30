// UI functions
export function createTweetCard(card) {
    return `
        <div class="tweet-card">
            <div class="tweet-header">
                <div class="tweet-avatar">${card.username.charAt(0).toUpperCase()}</div>
                <div class="tweet-user-info">
                    <span class="tweet-username">${card.username}</span>
                    <span class="tweet-handle">${card.handle}</span>
                    <span class="tweet-separator">·</span>
                    <span class="tweet-time">${card.time}</span>
                </div>
            </div>
            <div class="tweet-content">${card.content}</div>
            <div class="tweet-actions">
                <div class="tweet-action reply">
                    <span class="action-icon">💬</span>
                    <span class="action-count">${card.replies}</span>
                </div>
                <div class="tweet-action retweet">
                    <span class="action-icon">🔄</span>
                    <span class="action-count">${card.retweets}</span>
                </div>
                <div class="tweet-action like">
                    <span class="action-icon">❤️</span>
                    <span class="action-count">${card.likes}</span>
                </div>
            </div>
        </div>
    `;
}

export function populateContainer(containerId, cards) {
    const container = document.getElementById(containerId);
    if (!container) return;
    let html = "";
    for (let i = 0; i < 8; i++) {
        html += cards.map(createTweetCard).join("");
    }
    container.innerHTML = html;
}

export function createAutoScroll(containerId, speed) {
    const container = document.getElementById(containerId);
    if (!container) return;
    let scrollInterval;
    let scrollPosition = 0;
    function startScrolling() {
        scrollInterval = setInterval(() => {
            scrollPosition++;
            container.scrollTop = scrollPosition;
            if (container.scrollTop + container.clientHeight >= container.scrollHeight - 10) {
                scrollPosition = 0;
                container.scrollTop = 0;
            }
        }, speed);
    }
    setTimeout(startScrolling, 500);
}
