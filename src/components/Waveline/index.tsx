/* eslint-disable @typescript-eslint/ban-ts-comment */
import Wave from '../../assets/Wave.png';

import { CSSProperties } from 'react';

const styles: { [key: string]: CSSProperties | string } = {
  html: {
    height: '100%',
  },
  body: {
    height: '100%',
    background: 'radial-gradient(ellipse at center, rgba(255,254,234,1) 0%, rgba(255,254,234,1) 35%, #B7E8EB 100%)',
    overflow: 'hidden',
  },
  ocean: {
    height: '5%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    background: '#fff',
  },
  waveContainer: {
    position: 'absolute',
    top: '-198px',
    width: '6400px',
    height: '198px',
    backgroundImage: `url(${Wave})`,
    backgroundRepeat: 'repeat-x',
    animation: 'wave 7s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite',
    transform: 'translate3d(0, 0, 0)',
  },
  wave2: {
    top: '-175px',
    animation: 'wave 7s cubic-bezier(0.36, 0.45, 0.63, 0.53) -0.125s infinite, swell 7s ease -1.25s infinite',
    opacity: 1,
  } as CSSProperties,
};

const WaveLine = () => {
  return (
    <>
      <style>
        {`
          html, body {
            height: 100%;
          }
          body {
            background: radial-gradient(ellipse at center, rgba(255,254,234,1) 0%, rgba(255,254,234,1) 35%, #B7E8EB 100%);
            overflow: hidden;
          }
          @keyframes wave {
            0% { margin-left: 0; }
            100% { margin-left: -1600px; }
          }
          @keyframes swell {
            0%, 100% { transform: translate3d(0,-25px,0); }
            50% { transform: translate3d(0,5px,0); }
          }
        `}
      </style>
      {/* @ts-ignore */}

      <div style={styles.ocean}>
        {/* @ts-ignore */}

        <div style={styles.waveContainer}>
        </div>
        {/* @ts-ignore */}
        <div style={{ ...styles.waveContainer, ...styles.wave2 }}>
        </div>
      </div>
    </>
  );
};

export default WaveLine;