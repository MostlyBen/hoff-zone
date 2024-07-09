import { cowsay } from 'cowsayjs';
import { getQuote } from '../';

export const cowquote = async (args?: string[]): Promise<string> => {
  let output = '';

  if (args.length < 1 || args[0] === '') {
    const quote = (await getQuote()).quote;
    return cowsay(quote);
  } else {
    output = args.join(' ');
    return cowsay(output);
  }
};
