import React, { useEffect, useRef } from "react";
import "./ScrollingContainer.css";

const ScrollingContainer = ({ cards, speed, className }) => {
  const containerRef = useRef(null);
  const scrollIntervalRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const startAutoScroll = () => {
      if (scrollIntervalRef.current) return;

      console.log(`Starting scroll for container with speed ${speed}`);

      scrollIntervalRef.current = setInterval(() => {
        if (!container) return;

        // Scroll down by 1 pixel
        container.scrollTop += 1;

        // Reset to top when reaching the bottom
        if (
          container.scrollTop + container.clientHeight >=
          container.scrollHeight - 5
        ) {
          container.scrollTop = 0;
          console.log("Reset scroll to top");
        }
      }, speed * 10); // Convert speed to milliseconds
    };

    const stopAutoScroll = () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
        scrollIntervalRef.current = null;
      }
    };

    // Start auto-scrolling after content loads
    const timeoutId = setTimeout(() => {
      console.log(
        `Container height: ${container.scrollHeight}px, client height: ${container.clientHeight}px`,
      );
      if (container.scrollHeight > container.clientHeight) {
        startAutoScroll();
      } else {
        console.warn("Container not tall enough to scroll");
      }
    }, 500);

    // Pause scrolling on hover
    container.addEventListener("mouseenter", stopAutoScroll);
    container.addEventListener("mouseleave", () => {
      setTimeout(startAutoScroll, 100);
    });

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      stopAutoScroll();
      if (container) {
        container.removeEventListener("mouseenter", stopAutoScroll);
        container.removeEventListener("mouseleave", startAutoScroll);
      }
    };
  }, [speed, cards]);

  return (
    <div className={`scrolling-container ${className}`}>
      <div className="cards-container" ref={containerRef}>
        {/* Triple the cards for continuous scrolling */}
        {cards.map((card) => (
          <div key={card.id} className="tweet-card">
            <div className="tweet-header">
              <div className="tweet-avatar">@</div>
              <div className="tweet-user-info">
                <div className="tweet-username">{card.username}</div>
                <div className="tweet-handle">
                  {card.handle} · {card.time}
                </div>
              </div>
            </div>
            <div className="tweet-content">{card.content}</div>
            <div className="tweet-actions">
              <div className="tweet-action">
                <span className="action-icon">↳</span>
                <span className="action-count">{card.replies}</span>
              </div>
              <div className="tweet-action">
                <span className="action-icon">⟲</span>
                <span className="action-count">{card.retweets}</span>
              </div>
              <div className="tweet-action">
                <span className="action-icon">♡</span>
                <span className="action-count">{card.likes}</span>
              </div>
            </div>
          </div>
        ))}
        {/* Second set of cards */}
        {cards.map((card) => (
          <div key={`duplicate-${card.id}`} className="tweet-card">
            <div className="tweet-header">
              <div className="tweet-avatar">@</div>
              <div className="tweet-user-info">
                <div className="tweet-username">{card.username}</div>
                <div className="tweet-handle">
                  {card.handle} · {card.time}
                </div>
              </div>
            </div>
            <div className="tweet-content">{card.content}</div>
            <div className="tweet-actions">
              <div className="tweet-action">
                <span className="action-icon">↳</span>
                <span className="action-count">{card.replies}</span>
              </div>
              <div className="tweet-action">
                <span className="action-icon">⟲</span>
                <span className="action-count">{card.retweets}</span>
              </div>
              <div className="tweet-action">
                <span className="action-icon">♡</span>
                <span className="action-count">{card.likes}</span>
              </div>
            </div>
          </div>
        ))}
        {/* Third set of cards */}
        {cards.map((card) => (
          <div key={`triple-${card.id}`} className="tweet-card">
            <div className="tweet-header">
              <div className="tweet-avatar">@</div>
              <div className="tweet-user-info">
                <div className="tweet-username">{card.username}</div>
                <div className="tweet-handle">
                  {card.handle} · {card.time}
                </div>
              </div>
            </div>
            <div className="tweet-content">{card.content}</div>
            <div className="tweet-actions">
              <div className="tweet-action">
                <span className="action-icon">↳</span>
                <span className="action-count">{card.replies}</span>
              </div>
              <div className="tweet-action">
                <span className="action-icon">⟲</span>
                <span className="action-count">{card.retweets}</span>
              </div>
              <div className="tweet-action">
                <span className="action-icon">♡</span>
                <span className="action-count">{card.likes}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollingContainer;
