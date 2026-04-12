import React, { useState } from 'react';
import { FileDropzone } from '../components/ui/FileDropzone';
import '../styles/landing.css';

export const LandingPage = ({ onStartProcessing, onHistoryClick }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleStartProcessing = () => {
    if (selectedFile) {
      onStartProcessing(selectedFile);
    }
  };

  return (
    <div className="landing-page">
      <main className="landing-main">
        {/* Главный блок */}
        <div className="landing-card">
          <h2 className="card-title">
            Приведите презентацию<br />
            к единому стилю за минуту!
          </h2>
          
          <p className="card-subtitle">
            Поддерживаются файлы .pptx до 50 МБ
          </p>

          {/* Примеры работы */}
          <div className="examples-section">
            <h3 className="examples-title">Примеры работы сервиса</h3>
            
            <div className="examples-row">
              {/* Пример 1 */}
              <div className="example-block">
                <div className="example-item">
                  <div className="example-label before-label">До</div>
                  <div className="example-content before">
                    Слайд с текстом
                  </div>
                </div>
                <div className="example-arrow-down">↓</div>
                <div className="example-item">
                  <div className="example-label after-label">После</div>
                  <div className="example-content after">
                    Слайд с текстом (стилизованный)
                  </div>
                </div>
              </div>

              {/* Пример 2 */}
              <div className="example-block">
                <div className="example-item">
                  <div className="example-label before-label">До</div>
                  <div className="example-content before">
                    Слайд с текстом и картинкой
                  </div>
                </div>
                <div className="example-arrow-down">↓</div>
                <div className="example-item">
                  <div className="example-label after-label">После</div>
                  <div className="example-content after">
                    Слайд с текстом и картинкой (стилизованный)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Drag & Drop зона */}
          <div className="dropzone-section">
            <FileDropzone 
              onFileSelect={setSelectedFile}
              accept=".pptx"
              maxSize={50 * 1024 * 1024}
            />
          </div>

          {/* Кнопки */}
          <div className="action-buttons">
            <button 
              className="process-button"
              onClick={handleStartProcessing}
              disabled={!selectedFile}
            >
              Начать стилизацию →
            </button>
            
            <button 
              className="history-button"
              onClick={onHistoryClick}
            >
              📋 История загрузок
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};