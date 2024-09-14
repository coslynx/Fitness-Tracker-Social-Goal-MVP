import { useState } from 'react';
import { ButtonProps } from '@/types';
import { cn } from '@/utils/helpers';

const Button = ({ className, children, disabled, variant = 'primary', ...props }: ButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    // Perform button action here
    // ...
    setIsLoading(false);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || isLoading}
      className={cn(
        'rounded-md font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50',
        variant === 'primary'
          ? 'bg-primary hover:bg-primary-dark'
          : variant === 'secondary'
          ? 'bg-secondary hover:bg-secondary-dark'
          : variant === 'tertiary'
          ? 'bg-tertiary hover:bg-tertiary-dark'
          : '',
        className
      )}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
};

export default Button;