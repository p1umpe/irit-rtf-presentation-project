import React, { useState, useRef, useCallback, useEffect } from 'react';
import '../../styles/ImageCompareSlider.css';

export const ImageCompareSlider = ({
  beforeImage,
  afterImage,
  beforeAlt = "До обработки",
  afterAlt = "После обработки",
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const width = rect.width;
    let newPosition = (x / width) * 100;
    newPosition = Math.min(Math.max(newPosition, 0), 100);
    setSliderPosition(newPosition);
  }, []);

  const onMouseMove = useCallback((e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const onTouchMove = useCallback((e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    handleMove(touch.clientX);
  }, [isDragging, handleMove]);

  const onMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const onTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('touchmove', onTouchMove);
      window.addEventListener('touchend', onTouchEnd);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [isDragging, onMouseMove, onMouseUp, onTouchMove, onTouchEnd]);

  const showBeforeLabel = sliderPosition > 15;
  const showAfterLabel = sliderPosition < 85;

  return (
    <div className="image-compare-container">
      <div
        ref={containerRef}
        className="image-compare-wrapper"
        onMouseDown={(e) => {
          e.preventDefault();
          setIsDragging(true);
          handleMove(e.clientX);
        }}
        onTouchStart={(e) => {
          e.preventDefault();
          setIsDragging(true);
          const touch = e.touches[0];
          handleMove(touch.clientX);
        }}
      >
        <img
          src={afterImage}
          alt={afterAlt}
          className="image-compare-after"
          draggable="false"
        />

        <div
          className="image-compare-before-container"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={beforeImage}
            alt={beforeAlt}
            className="image-compare-before"
            draggable="false"
          />
        </div>

        <div
          className="image-compare-slider"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="image-compare-slider-line" />
          <div className="image-compare-slider-handle">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div className="image-compare-labels">
          {showBeforeLabel && (
            <span className="image-compare-label before-label">ДО</span>
          )}
          {showAfterLabel && (
            <span className="image-compare-label after-label">ПОСЛЕ</span>
          )}
        </div>
      </div>
      
      <div className="image-compare-instruction">
        <span>Потяните ползунок, чтобы сравнить</span>
      </div>
    </div>
  );
};