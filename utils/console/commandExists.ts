import * as bin from '../bin';
import * as hidden from '../hidden';


export const commandExists = (command: string) => {
  const allCommands = { ...bin, ...hidden }
  const commands = ['clear', ...Object.keys(allCommands)];

  return commands.indexOf(command.split(' ')[0]) !== -1;
};
