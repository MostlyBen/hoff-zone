import { useTheme } from '../../utils/providers/themeProvider';

const CheckInButton = () => {
  const { theme } = useTheme();

  return (
    <button
      className="material-icons"
      data-tally-open="wv4vW4"
      data-tally-emoji-text="👋"
      data-tally-emoji-animation="wave"
      data-tally-auto-close="2000"
      style={{
        border: `1px solid ${theme.primary}`,
        color: theme.primary,
        background: theme.background,
        zIndex: 1,
        fontSize: '22.5px',
      }}
    >
      task
    </button>
  )
}

export default CheckInButton;
