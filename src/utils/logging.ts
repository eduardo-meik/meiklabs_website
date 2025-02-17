/**
 * Formats a timestamp for logging purposes
 * @param date Date object to format
 * @returns Formatted timestamp string (e.g., "2024-03-20 15:30:45")
 */
export function formatLogTimestamp(date: Date): string {
  return date.toLocaleString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).replace(/\//g, '-');
}