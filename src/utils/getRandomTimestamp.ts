export const getRandomTimestamp = (): number => {
    const now = Date.now();
    const randomOffset = Math.floor(Math.random() * 1000000000); // Random offset within a range
    return now - randomOffset;
  };