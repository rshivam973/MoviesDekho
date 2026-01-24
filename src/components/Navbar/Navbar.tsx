import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

import { ThemePicker } from '../theme-picker';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background/95 border-b shadow-sm' : 'bg-background/80 backdrop-blur-sm'}`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-primary">
                MoviesDekho
              </span>
            </Link>
            <div className="hidden md:block">
              <div className="flex items-baseline space-x-4">
                <Link to="/movie" className="text-foreground/80 hover:text-foreground px-3 py-2 rounded-md text-sm font-semibold">Movies</Link>
                <Link to="/tvshows" className="text-foreground/80 hover:text-foreground px-3 py-2 rounded-md text-sm font-semibold">TV Shows</Link>
                <Link to="/people" className="text-foreground/80 hover:text-foreground px-3 py-2 rounded-md text-sm font-semibold">People</Link>
                <Link to="/anime" className="text-foreground/80 hover:text-foreground px-3 py-2 rounded-md text-sm font-semibold">Anime</Link>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ThemePicker />
            <Button variant="ghost" size="icon" className="text-primary hover:text-secondary">
              <Search className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
