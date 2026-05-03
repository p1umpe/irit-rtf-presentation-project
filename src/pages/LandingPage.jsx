import React, { useRef, useState } from 'react';
import { FileDropzone } from '../components/ui/FileDropzone';
import heroBg from '../images/urfu-building.png';
import exampleCompare from '../images/pres-examle.png';
import '../styles/landing.css';

export const LandingPage = ({ onStartProcessing, onHistoryClick }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const uploadRef = useRef(null);

  const handleStartProcessing = () => {
    if (selectedFile) {
      onStartProcessing(selectedFile);
    }
  };

  const scrollToUpload = () => {
    uploadRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="landing-page">
      <section
        className="landing-hero"
        style={{ backgroundImage: `url(${heroBg})` }}
        aria-label="Главный баннер"
      >
        <div className="landing-hero-inner">
          <div className="landing-hero-card">
            <h1 className="landing-hero-heading">
              Автоматическое приведение презентаций к фирменному шаблону ИРИТ-РТФ
            </h1>
            <p className="landing-hero-tagline">
              Вместо сотен правок – одно нажатие
            </p>
            <button
              type="button"
              className="landing-btn landing-btn-cta"
              onClick={scrollToUpload}
            >
              ПОПРОБОВАТЬ СЕЙЧАС
            </button>
          </div>
        </div>
      </section>

      <section className="landing-examples" aria-labelledby="landing-examples-heading">
        <p id="landing-examples-heading" className="landing-examples-caption">
          Примеры работ нашего сервиса
        </p>
        <img
          src={exampleCompare}
          alt="Сравнение слайда до и после стилизации"
          className="landing-examples-image"
          loading="lazy"
        />
      </section>

      <section
        ref={uploadRef}
        id="landing-upload"
        className="landing-upload-wrap"
      >
        <div className="landing-upload-card">
          <h2 className="landing-upload-heading">Добавьте файл</h2>
          <div className="landing-dropzone-block">
            <FileDropzone
              onFileSelect={setSelectedFile}
              accept=".pptx"
              maxSize={50 * 1024 * 1024}
            />
          </div>
          <button
            type="button"
            className="landing-btn landing-btn-continue"
            onClick={handleStartProcessing}
            disabled={!selectedFile}
          >
            Продолжить
          </button>
        </div>

        <button
          type="button"
          className="landing-btn landing-btn-history"
          onClick={onHistoryClick}
        >
          История работ
        </button>
      </section>
    </div>
  );
};
