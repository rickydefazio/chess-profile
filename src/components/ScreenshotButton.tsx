import React, { useState } from 'react';
import { toPng } from 'html-to-image';

interface ScreenshotButtonProps {
  targetRef: React.RefObject<HTMLDivElement | null>;
}

export default function ScreenshotButton({ targetRef }: ScreenshotButtonProps) {
  const [isFlashing, setIsFlashing] = useState(false);

  const handleScreenshot = async () => {
    if (targetRef?.current) {
      try {
        setIsFlashing(true);
        setTimeout(() => setIsFlashing(false), 300);

        // Wait for any state updates to complete
        await new Promise(resolve => requestAnimationFrame(resolve));

        const dataUrl = await toPng(targetRef.current, {
          cacheBust: true,
          quality: 1.0,
          pixelRatio: 2,
          skipAutoScale: true,
          style: {
            transform: 'scale(1)'
          },
          filter: () => true
        });

        const response = await fetch(dataUrl);
        const blob = await response.blob();
        await navigator.clipboard.write([
          new ClipboardItem({
            'image/png': blob
          })
        ]);
        // TODO: Alert the user that a screenshot was copied to their clipboard
      } catch (error) {
        console.error('Error taking screenshot:', error);
      }
    }
  };

  return (
    <>
      <button
        onClick={handleScreenshot}
        className='absolute right-2 top-2 px-2.5 hover:bg-base-200 rounded-full transition-colors hidden sm:block'
        title='Copy card as image'
      >
        📸
      </button>
      {isFlashing && (
        <div className='absolute inset-0 animate-flash bg-white/75 pointer-events-none z-50 rounded-2xl' />
      )}
    </>
  );
}
