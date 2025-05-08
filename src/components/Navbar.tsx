
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, X, Moon, Sun, User, LogIn } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import ThemeToggle from "@/components/ThemeToggle";

const Navbar = () => {
  const isMobile = useIsMobile();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
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
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          {!isMobile ? (
            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/dashboard">
                      <User size={18} className="mr-2" />
                      Dashboard
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleLogout}>
                    Sair
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/login">Entrar</Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link to="/cadastro">Cadastrar</Link>
                  </Button>
                </>
              )}
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
            <div className="border-t my-2"></div>
            {isAuthenticated ? (
              <>
                <Button variant="ghost" className="justify-start" asChild>
                  <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                    <User size={18} className="mr-2" />
                    Dashboard
                  </Link>
                </Button>
                <Button variant="ghost" className="justify-start" onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}>
                  <LogIn size={18} className="mr-2" />
                  Sair
                </Button>
              </>
            ) : (
              <div className="flex flex-col gap-2 mt-4 px-4">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Entrar</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/cadastro" onClick={() => setMobileMenuOpen(false)}>Cadastrar</Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
