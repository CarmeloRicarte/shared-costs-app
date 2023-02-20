import './styles/Modal.css';

import React, { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const handleClose = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onClose();
      setIsAnimating(false);
    }, 200);
  };
  return (
    <>
      {isOpen && (
        <div
          className={`modal-wrapper${isOpen ? ' modal-wrapper--open' : ''}`}
          onClick={handleClose}
        >
          <div className='modal-backdrop' />
          <div className={`modal-box${isAnimating ? '' : ' modal-box--open'}`}>
            <div className='modal-header'>
              <button className='modal-close' onClick={handleClose}>
                &times;
              </button>
            </div>
            <div className='modal-body'>{children}</div>
          </div>
        </div>
      )}
    </>
  );
};
