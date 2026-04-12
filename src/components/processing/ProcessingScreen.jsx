import React from 'react';
import { ProgressBar } from '../ui/ProgressBar';

const GearIcon = () => (
  <svg 
    className="gear-icon" 
    viewBox="0 0 24 24" 
    width="64" 
    height="64" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H5.78a1.65 1.65 0 0 0-1.51 1 1.65 1.65 0 0 0 .33 1.82l.07.08A10 10 0 0 0 12 17.66a10 10 0 0 0 6.18-2.33l.07-.08z" />
    <path d="M12 3v2" />
    <path d="M12 19v2" />
    <path d="M5 5l1.5 1.5" />
    <path d="M17.5 17.5L19 19" />
    <path d="M3 12h2" />
    <path d="M19 12h2" />
    <path d="M5 19l1.5-1.5" />
    <path d="M17.5 6.5L19 5" />
  </svg>
);

export const ProcessingScreen = ({ 
  currentSlide, 
  totalSlides, 
  stage, 
  progress, 
  showConfirmDialog,
  onCancel,
  onConfirmCancel,
  onDenyCancel
}) => {
  return (
    <div className="processing-screen">
      <div className="processing-card">
        <div className="gear-container">
          <GearIcon />
        </div>

        <h2 className="processing-title">Обработка презентации</h2>

        <div className="stage-container">
          <span className="stage-label">Текущий этап:</span>
          <span className="stage-value" key={stage}>
            {stage}
          </span>
        </div>

        <div className="slide-counter">
          Слайд {currentSlide} из {totalSlides}
        </div>

        <div className="progress-section">
          <ProgressBar progress={progress} height={8} />
          <div className="progress-percentage">{Math.round(progress)}%</div>
        </div>

        <button className="cancel-button" onClick={onCancel}>
          Отменить обработку
        </button>
      </div>

      {showConfirmDialog && (
        <div className="confirm-dialog-overlay">
          <div className="confirm-dialog">
            <div className="confirm-dialog-icon">⚠️</div>
            <h3>Вы уверены?</h3>
            <p>Весь прогресс обработки будет потерян.</p>
            <div className="confirm-dialog-buttons">
              <button className="confirm-dialog-btn cancel" onClick={onDenyCancel}>
                Нет, продолжить
              </button>
              <button className="confirm-dialog-btn confirm" onClick={onConfirmCancel}>
                Да, отменить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};