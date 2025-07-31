import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { clsx } from 'clsx';
import Button from './Button';
import ThemeToggle from './ThemeToggle';
import AccessibilityPanel from './AccessibilityPanel';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  const router = useRouter();
  const [showAccessibilityPanel, setShowAccessibilityPanel] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/session/find', label: 'Find Session', icon: '🔍' },
    { href: '/community', label: 'Community', icon: '👥' },
    { href: '/buddies', label: 'Buddies', icon: '🤝' },
    { href: '/demo', label: 'Demo', icon: '🎮' },
  ];

  const isActivePage = (href: string) => {
    if (href === '/') return router.pathname === '/';
    return router.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <header className="bg-bg-secondary border-b border-border-subtle sticky top-0 z-40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => router.push('/')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-muted-blue to-soft-sage flex items-center justify-center shadow-md">
                <span className="text-xl text-white">🦆</span>
              </div>
              <div>
                <h1 className="text-h3 font-bold text-charcoal">Focus Flock</h1>
                <p className="text-tiny text-text-tertiary">Your productivity tribe</p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <Button
                  key={item.href}
                  variant={isActivePage(item.href) ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => router.push(item.href)}
                  className="flex items-center space-x-2"
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Button>
              ))}
            </nav>

            {/* Header Actions */}
            <div className="flex items-center space-x-3">
              <ThemeToggle />
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAccessibilityPanel(true)}
                aria-label="Open accessibility settings"
              >
                ♿
              </Button>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? '✕' : '☰'}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <motion.nav
              className="md:hidden py-4 border-t border-border-subtle"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="space-y-2">
                {navigationItems.map((item) => (
                  <Button
                    key={item.href}
                    variant={isActivePage(item.href) ? 'primary' : 'ghost'}
                    fullWidth
                    onClick={() => {
                      router.push(item.href);
                      setMobileMenuOpen(false);
                    }}
                    className="justify-start"
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.label}</span>
                  </Button>
                ))}
              </div>
            </motion.nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className={clsx('flex-1', className)}>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-bg-secondary border-t border-border-subtle mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-muted-blue to-soft-sage flex items-center justify-center mr-3">
                <span className="text-lg text-white">🦆</span>
              </div>
              <h3 className="text-h3 font-bold text-charcoal">Focus Flock</h3>
            </div>
            <p className="text-body text-text-secondary mb-6 font-medium">
              Making productivity accessible, social, and ADHD-friendly
            </p>
            <div className="flex justify-center space-x-6 text-small text-text-tertiary">
              <a href="/privacy" className="hover:text-text-primary transition-colors font-medium">Privacy</a>
              <a href="/terms" className="hover:text-text-primary transition-colors font-medium">Terms</a>
              <a href="/support" className="hover:text-text-primary transition-colors font-medium">Support</a>
              <a href="/about" className="hover:text-text-primary transition-colors font-medium">About</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Accessibility Panel */}
      <AccessibilityPanel
        isOpen={showAccessibilityPanel}
        onClose={() => setShowAccessibilityPanel(false)}
      />
    </div>
  );
};

export default Layout;