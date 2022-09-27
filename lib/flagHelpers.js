import localStorage from 'local-storage';

export function getSdkKeyFromLocalStorage() {
  return localStorage.get('ld-sdkKey');
}

export function setSdkKeyInLocalStorage(key) {
  localStorage.set('ld-sdkKey', key);
}

export function getFirstFlagFromLocalStorage() {
  return localStorage.get('ld-firstFlag');
}

export function setFirstFlagInLocalStorage(key) {
  localStorage.set('ld-firstFlag', key);
}

export function getFirstFlagValueFromLocalStorage() {
  return localStorage.get('ld-firstFlagValue');
}

export function setFirstFlagValueInLocalStorage(val) {
  localStorage.set('ld-firstFlagValue', val);
}

// Tells whether the feature is working (from backend module)
export function getFeatureStatusFromLocalStorage() {
  return localStorage.get('ld-featureStatus');
}

export function setFeatureStatusInLocalStorage(status) {
  localStorage.set('ld-featureStatus', status);
}