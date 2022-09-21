import localStorage from 'local-storage';

export function getFirstFlagFromLocalStorage() {
  return localStorage.get('ld-firstFlag');
}

export function setFirstFlagInLocalStorage(key) {
  localStorage.set('ld-firstFlag', key);
}