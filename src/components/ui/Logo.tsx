import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'dark',
  size = 'md',
}) => {
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
    <Link 
      to="/" 
      className={`flex items-center space-x-3 ${variants[variant]}`}
    >
      <svg
        viewBox="0 0 29.11 26.45"
        className={`${sizes[size]} aspect-square`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="logo-gradient"
            x1="9"
            y1="20"
            x2="9"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset=".26" stopColor="#4F00C4"/>
            <stop offset="1" stopColor="#FF5CF3"/>
          </linearGradient>
        </defs>
        <path
          d="m1,15.7c-.32-.18-.56-.43-.74-.73s-.26-.63-.26-1v-7.95c0-.37.09-.7.26-1s.42-.54.74-.73L8,.28c.32-.18.65-.28,1-.28s.68.09,1,.28l7,4.03c.32.18.56.43.74.73s.26.63.26,1v7.95c0,.37-.09.7-.26,1s-.42.54-.74.73l-7,4.03c-.32.18-.65.28-1,.28s-.68-.09-1-.28L1,15.7Z"
          fill="url(#logo-gradient)"
        />
        <text
          transform="translate(2.92 14.17)"
          fill="#fff"
          fontFamily="Inter, sans-serif"
          fontSize="14"
          fontWeight="300"
        >
          m
        </text>
      </svg>
      <span className={`font-display font-bold ${textSizes[size]}`}>
        MEIK LABS
      </span>
    </Link>
  );
};