export const getQuote = async () => {
  const res = await fetch('https://thesimpsonsquoteapi.glitch.me/quotes');
  const data = await res.json();
  console.log(data);

  return {
    quote: `“${data[0].quote}” — ${data[0].character}`,
  };
};
