export const generateColorFromHash = (hash: string): string => {
    let hashValue = 0;
    for (let i = 0; i < hash.length; i++) {
      hashValue = hash.charCodeAt(i) + ((hashValue << 5) - hashValue);
    }
    const color = `hsl(${hashValue % 360}, 70%, 50%)`; // Generate a color in HSL format
    return color;
  };