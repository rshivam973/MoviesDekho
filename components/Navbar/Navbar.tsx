"use client";

import React, { useState, useEffect } from 'react';
import { Search, Menu } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '../ui/sheet';

import { ThemePicker } from '../theme-picker';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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

  const NavLinks = () => (
    <>
      <Link href="/movie" className="text-foreground/80 hover:text-foreground px-3 py-2 rounded-md text-sm font-semibold transition-colors" onClick={() => setIsOpen(false)} prefetch={false}>Movies</Link>
      <Link href="/tvshows" className="text-foreground/80 hover:text-foreground px-3 py-2 rounded-md text-sm font-semibold transition-colors" onClick={() => setIsOpen(false)} prefetch={false}>TV Shows</Link>
      <Link href="/people" className="text-foreground/80 hover:text-foreground px-3 py-2 rounded-md text-sm font-semibold transition-colors" onClick={() => setIsOpen(false)} prefetch={false}>People</Link>
      <Link href="/anime" className="text-foreground/80 hover:text-foreground px-3 py-2 rounded-md text-sm font-semibold transition-colors" onClick={() => setIsOpen(false)} prefetch={false}>Anime</Link>
    </>
  );

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background/95 border-b shadow-sm' : 'bg-background/80 backdrop-blur-sm'}`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            {/* Mobile Menu Trigger */}
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="mr-2">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <SheetTitle className='hidden'>Menu</SheetTitle>
                  <div className="flex flex-col gap-6 mt-8">
                    <Link href="/" className="flex items-center gap-2 mb-4" onClick={() => setIsOpen(false)} prefetch={false}>
                      <span className="text-2xl font-bold text-primary">MoviesDekho</span>
                    </Link>
                    <div className="flex flex-col gap-2">
                      <NavLinks />
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-sm text-muted-foreground mb-3">Theme</p>
                      <ThemePicker />
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <Link href="/" className="flex-shrink-0 flex items-center gap-2" prefetch={false}>
              <span className="text-xl md:text-2xl font-bold text-primary">
                MoviesDekho
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-baseline space-x-4">
                <NavLinks />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden md:block">
              <ThemePicker />
            </div>
            <Button variant="ghost" size="icon" className="text-primary hover:text-secondary">
              <Search className="h-5 w-5 md:h-6 md:w-6" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
