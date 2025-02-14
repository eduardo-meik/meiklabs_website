import React from 'react';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Container: React.FC<ContainerProps> = ({
  children,
  size = 'lg',
  className = '',
  ...props
}) => {
  const baseStyles = 'mx-auto px-4 sm:px-6 w-full';
  
  const sizes = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-7xl',
    xl: 'max-w-[1400px]'
  };

  const classes = `${baseStyles} ${sizes[size]} ${className}`;

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};