import { useEffect, useState } from 'react';
import ThemeSwitcher from './ThemeSwitcher';
import CheckInButton from './CheckInButton';

const BottomButtons = ({ includeCheckin = true }: { includeCheckin?: boolean }) => {

  return (
    <div
      style={{
        position: 'absolute',
        right: '24px',
        bottom: '24px',
        display: 'flex',
        flexDirection: 'row',
        gap: '4px',
        alignItems: 'center',
      }}
    >
      {includeCheckin && <CheckInButton />}
      <ThemeSwitcher />
    </div>
  )
}

export default BottomButtons
