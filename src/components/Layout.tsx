import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { clsx } from 'clsx';
import Button from './Button';
import ThemeToggle from './ThemeToggle';
import AccessibilityPanel from './AccessibilityPanel';

/**
 * Layout component optimized for ADHD users
 * 
 * Features:
 * - Sticky header for consistent navigation
 * - Clear active page indicators
 * - Mobile-first responsive design
 * - Accessibility panel integration
 * - Consistent spacing and typography
 * - Keyboard navigation support
 * 
 * @example
 * ```tsx
 * <Layout>
 *   <div className="container mx-auto px-4 py-8">
 *     <h1>Page Content</h1>
 *   </div>
 * </Layout>
 * ```
 */
interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  const router = useRouter();
  const [showAccessibilityPanel, setShowAccessibilityPanel] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    { href: '/', label: 'Home', icon: '🏠', description: 'Return to the main dashboard' },
    { href: '/session/find', label: 'Find Session', icon: '🔍', description: 'Search for study sessions' },
    { href: '/community', label: 'Community', icon: '👥', description: 'Connect with other learners' },
    { href: '/buddies', label: 'Buddies', icon: '🤝', description: 'Manage your study buddies' },
    { href: '/demo', label: 'Demo', icon: '🎮', description: 'Try out the platform features' },
  ];

  const isActivePage = (href: string) => {
    if (href === '/') return router.pathname === '/';
    return router.pathname.startsWith(href);
  };

  const handleNavigation = (href: string) => {
    router.push(href);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      {/* Header */}
      <header className="bg-bg-secondary/80 backdrop-blur-md border-b border-border-subtle sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => router.push('/')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              role="button"
              tabIndex={0}
              aria-label="Go to home page"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  router.push('/');
                }
              }}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-blue to-accent-sage flex items-center justify-center shadow-sm">
                <span className="text-lg text-white" aria-hidden="true">🦆</span>
              </div>
              <div>
                <h1 className="text-h3 font-semibold text-text-primary">Focus Flock</h1>
                <p className="text-small text-text-tertiary">Your productivity tribe</p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2" role="navigation" aria-label="Main navigation">
              {navigationItems.map((item) => (
                <Button
                  key={item.href}
                  variant={isActivePage(item.href) ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => handleNavigation(item.href)}
                  className="flex items-center space-x-2 text-small px-4 py-2"
                  aria-label={item.description}
                  aria-current={isActivePage(item.href) ? 'page' : undefined}
                >
                  <span className="text-sm" aria-hidden="true">{item.icon}</span>
                  <span className="text-small font-medium">{item.label}</span>
                </Button>
              ))}
            </nav>

            {/* Header Actions */}
            <div className="flex items-center space-x-3">
              <ThemeToggle className="scale-75" />
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAccessibilityPanel(true)}
                aria-label="Open accessibility settings"
                aria-describedby="accessibility-help"
                className="p-2 text-sm"
              >
                <span aria-hidden="true">♿</span>
              </Button>
              <div id="accessibility-help" className="sr-only">
                Opens accessibility panel for customizing your experience
              </div>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-sm"
                aria-label="Toggle mobile menu"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation"
              >
                <span aria-hidden="true">{mobileMenuOpen ? '✕' : '☰'}</span>
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <motion.nav
              id="mobile-navigation"
              className="md:hidden py-4 border-t border-border-subtle"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              role="navigation"
              aria-label="Mobile navigation"
            >
              <div className="space-y-2">
                {navigationItems.map((item) => (
                  <Button
                    key={item.href}
                    variant={isActivePage(item.href) ? 'primary' : 'ghost'}
                    fullWidth
                    onClick={() => handleNavigation(item.href)}
                    className="justify-start text-body py-3"
                    aria-label={item.description}
                    aria-current={isActivePage(item.href) ? 'page' : undefined}
                  >
                    <span className="mr-3 text-lg" aria-hidden="true">{item.icon}</span>
                    <span className="text-body font-medium">{item.label}</span>
                  </Button>
                ))}
              </div>
            </motion.nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className={clsx('flex-1', className)} role="main">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-bg-secondary border-t border-border-subtle mt-auto" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-blue to-accent-sage flex items-center justify-center mr-3">
                <span className="text-sm text-white" aria-hidden="true">🦆</span>
              </div>
              <h3 className="text-h3 font-semibold text-text-primary">Focus Flock</h3>
            </div>
            <p className="text-body text-text-secondary mb-6 font-medium max-w-md mx-auto">
              Making productivity accessible, social, and ADHD-friendly
            </p>
            <nav className="flex justify-center space-x-6 text-small text-text-tertiary" role="navigation" aria-label="Footer navigation">
              <a href="/privacy" className="hover:text-text-primary transition-colors font-medium">Privacy</a>
              <a href="/terms" className="hover:text-text-primary transition-colors font-medium">Terms</a>
              <a href="/support" className="hover:text-text-primary transition-colors font-medium">Support</a>
              <a href="/about" className="hover:text-text-primary transition-colors font-medium">About</a>
            </nav>
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