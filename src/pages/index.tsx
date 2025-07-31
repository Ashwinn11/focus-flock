import React, { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import Card from '../components/Card';
import EnergySelector from '../components/EnergySelector';
import { EnergyLevel } from '../types';

const HomePage: React.FC = () => {
  const [selectedEnergy, setSelectedEnergy] = useState<EnergyLevel | null>(null);

  return (
    <>
      <Head>
        <title>Focus Flock - Your Productivity Tribe</title>
        <meta name="description" content="Join the ADHD-friendly body doubling platform that makes productivity accessible, social, and shame-free." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-bg-primary">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-display font-bold text-text-primary mb-6">
                Your productivity tribe, where focus feels social
              </h1>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-12 font-medium">
                Join the ADHD-friendly body doubling platform that makes productivity accessible, social, and shame-free. Connect with study buddies who understand your brain.
              </p>
            </motion.div>

            {/* Energy Selector */}
            <motion.div
              className="max-w-4xl mx-auto mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <EnergySelector
                selectedEnergy={selectedEnergy}
                onEnergySelect={setSelectedEnergy}
                showProTip={false}
              />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Button variant="primary" size="lg" className="text-lg px-8 py-4">
                🚀 Start Your First Session
              </Button>
              <Button variant="secondary" size="lg" className="text-lg px-8 py-4">
                👥 Join Community
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-bg-secondary">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-h1 font-bold text-text-primary mb-6">
                Why Focus Flock Works
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Designed specifically for ADHD brains, our platform combines body doubling with social connection to create a unique productivity experience.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Card variant="primary" className="h-full">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl text-white">
                      👥
                    </div>
                    <h3 className="text-h3 font-bold text-text-primary mb-4">
                      Body Doubling
                    </h3>
                    <p className="text-text-secondary">
                      Work alongside others in real-time video sessions. The presence of another person helps maintain focus and accountability.
                    </p>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Card variant="secondary" className="h-full">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-2xl text-white">
                      🧠
                    </div>
                    <h3 className="text-h3 font-bold text-text-primary mb-4">
                      ADHD-Friendly
                    </h3>
                    <p className="text-text-secondary">
                      Built with ADHD brains in mind. No shame, no pressure, just gentle support and understanding from people who get it.
                    </p>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Card variant="info" className="h-full">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl text-white">
                      🎯
                    </div>
                    <h3 className="text-h3 font-bold text-text-primary mb-4">
                      Energy Matching
                    </h3>
                    <p className="text-text-secondary">
                      Connect with study buddies who match your energy level. Whether you're high-energy or need a gentle pace, we've got you covered.
                    </p>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-h1 font-bold text-text-primary mb-6">
                What Our Community Says
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Card variant="accent">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                      S
                    </div>
                    <div>
                      <p className="text-text-secondary mb-4">
                        "Focus Flock has been a game-changer for my productivity. Having someone else there while I work keeps me accountable and focused."
                      </p>
                      <p className="text-text-primary font-semibold">Sarah, ADHD Coach</p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Card variant="success">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold">
                      M
                    </div>
                    <div>
                      <p className="text-text-secondary mb-4">
                        "Finally, a platform that understands ADHD! No judgment, just support. The energy matching feature is brilliant."
                      </p>
                      <p className="text-text-primary font-semibold">Mike, Student</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-bg-secondary">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-h1 font-bold text-text-primary mb-6">
                Ready to Transform Your Productivity?
              </h2>
              <p className="text-xl text-text-secondary mb-8">
                Join thousands of ADHD brains who have found their productivity tribe.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" size="lg" className="text-lg px-8 py-4">
                  🚀 Get Started Free
                </Button>
                <Button variant="secondary" size="lg" className="text-lg px-8 py-4">
                  📖 Learn More
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;