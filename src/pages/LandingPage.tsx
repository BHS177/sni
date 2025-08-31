import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { PlayIcon, Bars3Icon, XMarkIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../hooks/useTheme';
import { Card, CardContent } from '../components/ui';
import { 
  SparklesIcon,
  CloudArrowUpIcon,
  CpuChipIcon,
  RocketLaunchIcon,
  CheckIcon,
  VideoCameraIcon
} from '@heroicons/react/24/outline';

export function LandingPage() {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  // Slide button state
  const [slideProgress, setSlideProgress] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  const features = [
    {
      icon: CloudArrowUpIcon,
      title: 'Easy Upload',
      description: 'Drag and drop your videos for instant processing'
    },
    {
      icon: SparklesIcon,
      title: 'AI-Powered Editing',
      description: 'Automatic caption generation and smart editing suggestions'
    },
    {
      icon: CpuChipIcon,
      title: 'Real-time Processing',
      description: 'Lightning-fast video processing with live preview'
    },
    {
      icon: RocketLaunchIcon,
      title: 'Professional Results',
      description: 'Export high-quality videos ready for any platform'
    }
  ];

  const plans = [
    {
      name: 'Free',
      price: '$0',
      description: 'Perfect for getting started',
      features: [
        'Up to 5 video uploads per month',
        'Basic editing tools',
        'Standard quality exports',
        'Community support'
      ]
    },
    {
      name: 'Pro',
      price: '$19',
      description: 'For content creators',
      features: [
        'Unlimited video uploads',
        'Advanced AI features',
        'HD/4K exports',
        'Priority support',
        'Custom branding'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$99',
      description: 'For teams and businesses',
      features: [
        'Everything in Pro',
        'Team collaboration',
        'API access',
        'Custom integrations',
        'Dedicated support'
      ]
    }
  ];

  const navItems = [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ];

  const LandingHeader = () => (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-28">
          {/* Mobile: Single pill container for logo and hamburger */}
          <div className="md:hidden w-full">
            <div className="bg-white dark:bg-gray-800 rounded-full px-6 py-2 flex items-center justify-between">
          {/* Logo */}
              <div className="flex items-center">
                <img 
                  src="/Snippo.PNG" 
                  alt="Snippo" 
                  className="h-16 w-auto"
                />
              </div>
              
              {/* Hamburger Menu */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2"
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="h-5 w-5" />
                ) : (
                  <Bars3Icon className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Desktop: Separate logo and navigation */}
          <div className="hidden md:flex items-center">
            <img src="/Snippo.PNG" alt="Snippo" className="h-16 w-auto"/>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-2 flex items-center space-x-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                  className="px-5 py-2.5 rounded-full text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-white dark:hover:bg-gray-700 transition-all duration-200 font-medium text-base"
              >
                {item.name}
              </a>
            ))}
            </div>
          </nav>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="p-2"
            >
              {theme === 'light' ? (
                <MoonIcon className="h-5 w-5" />
              ) : (
                <SunIcon className="h-5 w-5" />
              )}
            </Button>

            {/* Auth buttons */}
            <div className="flex items-center space-x-2">
              <Link to="/register">
                <Button size="sm" className="bg-gradient-to-r from-primary-500 to-secondary-500">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg"
          >
            <div className="py-4 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="ghost" size="sm" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button size="sm" className="w-full bg-gradient-to-r from-primary-500 to-secondary-500">
                    Get Started
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleTheme}
                  className="w-full sm:hidden"
                >
                  {theme === 'light' ? (
                    <>
                      <MoonIcon className="h-4 w-4 mr-2" />
                      Dark Mode
                    </>
                  ) : (
                    <>
                      <SunIcon className="h-4 w-4 mr-2" />
                      Light Mode
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <LandingHeader />
      
      {/* Hero Section */}
      <section className="pt-48 pb-24 relative overflow-hidden">
        {/* Light purple-blue background palette */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-indigo-900/20"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <div className="inline-flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full px-3 md:px-4 py-1.5 md:py-2 mb-4 md:mb-6">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.svg
                      key={i}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </motion.svg>
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-2">
                  1M+ users worldwide
                </span>
              </div>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
            >
              Create Amazing Videos with{' '}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                AI Power
              </span>
            </motion.h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                Transform your video editing workflow with our cutting-edge AI technology. 
                Upload, edit, and create professional videos in minutes, not hours.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
              >
                {/* Mobile: Slide to right button */}
                <div className="block sm:hidden w-full max-w-sm mx-auto">
                  <div className="relative bg-gray-200 dark:bg-gray-700 rounded-full h-16 w-full overflow-hidden">
                    {/* Slide track */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-gray-600 dark:text-gray-300 font-medium text-sm sm:text-base">
                        Slide to Start →
                      </span>
                    </div>
                    
                    {/* Sliding button */}
                    <motion.div
                      className="absolute left-1 top-1 bottom-1 w-14 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center cursor-pointer shadow-lg"
                      drag="x"
                      dragConstraints={{ left: 0, right: 266 }}
                      dragElastic={0.1}
                      dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
                      onDragEnd={(event, info) => {
                        if (info.offset.x >= 266) {
                          // Slide completed to extremity - navigate to sign in
                          setIsSliding(true);
                          setTimeout(() => {
                            navigate('/login');
                          }, 300);
                        } else {
                          // Reset position if not slid all the way
                          setSlideProgress(0);
                        }
                      }}
                      onDrag={(event, info) => {
                        const progress = Math.min(Math.max(info.offset.x / 266, 0), 1);
                        setSlideProgress(progress);
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      animate={{
                        x: slideProgress * 266
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30
                      }}
                    >
                      <PlayIcon className="h-6 w-6 text-white" />
                    </motion.div>
                  </div>
                </div>
                
                {/* Desktop: Regular buttons */}
                <div className="hidden sm:flex gap-4">
                  <Button size="lg" className="text-lg px-8 py-4">
                    <PlayIcon className="h-5 w-5 mr-2" />
                    Start Creating
                  </Button>
                  <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                    Watch Demo
                  </Button>
                </div>
              </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything you need to create stunning videos
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our platform combines powerful AI with intuitive design to give you professional results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="text-center p-6 h-full">
                  <CardContent className="space-y-4">
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mx-auto">
                      <feature.icon className="h-6 w-6 text-primary-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Examples Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-full px-4 py-2 mb-6"
            >
              <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                ✨ Trending Now
              </span>
            </motion.div>
            
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                2.5M clips
              </span>
              <br />
              have been made with SNIPPO
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              SNIPPO's AI tools help you{' '}
              <span className="font-semibold text-primary-600 dark:text-primary-400">
                catch trends
              </span>{' '}
              and create content that{' '}
              <span className="font-semibold text-secondary-600 dark:text-secondary-400">
                goes viral
              </span>
              .
            </p>
          </motion.div>

          <div className="flex justify-center">
            <div className="relative w-full max-w-6xl">
              {/* Left white edge */}
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-50 to-transparent dark:from-gray-900 z-10 pointer-events-none"></div>
              
              {/* Right white edge */}
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-50 to-transparent dark:from-gray-900 z-10 pointer-events-none"></div>
              
              <div className="flex gap-4 pb-4 px-16 overflow-hidden">
                <div className="flex gap-4 animate-scroll">
                  {/* Video Example 1 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="flex-shrink-0 group cursor-pointer"
                  >
                    <div className="w-[280px] aspect-[9/16] bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg overflow-hidden relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <PlayIcon className="h-12 w-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Video Example 2 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex-shrink-0 group cursor-pointer"
                  >
                    <div className="w-[280px] aspect-[9/16] bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl shadow-lg overflow-hidden relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <PlayIcon className="h-12 w-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Video Example 3 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="flex-shrink-0 group cursor-pointer"
                  >
                    <div className="w-[280px] aspect-[9/16] bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-lg overflow-hidden relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <PlayIcon className="h-12 w-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Video Example 4 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="flex-shrink-0 group cursor-pointer"
                  >
                    <div className="w-[280px] aspect-[9/16] bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg overflow-hidden relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <PlayIcon className="h-12 w-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Video Example 5 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="flex-shrink-0 group cursor-pointer"
                  >
                    <div className="w-[280px] aspect-[9/16] bg-gradient-to-br from-indigo-500 to-cyan-600 rounded-2xl shadow-lg overflow-hidden relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <PlayIcon className="h-12 w-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Duplicate cards for seamless loop */}
                  {/* Video Example 1 (Duplicate) */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="flex-shrink-0 group cursor-pointer"
                  >
                    <div className="w-[280px] aspect-[9/16] bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg overflow-hidden relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <PlayIcon className="h-12 w-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Video Example 2 (Duplicate) */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex-shrink-0 group cursor-pointer"
                  >
                    <div className="w-[280px] aspect-[9/16] bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl shadow-lg overflow-hidden relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <PlayIcon className="h-12 w-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Video Example 3 (Duplicate) */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="flex-shrink-0 group cursor-pointer"
                  >
                    <div className="w-[280px] aspect-[9/16] bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-lg overflow-hidden relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <PlayIcon className="h-12 w-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Video Example 4 (Duplicate) */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="flex-shrink-0 group cursor-pointer"
                  >
                    <div className="w-[280px] aspect-[9/16] bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg overflow-hidden relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <PlayIcon className="h-12 w-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Video Example 5 (Duplicate) */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="flex-shrink-0 group cursor-pointer"
                  >
                    <div className="w-[280px] aspect-[9/16] bg-gradient-to-br from-indigo-500 to-cyan-600 rounded-2xl shadow-lg overflow-hidden relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <PlayIcon className="h-12 w-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-center mt-12"
          >
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Made with SNIPPO
            </p>
            <Button size="lg" className="bg-gradient-to-r from-primary-500 to-secondary-500">
              Try SNIPPO Now
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-full px-3 md:px-4 py-1.5 md:py-2 mb-4 md:mb-6"
            >
              <span className="text-xs md:text-sm font-semibold text-primary-600 dark:text-primary-400">
                ⭐ Customer Stories
              </span>
            </motion.div>
            
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6 leading-tight px-4">
              Loved by{' '}
              <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                creators worldwide
              </span>
            </h2>
            
            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
              See what our users are saying about their{' '}
              <span className="font-semibold text-primary-600 dark:text-primary-400">
                SNIPPO experience
              </span>
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Sarah Chen",
                role: "Content Creator",
                avatar: "👩‍🎨",
                rating: 5,
                text: "SNIPPO transformed my video editing workflow. What used to take hours now takes minutes. The AI features are incredible!",
                gradient: "from-pink-500 to-purple-600"
              },
              {
                name: "Marcus Rodriguez",
                role: "Marketing Director",
                avatar: "👨‍💼",
                rating: 5,
                text: "Our team productivity increased by 300% since switching to SNIPPO. The professional results are outstanding.",
                gradient: "from-blue-500 to-cyan-600"
              },
              {
                name: "Emma Thompson",
                role: "Social Media Manager",
                avatar: "👩‍💻",
                rating: 5,
                text: "The automatic caption generation and smart editing suggestions save me so much time. SNIPPO is a game-changer!",
                gradient: "from-green-500 to-emerald-600"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Card className="relative p-6 md:p-8 h-full bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0">
                  <CardContent className="space-y-6">
                    {/* Avatar */}
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${testimonial.gradient} rounded-full flex items-center justify-center text-2xl shadow-lg`}>
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                          {testimonial.name}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.svg
                          key={i}
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1, duration: 0.5 }}
                          className="w-5 h-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </motion.svg>
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg italic">
                      "{testimonial.text}"
                    </blockquote>

                    {/* Decorative Element */}
                    <div className="absolute top-4 right-4 opacity-10">
                      <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                      </svg>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-16 md:mt-20 text-center"
          >
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-full px-4 py-2 mb-6">
              <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                🚀 Trusted by 50,000+ creators
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
              {[
                { number: "4.9", label: "Average Rating" },
                { number: "98%", label: "Customer Satisfaction" },
                { number: "24/7", label: "Support Available" },
                { number: "50K+", label: "Happy Users" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl md:text-3xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 md:py-32 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-full px-3 md:px-4 py-1.5 md:py-2 mb-4 md:mb-6"
            >
              <span className="text-xs md:text-sm font-semibold text-primary-600 dark:text-primary-400">
                💎 Pricing Plans
              </span>
            </motion.div>
            
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6 leading-tight px-4">
              Choose your{' '}
              <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                perfect plan
              </span>
            </h2>
            
            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
              Start free, upgrade when you need{' '}
              <span className="font-semibold text-primary-600 dark:text-primary-400">
                more power
              </span>
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto px-4 md:px-0">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <Card 
                  className={`relative p-6 md:p-8 h-full transition-all duration-300 hover:scale-105 ${
                    plan.popular 
                      ? 'ring-2 ring-primary-500 shadow-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900' 
                      : 'shadow-xl hover:shadow-2xl bg-white dark:bg-gray-800'
                  }`}
                >
                  {plan.popular && (
                    <motion.div 
                      initial={{ opacity: 0, y: -20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="absolute -top-3 md:-top-4 left-1/2 transform -translate-x-1/2"
                    >
                      <span className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 md:px-6 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold shadow-lg">
                        ⭐ Most Popular
                      </span>
                    </motion.div>
                  )}
                  
                  <CardContent className="space-y-6 md:space-y-8">
                    <div className="text-center">
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
                        {plan.description}
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-baseline justify-center">
                        <span className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                        {plan.price}
                      </span>
                        <span className="text-lg md:text-xl text-gray-600 dark:text-gray-300 ml-2">/month</span>
                      </div>
                    </div>
                    
                    <ul className="space-y-3 md:space-y-4">
                      {plan.features.map((feature, featureIndex) => (
                        <motion.li 
                          key={feature} 
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: featureIndex * 0.1 }}
                          className="flex items-start space-x-3"
                        >
                          <div className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mt-0.5">
                            <CheckIcon className="h-3 w-3 md:h-4 md:w-4 text-green-600 dark:text-green-400" />
                          </div>
                          <span className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                    
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                    <Button 
                        className={`w-full py-3 md:py-4 text-base md:text-lg font-semibold transition-all duration-300 ${
                          plan.popular 
                            ? 'bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white shadow-lg hover:shadow-xl' 
                            : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white'
                        }`}
                    >
                      Get Started
                    </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-24 bg-gradient-to-r from-primary-500 to-secondary-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6">
              Ready to transform your video editing?
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed">
              Join thousands of creators who are already using our platform to create amazing content.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-primary-500 hover:bg-gray-100 text-lg px-8 py-4 font-semibold"
            >
              Start Your Free Trial
            </Button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-24 bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            {/* Animated badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-full px-4 py-2 mb-6 border border-primary-200/20 dark:border-primary-700/20"
            >
              <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                🚀 About SNIPPO
              </span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8 leading-tight"
            >
              Revolutionizing{' '}
              <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                Video Editing
              </span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-12 md:mb-16 leading-relaxed"
            >
              SNIPPO is revolutionizing video editing with cutting-edge AI technology. 
              Our mission is to make professional video creation accessible to everyone, 
              from content creators to businesses.
            </motion.p>
            
            {/* Enhanced stats grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-16 md:mt-20">
              <motion.div 
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="text-center group"
              >
                <div className="relative">
                  {/* Animated background circle */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ width: '120px', height: '120px', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
                  />
                  
                  {/* Number with gradient */}
                  <motion.div 
                    className="relative text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent mb-3"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    10K+
                  </motion.div>
                  
                  {/* Label with enhanced styling */}
                  <div className="relative text-gray-700 dark:text-gray-300 text-base md:text-lg font-medium">
                    Active Users
                  </div>
                  
                  {/* Decorative element */}
                  <motion.div
                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="text-center group"
              >
                <div className="relative">
                  {/* Animated background circle */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ width: '120px', height: '120px', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
                  />
                  
                  {/* Number with gradient */}
                  <motion.div 
                    className="relative text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent mb-3"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    2.5M+
                  </motion.div>
                  
                  {/* Label with enhanced styling */}
                  <div className="relative text-gray-700 dark:text-gray-300 text-base md:text-lg font-medium">
                    Videos Created
                  </div>
                  
                  {/* Decorative element */}
                  <motion.div
                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="text-center group"
              >
                <div className="relative">
                  {/* Animated background circle */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ width: '120px', height: '120px', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
                  />
                  
                  {/* Number with gradient */}
                  <motion.div 
                    className="relative text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent mb-3"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    99.9%
                  </motion.div>
                  
                  {/* Label with enhanced styling */}
                  <div className="relative text-gray-700 dark:text-gray-300 text-base md:text-lg font-medium">
                    Uptime
                  </div>
                  
                  {/* Decorative element */}
                  <motion.div
                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-32 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-full px-4 py-2 md:px-4 md:py-1.5 mb-6 md:mb-6"
            >
              <span className="text-sm md:text-sm font-semibold text-primary-600 dark:text-primary-400">
                💬 Get in Touch
              </span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 md:mb-6 leading-tight px-2 md:px-4">
              Let's{' '}
              <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                connect
              </span>
            </h2>
            
            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed px-4 md:px-4 mb-8 md:mb-0">
              Have questions? We'd love to hear from you. Send us a message and we'll{' '}
              <span className="font-semibold text-primary-600 dark:text-primary-400">
                respond as soon as possible
              </span>
              .
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto px-4 md:px-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center group"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="inline-flex items-center justify-center w-20 h-20 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 md:mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300"
              >
                <span className="text-3xl md:text-3xl">📧</span>
              </motion.div>
              <h3 className="text-2xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 md:mb-3">Email</h3>
              <p className="text-lg md:text-lg text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors break-words">
                ai.snippo@gmail.com
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center group"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="inline-flex items-center justify-center w-20 h-20 md:w-20 md:h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl mb-6 md:mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300"
              >
                <span className="text-3xl md:text-3xl">💬</span>
              </motion.div>
              <h3 className="text-2xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 md:mb-3">Support</h3>
              <p className="text-lg md:text-lg text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                24/7 Live Chat
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center group"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="inline-flex items-center justify-center w-20 h-20 md:w-20 md:h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl mb-6 md:mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300"
              >
                <span className="text-3xl md:text-3xl">🌍</span>
              </motion.div>
              <h3 className="text-2xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 md:mb-3">Global</h3>
              <p className="text-lg md:text-lg text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                Available Worldwide
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <Link to="/" className="flex items-center space-x-3 mb-6">
                  <span className="text-3xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                    SNIPPO
                  </span>
              </Link>
                <p className="text-gray-400 mb-6 max-w-md leading-relaxed text-lg">
                  The most advanced AI-powered video editing platform. Create professional videos in{' '}
                  <span className="text-primary-400 font-semibold">minutes, not hours</span>.
                </p>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-xl font-bold mb-6 text-white">Product</h3>
              <ul className="space-y-4">
                {['Features', 'Pricing', 'API', 'Documentation'].map((item) => (
                  <li key={item}>
                    <a 
                      href={`#${item.toLowerCase()}`} 
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-lg"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-xl font-bold mb-6 text-white">Company</h3>
              <ul className="space-y-4">
                {['About', 'Contact', 'Careers', 'Privacy'].map((item) => (
                  <li key={item}>
                    <a 
                      href={`#${item.toLowerCase()}`} 
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-lg"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="border-t border-gray-800 mt-12 pt-8 text-center"
          >
            <p className="text-gray-400 text-lg">
              &copy; 2025{' '}
              <span className="text-primary-400 font-semibold">SNIPPO</span>
              . All rights reserved.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
