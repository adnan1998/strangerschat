'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { MessageSquare, Users, Shield, Zap } from 'lucide-react';
import { AppShell } from '@/components/app-shell';

const FeatureCard = ({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-card p-6 rounded-2xl shadow-lg hover:shadow-primary/20 transition-shadow duration-300 border border-border"
    >
      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-foreground">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
);


export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-2"
          >
            <MessageSquare className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">AnonChat</h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button asChild>
              <Link href="/chat">Enter Chat</Link>
            </Button>
          </motion.div>
        </div>
      </header>

      <main className="container mx-auto px-4 pt-32 pb-16">
        <section className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500"
          >
            Speak Freely.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8"
          >
            Jump into anonymous conversations. No accounts, no history, just pure, real-time chat with people from around the world.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8, type: 'spring', stiffness: 150 }}
          >
            <Button asChild size="lg" className="text-lg font-semibold shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow">
              <Link href="/chat">Start Chatting Now</Link>
            </Button>
          </motion.div>
        </section>

        <section className="mt-24">
            <motion.h3 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.5 }}
                className="text-center text-4xl font-bold mb-12"
            >
                Why You'll Love AnonChat
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <FeatureCard 
                    icon={<Shield className="h-6 w-6"/>}
                    title="True Anonymity"
                    description="No sign-ups, no personal data collection. Your identity is a secret."
                    delay={0.8}
                />
                <FeatureCard 
                    icon={<Zap className="h-6 w-6"/>}
                    title="Instant Connections"
                    description="Enter a username and start chatting immediately in the global lobby."
                    delay={1.0}
                />
                <FeatureCard 
                    icon={<Users className="h-6 w-6"/>}
                    title="Global Lobby"
                    description="Meet and interact with a diverse group of people from all over the world."
                    delay={1.2}
                />
                <FeatureCard 
                    icon={<MessageSquare className="h-6 w-6"/>}
                    title="Private Chats"
                    description="Take your conversation to a private room with just one click."
                    delay={1.4}
                />
            </div>
        </section>
      </main>

      <footer className="container mx-auto px-4 py-8 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} AnonChat. All rights reserved.</p>
      </footer>
    </div>
  );
}
