export const count = async (_args: string[]) => {
  const currentCount = localStorage?.getItem("count") || 0;
  localStorage?.setItem("count", String(Number(currentCount) + 1));
  return String(Number(currentCount) + 1);
};