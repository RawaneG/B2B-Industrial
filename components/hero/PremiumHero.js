import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';
import { LightPillar } from '@/components/backgrounds';

/**
 * Animated Text Component - Letter by letter animation
 * Inspired by ReactBits.dev Split Text
 */
const AnimatedText = ({
  text,
  className = '',
  delay = 0,
  staggerDelay = 0.03,
  as: Tag = 'span',
}) => {
  const letters = text.split('');

  return (
    <Tag className={`inline-flex flex-wrap justify-center ${className}`}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.6,
            delay: delay + index * staggerDelay,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          className="inline-block"
          style={{
            transformOrigin: 'bottom',
            whiteSpace: letter === ' ' ? 'pre' : 'normal',
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </Tag>
  );
};

/**
 * Gradient Text with Animation
 */
const GradientText = ({ children, className = '' }) => (
  <span
    className={`bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient-x bg-clip-text text-transparent ${className}`}
  >
    {children}
  </span>
);

/**
 * Floating Badge Component
 */
const FloatingBadge = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-gray-300"
  >
    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
    {children}
  </motion.div>
);

/**
 * Magnetic Button with Hover Effect
 */
const MagneticButton = ({ children, href, variant = 'primary', className = '' }) => {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    setPosition({ x: x * 0.15, y: y * 0.15 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles = "relative overflow-hidden font-semibold py-4 px-8 rounded-full transition-all duration-300 transform";
  const variants = {
    primary: "bg-primary hover:bg-red-700 text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30",
    outline: "bg-transparent border-2 border-white/20 text-white hover:bg-white/5 hover:border-white/40",
    glass: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20",
  };

  return (
    <Link href={href}>
      <motion.span
        ref={buttonRef}
        className={`${baseStyles} ${variants[variant]} ${className} inline-block`}
        style={{ x: position.x, y: position.y }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.5 }}
        />
      </motion.span>
    </Link>
  );
};

/**
 * Stats Counter with Animation
 */
const StatCounter = ({ value, label, suffix = '', delay = 0 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl font-bold text-white mb-2">
        <GradientText>{count}{suffix}</GradientText>
      </div>
      <div className="text-gray-400 text-sm uppercase tracking-wider">{label}</div>
    </motion.div>
  );
};

/**
 * Premium Hero Component - Inspired by ReactBits.dev
 * Features: Animated text, magnetic buttons, floating badges, gradient effects
 */
export default function PremiumHero({
  variant = 'default', // 'default', 'minimal', 'centered'
  showStats = true,
  showBadge = true,
}) {
  const { t } = useLanguage();
  const controls = useAnimation();

  useEffect(() => {
    controls.start('visible');
  }, [controls]);

  // Hydration-safe mobile detection
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(/Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
      }
    };
    checkMobile();
  }, []);

  // Mobile background style
  const mobileBg = isMobile
    ? {
      background: 'radial-gradient(ellipse at 60% 40%, #a18aff 0%, #060010 80%)',
      backgroundColor: '#060010',
    }
    : {};

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={mobileBg}
    >
      {/* Light Pillar Background (desktop only) */}
      {!isMobile && (
        <div className="absolute inset-0 z-0">
          <LightPillar
            topColor="#D92C3A"
            bottomColor="#FF6B7A"
            intensity={0.8}
            rotationSpeed={0.2}
            glowAmount={0.008}
            pillarWidth={2.5}
            pillarHeight={0.5}
            noiseIntensity={0.3}
            mixBlendMode="screen"
          />
        </div>
      )}

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70 z-[1]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px] animate-pulse z-[1]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[128px] animate-pulse z-[1]" style={{ animationDelay: '1s' }} />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <div className={`${variant === 'centered' ? 'text-center' : ''}`}>

          {/* Badge */}
          {showBadge && (
            <motion.div
              className={`mb-8 ${variant === 'centered' ? '' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <FloatingBadge delay={0.2}>
                {t('hero.badge') || 'Solutions Industrielles Premium'}
              </FloatingBadge>
            </motion.div>
          )}

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[1.1] text-center">
            <AnimatedText
              text={t('hero.title1') || 'Propulsez votre'}
              className="text-white block w-full"
              delay={0.3}
            />
            <AnimatedText
              text={t('hero.title2') || 'Performance'}
              className="block mt-10 w-full"
              delay={0.8}
              as={GradientText}
            />
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className={`text-lg sm:text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl ${variant === 'centered' ? 'mx-auto' : ''}`}
          >
            {t('hero.subtitle') || 'Équipements industriels et solutions de sécurité de pointe pour optimiser votre productivité et garantir la sécurité de vos équipes.'}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className={`flex flex-col sm:flex-row gap-4 ${variant === 'centered' ? 'justify-center' : ''}`}
          >
            <MagneticButton href="/products" variant="primary">
              {t('hero.exploreProducts') || 'Explorer nos produits'}
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </MagneticButton>
            <MagneticButton href="/contact" variant="outline">
              {t('hero.requestQuote') || 'Demander un devis'}
            </MagneticButton>
          </motion.div>

          {/* Stats Section */}
          {showStats && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.8 }}
              className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-white/10 ${variant === 'centered' ? '' : ''}`}
            >
              <StatCounter value={15} suffix="+" label={t('stats.years') || "Ans d'expérience"} delay={0} />
              <StatCounter value={500} suffix="+" label={t('stats.clients') || "Clients satisfaits"} delay={0.1} />
              <StatCounter value={1000} suffix="+" label={t('stats.products') || "Produits"} delay={0.2} />
              <StatCounter value={98} suffix="%" label={t('stats.satisfaction') || "Satisfaction"} delay={0.3} />
            </motion.div>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-gray-400"
        >
          <span className="text-xs uppercase tracking-widest">{t('hero.scroll') || 'Défiler'}</span>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}

// Export sub-components for flexible usage
PremiumHero.AnimatedText = AnimatedText;
PremiumHero.GradientText = GradientText;
PremiumHero.FloatingBadge = FloatingBadge;
PremiumHero.MagneticButton = MagneticButton;
PremiumHero.StatCounter = StatCounter;
