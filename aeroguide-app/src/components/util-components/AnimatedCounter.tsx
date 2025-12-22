import { useInView, useMotionValue, useSpring, useMotionValueEvent } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  value: string; // e.g., "150+", "5,000+", "98%", "50+"
  duration?: number; // Animation duration in milliseconds
  className?: string;
}

export function AnimatedCounter({ value, duration = 2, className = '' }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayValue, setDisplayValue] = useState(0);

  // Parse the value to extract number and suffix
  const parseValue = (val: string) => {
    const numMatch = val.match(/[\d,]+/);
    if (!numMatch) return { number: 0, suffix: val };
    
    const numberStr = numMatch[0].replace(/,/g, '');
    const number = parseInt(numberStr, 10);
    const suffix = val.replace(/[\d,]+/, '');
    
    return { number, suffix };
  };

  const { number: targetValue, suffix } = parseValue(value);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(targetValue);
    }
  }, [isInView, targetValue, motionValue]);

  // Update display value when spring value changes
  useMotionValueEvent(springValue, 'change', (latest) => {
    setDisplayValue(Math.floor(latest));
  });

  // Format number with commas
  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US');
  };

  return (
    <div ref={ref} className={className}>
      {formatNumber(displayValue)}{suffix}
    </div>
  );
}

