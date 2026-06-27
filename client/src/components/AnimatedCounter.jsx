import React, { useEffect, useState } from 'react';

export const AnimatedCounter = ({ value, duration = 1.5, decimals = 0, suffix = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const endValue = parseFloat(value) || 0;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      
      // Ease-out quad formula: 1 - (1 - t) * (1 - t)
      const easeOutProgress = 1 - Math.pow(1 - progress, 2);
      const currentCount = easeOutProgress * endValue;

      setCount(currentCount);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(endValue);
      }
    };

    window.requestAnimationFrame(step);
  }, [value, duration]);

  return (
    <span>
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
};
