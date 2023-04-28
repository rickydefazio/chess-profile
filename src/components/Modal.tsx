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
      <input type='checkbox' id='my-modal-4' className='modal-toggle' />
      <label htmlFor='my-modal-4' className='modal cursor-pointer'>
        <label className='modal-box relative w-80 max-w-sm' htmlFor=''>
          <h3 className='text-center text-lg font-bold text-info'>
            {content.title}
          </h3>
          <ModalContent title={content.title} data={content.data} />
        </label>
      </label>
    </>
  );
}
