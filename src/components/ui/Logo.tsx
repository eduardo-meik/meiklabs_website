import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ variant = 'dark', size = 'md' }) => {
  const sizes = {
    sm: 'h-7',
    md: 'h-9',
    lg: 'h-12'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  const variants = {
    light: 'text-white',
    dark: 'text-neutral-dark'
  };

  return (
    <Link to="/" className={`flex items-center space-x-3 ${variants[variant]}`}>
      <svg
        id="Capa_1"
        data-name="Capa 1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 29.11 26.45"
        className={`${sizes[size]} aspect-square`}
      >
        <defs>
          <style>{`
            .cls-1 {
              fill: url(#Degradado_sin_nombre_59);
            }
            .cls-1, .cls-2 {
              stroke-width: 0px;
            }
            .cls-2 {
              fill: #fff;
            }
          `}</style>
          <linearGradient 
            id="Degradado_sin_nombre_59" 
            data-name="Degradado sin nombre 59" 
            x1="9" 
            y1="20" 
            x2="9" 
            y2="0" 
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
          d="m14.99,14.17h-.25v-5.61c0-.17-.04-.32-.13-.45-.09-.13-.21-.23-.37-.29-.19-.07-.38-.09-.58-.05-.2.04-.38.14-.54.3l-3.43,3.56c-.23.21-.48.32-.73.32-.27,0-.51-.11-.73-.32l-3.43-3.56c-.16-.16-.34-.26-.55-.3-.21-.04-.4-.03-.59.05-.16.07-.28.16-.36.29-.08.13-.13.28-.13.45v5.61h-.25v-5.61c0-.21.06-.41.17-.58s.28-.3.48-.39c.23-.1.48-.12.73-.06.25.06.47.18.66.37l3.43,3.56c.19.17.37.25.56.25s.37-.08.56-.25l3.43-3.56c.19-.19.41-.31.66-.37.25-.06.5-.04.73.06.21.08.37.21.48.39.12.17.18.37.18.58v5.61Z"
        />
      </svg>
      <span className={`font-display font-bold ${textSizes[size]}`}>
        MEIK LABS
      </span>
    </Link>
  );
};
