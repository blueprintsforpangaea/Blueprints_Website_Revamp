import { motion } from 'framer-motion';

// Lightweight scroll-into-view wrapper used across the site for a
// consistent, professional entrance animation.
export default function Reveal({
  children,
  as = 'div',
  delay = 0,
  y = 28,
  className,
  once = true,
  ...rest
}) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
