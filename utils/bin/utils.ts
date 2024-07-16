import packageJson from '../../package.json';
import * as bin from './index';
interface LayoutEvent {
  value: any;
}

export const help = async (_args: string[]): Promise<string> => {
  const commands = Object.keys(bin).sort().join(', ');

  return `Available commands:\n${commands}\n\n[tab]\t auto-complete.\n[ctrl+l] clear terminal.\n[ctrl+c] cancel command.`;
};

export const journal = (_args?: string[]) => {
  console.log("Args:", _args)
  if (_args.includes('-h')) {
    return `Flags:
  -h: shows this help
  -a: [true/false] avoid auto-opening journal`;
  }

  if (_args.includes('-a')) {
    if (!_args[1]) {
      if (localStorage.getItem('avoidJournalAutoOpen')) {
        return `true (avoids auto-open)`;
      } else {
        return `false (will auto-open)`;
      }
    }

    const value = _args[1] === 'true';
    if (value) {
      localStorage.setItem('avoidJournalAutoOpen', 'true');
      return `Journal will NOT auto-open`
    } else {
      localStorage.removeItem('avoidJournalAutoOpen');
      return `Journal will auto-open`
    }
  }
  const openEvent = new CustomEvent("onShowJournal");
  document.dispatchEvent(openEvent);
  return 'opening journal...'
}

export const todo = async (_args: string[]): Promise<string> => {
  if (_args[0] !== 'set') {
    return `Shows or hides a border around todo items
Usage:
  todo set [true/false]`
  }
  if (_args[1] === 'true') {
    document.dispatchEvent(new CustomEvent("onShowTodoBorders"));
    return "Showing todo borders...";
  } else {
    document.dispatchEvent(new CustomEvent("onHideTodoBorders"));
    return "Hiding todo borders...";
  }
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
