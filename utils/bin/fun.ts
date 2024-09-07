export const count = async (_args: string[]) => {
  if (_args) {
    if (_args[0] === "reset") {
      localStorage?.setItem("count", "0");
      return "0";
    }
  }

  const currentCount = localStorage?.getItem("count") || 0;
  localStorage?.setItem("count", String(Number(currentCount) + 1));
  return String(Number(currentCount) + 1);
};

export const lofi = async (_args: string[]) => {
  const event = new CustomEvent('onLofiOpen');
  document.dispatchEvent(event);
  return "Opening lofi..."
}
