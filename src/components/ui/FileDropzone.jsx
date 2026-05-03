import React, { useCallback, useId, useRef, useState } from 'react';
import uploadGraphic from '../../images/share.png';

export const FileDropzone = ({
  onFileSelect,
  accept = '.pptx',
  maxSize = 50 * 1024 * 1024,
}) => {
  const inputId = useId();
  const inputRef = useRef(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const validateFile = (file) => {
    if (!file.name.toLowerCase().endsWith('.pptx')) {
      setError('Пожалуйста, загрузите файл в формате .pptx');
      return false;
    }

    if (file.size > maxSize) {
      setError('Файл слишком большой. Максимальный размер 50MB');
      return false;
    }

    setError(null);
    return true;
  };

  const handleFile = (file) => {
    if (validateFile(file)) {
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  const onDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  }, []);

  const onDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  }, []);

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  }, []);

  const onFileInput = useCallback((e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  }, []);

  const removeFile = () => {
    setSelectedFile(null);
    setError(null);
    onFileSelect(null);
  };

  const openPicker = () => inputRef.current?.click();

  return (
    <div className="file-dropzone-container">
      <div
        role="button"
        tabIndex={0}
        className={`file-dropzone ${isDragActive ? 'drag-active' : ''} ${selectedFile ? 'has-file' : ''}`}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onClick={openPicker}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openPicker();
          }
        }}
      >
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept={accept}
          onChange={onFileInput}
          style={{ display: 'none' }}
          aria-label="Выбрать файл презентации .pptx"
        />

        {!selectedFile ? (
          <div className="dropzone-content">
            <div className="dropzone-icon">
              <img
                src={uploadGraphic}
                alt=""
                className="dropzone-upload-graphic"
              />
            </div>
            <div className="dropzone-title">
              Нажмите для выбора или перетащите файл сюда
            </div>
            <div className="dropzone-hint">
              Поддерживаются файлы .pptx до 50 МБ
            </div>
          </div>
        ) : (
          <div className="dropzone-selected">
            <div className="selected-icon" aria-hidden>
              📄
            </div>
            <div className="selected-info">
              <div className="selected-name">{selectedFile.name}</div>
              <div className="selected-size">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </div>
            </div>
            <button
              type="button"
              className="selected-remove"
              onClick={(e) => {
                e.stopPropagation();
                removeFile();
              }}
              aria-label="Убрать файл"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {error && <div className="dropzone-error">⚠️ {error}</div>}
    </div>
  );
};
