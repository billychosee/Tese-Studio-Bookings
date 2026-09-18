import React from 'https://esm.sh/react@18.3.1';
import { motion, useMotionValue, useTransform } from 'https://esm.sh/framer-motion@10.18.0';
import { useState, useEffect } from 'https://esm.sh/react@18.3.1';

const h = React.createElement;

// Simple inline styles instead of CSS import for debugging
const containerStyle = {
  position: 'relative',
  width: '100%',
  height: '100%',
  perspective: '600px',
  outline: '2px solid red'
};

const cardRotateStyle = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  cursor: 'grab'
};

const cardRotateDisabledStyle = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  cursor: 'pointer'
};

const cardStyle = {
  borderRadius: '1rem',
  overflow: 'hidden',
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

function CardRotate({ children, onSendToBack, sensitivity, disableDrag = false }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  function handleDragEnd(_, info) {
    if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
      onSendToBack();
    } else {
      x.set(0);
      y.set(0);
    }
  }

  if (disableDrag) {
    return h('motion.div', { style: { ...cardRotateDisabledStyle, x: 0, y: 0 } }, children);
  }

  return h('motion.div', {
    style: { ...cardRotateStyle, x, y, rotateX, rotateY },
    drag: true,
    dragConstraints: { top: 0, right: 0, bottom: 0, left: 0 },
    dragElastic: 0.6,
    whileTap: { cursor: 'grabbing' },
    onDragEnd: handleDragEnd
  }, children);
}

export default function Stack({
  randomRotation = false,
  sensitivity = 200,
  cards = [],
  animationConfig = { stiffness: 260, damping: 20 },
  sendToBackOnClick = false,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  mobileClickOnly = false,
  mobileBreakpoint = 768,
  onCardClick
}) {
  console.log('[Stack] render, cards:', cards.length);
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [mobileBreakpoint]);

  const shouldDisableDrag = mobileClickOnly && isMobile;
  const shouldEnableClick = sendToBackOnClick || shouldDisableDrag;

  const [stack, setStack] = useState(() => {
    if (cards.length) {
      return cards.map((content, index) => ({ id: index + 1, content }));
    } else {
      return [
        {
          id: 1,
          content: h('img', {
            src: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format',
            alt: 'card-1',
            style: { width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none', userSelect: 'none', WebkitUserDrag: 'none' }
          })
        },
        {
          id: 2,
          content: h('img', {
            src: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format',
            alt: 'card-2',
            style: { width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none', userSelect: 'none', WebkitUserDrag: 'none' }
          })
        },
        {
          id: 3,
          content: h('img', {
            src: 'https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format',
            alt: 'card-3',
            style: { width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none', userSelect: 'none', WebkitUserDrag: 'none' }
          })
        },
        {
          id: 4,
          content: h('img', {
            src: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format',
            alt: 'card-4',
            style: { width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none', userSelect: 'none', WebkitUserDrag: 'none' }
          })
        }
      ];
    }
  });

  useEffect(() => {
    if (cards.length) {
      setStack(cards.map((content, index) => ({ id: index + 1, content })));
    }
  }, [cards]);

  const sendToBack = (id) => {
    setStack((prev) => {
      const newStack = [...prev];
      const index = newStack.findIndex((card) => card.id === id);
      const [card] = newStack.splice(index, 1);
      newStack.unshift(card);
      return newStack;
    });
  };

  useEffect(() => {
    if (autoplay && stack.length > 1 && !isPaused) {
      const interval = setInterval(() => {
        const topCardId = stack[stack.length - 1].id;
        sendToBack(topCardId);
      }, autoplayDelay);

      return () => clearInterval(interval);
    }
  }, [autoplay, autoplayDelay, stack, isPaused]);

  return h('div', {
    style: containerStyle,
    onMouseEnter: () => pauseOnHover && setIsPaused(true),
    onMouseLeave: () => pauseOnHover && setIsPaused(false)
  }, stack.map((card, index) => {
    const randomRotate = randomRotation ? Math.random() * 10 - 5 : 0;
    return h(CardRotate, {
      key: card.id,
      onSendToBack: () => sendToBack(card.id),
      sensitivity: sensitivity,
      disableDrag: shouldDisableDrag
    }, h('motion.div', {
      style: cardStyle,
      onClick: () => {
        if (shouldEnableClick) sendToBack(card.id);
        if (onCardClick) onCardClick(card.content, card.id);
      },
      animate: {
        rotateZ: (stack.length - index - 1) * 4 + randomRotate,
        scale: 1 + index * 0.06 - stack.length * 0.06,
        transformOrigin: '90% 90%'
      },
      initial: false,
      transition: {
        type: 'spring',
        stiffness: animationConfig.stiffness,
        damping: animationConfig.damping
      }
    }, card.content));
  }));
}