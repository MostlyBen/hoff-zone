import Themes from '../../themes.json';

const help = `Usage: theme [arg]
Args:
  - ls: list all themes
  - set: set a theme

Example:
  theme ls # to list all themes
  theme set Gruvbox # to set a theme`;

export const theme = async (
  args: string[],
  callback?: (value: string) => string,
): Promise<string> => {
  if (args.length === 0) {
    return help;
  }

  switch (args[0]) {
    case 'ls': {
      let result = Themes.map((theme) => theme.name.toLowerCase()).join(', ');
      result += '\n\n';

      return result;
    }

    case 'set': {
      const selectedTheme = args[1];

      return callback(selectedTheme);
    }

    default:
      return help;
  }
};
