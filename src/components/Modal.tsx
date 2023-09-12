import React from 'react';
import type { Stats, IWinStreak } from '@/types';
import ModalContent from './ModalContent';

interface ModalProps {
  content: {
    title: string;
    data: IWinStreak | Stats;
  };
}

export default function Modal({ content }: ModalProps) {
  return (
    <>
      <input
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
          className='modal-box relative w-80 max-w-sm'
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
