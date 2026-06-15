import { API_BASE_URL, USE_MOCK_API } from '../config/api.js';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, options);

  if (!response.ok) {
    const message = await response.text().catch(() => response.statusText);
    throw new Error(message || `HTTP ${response.status}`);
  }

  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return response.json();
  }

  return response;
}

/** POST /api/presentations — загрузка .pptx, ответ: { jobId } */
export async function uploadPresentation(file) {
  if (USE_MOCK_API) {
    return { jobId: `mock-${Date.now()}` };
  }

  const formData = new FormData();
  formData.append('file', file);

  return request('/api/presentations', {
    method: 'POST',
    body: formData,
  });
}

/** GET /api/presentations/:jobId — статус, ответ: { progress, status } */
export async function getPresentationStatus(jobId) {
  if (USE_MOCK_API) {
    return null;
  }

  return request(`/api/presentations/${jobId}`);
}

/** POST /api/presentations/:jobId/cancel */
export async function cancelPresentation(jobId) {
  if (USE_MOCK_API) {
    return { status: 'cancelled' };
  }

  return request(`/api/presentations/${jobId}/cancel`, { method: 'POST' });
}

/** GET /api/presentations/:jobId/download — файл .pptx */
export async function downloadPresentation(jobId) {
  if (USE_MOCK_API) {
    return null;
  }

  const response = await request(`/api/presentations/${jobId}/download`);
  return response.blob();
}

/** GET /api/presentations/history — список работ */
export async function getPresentationHistory() {
  if (USE_MOCK_API) {
    return [];
  }

  return request('/api/presentations/history');
}
