export const truncateHash  = (hash: string, startLength: number = 6, endLength: number = 4): string => {
  if (hash.length <= startLength + endLength) {
    return hash; // If the hash is shorter than the combined length, return it as is
  }
  const start = hash.substring(0, startLength);
  const end = hash.substring(hash.length - endLength);
  return `${start}...${end}`;
};