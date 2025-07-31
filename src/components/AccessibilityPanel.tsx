import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import Button from './Button';
import Card, { CardHeader, CardTitle, CardContent } from './Card';

interface AccessibilityPanelProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

interface AccessibilitySettings {
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  darkMode: boolean;
  focusIndicators: 'subtle' | 'normal' | 'strong';
  colorBlindSupport: boolean;
}

const AccessibilityPanel: React.FC<AccessibilityPanelProps> = ({
  isOpen,
  onClose,
  className,
}) => {
  const [settings, setSettings] = useState<AccessibilitySettings>({
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    darkMode: false,
    focusIndicators: 'normal',
    colorBlindSupport: false,
  });

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    
    // Apply settings to document
    const root = document.documentElement;
    
    switch (key) {
      case 'highContrast':
        root.setAttribute('data-contrast', value ? 'high' : 'normal');
        break;
      case 'largeText':
        root.setAttribute('data-text-size', value ? 'large' : 'normal');
        break;
      case 'reducedMotion':
        root.setAttribute('data-motion', value ? 'reduced' : 'normal');
        break;
      case 'darkMode':
        root.setAttribute('data-theme', value ? 'dark' : 'light');
        break;
      case 'focusIndicators':
        root.setAttribute('data-focus', value as string);
        break;
    }
  };

  const accessibilityOptions = [
    {
      key: 'highContrast' as const,
      title: 'High Contrast',
      description: 'Increase color contrast for better visibility',
      icon: '🔆',
      type: 'toggle' as const,
    },
    {
      key: 'largeText' as const,
      title: 'Large Text',
      description: 'Increase text size for better readability',
      icon: '🔍',
      type: 'toggle' as const,
    },
    {
      key: 'reducedMotion' as const,
      title: 'Reduce Motion',
      description: 'Minimize animations and transitions',
      icon: '🎭',
      type: 'toggle' as const,
    },
    {
      key: 'darkMode' as const,
      title: 'Dark Mode',
      description: 'Switch to dark theme for low-light environments',
      icon: '🌙',
      type: 'toggle' as const,
    },
    {
      key: 'colorBlindSupport' as const,
      title: 'Color Blind Support',
      description: 'Add patterns and symbols to color-coded elements',
      icon: '🎨',
      type: 'toggle' as const,
    },
  ];

  const focusOptions = [
    { value: 'subtle', label: 'Subtle', description: 'Minimal focus indicators' },
    { value: 'normal', label: 'Normal', description: 'Standard focus indicators' },
    { value: 'strong', label: 'Strong', description: 'High-visibility focus indicators' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-bg-overlay backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        className={clsx('bg-bg-secondary rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto', className)}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <Card className="border-none shadow-none">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <span className="text-2xl">♿</span>
                <span>Accessibility Settings</span>
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={onClose}>
                ✕
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <p className="text-body text-text-secondary">
              Customize your experience to work best with your needs and preferences.
            </p>

            {/* Toggle Options */}
            <div className="space-y-4">
              {accessibilityOptions.map((option) => (
                <div
                  key={option.key}
                  className="flex items-center justify-between p-4 bg-bg-primary rounded-lg border border-border-subtle"
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">{option.icon}</span>
                    <div>
                      <h4 className="font-semibold text-text-primary">{option.title}</h4>
                      <p className="text-small text-text-secondary">{option.description}</p>
                    </div>
                  </div>
                  
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings[option.key] as boolean}
                      onChange={(e) => updateSetting(option.key, e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-border-default peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-muted-blue/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-bg-secondary after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-muted-blue"></div>
                  </label>
                </div>
              ))}
            </div>

            {/* Focus Indicator Strength */}
            <div className="p-4 bg-bg-primary rounded-lg border border-border-subtle">
              <h4 className="font-semibold text-text-primary mb-3 flex items-center space-x-2">
                <span className="text-xl">🎯</span>
                <span>Focus Indicator Strength</span>
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {focusOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => updateSetting('focusIndicators', option.value as any)}
                    className={clsx(
                      'p-3 rounded-lg text-center transition-all duration-200 border-2',
                      settings.focusIndicators === option.value
                        ? 'border-muted-blue bg-muted-blue-light text-text-primary'
                        : 'border-border-subtle bg-bg-secondary text-text-secondary hover:border-border-default'
                    )}
                  >
                    <div className="font-semibold text-sm">{option.label}</div>
                    <div className="text-tiny mt-1">{option.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Preview Section */}
            <div className="p-4 bg-bg-primary rounded-lg border border-border-subtle">
              <h4 className="font-semibold text-text-primary mb-3 flex items-center space-x-2">
                <span className="text-xl">👁️</span>
                <span>Preview</span>
              </h4>
              <div className="space-y-3">
                <Button variant="primary" size="sm">Sample Button</Button>
                <div className="p-3 bg-bg-secondary rounded-lg border border-border-subtle">
                  <p className="text-body text-text-primary">
                    This is how text will appear with your current settings.
                  </p>
                  <p className="text-small text-text-secondary mt-1">
                    Secondary text maintains good contrast while being visually distinct.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4 border-t border-border-subtle">
              <Button variant="ghost" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button variant="primary" onClick={onClose} className="flex-1">
                Apply Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AccessibilityPanel;