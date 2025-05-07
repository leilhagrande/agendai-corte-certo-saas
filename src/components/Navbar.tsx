
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navItems = [
    { label: "Funcionalidades", href: "#features" },
    { label: "Preços", href: "#pricing" },
    { label: "Depoimentos", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="font-bold text-white">AI</span>
            </div>
            <span className="font-bold text-xl">AgendAI</span>
          </Link>
          
          {!isMobile && (
            <nav className="hidden md:flex gap-6">
              {navItems.map((item, index) => (
                <a 
                  key={index}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          )}
        </div>
        
        {!isMobile ? (
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/login">Entrar</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/cadastro">Cadastrar</Link>
            </Button>
          </div>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        )}
      </div>
      
      {/* Mobile menu */}
      {isMobile && mobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-background border-b animate-fade-in py-4">
          <nav className="container flex flex-col gap-4">
            {navItems.map((item, index) => (
              <a 
                key={index}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary px-4 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 mt-4 px-4">
              <Button variant="outline" size="sm" asChild>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Entrar</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/cadastro" onClick={() => setMobileMenuOpen(false)}>Cadastrar</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
