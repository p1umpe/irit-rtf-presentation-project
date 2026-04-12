import { useState, useEffect } from 'react';

export const useProcessing = (totalSlides = 12, onCancel) => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [stage, setStage] = useState('Подготовка');
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(true);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const stagesList = ['Подготовка', 'Анализ слайдов', 'Применение шаблона', 'Финальная сборка'];

  const requestCancel = () => setShowConfirmDialog(true);
  const confirmCancel = () => {
    setIsProcessing(false);
    setShowConfirmDialog(false);
    if (onCancel) onCancel();
  };
  const denyCancel = () => setShowConfirmDialog(false);

  useEffect(() => {
    if (!isProcessing) return;

    let slideIndex = 1;
    
    const interval = setInterval(() => {
      if (slideIndex <= totalSlides) {
        // Обновляем прогресс
        const newProgress = (slideIndex / totalSlides) * 100;
        setProgress(newProgress);
        
        // Обновляем слайд
        setCurrentSlide(slideIndex);
        
        // Обновляем этап
        if (newProgress <= 25) setStage(stagesList[0]);
        else if (newProgress <= 50) setStage(stagesList[1]);
        else if (newProgress <= 75) setStage(stagesList[2]);
        else setStage(stagesList[3]);
        
        slideIndex++;
      } else {
        // Завершение
        setStage('Готово!');
        clearInterval(interval);
        setIsProcessing(false);
      }
    }, 1500); // Каждый слайд обрабатывается 1.5 секунды

    return () => clearInterval(interval);
  }, [isProcessing, totalSlides]);

  return {
    currentSlide,
    stage,
    progress,
    isProcessing,
    showConfirmDialog,
    totalSlides,
    requestCancel,
    confirmCancel,
    denyCancel
  };
};