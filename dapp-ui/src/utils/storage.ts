// utils/storage.ts

const STORAGE_RIDDLE_KEY = 'zama-current-riddle';
const STORAGE_ANSWERS_KEY = 'zama-answers';

/**
 * Save the current riddle to localStorage.
 */
export function saveRiddle(riddle: string) {
  localStorage.setItem(STORAGE_RIDDLE_KEY, riddle);
}

/**
 * Get the stored current riddle from localStorage.
 */
export function getStoredRiddle(): string | null {
  return localStorage.getItem(STORAGE_RIDDLE_KEY);
}

/**
 * Save a user's answer for a specific riddle.
 */
export function saveAnswer(riddle: string, answer: string) {
  const allAnswers = getAllStoredAnswers();
  const currentAnswers = allAnswers[riddle] || [];

  if (!currentAnswers.includes(answer)) {
    currentAnswers.push(answer);
    allAnswers[riddle] = currentAnswers;
    localStorage.setItem(STORAGE_ANSWERS_KEY, JSON.stringify(allAnswers));
  }
}

/**
 * Get stored answers for a specific riddle.
 */
export function getStoredAnswers(riddle: string): string[] {
  const allAnswers = getAllStoredAnswers();
  return allAnswers[riddle] || [];
}

/**
 * Internal helper to get all stored answers from localStorage.
 */
function getAllStoredAnswers(): Record<string, string[]> {
  try {
    const raw = localStorage.getItem(STORAGE_ANSWERS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
