import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  scale?: number; // scaling factor, default 1.2 for 20% bigger in the navbar
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'dark',
  size = 'md',
  scale = 1.2,
}) => {
  const sizes = {
    sm: 'h-7',
    md: 'h-9',
    lg: 'h-12',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const variants = {
    light: 'text-white',
    dark: 'text-neutral-dark',
  };

  return (
    <Link to="/" className={`flex items-center space-x-3 ${variants[variant]}`}>
      <div style={{ transform: `scale(${scale})` }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 18 20.03"
          className={`${sizes[size]} aspect-square`}
        >
          <defs>
            <style>{`
              .cls-1 {
                fill: url(#Degradado_sin_nombre);
                stroke-width: 0px;
              }
              .cls-2 {
                fill: #fff;
                stroke: #fff;
                stroke-miterlimit: 10;
                stroke-width: 0.3px;
              }
            `}</style>
            <linearGradient
              id="Degradado_sin_nombre"
              data-name="Degradado sin nombre"
              x1="9"
              y1="8"
              x2="9"
              y2="28"
              gradientTransform="translate(0 28) scale(1 -1)"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset=".26" stopColor="#4f00c4" />
              <stop offset="1" stopColor="#ff5cf3" />
            </linearGradient>
          </defs>
          <path
            className="cls-1"
            d="m1,15.7c-.32-.18-.56-.43-.74-.73s-.26-.63-.26-1v-7.95c0-.37.09-.7.26-1s.42-.54.74-.73L8,.28c.32-.18.65-.28,1-.28s.68.09,1,.28l7,4.03c.32.18.56.43.74.73s.26.63.26,1v7.95c0,.37-.09.7-.26,1s-.42.54-.74.73l-7,4.03c-.32.18-.65.28-1,.28s-.68-.09-1-.28L1,15.7Z"
          />
          <path
            className="cls-2"
            d="m14.99,14.17h-.25v-5.61c0-.17-.04-.32-.13-.45s-.21-.23-.37-.29c-.19-.07-.38-.09-.58-.05s-.38.14-.54.3l-3.43,3.56c-.23.21-.48.32-.73.32-.27,0-.51-.11-.73-.32l-3.43-3.56c-.16-.16-.34-.26-.55-.3s-.4-.03-.59.05c-.16.07-.28.16-.36.29s-.13.28-.13.45v5.61h-.25v-5.61c0-.21.06-.41.17-.58s.28-.3.48-.39c.23-.1.48-.12.73-.06s.47.18.66.37l3.43,3.56c.19.17.37.25.56.25s.37-.08.56-.25l3.43-3.56c.19-.19.41-.31.66-.37s.5-.04.73.06c.21.08.37.21.48.39.12.17.18.37.18.58v5.61Z"
          />
        </svg>
      </div>
      <span className={`font-display font-bold ${textSizes[size]}`}>
        MEIK LABS
      </span>
    </Link>
  );
};