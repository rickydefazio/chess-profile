import React, { useEffect, useRef } from 'react';
import type { Stats, IWinStreak } from '@/types';
import ModalContent from './ModalContent';

interface ModalProps {
  content: {
    title: string;
    data: IWinStreak | Stats;
  };
}

export default function Modal({ content }: ModalProps) {
  const checkboxRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (checkboxRef.current && checkboxRef.current.checked) {
          checkboxRef.current.checked = false;
        }
      }
    };

    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [checkboxRef]);

  return (
    <>
      <input
        ref={checkboxRef}
        type='checkbox'
        id='my-modal-4'
        className='modal-toggle'
        aria-label='Open Modal'
      />
      <label
        htmlFor='my-modal-4'
        className='modal cursor-pointer'
        aria-label='Open Modal'
      >
        <label
          className='modal-box relative w-80 max-w-sm border-white border-2'
          htmlFor='my-modal-4'
          aria-labelledby='modal-title'
        >
          <h3 className='pb-2 text-center text-2xl font-bold text-info'>
            {content.title}
          </h3>
          <ModalContent title={content.title} data={content.data} />
        </label>
      </label>
    </>
  );
}
