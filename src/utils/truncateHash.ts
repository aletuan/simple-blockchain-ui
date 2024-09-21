export const truncateHash = (hash: string, length: number = 10): string => {
    return hash.length > length ? `${hash.substring(0, length)}...` : hash;
  };