import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Head from 'next/head';
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
      router.push('/session/find');
    }, 1500);
  };

  const features = [
    {
      icon: '🤝',
      title: 'Body Doubling',
      description: 'Study with others in real-time for better focus and accountability',
      color: 'from-focus-purple to-focus-purple-light'
    },
    {
      icon: '🧠',
      title: 'ADHD-Friendly',
      description: 'Designed specifically for neurodivergent brains with gentle encouragement',
      color: 'from-community-teal to-community-teal-light'
    },
    {
      icon: '🎯',
      title: 'Energy Matching',
      description: 'Connect with study buddies who share your energy level and goals',
      color: 'from-flock-coral to-flock-coral-light'
    },
    {
      icon: '🎉',
      title: 'Celebration Moments',
      description: 'Dopamine-driven rewards that celebrate progress, not perfection',
      color: 'from-dopamine-yellow to-dopamine-yellow-light'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah, 22',
      role: 'Student with ADHD',
      text: 'Focus Flock helped me complete my thesis! The gentle accountability and celebration of small wins made all the difference.',
      avatar: '🦋',
      gradient: 'from-focus-purple to-community-teal'
    },
    {
      name: 'Alex, 28',
      role: 'Remote Worker',
      text: 'Finally, a productivity app that understands my brain. No more shame, just support and community.',
      avatar: '🦊',
      gradient: 'from-community-teal to-flock-coral'
    },
    {
      name: 'Jordan, 19',
      role: 'College Student',
      text: 'The energy matching is genius! I always find study buddies who get my vibe and keep me motivated.',
      avatar: '🦁',
      gradient: 'from-flock-coral to-dopamine-yellow'
    }
  ];

  return (
    <>
      <Head>
        <title>Focus Flock - Your Productivity Tribe</title>
        <meta name="description" content="ADHD-friendly body doubling platform where focus feels social, not solitary" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, var(--soft-lavender) 0%, var(--mint-cream) 100%)' }}>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full" style={{ background: 'var(--dopamine-yellow)' }} />
          <div className="absolute top-40 right-20 w-24 h-24 rounded-full" style={{ background: 'var(--flock-coral)' }} />
          <div className="absolute bottom-20 left-1/4 w-20 h-20 rounded-full" style={{ background: 'var(--community-teal)' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center relative z-10">
            {/* Main Headline */}
            <motion.h1
              className="text-display font-bold mb-6"
              style={{ color: '#2D3748' }}
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Your productivity tribe,
              <br />
              <span 
                className="bg-gradient-to-r bg-clip-text text-transparent font-black"
                style={{ backgroundImage: 'linear-gradient(135deg, var(--focus-purple) 0%, var(--community-teal) 100%)' }}
              >
                where focus feels social
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto font-medium leading-relaxed"
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Join the ADHD-friendly body doubling platform that makes productivity accessible, 
              social, and shame-free. Connect with study buddies who understand your brain.
            </motion.p>

            {/* Energy Selector */}
            <motion.div
              className="max-w-4xl mx-auto mb-12"
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50">
                <EnergySelector
                  selectedEnergy={selectedEnergy}
                  onEnergySelect={setSelectedEnergy}
                />
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button
                size="lg"
                variant="celebration"
                onClick={handleStartSession}
                loading={isLoading}
                disabled={!selectedEnergy}
                className="w-full sm:w-auto shadow-xl"
              >
                ✨ Find Your Flock
              </Button>
              <Button
                size="lg"
                variant="ghost"
                onClick={() => router.push('/demo')}
                className="w-full sm:w-auto"
              >
                🎮 Try Demo
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-h1 font-bold text-gray-900 mb-6">
              Built for your brain
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
              Every feature is designed with ADHD in mind, from gentle reminders to celebration moments
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full group" interactive>
                  <motion.div 
                    className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center text-3xl text-white shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${feature.color.replace('from-', 'var(--').replace(' to-', '), var(--').replace('-light', '-light)')}` }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-h3 font-bold mb-3 text-gray-900">{feature.title}</h3>
                  <p className="text-body text-gray-600 leading-relaxed">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, var(--mint-cream) 0%, var(--warm-peach) 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-h1 font-bold text-gray-900 mb-6">
              Real stories from our community
            </h2>
            <p className="text-xl text-gray-700 font-medium">
              See how Focus Flock is helping neurodivergent people thrive
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-white/90 backdrop-blur-sm border-white/50" interactive>
                  <div className="flex items-start space-x-4 mb-4">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-md"
                      style={{ background: `linear-gradient(135deg, ${testimonial.gradient.replace('from-', 'var(--').replace(' to-', '), var(--').replace(/(\w+)$/g, '$1)')})` }}
                    >
                      {testimonial.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900">{testimonial.name}</p>
                      <p className="text-small text-gray-600 font-medium">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-body text-gray-700 italic leading-relaxed font-medium">
                    "{testimonial.text}"
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, var(--focus-purple) 0%, var(--community-teal) 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <span className="text-4xl">🚀</span>
            </div>
            <h2 className="text-h1 font-bold text-white mb-6">
              Ready to transform your productivity?
            </h2>
            <p className="text-xl text-white/90 mb-10 font-medium leading-relaxed">
              Join thousands of neurodivergent people who are finally finding their focus groove
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                variant="celebration"
                onClick={() => router.push('/session/find')}
                className="w-full sm:w-auto shadow-2xl"
              >
                🚀 Start Free Today
              </Button>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => router.push('/demo')}
                className="w-full sm:w-auto bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30"
              >
                🎮 Try Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-focus-purple to-community-teal flex items-center justify-center mr-3">
                <span className="text-2xl">🦆</span>
              </div>
              <h3 className="text-h2 font-bold">Focus Flock</h3>
            </div>
            <p className="text-body text-gray-400 mb-8 font-medium">
              Making productivity accessible, social, and ADHD-friendly
            </p>
            <div className="flex justify-center space-x-8 text-small text-gray-400">
              <a href="/privacy" className="hover:text-white transition-colors font-medium">Privacy</a>
              <a href="/terms" className="hover:text-white transition-colors font-medium">Terms</a>
              <a href="/support" className="hover:text-white transition-colors font-medium">Support</a>
              <a href="/about" className="hover:text-white transition-colors font-medium">About</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
};

export default HomePage;