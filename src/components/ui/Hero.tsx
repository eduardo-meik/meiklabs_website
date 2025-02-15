import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { cn } from '../../utils/cn';

export interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  height?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  overlayOpacity?: number;
  ctaButton?: {
    text: string;
    href: string;
    variant?: 'primary' | 'secondary' | 'outline';
  };
  secondaryButton?: {
    text: string;
    href: string;
    variant?: 'primary' | 'secondary' | 'outline';
  };
  alignment?: 'left' | 'center' | 'right';
  textColor?: 'light' | 'dark';
  className?: string;
}

export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  backgroundImage,
  height = 'lg',
  overlayOpacity = 0.5,
  ctaButton,
  secondaryButton,
  alignment = 'left',
  textColor = 'light',
  className
}) => {
  const [isLoaded, setIsLoaded] = useState(!backgroundImage);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (backgroundImage) {
      const img = new Image();
      img.src = backgroundImage;
      img.onload = () => setIsLoaded(true);
    }
    // Trigger entrance animation after a short delay
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, [backgroundImage]);

  const heights = {
    sm: 'min-h-[400px]',
    md: 'min-h-[500px]',
    lg: 'min-h-[600px]',
    xl: 'min-h-[700px]',
    full: 'min-h-screen'
  };

  const alignments = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end'
  };

  const textColors = {
    light: 'text-white',
    dark: 'text-neutral-dark'
  };

  return (
    <section
      className={cn(
        'relative flex items-center overflow-hidden bg-black',
        heights[height],
        !backgroundImage && 'bg-gradient-to-br from-primary via-primary/90 to-primary',
        className
      )}
    >
      {/* Background Image with Loading State */}
      {backgroundImage && (
        <>
          <div
            className={cn(
              'absolute inset-0 bg-cover bg-center transition-opacity duration-1000',
              isLoaded ? 'opacity-100' : 'opacity-0',
              'bg-fixed'
            )}
            style={{ backgroundImage: `url(${backgroundImage})` }}
            role="img"
            aria-label="Hero background"
          />
          <div
            className="absolute inset-0 transition-opacity duration-500 bg-gradient-to-b from-black/70 to-black/50"
            style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }}
          />
        </>
      )}

      {/* Loading Indicator */}
      {!isLoaded && backgroundImage && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-light">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
        </div>
      )}

      {/* Content */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            'max-w-3xl flex flex-col gap-6',
            alignments[alignment],
            alignment === 'center' && 'mx-auto',
            alignment === 'right' && 'ml-auto',
            textColors[textColor],
            'transition-all duration-1000 transform',
            isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-4 opacity-0'
          )}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold">
            {title}
          </h1>
          
          {subtitle && (
            <p className="text-lg sm:text-xl md:text-2xl opacity-90">
              {subtitle}
            </p>
          )}

          {(ctaButton || secondaryButton) && (
            <div className={cn(
              'flex flex-wrap gap-4',
              alignment === 'center' && 'justify-center',
              alignment === 'right' && 'justify-end'
            )}>
              {ctaButton && (
                <Button
                  href={ctaButton.href}
                  variant={ctaButton.variant || 'primary'}
                  size="lg"
                >
                  {ctaButton.text}
                </Button>
              )}
              {secondaryButton && (
                <Button
                  href={secondaryButton.href}
                  variant={secondaryButton.variant || 'outline'}
                  size="lg"
                  className={cn(
                    textColor === 'light' && 'border-white text-white hover:bg-white hover:text-primary'
                  )}
                >
                  {secondaryButton.text}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};