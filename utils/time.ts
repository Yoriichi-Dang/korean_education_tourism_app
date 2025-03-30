export const formatDuration = (value: number) => {
  if (!value || value < 0) return "0:00";

  // Check if the value is in milliseconds (larger than typical seconds values)
  const isMilliseconds = value > 1000;

  // Convert to seconds if in milliseconds
  const totalSeconds = isMilliseconds
    ? Math.floor(value / 1000)
    : Math.floor(value);

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};
