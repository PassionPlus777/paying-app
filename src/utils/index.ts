export { default as request } from "./request";

export const formatMinutesToHHmm = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  // Pad the hours and minutes with leading zeros if necessary
  const paddedHours = String(hours).padStart(2, "0");
  const paddedMinutes = String(remainingMinutes).padStart(2, "0");

  return `${paddedHours}:${paddedMinutes}`;
};
