import localStorage from 'local-storage';

export function getUrlFromLocalStorage() {
  return localStorage.get('ld-apiServer');
}

export function setUrlInLocalStorage(url) {
  localStorage.set('ld-apiServer', url);
}

export function getModuleEndpoint(baseUrl, moduleId, random = '') {
  return `${baseUrl}/module/${moduleId}${`/${random}`}`;
}