import { useTheme } from "../utils/themeProvider";

const HR = () => {
  const { theme } = useTheme();

  return (
    <hr
      style={{
        border: `1px solid ${theme.yellow}`,
      }}
    />
  );
}

export default HR;