import { UserPreferences, DEFAULT_PREFERENCES } from '../types/settings';

const STORAGE_KEY_PREFS = 'resolveiq_user_preferences_v1';

export function loadUserPreferences(): UserPreferences {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PREFS);
    if (!raw) return DEFAULT_PREFERENCES;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_PREFERENCES, ...parsed };
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

export function saveUserPreferences(prefs: UserPreferences): void {
  try {
    localStorage.setItem(STORAGE_KEY_PREFS, JSON.stringify(prefs));
  } catch (e) {
    console.error('Failed to save preferences to localStorage', e);
  }
}

export function resetUserPreferences(): UserPreferences {
  try {
    localStorage.removeItem(STORAGE_KEY_PREFS);
  } catch (e) {
    console.error('Failed to clear preferences', e);
  }
  return DEFAULT_PREFERENCES;
}

export function exportPreferencesAsJson(prefs: UserPreferences): void {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(prefs, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `resolveiq-preferences-${new Date().toISOString().split('T')[0]}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}
