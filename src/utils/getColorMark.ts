export const getColorMark = (date?: string) => {
  if (date === undefined) {
    return 'blue';
  }

  const lastUpdate = Date.parse(date);
  const timeNow = Date.now();
  const differenceInMilliseconds = timeNow - lastUpdate;
  const differenceInSeconds = differenceInMilliseconds / 1000;
  const differenceInMinutes = differenceInSeconds / 60;
  const differenceInHours = differenceInMinutes / 60;

  if (differenceInMinutes < 60) {
    return 'blue';
  }
  if (differenceInHours < 24) {
    return 'yellow';
  }
  return 'red';
};
