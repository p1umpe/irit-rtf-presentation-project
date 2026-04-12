import React, { useCallback, useState } from 'react';

export const FileDropzone = ({ onFileSelect, accept = ".pptx", maxSize = 50 * 1024 * 1024 }) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const validateFile = (file) => {
    // Проверка расширения
    if (!file.name.toLowerCase().endsWith('.pptx')) {
      setError('Пожалуйста, загрузите файл в формате .pptx');
      return false;
    }
    
    // Проверка размера (50MB)
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

  return (
    <div className="file-dropzone-container">
      <div
        className={`file-dropzone ${isDragActive ? 'drag-active' : ''} ${selectedFile ? 'has-file' : ''}`}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onClick={() => document.getElementById('file-input').click()}
      >
        <input
          id="file-input"
          type="file"
          accept={accept}
          onChange={onFileInput}
          style={{ display: 'none' }}
        />
        
        {!selectedFile ? (
          <div className="dropzone-content">
            <div className="dropzone-icon">📁</div>
            <div className="dropzone-title">
              Перетащите файл сюда или <span className="dropzone-link">нажмите для выбора</span>
            </div>
            <div className="dropzone-hint">
              Поддерживаются файлы .pptx до 50MB
            </div>
          </div>
        ) : (
          <div className="dropzone-selected">
            <div className="selected-icon">📄</div>
            <div className="selected-info">
              <div className="selected-name">{selectedFile.name}</div>
              <div className="selected-size">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </div>
            </div>
            <button 
              className="selected-remove"
              onClick={(e) => {
                e.stopPropagation();
                removeFile();
              }}
            >
              ✕
            </button>
          </div>
        )}
      </div>
      
      {error && (
        <div className="dropzone-error">
          ⚠️ {error}
        </div>
      )}
    </div>
  );
};