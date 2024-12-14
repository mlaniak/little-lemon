import { useState, useEffect } from 'react';

const useSwipe = (ref, options = {}) => {
  const {
    threshold = 50,
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
  } = options;

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  useEffect(() => {
    const target = ref.current;
    if (!target) return;

    const handleTouchStart = (e) => {
      setTouchEnd(null);
      setTouchStart({
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY,
      });
    };

    const handleTouchMove = (e) => {
      setTouchEnd({
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY,
      });
    };

    const handleTouchEnd = () => {
      if (!touchStart || !touchEnd) return;

      const distanceX = touchStart.x - touchEnd.x;
      const distanceY = touchStart.y - touchEnd.y;
      const isHorizontal = Math.abs(distanceX) > Math.abs(distanceY);

      if (isHorizontal) {
        if (Math.abs(distanceX) >= threshold) {
          if (distanceX > 0) {
            onSwipeLeft?.();
          } else {
            onSwipeRight?.();
          }
        }
      } else {
        if (Math.abs(distanceY) >= threshold) {
          if (distanceY > 0) {
            onSwipeUp?.();
          } else {
            onSwipeDown?.();
          }
        }
      }
    };

    target.addEventListener('touchstart', handleTouchStart);
    target.addEventListener('touchmove', handleTouchMove);
    target.addEventListener('touchend', handleTouchEnd);

    return () => {
      target.removeEventListener('touchstart', handleTouchStart);
      target.removeEventListener('touchmove', handleTouchMove);
      target.removeEventListener('touchend', handleTouchEnd);
    };
  }, [ref, threshold, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, touchStart, touchEnd]);

  return {
    touchStart,
    touchEnd,
  };
};

export default useSwipe;
