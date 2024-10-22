export const getUniqueData = <T>(data: T[], key: keyof T): T[] => {
  return data.reduce((acc: T[], item: T) => {
    if (!acc.some((location) => location[key] === item[key])) {
      acc.push(item);
    }
    return acc;
  }, []);
};
