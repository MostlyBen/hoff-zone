import packageJson from '../../package.json';
import * as bin from './index';

export const help = async (_args: string[]): Promise<string> => {
  const commands = Object.keys(bin).sort().join(', ');

  return `Available commands:\n${commands}\n\n[tab]\t trigger completion.\n[ctrl+l] clear terminal.\n[ctrl+c] cancel command.`;
};

export const journal = (_args?: string[]) => {
  const openEvent = new CustomEvent("onShowJournal");
  document.dispatchEvent(openEvent);
  return 'opening journal...'
}

export const date = async (_args: string[]): Promise<string> => {
  return new Date().toString();
};

export const banner = (_args?: string[]): string => {
  return `
██╗  ██╗ ██████╗ ███████╗███████╗
██║  ██║██╔═══██╗██╔════╝██╔════╝
███████║██║   ██║█████╗  █████╗
██╔══██║██║   ██║██╔══╝  ██╔══╝
██║  ██║╚██████╔╝██║     ██║
╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝

███████╗ ██████╗ ███╗   ██╗███████╗
╚══███╔╝██╔═══██╗████╗  ██║██╔════╝
  ███╔╝ ██║   ██║██╔██╗ ██║█████╗  
 ███╔╝  ██║   ██║██║╚██╗██║██╔══╝  
███████╗╚██████╔╝██║ ╚████║███████╗
╚══════╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝ v${packageJson.version}

Type 'help' to see list of available commands.
`;
};
