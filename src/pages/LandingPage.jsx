import React, { useEffect, useRef, useState } from 'react';
import { FileDropzone } from '../components/ui/FileDropzone';
import { ImageCompareSlider } from '../components/ui/ImageCompareSlider';
import { useThemeAssets } from '../hooks/useThemeAssets';
import {
  uploadPresentation,
  getPresentationStatus,
  cancelPresentation,
  downloadPresentation,
  getPresentationHistory,
} from '../api/presentations';
import { USE_MOCK_API } from '../config/api';
import '../styles/landing.css';

export const LandingPage = () => {
  const {
    heroBg,
    exampleCompare,
    exampleCompareAfter,
    processingImage,
    cancelledImage,
    errorImage,
    successImage,
    shareImage,
    downloadIcon,
  } = useThemeAssets();

  const [selectedFile, setSelectedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [historyItems, setHistoryItems] = useState([]);
  const [isHistorySaved, setIsHistorySaved] = useState(false);
  const [progress, setProgress] = useState(0);
  const [jobId, setJobId] = useState(null);
  const uploadRef = useRef(null);
  const isCompleted = selectedFile && !isProcessing && progress >= 100;

  const resetUploadState = () => {
    setIsProcessing(false);
    setIsCancelled(false);
    setIsError(false);
    setProgress(0);
    setSelectedFile(null);
    setJobId(null);
    setIsHistorySaved(false);
  };

  const handleFileSelect = async (file) => {
    setSelectedFile(file);
    if (!file) {
      resetUploadState();
      return;
    }

    setProgress(0);
    setIsCancelled(false);
    setIsError(false);
    setIsHistorySaved(false);

    try {
      const { jobId: newJobId } = await uploadPresentation(file);
      setJobId(newJobId);
      setIsProcessing(true);
    } catch {
      setIsError(true);
      setSelectedFile(null);
    }
  };

  useEffect(() => {
    if (!isProcessing) return undefined;

    if (USE_MOCK_API) {
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
    }

    if (!jobId) return undefined;

    const pollStatus = async () => {
      try {
        const data = await getPresentationStatus(jobId);
        setProgress(data.progress ?? 0);

        if (data.status === 'completed') {
          setIsProcessing(false);
          setProgress(100);
        } else if (data.status === 'error') {
          setIsProcessing(false);
          setIsError(true);
        }
      } catch {
        setIsProcessing(false);
        setIsError(true);
      }
    };

    pollStatus();
    const interval = setInterval(pollStatus, 1000);
    return () => clearInterval(interval);
  }, [isProcessing, jobId]);

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

  useEffect(() => {
    if (!showHistory || USE_MOCK_API) return;

    getPresentationHistory()
      .then((items) => setHistoryItems(items))
      .catch(() => setHistoryItems([]));
  }, [showHistory]);

  const handleCancelProcessing = async () => {
    if (jobId && !USE_MOCK_API) {
      try {
        await cancelPresentation(jobId);
      } catch {

      }
    }
    setIsProcessing(false);
    setIsCancelled(true);
  };

  const handleDownload = async () => {
    if (USE_MOCK_API || !jobId) {
      console.log('Скачать результат (mock)');
      return;
    }

    try {
      const blob = await downloadPresentation(jobId);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = selectedFile?.name || 'presentation.pptx';
      link.click();
      URL.revokeObjectURL(url);
    } catch {
      setIsError(true);
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
        <ImageCompareSlider
          beforeImage={exampleCompare}
          afterImage={exampleCompareAfter}
          beforeAlt="Слайд до обработки"
          afterAlt="Слайд после обработки"
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
                    resetUploadState();
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
                  onClick={handleCancelProcessing}
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
                  onClick={resetUploadState}
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
                  onClick={handleDownload}
                >
                  Скачать
                  <img src={downloadIcon} alt="" className="upload-download-icon" />
                </button>
              </div>
            ) : (
              <FileDropzone
                uploadIcon={shareImage}
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
