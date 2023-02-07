export function convertTime(timestamp: string | undefined) {
  if (timestamp !== undefined) {
    const x = timestamp.slice(0, 10);
    const time = x.replace(/-/g, '.');
    return time;
  }
}
