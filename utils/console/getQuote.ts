export const getQuote =  async () => {
  const res = await fetch('https://api.quotable.io/random');
  const data =  await res.json();

  return {
    quote: `“${data.content}” — ${data.author}`,
  };
};
