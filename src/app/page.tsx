// 'use client';

// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import { motion } from 'framer-motion';
// import { MessageSquare, Users, Shield, Zap } from 'lucide-react';
// import { AppShell } from '@/components/app-shell';

// const FeatureCard = ({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) => (
//     <motion.div
//       initial={{ opacity: 0, y: 50 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay }}
//       className="bg-card p-6 rounded-2xl shadow-lg hover:shadow-primary/20 transition-shadow duration-300 border border-border"
//     >
//       <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mb-4">
//         {icon}
//       </div>
//       <h3 className="text-xl font-bold mb-2 text-foreground">{title}</h3>
//       <p className="text-muted-foreground">{description}</p>
//     </motion.div>
// );


// export default function LandingPage() {
//   return (
//     <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
//       <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
//         <div className="container mx-auto px-4 h-20 flex items-center justify-between">
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="flex items-center gap-2"
//           >
//             <MessageSquare className="h-8 w-8 text-primary" />
//             <h1 className="text-2xl font-bold text-foreground">AnonChat</h1>
//           </motion.div>
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//           >
//             <Button asChild>
//               <Link href="/chat">Enter Chat</Link>
//             </Button>
//           </motion.div>
//         </div>
//       </header>

//       <main className="container mx-auto px-4 pt-32 pb-16">
//         <section className="text-center">
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7, delay: 0.4 }}
//             className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500"
//           >
//             Speak Freely.
//           </motion.h2>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7, delay: 0.6 }}
//             className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8"
//           >
//             Jump into anonymous conversations. No accounts, no history, just pure, real-time chat with people from around the world.
//           </motion.p>
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.5, delay: 0.8, type: 'spring', stiffness: 150 }}
//           >
//             <Button asChild size="lg" className="text-lg font-semibold shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow">
//               <Link href="/chat">Start Chatting Now</Link>
//             </Button>
//           </motion.div>
//         </section>

//         <section className="mt-24">
//             <motion.h3 
//                 initial={{ opacity: 0 }}
//                 whileInView={{ opacity: 1 }}
//                 viewport={{ once: true, amount: 0.8 }}
//                 transition={{ duration: 0.5 }}
//                 className="text-center text-4xl font-bold mb-12"
//             >
//                 Why You'll Love AnonChat
//             </motion.h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//                 <FeatureCard 
//                     icon={<Shield className="h-6 w-6"/>}
//                     title="True Anonymity"
//                     description="No sign-ups, no personal data collection. Your identity is a secret."
//                     delay={0.8}
//                 />
//                 <FeatureCard 
//                     icon={<Zap className="h-6 w-6"/>}
//                     title="Instant Connections"
//                     description="Enter a username and start chatting immediately in the global lobby."
//                     delay={1.0}
//                 />
//                 <FeatureCard 
//                     icon={<Users className="h-6 w-6"/>}
//                     title="Global Lobby"
//                     description="Meet and interact with a diverse group of people from all over the world."
//                     delay={1.2}
//                 />
//                 <FeatureCard 
//                     icon={<MessageSquare className="h-6 w-6"/>}
//                     title="Private Chats"
//                     description="Take your conversation to a private room with just one click."
//                     delay={1.4}
//                 />
//             </div>
//         </section>
//       </main>

//       <footer className="container mx-auto px-4 py-8 text-center text-muted-foreground">
//         <p>&copy; {new Date().getFullYear()} AnonChat. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }

'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { MessageSquare, Users, Shield, Zap, Heart, Sparkles } from 'lucide-react';

const FeatureCard = ({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20 p-6 sm:p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-pink-200/50 dark:border-pink-800/30"
    >
      <div className="flex items-center justify-center h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 text-white mb-4 sm:mb-6 shadow-lg">
        {icon}
      </div>
      <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">{title}</h3>
      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
    </motion.div>
);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20 text-foreground overflow-x-hidden">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-pink-300/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 -right-20 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-purple-300/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-80 sm:h-80 bg-blue-300/20 rounded-full blur-3xl"></div>
      </div>

      <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-b border-pink-200/50 dark:border-pink-800/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-2 sm:gap-3"
          >
            <div className="h-8 w-8 sm:h-12 sm:w-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center shadow-lg">
              <MessageSquare className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
            </div>
            <h1 className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">AnonChat</h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button asChild className="rounded-full px-4 sm:px-8 text-sm sm:text-base bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-lg shadow-pink-500/50">
              <Link href="/chat">💬 <span className="hidden sm:inline">Enter </span>Chat</Link>
            </Button>
          </motion.div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-16 relative z-10">
        <section className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="inline-block mb-4 sm:mb-6"
          >
            <span className="px-4 sm:px-6 py-2 bg-gradient-to-r from-pink-200 to-purple-200 dark:from-pink-900/40 dark:to-purple-900/40 rounded-full text-xs sm:text-sm font-semibold text-pink-700 dark:text-pink-300 border border-pink-300 dark:border-pink-700">
              ✨ Connect Anonymously, Chat Authentically
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
          >
            Find Your Vibe.
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="max-w-3xl mx-auto text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-8 sm:mb-12 leading-relaxed px-4"
          >
            Jump into anonymous conversations with real people. No judgments, no pressure—just genuine connections. 
            <span className="block mt-2 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
              Your next meaningful chat is one click away. 💕
            </span>
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8, type: 'spring', stiffness: 150 }}
            className="flex flex-col gap-4 justify-center items-center"
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-sm text-gray-500 dark:text-gray-400 font-medium"
            >
              ✨ No signup required
            </motion.div>
            <Button asChild size="lg" className="text-lg font-semibold shadow-2xl shadow-pink-500/50 hover:shadow-pink-500/70 transition-all rounded-full px-8 sm:px-12 py-4 sm:py-6 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
              <Link href="/chat">💬 Start Chatting Now</Link>
            </Button>
          </motion.div>
        </section>

        <section className="mt-16 sm:mt-24 lg:mt-32">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-8 sm:mb-12 lg:mb-16"
            >
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent px-4">
                    Why You'll Love AnonChat 💝
                </h3>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
                    Everything you need for authentic, pressure-free connections
                </p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                <FeatureCard 
                    icon={<Shield className="h-8 w-8"/>}
                    title="True Anonymity"
                    description="No sign-ups, no personal data. Your privacy is sacred—chat freely without revealing who you are."
                    delay={0.8}
                />
                <FeatureCard 
                    icon={<Zap className="h-8 w-8"/>}
                    title="Instant Connections"
                    description="Pick a username and dive right in. No waiting, no algorithms—just real conversations, instantly."
                    delay={1.0}
                />
                <FeatureCard 
                    icon={<Users className="h-8 w-8"/>}
                    title="Global Community"
                    description="Meet interesting people from every corner of the world. Every chat is a chance to discover someone new."
                    delay={1.2}
                />
                <FeatureCard 
                    icon={<MessageSquare className="h-8 w-8"/>}
                    title="Private Moments"
                    description="When the vibe is right, take it private. One-on-one chats for deeper, more meaningful conversations."
                    delay={1.4}
                />
            </div>
        </section>

        {/* Testimonial-style section */}
        <section className="mt-16 sm:mt-24 lg:mt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-gradient-to-br from-pink-50/80 to-purple-50/80 dark:from-pink-950/20 dark:to-purple-950/20 rounded-3xl p-8 sm:p-12 text-center border border-pink-200/40 dark:border-pink-700/30 shadow-lg backdrop-blur-sm"
          >
            <div className="text-4xl sm:text-6xl mb-4 sm:mb-6">💬</div>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-700 dark:text-gray-200 mb-3 sm:mb-4 px-4 leading-relaxed">
              "The best conversations happen when you're free to be yourself."
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg px-4">
              Join thousands connecting authentically every day
            </p>
          </motion.div>
        </section>

        {/* Call to action section */}
        <section className="mt-16 sm:mt-24 lg:mt-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-gradient-to-r from-pink-400/90 to-purple-500/90 rounded-3xl p-8 sm:p-12 lg:p-16 text-center text-white shadow-lg backdrop-blur-sm"
          >
            <Heart className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-4 sm:mb-6 text-pink-100" />
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 px-4 text-white">
              Ready to Connect?
            </h3>
            <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto text-pink-50 px-4">
              Your perfect conversation partner is waiting. Start chatting now and see where the conversation takes you.
            </p>
            <Button asChild size="lg" className="bg-white/95 text-pink-600 hover:bg-white hover:scale-105 rounded-full px-8 sm:px-12 py-4 sm:py-6 text-base sm:text-lg font-semibold shadow-md transition-all duration-200">
              <Link href="/chat">💕 Join Now - It's Free</Link>
            </Button>
          </motion.div>
        </section>
      </main>

      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-center relative z-10">
        <div className="mb-4 sm:mb-6">
          <div className="inline-flex items-center gap-2 text-xl sm:text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
              <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
            </div>
            AnonChat
          </div>
        </div>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-2">Made with 💕 for meaningful connections</p>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-500">&copy; {new Date().getFullYear()} AnonChat. All rights reserved.</p>
      </footer>
    </div>
  );
}