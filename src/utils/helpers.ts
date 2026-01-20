/**
 * Generate a unique ID for parcels
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Format weight for display (2 decimal places)
 */
export const formatWeight = (weight: number): string => {
  return `${weight.toFixed(2)} kg`;
};

/**
 * Format quantity for display
 */
export const formatQuantity = (quantity: number): string => {
  return quantity.toString();
};

/**
 * Truncate text to a specified length
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};
