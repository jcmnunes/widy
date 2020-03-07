/**
 * Returns the total number of Pomodoros
 *
 * @param {number} time - Elapsed time in seconds
 * @param {object} settings - Pomodoro settings
 * @returns {number} - Number of Pomodoros
 */
export const getNumberOfPomodoros = (time, settings) => {
  const timeInMinutes = time / 60;
  const { pomodoroLength, shortBreak } = settings;
  if (timeInMinutes < pomodoroLength) return 0;

  let pomodoros = Math.floor(timeInMinutes / (pomodoroLength + shortBreak));
  if (timeInMinutes % (pomodoroLength + shortBreak) >= pomodoroLength) pomodoros += 1;
  return pomodoros;
};

/**
 * Returns information about current active task time
 *
 * @param {number} time - Elapsed time (secs)
 * @param {object} settings - Pomodoro settings
 * @returns {{ inBreak: boolean, elapsedTime: string }}
 */
export const getCurrentPomodoroInfo = (time, settings) => {
  const timeInMinutes = time / 60;
  const { pomodoroLength, shortBreak } = settings;
  const remainingTime = timeInMinutes % (pomodoroLength + shortBreak);

  const info = { inBreak: false, elapsedTime: formatTime(remainingTime * 60) };

  if (remainingTime >= pomodoroLength) {
    info.inBreak = true;
    info.elapsedTime = formatTime((remainingTime - pomodoroLength) * 60);
  }

  return info;
};

/**
 * Formats total time
 *
 * @example
 *   getTotalTime(4 * 60) ➜ { hours: 0, minutes: 4 }
 *   getTotalTime(64 * 60) ➜ { hours: 1, minutes: 4 }
 *
 * @param {number} time - Time in secs
 * @returns {{ hours: number, minutes: number, seconds: number }} - Object containing three
 * integers representing time in hours, minutes and seconds
 */
export const getTotalTime = time => {
  const hours = Math.floor(time / 60 / 60);
  const minutes = Math.floor((time - hours * 60 * 60) / 60);
  const seconds = Math.round(time - hours * 60 * 60 - minutes * 60);

  return {
    hours,
    minutes,
    seconds,
  };
};

/**
 * Converts time in secs to a formatted string (00 h 00 min)
 *
 * @param {number} time - Time to format (secs)
 * @returns {string} - Formatted time ➜ 00 h 00 min
 */
export const formatTotalTime = time => {
  const { hours, minutes } = getTotalTime(time);

  return `${hours > 0 ? `${hours} h ` : ''}${
    hours > 0 ? minutes.toString().padStart(2, '0') : minutes
  } min`;
};

/**
 * Converts time in seconds to a formatted string (00 : 00)
 *
 * @param {number} time - Time to format (seconds)
 * @returns {string} - Formatted time ➜ 00 : 00
 */
export const formatTime = time => {
  const { minutes, seconds } = getTotalTime(time);

  return `${minutes} : ${seconds.toString().padStart(2, '0')}`;
};
