import React from 'react';
import { cn } from '../../utils';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  gradient?: string;
  children?: React.ReactNode;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  backgroundImage,
  gradient = 'from-blue-600 to-green-600',
  children,
  className,
}) => {
  return (
    <section className={cn('relative py-16 overflow-hidden', className)}>
      {/* Background */}
      <div className="absolute inset-0 bg-black/70"></div>
      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${backgroundImage}')` }}
        ></div>
      )}
      <div className={cn('absolute inset-0 bg-gradient-to-r', gradient, 'opacity-90')}></div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-2xl">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl max-w-3xl mx-auto drop-shadow-xl">
              {subtitle}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
};

export default PageHeader;