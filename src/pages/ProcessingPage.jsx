import React from 'react';
import { useProcessing } from '../hooks/useProcessing';
import { ProcessingScreen } from '../components/processing/ProcessingScreen';

export const ProcessingPage = ({ onBack }) => {
  const {
    currentSlide,
    stage,
    progress,
    isProcessing,
    showConfirmDialog,
    totalSlides,
    requestCancel,
    confirmCancel,
    denyCancel
  } = useProcessing(12, onBack);

  if (!isProcessing && progress >= 100) {
    return (
      <div className="result-container">
        <div className="result-card">
          <div className="result-icon">✅</div>
          <h2>Презентация готова!</h2>
          <p className="result-description">
            Ваша презентация успешно обработана и приведена к фирменному стилю ИРИТ-РТФ
          </p>
          <button className="result-button download-button">
            Скачать презентацию
          </button>
          <button className="result-button secondary" onClick={onBack}>
            На главную
          </button>
        </div>
      </div>
    );
  }

  return (
    <ProcessingScreen
      currentSlide={currentSlide}
      totalSlides={totalSlides}
      stage={stage}
      progress={progress}
      showConfirmDialog={showConfirmDialog}
      onCancel={requestCancel}
      onConfirmCancel={confirmCancel}
      onDenyCancel={denyCancel}
    />
  );
};