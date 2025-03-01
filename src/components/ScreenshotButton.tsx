import React, { useState, useEffect } from 'react';
import { toPng } from 'html-to-image';
import { copyScreenshot } from '@/utils/copyScreenshot';

interface ScreenshotButtonProps {
  targetRef: React.RefObject<HTMLElement | null>;
}

export default function ScreenshotButton({ targetRef }: ScreenshotButtonProps) {
  const [isFlashing, setIsFlashing] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (!showNotification) return;

    const timeout = setTimeout(() => setShowNotification(false), 3000);

    return () => clearTimeout(timeout);
  }, [showNotification]);

  const handleScreenshot = async () => {
    if (!targetRef?.current) return;

    try {
      setIsFlashing(true);
      setTimeout(() => setIsFlashing(false), 300);

      await copyScreenshot(targetRef.current);
      setShowNotification(true);
    } catch (error) {
      console.error('Error taking screenshot:', error);
    }
  };

  return (
    <>
      <button
        onClick={handleScreenshot}
        className='absolute right-2 top-2 px-2.5 hover:bg-base-200 rounded-full transition-colors hidden sm:block'
        title='Screenshot Card'
      >
        📸
      </button>

      {showNotification && (
        <div className='fixed top-4 right-4 bg-green-600 text-white px-3 py-2 rounded-md shadow-md text-sm z-[100]'>
          ✓ Screenshot Copied!
        </div>
      )}

      {isFlashing && (
        <div className='absolute inset-0 animate-flash bg-white/75 pointer-events-none z-50 rounded-2xl' />
      )}
    </>
  );
}
