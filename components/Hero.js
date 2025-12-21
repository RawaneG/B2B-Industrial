import { motion } from 'framer-motion';
import Link from 'next/link';

/**
 * Hero component introduces the brand with a powerful message.  It uses
 * framer‑motion for a progressive reveal: elements fade and slide into view
 * sequentially.  Buttons encourage users to explore products or request a
 * quote.
 */
export default function Hero() {
  return (
    <section className="relative flex items-center justify-center h-screen text-center" style={{ color: 'hsl(var(--text-on-dark))' }}>
      {/* Dark overlay to improve contrast against the particle background */}
      <div className="absolute inset-0 z-0" style={{ background: 'hsl(var(--brand-dark))', opacity: 0.6 }} />
      <div className="relative z-10 px-4">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-6xl font-bold mb-6"
        >
          Powering Safety &amp; Efficiency
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl mx-auto text-lg sm:text-xl mb-8"
        >
          We deliver industrial equipment and safety solutions to keep your
          business running smoothly and securely.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link href="/products">
            <span className="font-medium py-3 px-8 rounded-full transition-colors" style={{ background: 'hsl(var(--accent))', color: 'white' }}>
              Explore Products
            </span>
          </Link>
          <Link href="/contact">
            <span className="bg-white font-medium py-3 px-8 rounded-full transition-colors" style={{ color: 'hsl(var(--brand-dark))' }}>
              Request a Quote
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}