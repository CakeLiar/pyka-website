import React, { useEffect, useRef } from "react";
import "./ScrollingContainer.css";

const ScrollingContainer = ({ cards, speed, className }) => {
  const containerRef = useRef(null);
  const scrollIntervalRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const startAutoScroll = () => {
      scrollIntervalRef.current = setInterval(() => {
        if (!container) return;

        if (
          container.scrollTop + container.clientHeight >=
          container.scrollHeight - 1
        ) {
          // Reset to top when reaching the bottom
          container.scrollTo({ top: 0, behavior: "auto" });
        } else {
          // Scroll down by 1 pixel
          container.scrollTo({
            top: container.scrollTop + 1,
            behavior: "auto",
          });
        }
      }, speed * 10); // Convert speed to milliseconds
    };

    const stopAutoScroll = () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
        scrollIntervalRef.current = null;
      }
    };

    // Start auto-scrolling after a small delay to ensure content is loaded
    const timeoutId = setTimeout(() => {
      startAutoScroll();
    }, 100);

    // Pause scrolling on hover
    container.addEventListener("mouseenter", stopAutoScroll);
    container.addEventListener("mouseleave", startAutoScroll);

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      stopAutoScroll();
      container.removeEventListener("mouseenter", stopAutoScroll);
      container.removeEventListener("mouseleave", startAutoScroll);
    };
  }, [speed, cards]);

  return (
    <div className={`scrolling-container ${className}`}>
      <div className="cards-container" ref={containerRef}>
        {cards.map((card) => (
          <div key={card.id} className="card">
            <h3 className="card-title">{card.title}</h3>
            <p className="card-content">{card.content}</p>
          </div>
        ))}
        {/* Duplicate cards for seamless scrolling */}
        {cards.map((card) => (
          <div key={`duplicate-${card.id}`} className="card">
            <h3 className="card-title">{card.title}</h3>
            <p className="card-content">{card.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollingContainer;
