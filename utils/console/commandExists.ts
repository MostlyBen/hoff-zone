import * as bin from '../bin';
import * as hidden from '../hidden';

const allCommands = {...bin, ...hidden}

export const commandExists = (command: string) => {
  const commands = ['clear', ...Object.keys(allCommands)];

  return commands.indexOf(command.split(' ')[0]) !== -1;
};
