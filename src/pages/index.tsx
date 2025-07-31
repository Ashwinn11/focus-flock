import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Button from '@/components/Button';
import Card, { CardHeader, CardTitle, CardContent } from '@/components/Card';
import EnergySelector from '@/components/EnergySelector';
import { EnergyLevel } from '@/types';

const HomePage: React.FC = () => {
  const router = useRouter();
  const [selectedEnergy, setSelectedEnergy] = useState<EnergyLevel | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleStartSession = async () => {
    if (!selectedEnergy) {
      // Show gentle reminder instead of error
      return;
    }

    setIsLoading(true);
    
    // Simulate session creation
    setTimeout(() => {
      setIsLoading(false);
      router.push('/session/new');
    }, 1500);
  };

  const features = [
    {
      icon: '🤝',
      title: 'Body Doubling',
      description: 'Study with others in real-time for better focus and accountability'
    },
    {
      icon: '🧠',
      title: 'ADHD-Friendly',
      description: 'Designed specifically for neurodivergent brains with gentle encouragement'
    },
    {
      icon: '🎯',
      title: 'Energy Matching',
      description: 'Connect with study buddies who share your energy level and goals'
    },
    {
      icon: '🎉',
      title: 'Celebration Moments',
      description: 'Dopamine-driven rewards that celebrate progress, not perfection'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah, 22',
      role: 'Student with ADHD',
      text: 'Focus Flock helped me complete my thesis! The gentle accountability and celebration of small wins made all the difference.',
      avatar: '🦋'
    },
    {
      name: 'Alex, 28',
      role: 'Remote Worker',
      text: 'Finally, a productivity app that understands my brain. No more shame, just support and community.',
      avatar: '🦊'
    },
    {
      name: 'Jordan, 19',
      role: 'College Student',
      text: 'The energy matching is genius! I always find study buddies who get my vibe and keep me motivated.',
      avatar: '🦁'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-focus-purple/5 to-community-teal/5">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* Main Headline */}
            <motion.h1
              className="text-display font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Your productivity tribe
              <br />
              <span className="bg-gradient-to-r from-focus-purple to-community-teal bg-clip-text text-transparent">
                where focus feels social
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Join the ADHD-friendly body doubling platform that makes productivity accessible, 
              social, and shame-free. Connect with study buddies who understand your brain.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Button
                size="lg"
                variant="celebration"
                onClick={handleStartSession}
                loading={isLoading}
                disabled={!selectedEnergy}
                className="w-full sm:w-auto"
              >
                ✨ Start Focus Session
              </Button>
              <Button
                size="lg"
                variant="ghost"
                onClick={() => router.push('/about')}
                className="w-full sm:w-auto"
              >
                Learn More
              </Button>
            </motion.div>

            {/* Energy Selector */}
            <motion.div
              className="max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <EnergySelector
                selectedEnergy={selectedEnergy}
                onEnergySelect={setSelectedEnergy}
              />
            </motion.div>
          </div>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-10 text-6xl opacity-20"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          🌱
        </motion.div>
        <motion.div
          className="absolute top-40 right-20 text-4xl opacity-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          🎯
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-h1 font-bold text-gray-900 mb-4">
              Built for your brain
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every feature is designed with ADHD in mind, from gentle reminders to celebration moments
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-h3 font-semibold mb-2">{feature.title}</h3>
                  <p className="text-body text-gray-600">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-community-teal/5 to-focus-purple/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-h1 font-bold text-gray-900 mb-4">
              Real stories from our community
            </h2>
            <p className="text-xl text-gray-600">
              See how Focus Flock is helping neurodivergent people thrive
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card>
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">{testimonial.avatar}</div>
                    <div className="flex-1">
                      <p className="text-body text-gray-700 mb-4 italic">
                        "{testimonial.text}"
                      </p>
                      <div>
                        <p className="font-semibold text-gray-900">{testimonial.name}</p>
                        <p className="text-small text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-focus-purple to-community-teal">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-h1 font-bold text-white mb-6">
              Ready to transform your productivity?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of neurodivergent people who are finally finding their focus groove
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="celebration"
                onClick={() => router.push('/signup')}
                className="w-full sm:w-auto"
              >
                🚀 Start Free Today
              </Button>
              <Button
                size="lg"
                variant="ghost"
                onClick={() => router.push('/demo')}
                className="w-full sm:w-auto text-white border-white hover:bg-white/10"
              >
                Watch Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-h2 font-bold mb-4">Focus Flock</h3>
            <p className="text-body text-gray-400 mb-6">
              Making productivity accessible, social, and ADHD-friendly
            </p>
            <div className="flex justify-center space-x-6 text-small text-gray-400">
              <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
              <a href="/terms" className="hover:text-white transition-colors">Terms</a>
              <a href="/support" className="hover:text-white transition-colors">Support</a>
              <a href="/about" className="hover:text-white transition-colors">About</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage; 