import React, { useEffect, useRef, useState } from 'react';
import { FileDropzone } from '../components/ui/FileDropzone';
import heroBg from '../images/urfu-building.png';
import exampleCompare from '../images/pres-examle.png';
import processingImage from '../images/proccesing.png';
import cancelledImage from '../images/proccecing-end.png';
import errorImage from '../images/error.png';
import successImage from '../images/success.png';
import downloadIcon from '../images/download.png';
import '../styles/landing.css';

export const LandingPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [historyItems, setHistoryItems] = useState([]);
  const [isHistorySaved, setIsHistorySaved] = useState(false);
  const [progress, setProgress] = useState(0);
  const uploadRef = useRef(null);
  const isCompleted = selectedFile && !isProcessing && progress >= 100;

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    if (file) {
      setProgress(0);
      setIsCancelled(false);
      setIsError(false);
      setIsHistorySaved(false);
      setIsProcessing(true);
    } else {
      setIsProcessing(false);
      setIsCancelled(false);
      setIsError(false);
      setProgress(0);
      setIsHistorySaved(false);
    }
  };

  useEffect(() => {
    if (!isProcessing) return undefined;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          return 100;
        }
        return Math.min(prev + 10, 100);
      });
    }, 800);

    return () => clearInterval(interval);
  }, [isProcessing]);

  useEffect(() => {
    if (!isCompleted || !selectedFile || isHistorySaved) return;

    const now = new Date();
    const datePart = now.toLocaleDateString('ru-RU');
    const timePart = now.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    });

    setHistoryItems((prev) => [
      {
        id: `${selectedFile.name}-${now.getTime()}`,
        name: selectedFile.name,
        createdAt: `${datePart} ${timePart}`,
      },
      ...prev,
    ]);
    setIsHistorySaved(true);
  }, [isCompleted, selectedFile, isHistorySaved]);

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
          <h2 className="landing-upload-heading">
            {isError ? 'Ошибка' : isProcessing || isCancelled ? 'Обработка' : isCompleted ? '' : 'Добавьте файл'}
          </h2>
          <div className="landing-dropzone-block">
            {isError ? (
              <div className="upload-processing">
                <div className="upload-processing-status">
                  <img src={errorImage} alt="" className="upload-processing-icon" />
                  <p className="upload-processing-text">Файл повреждён или имеет неверный формат</p>
                </div>
                <p className="upload-error-hint">Поддерживаются файлы .pptx до 50 МБ</p>
                <button
                  type="button"
                  className="landing-btn upload-processing-back"
                  onClick={() => {
                    setIsError(false);
                    setProgress(0);
                    setSelectedFile(null);
                    setIsHistorySaved(false);
                  }}
                >
                  Попробовать снова
                </button>
              </div>
            ) : isProcessing ? (
              <div className="upload-processing">
                <div className="upload-processing-status">
                  <img src={processingImage} alt="" className="upload-processing-icon" />
                  <p className="upload-processing-text">
                    Презентация готова на {Math.round(progress)} %
                  </p>
                </div>
                <div className="upload-processing-bar">
                  <div
                    className="upload-processing-bar-fill"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <button
                  type="button"
                  className="landing-btn upload-processing-cancel"
                  onClick={() => {
                    setIsProcessing(false);
                    setIsCancelled(true);
                  }}
                >
                  Отменить обработку
                </button>
              </div>
            ) : isCancelled ? (
              <div className="upload-processing">
                <div className="upload-processing-status">
                  <img src={cancelledImage} alt="" className="upload-processing-icon" />
                  <p className="upload-processing-text">Обработка отменена</p>
                </div>
                <div className="upload-processing-bar">
                  <div
                    className="upload-processing-bar-fill is-cancelled"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <button
                  type="button"
                  className="landing-btn upload-processing-back"
                  onClick={() => {
                    setIsCancelled(false);
                    setProgress(0);
                    setSelectedFile(null);
                    setIsHistorySaved(false);
                  }}
                >
                  Назад
                </button>
              </div>
            ) : isCompleted ? (
              <div className="upload-processing">
                <div className="upload-success-title">Успешно!</div>
                <div className="upload-processing-status">
                  <img src={successImage} alt="" className="upload-processing-icon" />
                  <p className="upload-processing-text">Ваша Презентация готова!</p>
                </div>
                <div className="upload-processing-bar">
                  <div
                    className="upload-processing-bar-fill"
                    style={{ width: '100%' }}
                  />
                </div>
                <button
                  type="button"
                  className="landing-btn upload-processing-download"
                  onClick={() => console.log('Скачать результат')}
                >
                  Скачать
                  <img src={downloadIcon} alt="" className="upload-download-icon" />
                </button>
              </div>
            ) : (
              <FileDropzone
                onFileSelect={handleFileSelect}
                onFileError={() => {
                  setIsError(true);
                  setIsProcessing(false);
                  setIsCancelled(false);
                  setSelectedFile(null);
                  setProgress(0);
                  setIsHistorySaved(false);
                }}
                accept=".pptx"
                maxSize={50 * 1024 * 1024}
              />
            )}
          </div>
        </div>

        <button
          type="button"
          className="landing-btn landing-btn-history"
          onClick={() => setShowHistory(true)}
        >
          История работ
        </button>

        {showHistory && (
          <div className="history-panel">
            <h3 className="history-title">Ваша история</h3>
            {historyItems.length === 0 ? (
              <p className="history-empty">У вас пока нет презентаций</p>
            ) : (
              <div className="history-grid">
                {historyItems.map((item) => (
                  <article key={item.id} className="history-item">
                    <div className="history-item-icon" aria-hidden>
                      P
                    </div>
                    <div className="history-item-content">
                      <p className="history-item-name">{item.name}</p>
                      <p className="history-item-date">{item.createdAt}</p>
                      <div className="history-item-actions">
                        <button type="button" className="landing-btn history-item-btn">
                          Попробовать снова
                        </button>
                        <button type="button" className="landing-btn history-item-btn">
                          Скачать
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
            <button
              type="button"
              className="landing-btn history-hide-btn"
              onClick={() => setShowHistory(false)}
            >
              Скрыть
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
